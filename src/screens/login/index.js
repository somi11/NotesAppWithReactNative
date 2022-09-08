import React ,{useState} from 'react'
import { View, Button, TextInput, StyleSheet, Image, Text } from 'react-native'
import { auth,loginWithEmailAndPassword } from '../../util/firebase'
import {signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')

  
  const onAddPressed = async () => {
    if (email && password) {
      try {
      
        await signInWithEmailAndPassword(auth, email, password)
        alert('Sign in successful')
        props.navigation.replace('Main')
     
      } catch (e) {
        alert(e.message)
      }
    } else {
      alert('Please enter email and password')
    }
   // await loginWithEmailAndPassword(email, password)
  }
  const onTextAddPressed = () => {
     props.navigation.replace("Signup")
  }

  const onForgetPasswordPressed = async () => {
    if (email) {
      try {

        await sendPasswordResetEmail(auth, email)
        alert('password has been sent to your email')
      } catch (e) {
        alert(e)
      }
    } else {
      alert('Please enter email')
    }
  }
  return (
    <View style={styles.container}>
       <View style={styles.img}>
      <Image style={styles.logo} source={ require('../../../assets/sp1.png')
      } />
      </View>
    
      <View style={{ ...styles.card, height: '8%' }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder={'Email'}
          multiline={true}
          value={email}
          onChangeText={(t) => setEmail(t)}
        />
      </View>
      <View style={{ ...styles.card, height: '8%' }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder={'Enter Password here'}
          secureTextEntry={true}
          value={password}
          onChangeText={(d) => setPassword(d)}
        />
      </View>
      <View style={{ marginTop: 15, marginLeft:40,marginRight:40, marginBottom:15 }}>
        <Button onPress={() => onAddPressed()} title='Login' />
      </View>
       <View style={{  marginLeft:40, marginRight:40,alignItems:'center' }}>
        <Text style={{fontWeight:"bold" , fontSize:18}} onPress={() => onForgetPasswordPressed()}>Forget Password!</Text>
      </View>
       <View style={{ marginTop: 15, marginLeft:40, marginRight:40,alignItems:'center' }}>
        <Text style={{fontWeight:"bold" , fontSize:18}} onPress={() => onTextAddPressed()}>Create Account Click Here!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    shadowColor: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  img: {
    flex: 0.7,
    margin: 30,
    alignItems: 'center',
    

  },
  logo: {
      height:300 , width :300
  }
})
export default Login
