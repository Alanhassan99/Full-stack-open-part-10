
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';


const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
   repository(id: $id) {
        id
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
        ownerAvatarUrl
        url
        reviews {
          edges {
            node{
              id
              text
              rating
              createdAt
              user{
                id
                username
              }
            }
          }
        }
    
 }
  }
  `

const useRepository = (id) => {

  const result = useQuery(GET_REPOSITORY, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });
  return { repository: result.data?.repository, loading: result.loading, refetch: result.refetch, error: result.error };
};

export default useRepository;