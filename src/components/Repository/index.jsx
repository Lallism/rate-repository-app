import { FlatList, Linking, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import RepositoryItem from '../RepositoryItem'
import Text from '../Text'
import Button from '../Button'
import ReviewItem from '../ReviewItem'
import useRepository from '../../hooks/useRepository'

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} />
      <Button color='white' onPress={() => Linking.openURL(repository.url)}>
        Open in GitHub
      </Button>
    </View>
  )
}

const Repository = () => {
  const params = useParams()

  const { repository, loading, fetchMore } = useRepository({
    repositoryId: params.id,
    first: 8,
  })

  if (loading) {
    return <Text>loading...</Text>
  }

  const reviewNodes = repository.reviews.edges.map((edge) => edge.node)

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <FlatList
      data={reviewNodes}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={<ItemSeparator />}
      ListHeaderComponent={<RepositoryInfo repository={repository} />}
      renderItem={({ item }) => (
        <ReviewItem
          name={item.user.username}
          date={item.createdAt}
          rating={item.rating}
          text={item.text}
        />
      )}
    />
  )
}

export default Repository
