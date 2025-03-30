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


// Contact Book Page
const ContactBook = ({ navigation }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
};

// Profile Page
const Profile = ({ navigation }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageText}>This Friends</Text>
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

// Add Friend Page
const AddFriend = ({ navigation }) => {
  const [friendName, setName] = useState('');
  const [pronouns, setPronouns] = useState([['', '']]);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [birthday, setBirthday] = useState(null);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);

  const [importantDates, setImportantDates] = useState([{name: "", date: null}])
  const [showDatePickerIndex, setShowDatePickerIndex] = useState(null);

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

  // Add new important date row
  const addImportantDate = () => {
    setImportantDates([...importantDates, { name: '', date: null }]);
  };

  // Remove an important date row
  const removeImportantDate = (index) => {
    setImportantDates(importantDates.filter((_, i) => i !== index));
  };

  // Update important date name
  const updateImportantDateName = (index, value) => {
    const updatedDates = [...importantDates];
    updatedDates[index].name = value;
    setImportantDates(updatedDates);
  };

  // Submit function
  const handleSubmit = () => {
    if (!friendName.trim()) {
      Alert.alert('Error', 'Please enter a name.');
      return;
    }

    // TODO: ADD BELLA'S FUNCTION TO ADD FRIEND TO OBJECT

    Alert.alert('Success', `Added ${friendName}`);
    navigation.goBack();
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

              {/* Birthday Picker */}
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowBirthdayPicker(true)}>
                <Text style={styles.datePickerText}>{birthday ? birthday.toDateString() : 'Select Birthday 🎂'}</Text>
              </TouchableOpacity>
              {showBirthdayPicker && <DateTimePicker value={birthday || new Date()} mode="date" display="default" onChange={(e, d) => onChangeDate(e, d, null)} />}

              {/* Important Dates */}
              <Text style={styles.label}>Important Dates</Text>
              {importantDates.map((item, index) => (
                <View key={index} style={styles.importantDateRow}>
                  <TextInput
                    style={[styles.input, {width: "45%"}]}
                    placeholder="Event Name (e.g. Anniversary)"
                    value={item.name}
                    onChangeText={(value) => updateImportantDateName(index, value)}
                  />
                  <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePickerIndex(index)}>
                    <Text style={styles.datePickerText}>{item.date ? item.date.toDateString() : 'Select Date 📅'}</Text>
                  </TouchableOpacity>
                  {showDatePickerIndex === index && <DateTimePicker value={item.date || new Date()} mode="date" display="default" onChange={(e, d) => onChangeDate(e, d, index)} />}
                  <TouchableOpacity onPress={() => removeImportantDate(index)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>❌</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.addButton} onPress={addImportantDate}>
                <Text style={styles.addButtonText}>➕ Add Important Date</Text>
              </TouchableOpacity>

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
const Calendar = ({ navigation }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Calendar Here</Text>
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

// Reminders Page
const RemindersList = ({ navigation }) => {
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
    { id: 'calendar', title: '📅 Calendar', content: 'Open Calendar' },
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
          onDragEnd={({ data }) => setWidgets(data)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, drag }) => (
            <TouchableOpacity
              style={[styles.widget, { backgroundColor: widgetBg }]}
              onLongPress={drag}
              onPress={() => {
                if (item.id === 'contact_book') navigation.navigate('ContactBook');
                if (item.id === 'calendar') navigation.navigate('Calendar');
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
        <Stack.Screen name="Calendar" component={Calendar} />
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
    fontSize: 24,
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
  }
});
