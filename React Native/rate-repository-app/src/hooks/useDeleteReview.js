
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';


const DELETE_REVIEW = gql`
 mutation deleteReview($id: ID!) {
 deleteReview (id: $id) 
 }
  `

const useDeleteReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);
  return [deleteReview, result]
};

export default useDeleteReview;