import { Text, FlatList } from "react-native"
import { useParams } from "react-router-native"
import useRepository from "../hooks/useRepository"
import Repositoryitem from "./RepositoryItem"
import ReviewItem from "./ReviewItem"


const SingleRepo = () => {
  const { id } = useParams()


  const { repository, loading } = useRepository(id);
  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }
  if (!repository) {
    return (<Text>
      No repository found
    </Text>)
  }

  const reviews = repository.reviews.edges.map(edge => edge.node)
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (<ReviewItem review={item} />

      )}

      ListHeaderComponent={() => (
        <Repositoryitem item={repository} showGitHubButton={true} />
      )}
    />
  )
}

export default SingleRepo