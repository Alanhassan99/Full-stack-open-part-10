import Text from "./Text"
import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  press: {
    backgroundColor: 'lightblue',
    padding: 20,
    justifyContent: 'space-between'

  }
})

const MenuComponent = ({ selectedOrder, setSelectedOrder

}) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    (
      visible === false ?
        (<Pressable style={styles.press} onPress={() => showDialog()}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: 'black' }}>Latest repositories</Text>
            <Text style={{ fontSize: 20 }}>▾</Text>
          </View>
        </Pressable>)
        :
        (< Picker selectedValue={selectedOrder} onValueChange={setSelectedOrder} >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker >)
    )

  );
};

export default MenuComponent;