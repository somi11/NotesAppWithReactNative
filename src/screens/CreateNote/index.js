import React, { useState, useEffect, useContext } from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'
import { BACKGROUND_COLOR } from '../../../res/drawable'
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, App } from '../../util/firebase'
import { EmailContext } from '../../contexts/emailContext'
import MyDbActivityIndicator from '../../components/activity-indicatior/MyDbActivityIndicator'
const CreateNote = (props) => {
  let { noteTitle } = props.route.params
  const [title, setTitle] = useState('')
  const [showIndicator, setShowIndicator] = useState(false)
  const [description, setDescription] = useState('')
  const { mainEmail } = useContext(EmailContext)

  useEffect(() => {
    loadDoc()
  }, [])

  const loadDoc = async () => {
    if (noteTitle) {
      try {
        setShowIndicator(true)
        const docRef = doc(db, mainEmail, noteTitle)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setTitle(docSnap.data().title)
          setDescription(docSnap.data().description)
          setShowIndicator(false)
        } else {
          console.log('No such document!')
        }
      } catch (e) {
        alert(e)
      }
    }
  }

  const onAddPressed = async () => {
    if (title != '' && description != '') {
      try {
        setShowIndicator(true)
        const docRef = await setDoc(doc(db, mainEmail, title), {
          title: title,
          description: description,
        })
        setShowIndicator(false)
        // setTitle('')
        // setDescription('')
        props.navigation.goBack()
      } catch (e) {
        console.log(e)
      }
      if (noteTitle) {
        const dref = doc(db, mainEmail, title)
        await updateDoc(dref, {
          description: description,
        })
      }
    } else {
      alert('set title and description')
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ ...styles.card, height: '8%' }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder={'Enter title here'}
          editable={noteTitle ? false : true}
          multiline={true}
          value={title}
          onChangeText={(t) => setTitle(t)}
        />
      </View>
      <View style={{ ...styles.card, height: '70%' }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder={'Enter description here'}
          multiline={true}
          value={description}
          onChangeText={(d) => setDescription(d)}
        />
      </View>
      <View style={{ margin: 40 }}>
        <Button
          onPress={() => onAddPressed()}
          title={noteTitle ? 'Update Note' : 'Add Note'}
          color="#fea440"
        />
      </View>
      <MyDbActivityIndicator showIndicator={showIndicator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    shadowColor: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
  },
})
export default CreateNote
