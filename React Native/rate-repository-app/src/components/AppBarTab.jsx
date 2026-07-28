import { StyleSheet, Pressable, Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.whity,
    fontSize: 15,
    marginRight: 10,
    marginLeft: 10,
  }
});

const AppBarTab = ({ title }) => {

  return (
    <Pressable>
      <Text style={styles.text}>{title}</Text>
    </Pressable >
  )
}







export default AppBarTab