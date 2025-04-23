import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import testBidData from '../assets/testBidData';
import testJobData from '../assets/testJobData';

export default function BidPage({ route }) {
  // Safely access route.params
  const { bidId, jobId } = route?.params || {};

  // Check if parameters are provided
  if (!bidId || !jobId) {
    return (
      <View style={styles.container}>
        <Text>Error: Bid ID or Job ID not provided.</Text>
      </View>
    );
  }

  
  const bidInfo = testBidData.find((item) => item.bid_id === bidId);
  const jobInfo = testJobData.find((item) => item.job_id === jobId);

  
  if (!bidInfo || !jobInfo) {
    return (
      <View style={styles.container}>
        <Text>{!bidInfo ? 'Bid not found.' : 'Job not found.'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.bidMetaData}>
        <Image
          source={{ uri: jobInfo.photo_url || 'https://picsum.photos/seed/1/200/200' }}
          style={styles.jobImage}
        />
        <View style={styles.bidInfo}>
          <Text style={styles.bidText}>Job: {jobInfo.summary}</Text>
          <Text style={styles.bidText}>Image: Placeholder</Text>
          <Text style={styles.bidText}>Bid Date: {bidInfo.created_at}</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {jobInfo.job_detail || 'No description available.'}
        </Text>
      </View>
      {/* Taken off chat functionality for now */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  bidMetaData: {
    flexDirection: 'row',
    borderColor: 'rgb(65, 129, 231)',
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    marginBottom: 16,
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  bidInfo: {
    flex: 2,
    justifyContent: 'center',
  },
  bidText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});