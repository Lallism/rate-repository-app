import Text from '../Text'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../graphql/queries'
import { FlatList, StyleSheet, View } from 'react-native'
import UserReview from './UserReview'

const styles = StyleSheet.create({
  separator: {
    padding: 8,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const UserReviews = () => {
  const { data, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  })

  if (loading) {
    return <Text>loading...</Text>
  }

  const reviewNodes = data.me.reviews.edges.map((edge) => edge.node)

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={<ItemSeparator />}
      renderItem={({ item }) => <UserReview data={item} refetch={refetch} />}
    />
  )
}

export default UserReviews
