
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/screens/SplashScreen'
import Navigation from './src/navigation'
export default function App() {
  return (
    <View style={styles.container}>
      <Navigation  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
