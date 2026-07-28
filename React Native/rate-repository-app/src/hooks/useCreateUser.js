
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';


const CREATE_USER = gql`
 mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    username
  }
}
  `

const useCreateUser = () => {

  const [createUser, result] = useMutation(CREATE_USER);


  return [createUser, result]
};

export default useCreateUser;