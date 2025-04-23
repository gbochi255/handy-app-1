import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, Modal, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from './UserContext'; 
import axios from 'axios';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { supabase } from '../lib/supabase';

export default function PostJob() {
  const { userData } = useContext(UserContext); 
  const [summary, setSummary] = useState('');
  const [jobDetail, setJobDetail] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const openDatePicker = () => {
    console.log('Opening date picker');
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    console.log('Date picker event:', event.type);
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }

    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const uploadPhoto = async (uri) => {
    setIsUploading(true);
    const fileName = uri.split("/").pop();

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const { data, error } = await supabase.storage
        .from("photos")
        .upload(`photos/${Date.now()}-${fileName}`, blob, {
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Upload error:", error);
        Alert.alert("Error", "Failed to upload photo.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("photos")
        .getPublicUrl(data.path);

      const publicUrl = publicUrlData.publicUrl;
      setPhotoUrl(publicUrl);
      setShowCamera(false);
      Alert.alert("Success", "Photo uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      Alert.alert("Error", "Failed to upload photo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleTakePicture = () => {
    if (cameraRef.current) {
      cameraRef.current.takePictureAsync().then((photo) => {
        setPhotoUri(photo.uri);
        uploadPhoto(photo.uri);
      });
    }
  };

  const handleSubmit = async () => {
    // const userId = userData?.email;
    const jobData = {
      created_by: 43,
      summary,
      job_detail: jobDetail,
      target_date: date.toISOString(),
      photo_url: photoUrl,
      category: "gardening",
      postcode: userData.postcode
    };

    try {
      const response = await axios.post('https://handy-rpx6.onrender.com/jobs/create', jobData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Alert.alert('Success', 'Job posted successfully!');
      console.log(jobData, "jobData <<<<")
      console.log('API response:', response.data);
      setSummary('');
      setJobDetail('');
      setDate(new Date());
      setPhotoUri(null);
      setPhotoUrl(null);
    } catch (error) {
      console.log(jobData, "jobData <<<<")
      Alert.alert('Error', 'Failed to post job. Please try again.');
      console.error('Error posting job:', error);
    }
  };

  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post a job</Text>

      <TextInput
        style={styles.input}
        placeholder="Summary"
        value={summary}
        onChangeText={setSummary}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job detail"
        value={jobDetail}
        onChangeText={setJobDetail}
        multiline
      />

      <View style={styles.row}>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>By when:</Text>
          <TouchableOpacity
            onPress={openDatePicker}
            style={styles.dateTouchable}
            activeOpacity={0.7}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
            />
          )}
        </View>
      </View>

      <View style={styles.imageUploadContainer}>
        {(photoUri || photoUrl) ? (
          <Image
            source={{ uri: photoUri || photoUrl }}
            style={styles.imagePreview}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>IMG</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
          onPress={() => setShowCamera(true)}
          disabled={isUploading}
        >
          <Text style={styles.uploadButtonText}>
            {isUploading ? "Uploading..." : "Take Photo"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.orangeButton}
        onPress={handleSubmit}
      >
        <Text style={styles.orangeButtonText}>Submit</Text>
      </TouchableOpacity>

      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={{ flex: 1 }}>
          <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
          <TouchableOpacity
            onPress={handleTakePicture}
            style={styles.cameraButton}
          >
            <Text style={styles.cameraButtonText}>Take a Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowCamera(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateTouchable: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFF',
  },
  dateText: {
    textAlign: 'center',
    fontSize: 16,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  imagePreview: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  imageText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFF',
    flex: 1,
  },
  uploadButtonDisabled: {
    backgroundColor: '#CCC',
  },
  uploadButtonText: {
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  orangeButton: {
    backgroundColor: "#FF7A00",
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  orangeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});