import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/SplashScreen'
import Main from '../screens/Main/index'
import CreateNote from '../screens/CreateNote'
const Stack = createNativeStackNavigator()

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        name="CreateNote"
        component={CreateNote}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
export default Navigation
