import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList from "react-native-draggable-flatlist";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Contact Book Page
const ContactBook = () => (
  <View style={styles.page}>
    <Text style={styles.pageText}>My Friends</Text>
  </View>
);

// Profile Page
const Profile = () => (
  <View style={styles.page}>
    <Text style={styles.pageText}>My Friends</Text>
  </View>
);

// Calendar Page
const Calendar = () => (
  <View style={styles.page}>
    <Text style={styles.pageText}>Calendar Here</Text>
  </View>
);

// Reminders Page
const RemindersList = () => (
  <View style={styles.page}>
    <Text style={styles.pageText}>My Reminders</Text>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("Kelly")
  const [widgets, setWidgets] = useState([
    { id: 'reminders', title: '📝 Reminders', content: 'Text Bella (autofill here)'},
    { id: 'contact_book', title: '🔗 Contact Book', content: 'See more contacts' },
    { id: 'calendar', title: '📅 Calendar', content: 'Open Calendar' },
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {name}!</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Draggable Widgets */}
      <View style={styles.widget_container}>
        <DraggableFlatList
          data={widgets}
          onDragEnd={({ data }) => setWidgets(data)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, drag }) => (
            <TouchableOpacity
              style={styles.widget}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 10,
  },
  settingsText: {
    color: 'white',
    fontSize: 24,
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
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    fontSize: 24,
  },
});
