import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import MenuComponent from './Menu';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder, keyword, setKeyword }) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) =>
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      }
      keyExtractor={item => item.id}
      ListHeaderComponent={(
        <View>
          <TextInput placeholder='Search' value={keyword} onChangeText={setKeyword}></TextInput>
          <MenuComponent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
        </View>
      )}
    />


  );
};

const RepositoryList = () => {
  const [keyword, setKeyword] = useState('')
  const [value] = useDebounce(keyword, 500);

  const getOrderVariables = (selectedOrder, value) => {


    if (selectedOrder === 'highest') {
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword: value }

    }
    else if (selectedOrder === 'lowest') {
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword: value }

    }
    else {
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword: value }

    }
  }
  const [selectedOrder, setSelectedOrder] = React.useState('')
  const variables = getOrderVariables(selectedOrder, value)
  const { repositories } = useRepositories(variables)




  return <RepositoryListContainer repositories={repositories} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} keyword={keyword} setKeyword={setKeyword} />;
};

export default RepositoryList;
