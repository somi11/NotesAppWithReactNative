import React, { useState, useEffect } from 'react'
import {
  AsyncStorage,
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
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Main = (props) => {
  let [item, setitem] = useState('')
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const refreshList = props.navigation.addListener('focus', async () => {
    let keys = await AsyncStorage.getAllKeys()
    setData(keys)
  })
  useEffect(() => {
    keysFromAsyncStorage()
    console.log('refreshed')
    refreshList
  }, [props.navigation])
  const keysFromAsyncStorage = async () => {
    let keys = await AsyncStorage.getAllKeys()
    if (keys.length !== data.length) setData(keys)
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
      await AsyncStorage.removeItem(item)
      let keys = await AsyncStorage.getAllKeys()
      setData(keys)
    } catch (exception) {
      console.log(exception)
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
              onPress={() => props.navigation.navigate('CreateNote', { noteTitle: item })}
              onLongPress={() => showDialog(item)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}
              >
                <Image style={{ height: 80, width: 80 }} source={DOC_BUTTON_IMG} />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
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
          onPress={() => props.navigation.navigate('CreateNote', { noteTitle: null })}
        />
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Note delete</Dialog.Title>
        <Dialog.Description>You sure you want to delete this Note?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
      {/* <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true}}
      /> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
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
