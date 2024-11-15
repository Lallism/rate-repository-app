import { View } from 'react-native'
import Text from '../Text'

const Stat = ({ number, style, ...props }) => {
  const shortNumber = (number) => {
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}k`
    }
    return number.toString()
  }

  return (
    <View style={{ alignItems: 'center', ...style }}>
      <Text fontWeight='bold'>{shortNumber(number)}</Text>
      <Text {...props} />
    </View>
  )
}

export default Stat
