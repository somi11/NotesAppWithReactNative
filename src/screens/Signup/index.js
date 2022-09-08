import React ,{useState} from 'react'
import { View, Button, TextInput, StyleSheet, Image,Text } from 'react-native'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth } from '../../util/firebase'
const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')


  const onAddPressed = async () => {
    if (email.includes('@') && password) {
      try {
 
        await createUserWithEmailAndPassword(auth, email, password)
        alert('user registered successfully')
        props.navigation.replace('Login')
     
      } catch (e) {
        alert(e.message)
      }
    } else {
      alert('Please enter email and password')
    }
  }
  const onAddTextPressed = () => {
     props.navigation.replace("Login")
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
        <Button onPress={() => onAddPressed()} title='Signup' />
      </View>
       <View style={{  marginLeft:40, marginRight:40,alignItems:'center' }}>
        <Text style={{fontWeight:"bold" , fontSize:18}} onPress={() => onAddTextPressed()}>Already have Account Click here!</Text>
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
export default Signup
