import React from 'react'
import { View, Text ,StyleSheet,Image } from 'react-native'
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps'
import { backgroundColor , } from '../../../res/drawable'


const Splash = (props) => {
  
  setTimeout(() => {
     props.navigation.replace("Main")
   }, 3000) 
  
  return (
    <View style ={styles.container}>
      <Image style={styles.logo} source={ require('../../../assets/Main_Logo.svg')
        
      }/>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor : backgroundColor

  }, logo: {
      height:150 , width :200
  }
})

export default Splash