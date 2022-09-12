import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const MyDbActivityIndicator = (props) => {
  return (
    <ActivityIndicator
      size="large"
      color="black"
      animating={props.showIndicator}
      style={styles.activityIndicator}
    />
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})
export default MyDbActivityIndicator
