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
import { createAuthUserWithEmailAndPassword, db } from '../../util/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { EmailContext } from '../../contexts/emailContext'
import MyDbActivityIndicator from '../../components/activity-indicatior/MyDbActivityIndicator'
const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setMainEmail } = useContext(EmailContext)
  const [showIndicator, setShowIndicator] = useState(false)

  const onAddPressed = async () => {
    if (email.includes('@') && password) {
      try {
        setShowIndicator(true)
        //await addDoc(collection(db, email), {})
        setMainEmail(email)
        await createAuthUserWithEmailAndPassword(email, password)
        setShowIndicator(false)
        alert('user registered successfully')
        props.navigation.replace('Login')
      } catch (e) {
        alert(e.message)
      }
    } else {
      alert('Please enter valid email and password')
    }
  }
  const onAddTextPressed = () => {
    props.navigation.replace('Login')
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
        <Button onPress={() => onAddPressed()} title="Signup" color="#fea440" />
      </View>
      <View style={{ marginLeft: 40, marginRight: 40, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onAddTextPressed()}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Already have Account Click here!
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
export default Signup
