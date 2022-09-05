import React, { useState, useEffect } from 'react'
import { View, Button, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import { BACKGROUND_COLOR } from '../../../res/drawable'
const CreateNote = (props) => {
  let { noteTitle } = props.route.params
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    if (noteTitle) {
      try {
        let description = await AsyncStorage.getItem(noteTitle)
        setTitle(noteTitle)
        setDescription(description)
        console.log('des is' + description)
      } catch (e) {
        console.log(e)
      }
    }
    console.log('re-rendered')
  }
  const onAddPressed = async () => {
    if (title != '' && description != '') {
      try {
        let value = await AsyncStorage.getItem(title)
        if (value && !noteTitle) {
          alert('Title aLREADY EXIST')
        } else {
          await AsyncStorage.setItem(title, description)
          alert('Note Saved')
          // setTitle('')
          // setDescription('')
          props.navigation.goBack()
        }
      } catch (e) {
        console.log(e)
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
        <Button onPress={() => onAddPressed()} title={noteTitle ? 'Update Title' : 'Add Note'} />
      </View>
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
