import React, { createContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import SplashScreen from "src/components/SplashScreen";
import firebase from "src/lib/firebase";

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATE_CHANGED": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "FirebaseAuth",
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const createUserWithEmailAndPassword = async (
    email,
    password,
    type,
    phone
  ) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        firebase.firestore().collection("users").doc(cred.user.uid).set({
          type: type,
          phone: phone,
        });
        //send email verification
        const currentUser = firebase.auth().currentUser;
        if (!currentUser.emailVerified) {
          currentUser
            .sendEmailVerification()
            .then(function () {
              console.log("Email Verification Sent");
            })
            .catch(function (error) {
              // An error happened.
            });
        }
      });
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // history.push("/app/activate");
      if (user) {
        // Here you should extract the complete user profile to make it available in your entire app.
        // The auth state only provides basic information.
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((userDoc) => {
            dispatch({
              type: "AUTH_STATE_CHANGED",
              payload: {
                isAuthenticated: true,
                user: {
                  id: user.uid,
                  avatar: user.photoURL,
                  email: user.email,
                  name: user.displayName || user.email,
                  tier: "Premium",
                  phone: user.phone,
                  type: user.type,
                  blocking: user.emailVerified,
                },
              },
            });
          });
      } else {
        dispatch({
          type: "AUTH_STATE_CHANGED",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "FirebaseAuth",
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
