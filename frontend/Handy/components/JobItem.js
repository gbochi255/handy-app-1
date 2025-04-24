import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';

export default function JobItem({
  job_id,
  summary,
  job_detail,
  created_by,
  status,
  photo_url,
  target_date,
  location,
  destination = 'JobPage',
}) {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log(`Navigating to ${destination} with jobId: ${job_id}`);
    navigation.navigate(destination, { jobId: job_id });
  };
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card
        style={styles.card}
        onPress={handlePress}
      >
        <Card.Content>
          <View style={styles.row}>
            <Image
              source={{
                uri: photo_url || `https://picsum.photos/seed/1/200/200`,
              }}
              style={styles.image}
            />
            <View style={styles.middleContent}>
              <Text style={styles.jobTitle}>{summary}</Text>
              <Text style={styles.postedDate}>Posted Date: {target_date}</Text>
            </View>
            {/* <View style={styles.rightContent}>
              <Text style={styles.distanceLabel}>Location</Text>
              <Text style={styles.distanceValue}>{location}</Text>
            </View> */}

          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postedDate: {
    fontSize: 14,
    color: 'gray',
  },
  rightContent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  distanceLabel: {
    fontSize: 12,
    color: 'gray',
  },
  distanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});