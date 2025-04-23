import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobItem from './JobItem';
import testJobData from '../assets/testJobData';
import Header from './Header';

export default function ProviderHomepage() {
  const navigation = useNavigation();

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
          <Button
            title="Handy Admin"
            color={Platform.OS === 'ios' ? '#fff' : '#FF7A00'} 
            onPress={() => {}}
          />
        </View>
      </View>
      {/* Main section */}
      <View style={styles.contentContainer}>
        <Text style={{ fontSize: 40 }}>Available Jobs</Text>

        <FlatList
          data={testJobData}
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
        />
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
    backgroundColor: '#FF7A00',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
  },
});