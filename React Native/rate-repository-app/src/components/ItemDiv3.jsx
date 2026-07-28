import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 30,
    gap: 60
  },
  item: {
    alignItems: 'center'
  }
})
const ThirdDiv = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>{item.stargazersCount >= 1000 ? `${(item.stargazersCount / 1000).toFixed(1)}k` : item.stargazersCount}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.item}>
        <Text>{item.forksCount >= 1000 ? `${(item.forksCount / 1000).toFixed(1)}k` : item.forksCount}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.item}>
        <Text>{item.reviewCount}</Text>
        <Text color="textSecondary">Review</Text>
      </View>
      <View style={styles.item}>
        <Text>{item.ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  )

}
export default ThirdDiv