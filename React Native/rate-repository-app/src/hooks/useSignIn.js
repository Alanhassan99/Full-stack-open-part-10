import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';


const AUTHENTICATE = gql`
 mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
  `
const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password }
      }
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return { data }
  };

  return [signIn, result];
};

export default useSignIn
