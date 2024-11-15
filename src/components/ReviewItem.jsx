import { StyleSheet, View } from 'react-native'
import { format } from 'date-fns'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    gap: 12,
  },
  rating: {
    marginTop: 4,
    width: 60,
    height: 60,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

const ReviewItem = ({ name, date, rating, text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rating} color='primary' fontWeight='bold'>
        {rating}
      </Text>
      <View style={{ flex: 1 }}>
        <Text fontWeight='bold'>{name}</Text>
        <Text>{format(date, 'dd/MM/yyyy')}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
