import { View, Image, StyleSheet } from 'react-native';
import SecondDiv from './ItemDiv2';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  img: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 4
  }
})
const FirstDiv = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: item.ownerAvatarUrl, }} />
      <SecondDiv item={item} />
    </View>
  )

}
export default FirstDiv