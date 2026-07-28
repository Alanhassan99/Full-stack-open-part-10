
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';




const useRepositories = (variables) => {
  const { orderBy, orderDirection, searchKeyword } = variables
  const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword ) {
     edges {
  node {
 id
        fullName
        description
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
        ownerAvatarUrl
  }
 }
    
  }
  }
  `
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword
    }
  });

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;