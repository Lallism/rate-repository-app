import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigate } from 'react-router-native'
import RepositoryItem from '../RepositoryItem'
import Text from '../Text'
import { useState } from 'react'
import useRepositories from '../../hooks/useRepositories'
import TextInput from '../TextInput'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  search: {
    margin: 16,
    marginBottom: 8,
  },
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const ListItem = ({ item }) => {
  const navigate = useNavigate()

  return (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem repository={item} />
    </Pressable>
  )
}

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  )
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest')
  const [search, setSearch] = useState('')
  const [debounceSearch] = useDebounce(search, 500)

  let orderVariables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }

  switch (selectedOrder) {
    case 'latest':
      orderVariables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
      break
    case 'highestRating':
      orderVariables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
      break
    case 'lowestRating':
      orderVariables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
      break
    default:
      orderVariables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
      break
  }

  const { repositories, loading, fetchMore } = useRepositories({
    first: 8,
    ...orderVariables,
    debounceSearch,
  })

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <>
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder={'Search'}
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highestRating' />
        <Picker.Item label='Lowest rated repositories' value='lowestRating' />
      </Picker>
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <RepositoryListContainer
          repositories={repositories}
          onEndReach={onEndReach}
        />
      )}
    </>
  )
}

export default RepositoryList
