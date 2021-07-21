import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import firebase from 'src/lib/firebase';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100,
  },
}));

const PurchaseRequestListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [purchaseRequests, setPurchaseRequest] = useState([]);

  const getPuchaseRequests = useCallback(async () => {
    const db = firebase.firestore();
    const response = db
      .collection('purchase_request')
      .where('author.id', '==', 'C8hw4Kq0ypZJkxcc60itIRMKmv13');
    const data = await response.get();
    if (isMountedRef.current) {
      setPurchaseRequest(data.docs.map((doc) => ({id: doc.id, ...doc.data()})));
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPuchaseRequests();
  }, [getPuchaseRequests]);
  
  console.log('purchaserequests', purchaseRequests);

  return (
    <Page className={classes.root} title="Purchase Request List">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results purchaseRequests={purchaseRequests} />
        </Box>
      </Container>
    </Page>
  );
};

export default PurchaseRequestListView;
