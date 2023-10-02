import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './DashboardScreen';
import { Ionicons } from '@expo/vector-icons';
import ErrandsScreen from './ErrandsScreen';

const HomeScreen = () => {
   const Tab = createBottomTabNavigator();
   return (
         <Tab.Navigator 
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
               if (route.name === 'Dashboard') {
                  iconName = focused? 'mail-open-sharp': 'mail-open-sharp';
               } 
               else if (route.name === 'Errands') {
                  iconName = focused ? 'home' : 'home';
               }
               else if (route.name === 'Chats') {
                  iconName = focused ? 'home' : 'home';
               }
               else if (route.name === 'Earnings') {
                  iconName = focused ? 'home' : 'home';
               }
               else if (route.name === 'Profile') {
                  iconName = focused ? 'home' : 'home';
               }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0066F5',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle : {fontSize : 12 , fontWeight: '600'},
            headerShown: false
          })}>
            <Tab.Screen name="Dashboard"  component={DashboardScreen} />
            <Tab.Screen name="Errands"  component={ErrandsScreen} />
            <Tab.Screen name="Chats"  component={DashboardScreen} />
            <Tab.Screen name="Earnings"  component={DashboardScreen} />
            <Tab.Screen name="Profile"  component={DashboardScreen} />
         </Tab.Navigator>
    );
}

export default HomeScreen