import { View, StyleSheet, Pressable, Text, Linking } from 'react-native';
import FirstDiv from './ItemDiv1';
import ThirdDiv from './ItemDiv3'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 10
  },
  img: {
    width: 50,
    height: 50
  },
  button: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 6

  },

  buttonText: {
    color: 'white',
  },
})

const Repositoryitem = ({ item, showGitHubButton = false }) => {
  return (

    <View testID="repositoryItem" style={styles.container} >
      <FirstDiv item={item} />
      <ThirdDiv item={item} />
      {
        showGitHubButton && (
          <Pressable style={styles.button} onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.buttonText}>Open in Github</Text>
          </Pressable>
        )
      }
    </View >

  )


}



export default Repositoryitem