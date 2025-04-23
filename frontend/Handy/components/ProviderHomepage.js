import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobItem from './JobItem';
import Header from './Header';
import { useContext } from 'react';
import { UserContext } from './UserContext';

import { getProviderWonJobs, getProviderBids, getProviderJobs } from '../utils/api';

export default function ProviderHomepage() {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState('Available'); 


  // State for the jobs data
  const [myJobs, setMyJobs] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the three endpoints on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

       
        const myJobsResponse = await getProviderWonJobs(userData.user_id);
        setMyJobs(myJobsResponse.jobs || []);

        
        const myBidsResponse = await getProviderBids(userData.user_id);
        setMyBids(myBidsResponse.jobs || []);

        
        const availableJobsResponse = await getProviderJobs(userData.user_id);
        setAvailableJobs(availableJobsResponse.jobs || []);

      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData.id]);

  
  const displayedJobs = activeTab === 'My Jobs' ? myJobs :
                       activeTab === 'My Bids' ? myBids :
                       availableJobs;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      {/* Navbar section */}
      <View style={styles.navbarButtonContainer}>
        <View style={styles.customerButton}>
          <Button
            title="Customer"
            onPress={() => navigation.navigate('CustomerHomepage')}
          />
        </View>

        <View style={styles.providerButton}>
          <TouchableOpacity
            style={styles.providerButtonTouchable}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <Text style={styles.providerButtonText}>Handy Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Buttons (My Jobs, My Bids, Available) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'My Jobs' && styles.tabButtonActive]}
          onPress={() => setActiveTab('My Jobs')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'My Jobs' && styles.tabButtonTextActive]}>
            My Jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'My Bids' && styles.tabButtonActive]}
          onPress={() => setActiveTab('My Bids')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'My Bids' && styles.tabButtonTextActive]}>
            My Bids
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Available' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Available')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'Available' && styles.tabButtonTextActive]}>
            Available
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main section */}
      <View style={styles.contentContainer}>
        {loading ? (
          <Text>Loading jobs...</Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              {activeTab === 'My Jobs' ? 'My Jobs' :
               activeTab === 'My Bids' ? 'My Bids' :
               'Available Jobs'}
            </Text>
            <FlatList
              data={displayedJobs}
              renderItem={({ item }) => (
                <JobItem
                  job_id={item.job_id}
                  summary={item.summary}
                  job_detail={item.job_detail}
                  created_by={item.created_by}
                  status={item.status}
                  photo_url={item.photo_url}
                  target_date={item.target_date}
                  location={item.location}
                  destination="ProviderJobDetailsPage"
                />
              )}
              keyExtractor={(item) => item.job_id.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <Text>No jobs to display.</Text>
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  navbarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    marginBottom: 0,
    marginLeft: 60,
    marginRight: 60,
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 2,
  },
  customerButton: {
    flex: 1,
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 1,
  },
  providerButton: {
    flex: 1,
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 1,
  },
  providerButtonTouchable: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#007AFF',
  },
  tabButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});