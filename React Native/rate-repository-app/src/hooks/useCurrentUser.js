
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';


const GET_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
             id
              text
              rating
              createdAt
              user{
                id
                username
              }
              repository{
                id
                name
              }
          }
        }
      }
    }
  }
`;

const useCurrentUser = (includeReviews = false) => {

  const result = useQuery(GET_USER, {
    variables: {
      includeReviews
    },
    fetchPolicy: 'cache-and-network',
  });

  return { user: result.data?.me, loading: result.loading, refetch: result.refetch, error: result.error };
};

export default useCurrentUser;