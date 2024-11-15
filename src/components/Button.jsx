import { Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderRadius: 4,
  },
  backgroundColorError: {
    backgroundColor: theme.colors.error,
  },
})

const Button = ({ onPress, style, backgroundColor, ...props }) => {
  return (
    <Pressable
      style={[
        styles.button,
        backgroundColor === 'error' && styles.backgroundColorError,
      ]}
      onPress={onPress}
      {...style}
    >
      <Text {...props} />
    </Pressable>
  )
}

export default Button
