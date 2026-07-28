import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo'
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdbdb'
  },
  title: {
    marginBottom: 16,
  }
});


const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/reviewform" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;