import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/SplashScreen'
import Main from '../screens/Main/index'
import CreateNote from '../screens/CreateNote'
import Login from '../screens/login/'
import Signup from '../screens/Signup'
const Stack = createNativeStackNavigator()

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'My Notes',
          headerStyle: {
            backgroundColor: '#fea440',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CreateNote"
        component={CreateNote}
        options={{
          title: 'Add Notes',
          headerStyle: {
            backgroundColor: '#fea440',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
export default Navigation
