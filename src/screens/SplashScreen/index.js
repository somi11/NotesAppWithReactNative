import React from 'react'
import { View, Text ,StyleSheet,Image } from 'react-native'
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps'
import { backgroundColor , } from '../../../res/drawable'


const Splash = (props) => {
  
  setTimeout(() => {
     props.navigation.replace("Login")
   }, 3000) 
  
  return (
    <View style ={styles.container}>
      <Image style={styles.logo} source={ require('../../../assets/sp1.png')
        
      }/>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor : "#fff"

  }, logo: {
      height:500 , width :500
  }
})

export default Splash