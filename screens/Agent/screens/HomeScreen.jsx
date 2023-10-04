import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './DashboardScreen';
import ErrandsScreen from './ErrandsScreen';
import { Image } from 'react-native';
import { iconsPack } from '../../components/icons';
import Profilescreen from './ProfileScreen';


const HomeScreen = () => {
   const Tab = createBottomTabNavigator();
   const {homeHover,chatIcon ,chatHoverIcon,errandsIcon,earningsIcon,profileIcon} = iconsPack()
   return (
         <Tab.Navigator 
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
               if (route.name === 'Home') {
                  iconName = focused? homeHover: homeHover;
               } 
               else if (route.name === 'Errands') {
                  iconName = focused ? errandsIcon : errandsIcon;
               }
               else if (route.name === 'Chats') {
                  iconName = focused ? chatHoverIcon : chatIcon;
               }
               else if (route.name === 'Earnings') {
                  iconName = focused ? earningsIcon : earningsIcon;
               }
               else if (route.name === 'Profile') {
                  iconName = focused ? profileIcon : profileIcon;
               }
              // You can return any component that you like here!
              return <Image source={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0066F5',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle : { height: 100},
            tabBarLabelStyle : {fontSize : 12 , fontWeight: '700'},
            headerShown: false
          })}>
            <Tab.Screen name="Home"  component={DashboardScreen} />
            <Tab.Screen name="Errands"  component={ErrandsScreen} />
            <Tab.Screen name="Chats"  component={DashboardScreen} />
            <Tab.Screen name="Earnings"  component={DashboardScreen} />
            <Tab.Screen name="Profile"  component={Profilescreen} options={{ headerShown: false , tabBarStyle : {display : 'none'}}}/>
         </Tab.Navigator>
    );
}

export default HomeScreen