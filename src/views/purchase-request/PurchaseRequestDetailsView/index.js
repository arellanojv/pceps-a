import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Tabs,
  Tab,
  makeStyles,
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';
import firebase from 'src/lib/firebase';
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));



const PurchaseReqeuestDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState('overview');
  const [project, setProject] = useState(null);
  let { id } = useParams();
  
  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'applicants', label: 'Applicants' },
  ];
  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const db = firebase.firestore();
  var docRef = db.collection('purchase_request').doc(id);

  const getProject = useCallback(async () => {
      docRef
      .get()
      .then((doc) => {
        if (isMountedRef.current) {
          console.log('Document data:', doc.data());
          setProject(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  if (!project) {
    return null;
  }

  return (
    <Page className={classes.root} title="Purchase Request Details">
      <Container maxWidth="lg">
        <Header project={project} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'overview' && <Overview project={project} />}
          {/* {currentTab === 'applicants' && (
            <Applicants applicants={project.applicants} />
          )} */}
        </Box>
      </Container>
    </Page>
  );
};

export default PurchaseReqeuestDetailsView;
