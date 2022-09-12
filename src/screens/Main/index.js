import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { ADD_BUTTON_IMG, DOC_BUTTON_IMG } from '../../../res/drawable.js'
import ImageButton from '../../components/imageButton'
import Dialog from 'react-native-dialog'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../../util/firebase'
import { EmailContext } from '../../contexts/emailContext'
import MyDbActivityIndicator from '../../components/activity-indicatior/MyDbActivityIndicator'
const Main = (props) => {
  let [item, setitem] = useState('')
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [showIndicator, setShowIndicator] = useState(true)
  const { mainEmail } = useContext(EmailContext)
  const refreshList = props.navigation.addListener('focus', async () => {
    keysFromFirebase()
  })
  useEffect(() => {
    keysFromFirebase()
    console.log('refreshed')
    refreshList
  }, [props.navigation])
  const keysFromFirebase = async () => {
    setShowIndicator(true)
    try {
      let dockeys = []
      const querySnapshot = await getDocs(collection(db, mainEmail))
      if (querySnapshot) setShowIndicator(false)
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, ' => ', doc.data())
        dockeys.push(doc.id)
      })
      setData(dockeys)
    } catch (e) {
      alert(e.message)
    }
  }
  const showDialog = (item) => {
    setVisible(true)
    setitem(item)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, mainEmail, item))
      alert('entry deleted')
      keysFromFirebase()
    } catch (e) {
      alert(e)
    }
    setVisible(false)
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('CreateNote', { noteTitle: item })
              }
              onLongPress={() => showDialog(item)}
            >
              <View
                style={{
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}
              >
                <Image
                  style={{ height: 80, width: 80 }}
                  source={DOC_BUTTON_IMG}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item}
      />

      <View style={styles.container3}>
        <ImageButton
          source={ADD_BUTTON_IMG}
          onPress={() =>
            props.navigation.navigate('CreateNote', { noteTitle: null })
          }
          style={{ height: 60, width: 60 }}
        />
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Note delete</Dialog.Title>
        <Dialog.Description>
          You sure you want to delete this Note?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
      <MyDbActivityIndicator showIndicator={showIndicator} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 20,
    marginLeft: 15,
  },
  container2: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 40,
    marginLeft: 240,
  },
  container3: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  button: {
    backgroundColor: 'red',
    height: 150,
  },
})
export default Main
