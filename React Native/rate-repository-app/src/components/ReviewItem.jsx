import { View, StyleSheet } from "react-native"
import Text from "./Text"
import format from 'date-fns/format'

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start'


  },
  firstDiv: {
    borderWidth: 1,
    borderColor: '#0366d6',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  secondDiv: {
    marginTop: 5,
    flex: 1,
    flexShrink: 1
  }


})

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), 'dd MMM yyyy')
  return (
    <View style={styles.container}>
      <View style={styles.firstDiv}>
        <Text style={{ color: '#0366d6' }}>{review.rating}</Text>
      </View>
      <View style={styles.secondDiv}>
        <Text style={{ fontWeight: 'bold' }}>{review.user.username}</Text>
        <Text style={{ marginBottom: 5 }}>{date}</Text>
        <Text>{review.text}</Text>

      </View>
    </View>
  )

}

export default ReviewItem