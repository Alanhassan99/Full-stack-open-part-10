import Text from "./Text"
import useCurrentUser from "../hooks/useCurrentUser"
import { FlatList, Pressable, View } from "react-native"
import ReviewItem from "./ReviewItem"
import { StyleSheet } from "react-native"
import { useNavigate } from "react-router-native"
import useDeleteReview from "../hooks/useDeleteReview"
import { Alert } from "react-native"
const styles = StyleSheet.create({
  button1: {
    margin: 10,
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#0366d6',
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button2: {
    margin: 10,
    padding: 15,
    borderRadius: 4,
    backgroundColor: 'red',
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'

  }
})
const MyReviews = () => {
  const { user, loading, refetch } = useCurrentUser(true)
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview({
              variables: {
                id: id,
              },
            })
            await refetch()

          }
        }
      ]
    )

  }
  if (loading)
    return (
      <Text>loading...</Text>
    )
  const reviews = user?.reviews?.edges?.map(edge => edge.node)
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (<View>
        <ReviewItem review={item} />
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center' }}>
          <Pressable onPress={() => navigate(`/repository/${item.repository.id}`)} style={styles.button1}><Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>View Repository</Text></Pressable>
          <Pressable onPress={() => confirmDelete(item.id)} style={styles.button2}><Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Delete</Text></Pressable>
        </View>
      </View>)} />
  )
}

export default MyReviews