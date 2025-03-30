import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions, Animated, Image, Alert,
  Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList from "react-native-draggable-flatlist";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import Friend from './classes/Friend.js'
import * as FileSystem from 'expo-file-system';

// Contact Book Page
const ContactBook = ({ navigation }) => {
  const [friend_names, setNames] = useState([]);

  useEffect(() => {
    async function getFriendsList() {
      const path = `${FileSystem.documentDirectory}/friend_list.json`;
      try {
        const fileExists = await FileSystem.getInfoAsync(path);
  
        if (fileExists.exists) {
          // get existing data from file
          const data = await FileSystem.readAsStringAsync(path);
          setNames(JSON.parse(data));
        }
        else {
          console.log("Cannot find file");
          setNames([]);
        }
      }
      catch (error) {
        Alert.alert('Error', `${error}: Try Again Later.`);
        return false;
      }
    }
    getFriendsList();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>My Friends</Text>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.settingsText}>⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* Display All Friends */}
            {friend_names?.map((friend, index) => (
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Profile', {friend: friend})}
              >
                <Text style={styles.pageText}> {friend.name} </Text>
              </TouchableOpacity>
            ))}
            </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

// Profile Page
const Profile = ({ route, navigation }) => {
  const { friend } = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const defaultImage = require('./assets/default.png');;

  // TODO: change profile pic function, need to request phone access to gallery
  const changeProfilePic = () => {
    setProfileImage({ uri: ''});
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>{friend.name}</Text>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.settingsText}>⚙️</Text>
              </TouchableOpacity>
            </View>

            {/* Profile Icon */}
            <TouchableOpacity onPress={changeProfilePic}>
              <View style={styles.profileIconContainer}>
                <Image
                  source={profileImage || defaultImage}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>

            {/* Profile Info */}
            <View style={styles.profileContainer}>
              <Text style={styles.label}>{friend.name}</Text>
              <Text style={styles.label}>{friend.pronouns}</Text>
              <Text style={styles.label}>Birthday: {friend.birthday}</Text>
              <Text style={styles.label}>Address: {friend.address}</Text>
              <Text style={styles.label}>Phone Number: {friend.phoneNumber}</Text>
              <Text style={styles.label}>Email: {friend.email}</Text>
              <Text style={styles.label}/>
            </View>

            <View style={styles.container}>
            <Text style={styles.pageText}>Extra Info</Text>
              <Text style={styles.label2}>Likes: {friend.likes}</Text>
              <Text style={styles.label2}>Dislikes: {friend.dislikes}</Text>
              <Text style={styles.label}/>
            </View>
            {/* Reminder List */}
            <View style={styles.container}>
              <Text style={styles.pageText}>Reminders</Text>
              <Text style={styles.label2}>Reminder 1</Text>
              <Text style={styles.label}/>
            </View>

            {/* Set Automations */}
            <View style={styles.container}>
              <Text style={styles.pageText}>Automations</Text>
              <Text style={styles.label2}>Automations 1</Text>
              <Text style={styles.label}/>
            </View>

            {/* Display Notebook */}
            <View style={styles.container}>
              <Text style={styles.pageText}>Notes</Text>
              <Text style={styles.label2}>Note 1</Text>
              <Text style={styles.label}/>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

// Add Friend Page
const AddFriend = ({ navigation }) => {
  const [friendName, setName] = useState('');
  const [pronouns, setPronouns] = useState([['', '']]);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');

  const [birthday, setBirthday] = useState(null);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);

  const [pronounWidth, setPronounWidth] = useState('48%');

  // Handle date selection
  const onChangeDate = (event, selectedDate, index = null) => {
    if (selectedDate) {
      if (index === null) {
        // Birthday selection
        setBirthday(selectedDate);
        setShowBirthdayPicker(false);
      } else {
        // Important date selection
        const updatedDates = [...importantDates];
        updatedDates[index].date = selectedDate;
        setImportantDates(updatedDates);
        setShowDatePickerIndex(null);
      }
    }
  };

  // Add new pronoun row
  const addPronounRow = () => {
    setPronouns([...pronouns, ['', '']]);
    setPronounWidth("40%");
  };

  // Remove a pronoun row
  const removePronounRow = (index) => {
    if (pronouns.length > 1) {
      setPronouns(pronouns.filter((_, i) => i !== index));
      setPronounWidth("48%");
    }
  };

  // Update pronoun
  const updatePronoun = (index, pos, value) => {
    const updatedPronouns = [...pronouns];
    updatedPronouns[index][pos] = value;
    setPronouns(updatedPronouns);
  };

  async function addFriendJson(friendObj) {
    const path = `${FileSystem.documentDirectory}/friend_list.json`;
    try {
      const fileExists = await FileSystem.getInfoAsync(path);

      if (fileExists.exists) {
        console.log(path); // DEBUGGING
        // get existing data from file
        const data = await FileSystem.readAsStringAsync(path);
        existingObj = JSON.parse(data);

        if (!Array.isArray(existingObj)) {
          existingObj = [];
        }

        // Append new friend to json
        existingObj.push(friendObj);
        await FileSystem.writeAsStringAsync(path, JSON.stringify(existingObj, null, 4));
      } else {
        // create new file with friend obj.
        await FileSystem.writeAsStringAsync(path, JSON.stringify([friendObj], null, 4));
      }
      return true;
    }
    catch (error) {
      // Alert.alert('Error', `${error}: Try Again Later.`);
      await FileSystem.writeAsStringAsync(path, JSON.stringify([friendObj], null, 4));
      return false;
    }
  }

  // Submit function
  const handleSubmit = () => {
    if (!friendName.trim()) {
      Alert.alert('Error', 'Please enter a name.');
      return;
    }
    var friendID = 0;
    // const Friend = require('./classes/Friend.js');
    const newFriend = new Friend(friendID, friendName, pronouns, address, birthday, likes, dislikes, phoneNumber, email);
    const frenObj = newFriend.toObject();

    if (addFriendJson(frenObj)) {
      Alert.alert('Success', `Added ${friendName}`);
      navigation.goBack();
    }
  };
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeText}>Add Friend</Text>
              <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.settingsText}>⚙️</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              {/* Name Input */}
              <Text style={styles.label}>Name</Text>
              <TextInput style={styles.input} placeholder="Enter friend's name" value={friendName} onChangeText={setName} />

              {/* Pronouns Input */}
              <Text style={styles.label}>Pronouns</Text>
              {pronouns.map((pair, index) => (
                <View key={index} style={styles.pronounRow}>
                  <TextInput
                    style={[styles.input, styles.smallInput, {width: pronounWidth}]}
                    placeholder="Subject (e.g. she, he, they)"
                    value={pair[0]}
                    onChangeText={(value) => updatePronoun(index, 0, value)}
                  />
                  <TextInput
                    style={[styles.input, styles.smallInput, {width: pronounWidth}]}
                    placeholder="Object (e.g. her, him, them)"
                    value={pair[1]}
                    onChangeText={(value) => updatePronoun(index, 1, value)}
                  />
                  {pronouns.length > 1 && (
                    <TouchableOpacity onPress={() => removePronounRow(index)} style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>❌</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity style={styles.addButton} onPress={addPronounRow}>
                <Text style={styles.addButtonText}>➕ Add Pronoun</Text>
              </TouchableOpacity>

              {/* Address Input */}
              <Text style={styles.label}>Address</Text>
              <TextInput style={styles.input} placeholder="Enter friend's home address" value={address} onChangeText={setAddress} />

              {/* Phone Number Input */}
              <Text style={styles.label}>Phone Number</Text>
              <TextInput style={styles.input} placeholder="Enter friend's phone number" value={phoneNumber} onChangeText={setPhoneNumber} />

              {/* Email Input */}
              <Text style={styles.label}>Email Address</Text>
              <TextInput style={styles.input} placeholder="Enter friend's email address" value={email} onChangeText={setEmail} />

              {/* Likes Input */}
              <Text style={styles.label}>Likes</Text>
              <TextInput style={styles.input} placeholder="Enter friend's likes" value={likes} onChangeText={setLikes} />

              {/* Dislike Input */}
              <Text style={styles.label}>Dislikes</Text>
              <TextInput style={styles.input} placeholder="Enter friend's dislikes" value={dislikes} onChangeText={setDislikes} />

              {/* Birthday Picker */}
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowBirthdayPicker(true)}>
                <Text style={styles.datePickerText}>{birthday ? birthday.toDateString() : 'Select Birthday 🎂'}</Text>
              </TouchableOpacity>
              {showBirthdayPicker && <DateTimePicker value={birthday || new Date()} mode="date" display="default" onChange={(e, d) => onChangeDate(e, d, null)} />}

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

// Add Reminder Page
const AddReminder = ({ navigation }) => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [friend_names, setNames] = useState([]);
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    const fetchNames = async () => {
      const fetchedNames = await getAllFriends(); // TODO: connect bella's getter here
      setNames(fetchedNames);
    };

    fetchNames();
  }, []);

  // Submit function
  const handleSubmit = () => {
    if (selectedType === " " || !selectedType) {
      Alert.alert('Error', 'Please select a reminder type.');
      return;
    }
    if (selectedType === "Message" || selectedType === "Custom Reminder") {
      if (!customText.trim()) {
        Alert.alert('Error', 'Please enter a message.');
        return;
      }
    }

    // TODO: ADD BELLA'S FUNCTION TO ADD REMINDER TO OBJECT

    Alert.alert('Success', `Added Reminder for ${friend_names}`);
    navigation.goBack();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Add Reminder</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.container}>
      {/* Pick a Friend to set Reminder */}
      <Text style={styles.label}>Select a Friend</Text>
      <Picker
        selectedValue={selectedName}
        onValueChange={(itemValue) => setSelectedName(itemValue)}
        style={styles.picker}
      >
      {friend_names.map((name, index) => (
        <Picker.Item key={index} label={name} value={name} />
      ))}
      </Picker>

      {/* Pick Type of Reminder */}
      <Text style={styles.label}>Reminder Type</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label=" " value=" "/>
        <Picker.Item label="Message" value="Message"/>
        <Picker.Item label="Call" value="Call"/>
        <Picker.Item label="Custom Reminder" value="Custom Reminder"/>
      </Picker>
      
      {/* TextInput Required for "Message" or "Custom Reminder" */}
      {(selectedType === 'Message' || selectedType === 'Custom Reminder') && (
        <TextInput
          style={styles.input}
          placeholder="Enter details"
          value={customText}
          onChangeText={setCustomText}
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save Reminder</Text>
      </TouchableOpacity>

    </View>
  </GestureHandlerRootView>
  );
};

// Calendar Page
const CalendarUI = ({ navigation }) => {
  const [all_reminders, setReminders] = useState([]);

  // const getAllReminders = async () => {
  //   // Simulated reminders data structure
  //   return [
  //     { nextNotification: '2025-03-29', reminderName: 'Test Reminder 1' },
  //     { nextNotification: '2025-03-30', reminderName: 'Test Reminder 2' },
  //     { nextNotification: '2025-03-31', reminderName: 'Test Reminder 3' },
  //   ];
  // };
  
  useEffect(() => {
    const fetchNames = async () => {
      const reminders = await getAllReminders(); // TODO: connect bella's getter here
      setReminders(reminders);
    };

    fetchNames();
  }, []);


  const markedDates = all_reminders.reduce((acc, reminder) => {
    const formattedDate = reminder.nextNotification.toLocaleString();
    acc[formattedDate] = { selected: true, selectedColor: 'blue' };
    return acc;
  }, {});

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Calendar</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar markedDates={markedDates} style={styles.calendar}/>
      </View>
    </GestureHandlerRootView>
  );
};

// List of Reminders Page
const RemindersList = ({ navigation }) => {
  const [all_reminders, setReminders] = useState([]);
  
  useEffect(() => {
    const fetchNames = async () => {
      const reminders = await getAllReminders(); // TODO: connect bella's getter here
      setReminders(reminders);
    };

    fetchNames();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>My Reminders</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Display All Reminders */}
      {all_reminders.map((reminder, index) => (
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Profile', {friend_id: reminder.friendID})}
        >
          <Text style={styles.pageText}>{reminder.type} {reminder.reminderName}</Text>
        </TouchableOpacity>
      ))}
    </GestureHandlerRootView>
  );
};

// Settings Page
const Settings = ({ navigation }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Settings</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const FloatingAddButton = ({ setWidgetContainerBg, setWidgetBg }) => {  
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Handle Expand/Collapse Animation
  const toggleExpand = () => {
    if (isExpanded) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsExpanded(false);
        setWidgetContainerBg('#f5f5f5');
        setWidgetBg('white');
      });
    } else {
      setIsExpanded(true);
      setWidgetContainerBg('rgba(150, 150, 150, 0.3)');
      setWidgetBg('rgba(200, 200, 200, 0.5)'); 
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.fabContainer}>
      {/* Add Friend Button */}
      {isExpanded && (
        <Animated.View style={[styles.optionButton, { opacity: fadeAnim}]}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              toggleExpand();
              navigation.navigate('AddFriend');
            }}
          >
            <Text style={styles.optionText}>Add Friend</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Add Reminder Button */}
      {isExpanded && (
        <Animated.View style={[styles.optionButton2, { opacity: fadeAnim}]}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              toggleExpand();
              navigation.navigate('AddReminder');
            }}
          >
            <Text style={styles.optionText}>Add Reminder</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Plus Button (Expands or Collapses) */}
      <TouchableOpacity style={styles.fab} onPress={toggleExpand}>
        <Text style={styles.fabText}>{isExpanded ? "✖" : "✚"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("Kelly");
  const [widgetContainerBg, setWidgetContainerBg] = useState('#f5f5f5');
  const [widgetBg, setWidgetBg] = useState('white');
  const [widgets, setWidgetText] = useState([
    { id: 'reminders', title: '🟡 Reminders', content: '[Autofill value] Upcoming'},
    { id: 'contact_book', title: '🔗 Contact Book', content: 'You have [Autofill value] Contacts' },
    { id: 'calendarUI', title: '📅 Calendar', content: 'Open Calendar' },
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {name}!</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Draggable Widgets */}
      <View style={[styles.widget_container, { backgroundColor: widgetContainerBg }]}>
        <DraggableFlatList
          data={widgets}
          onDragEnd={({ data }) => setWidget(data)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, drag }) => (
            <TouchableOpacity
              style={[styles.widget, { backgroundColor: widgetBg }]}
              onLongPress={drag}
              onPress={() => {
                if (item.id === 'contact_book') navigation.navigate('ContactBook');
                if (item.id === 'calendarUI') navigation.navigate('CalendarUI');
                if (item.id === 'reminders') navigation.navigate('RemindersPage')
              }}
            >
              <Text style={styles.widgetText}>{item.title}</Text>
              <Text>{item.content}</Text>
            </TouchableOpacity>
            )}
        />

        <StatusBar style="auto" />
      </View>

      {/* Add Button */}
      <FloatingAddButton setWidgetContainerBg={setWidgetContainerBg} setWidgetBg={setWidgetBg} />
    </GestureHandlerRootView>
  );
};

// Set up Navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ContactBook" component={ContactBook} />
        <Stack.Screen name="CalendarUI" component={CalendarUI} />
        <Stack.Screen name="RemindersPage" component={RemindersList} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="AddReminder" component={AddReminder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#6200ea',
  },
  welcomeText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  settingsButton: {
    padding: 10,
  },
  settingsText: {
    color: 'white',
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  widget_container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  widget: {
    width: width * 0.8,
    height: 150,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  widgetText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pageText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  friendText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#6200ea',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    position: 'absolute',
    bottom: 175,
    right: 0,
    width: 125,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
  },
  optionButton2: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    width: 125,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
  },
  label2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  datePickerButton: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20
  },
  smallInput: {
    width: '48%' 
  },
  pronounRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  importantDateRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  addButton: {
    marginVertical: 10, 
    padding: 10, 
    backgroundColor: '#ddd', 
    alignItems: 'center'
  },
  addButtonText: {
    fontSize: 16 
  },
  removeButton: { 
    marginRight: 10, 
    padding: 5, 
    borderRadius: 5 
  },
  removeButtonText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  calendar: {
    width: 300,
    height: 400,
    borderRadius: 10,
    padding: 10,
  },
  profileIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
