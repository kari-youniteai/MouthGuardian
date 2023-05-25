import React, { useState, useEffect } from 'react';
import { firebase } from '../../services/firebase.config.js';
import classes from './HelloSessionContainer.module.css';

const HelloSessionContainer = () => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const currentUser = firebase.auth().currentUser;
    const [lastEntryDate, setLastEntryDate] = useState('');
    const [itemCount, setItemCount] = useState(0);
    


    useEffect(() => {

    }, []);

    useEffect(() => {
        const databaseRef = firebase.database().ref(`users/${currentUser?.uid}/timeElapsed`);
      
        // Fetch the data from Firebase
        databaseRef.once('value', (snapshot) => {
          const timeElapsedData = snapshot.val();
      
          if (timeElapsedData) {
            // Get the keys of the stored items
            const itemIds = Object.keys(timeElapsedData);
      
            // Get the last entry
            const lastEntryId = itemIds[itemIds.length - 1];
            const lastEntry = timeElapsedData[lastEntryId];
      
            // Convert epoch time to a formatted date
            const lastEntryDate = new Date(lastEntry.startTime).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
      
            // Get the count of stored items
            const itemCount = itemIds.length;
      
            // Update the state with the fetched data
            setTimeElapsed(timeElapsedData);
            setLastEntryDate(lastEntryDate);
            setItemCount(itemCount);
          }
        });
      }, []);
      
      
      

    return (
        <div className={classes.container}>
            <div className={classes.title}>Your Sessions</div>
            <div className={classes.sessionDetails}>
                <div className={classes.sessionItem}>
                    <div className={classes.smallTitle}>Last</div>
                    <div className={classes.value}>{lastEntryDate}</div>
                </div>
                <div className={classes.sessionItem}>
                    <div className={classes.smallTitle}>Next</div>
                    <div className={classes.value}>{'May 29'}</div>
                </div>
                <div className={classes.sessionItem}>
                    <div className={classes.smallTitle}>Total</div>
                    <div className={classes.value}>{itemCount}</div>
                </div>
            </div>
        </div >
    );
};

export default HelloSessionContainer;
