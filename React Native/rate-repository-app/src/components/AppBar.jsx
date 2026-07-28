import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from "react-router-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: "100",
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
  }
});

const USER_LOG_IN_OR_OUT = gql`
   {
  me {
    id
    username
  }
}
 `

const AppBar = () => {
  const { loading, error, data } = useQuery(USER_LOG_IN_OR_OUT);
  console.log(data?.me)
  const signOut = useSignOut()
  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/">
        <AppBarTab title="Repositories" />
      </Link>
      {
        data?.me === null ? (<Link to="/signin">
          <AppBarTab title="Sign in" />
        </Link>) : (

          <Pressable onPress={signOut}>
            <AppBarTab title="Sign out" />
          </Pressable>
        )

      }
      {
        data?.me === null ? (<Link to="/signup">
          <AppBarTab title="Sign Up" />
        </Link>) : null
      }
      {
        data?.me !== null ? (<Link to="/reviewform">
          <AppBarTab title="Create review" />
        </Link>) : null
      }
      {
        data?.me !== null ? (<Link to="/myreviews">
          <AppBarTab title="My Reviews" />
        </Link>) : null
      }

    </ScrollView>
  </View >;
};

export default AppBar;