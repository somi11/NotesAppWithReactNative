import React, { useState, useContext } from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  loginUserWithEmailAndPassword,
  userPasswordReset,
} from '../../util/firebase'
import { EmailContext } from '../../contexts/emailContext'
import MyDbActivityIndicator from '../../components/activity-indicatior/MyDbActivityIndicator'
const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showIndicator, setShowIndicator] = useState(false)
  const { setMainEmail } = useContext(EmailContext)

  const onAddPressed = async () => {
    if (email && password) {
      setShowIndicator(true)
      try {
        const res = await loginUserWithEmailAndPassword(email, password)
        setMainEmail(email)
        if (res) {
          setShowIndicator(false)
          alert('Sign in successful')
          props.navigation.replace('Main')
        }
      } catch (e) {
        alert(e.message)
      }
    } else {
      alert('Email and Password cannot be empty')
    }
  }
  const onTextAddPressed = () => {
    props.navigation.replace('Signup')
  }

  const onForgetPasswordPressed = async () => {
    if (email) {
      try {
        setShowIndicator(true)
        await userPasswordReset(email)
        setShowIndicator(false)
        alert('password has been sent to your email')
      } catch (e) {
        alert(e)
      }
    } else {
      alert('Please enter Email to reset Password')
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image
          style={styles.logo}
          source={require('../../../assets/sp1.png')}
        />
      </View>

      <View style={{ ...styles.card, height: 50 }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder={'Email'}
          multiline={true}
          value={email}
          required={true}
          onChangeText={(t) => setEmail(t)}
        />
      </View>
      <View style={{ ...styles.card, height: 50 }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder={'Enter Password here'}
          secureTextEntry={true}
          value={password}
          onChangeText={(d) => setPassword(d)}
        />
      </View>
      <View
        style={{
          marginTop: 15,
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 15,
        }}
      >
        <Button onPress={() => onAddPressed()} title="Login" color="#fea440" />
      </View>
      <View style={{ marginLeft: 40, marginRight: 40, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onForgetPasswordPressed()}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Forget Password!
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 15,
          marginLeft: 40,
          marginRight: 40,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => onTextAddPressed()}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Create Account Click Here!
          </Text>
        </TouchableOpacity>
      </View>
      <MyDbActivityIndicator showIndicator={showIndicator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: -90,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 15,
    marginLeft: 20,
    marginRight: 20,
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
    marginTop: 40,
    height: 250,
    width: 250,
  },
})
export default Login
