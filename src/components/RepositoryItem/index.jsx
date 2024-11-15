import { View, Image, StyleSheet } from 'react-native'
import Text from '../Text'
import Stat from './Stat'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  info: {
    flexDirection: 'column',
    flexShrink: 1,
    gap: 4,
    alignItems: 'baseline',
  },
  avatar: {
    marginTop: 10,
    height: 64,
    width: 64,
    borderRadius: 6,
  },
  language: {
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  stats: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

const RepositoryItem = ({ repository }) => {
  return (
    <View testID='repositoryItem'>
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.info}>
          <Text fontWeight='bold'>{repository.fullName}</Text>
          <Text>{repository.description}</Text>
          <Text backgroundColor='primary' color='white' style={styles.language}>
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Stat number={repository.forksCount}>Forks</Stat>
        <Stat number={repository.stargazersCount}>Stars</Stat>
        <Stat number={repository.ratingAverage}>Rating</Stat>
        <Stat number={repository.reviewCount}>Reviews</Stat>
      </View>
    </View>
  )
}

export default RepositoryItem
