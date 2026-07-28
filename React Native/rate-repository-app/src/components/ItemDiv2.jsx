import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start'
  },
  img: {
    width: 50,
    height: 50
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 4,
    padding: 2,
    alignSelf: 'flex-start'
  },
  margin: {
    marginBottom: 4
  },
})
const SecondDiv = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.margin} fontWeight="bold">{item.fullName}</Text>
      <Text style={styles.margin} color="textSecondary">{item.description}</Text>
      <Text style={[styles.language, styles.margin]}>{item.language}</Text>
    </View >
  )

}
export default SecondDiv