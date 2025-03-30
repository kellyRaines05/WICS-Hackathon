import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Animated, Image, Alert, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList from "react-native-draggable-flatlist";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Contact Book Page
const ContactBook = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.welcomeText}>My Friends</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => navigation.navigate('Settings')}
    >
      <Text style={styles.settingsText}>⚙️</Text>
    </TouchableOpacity>
  </View>
);

// Profile Page
const Profile = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.pageText}>My Friends</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => navigation.navigate('Settings')}
    >
      <Text style={styles.settingsText}>⚙️</Text>
    </TouchableOpacity>
  </View>
);

// Add Friend Page
const AddFriend = ({ navigation }) => {
  const [friendName, setName] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // select date
  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setBirthday(selectedDate);
      setShowDatePicker(false);
    }
  };

  // submit friend
  const handleSubmit = () => {
    if (!friendName.trim()) {
      Alert.alert("Error", "Please enter a name.");
      return;
    }

    // TODO: ADD BELLA'S FUNCTION
    
    Alert.alert("Success", `Added ${friendName}`);
    navigation.goBack();
  };
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Add Friend</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Name Input */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter friend's name"
          value={friendName}
          onChangeText={setName}
        />

        {/* Birthday Picker */}
        <Text style={styles.label}>Birthday</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerText}>
            {birthday ? birthday.toDateString() : "Select Birthday 🎂"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthday || new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Friend</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

// Add Reminder Page
const AddReminder = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.welcomeText}>Add Reminder</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => navigation.navigate('Settings')}
    >
      <Text style={styles.settingsText}>⚙️</Text>
    </TouchableOpacity>
  </View>
);


// Calendar Page
const Calendar = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.welcomeText}>Calendar Here</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => navigation.navigate('Settings')}
    >
      <Text style={styles.settingsText}>⚙️</Text>
    </TouchableOpacity>
  </View>
);

// Reminders Page
const RemindersList = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.welcomeText}>My Reminders</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => navigation.navigate('Settings')}
    >
      <Text style={styles.settingsText}>⚙️</Text>
    </TouchableOpacity>
  </View>
);

// Settings Page
const Settings = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.welcomeText}>Settings</Text>
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => navigation.navigate('Settings')}
    >
      <Text style={styles.settingsText}>⚙️</Text>
    </TouchableOpacity>
  </View>
);

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
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
