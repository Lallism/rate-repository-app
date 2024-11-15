import { TextInput as TextInputNative, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  textInput: {
    padding: 12,
    fontSize: theme.fontSizes.body,
    borderColor: theme.colors.light,
    borderWidth: 2,
    borderRadius: 4,
  },
  error: {
    borderColor: theme.colors.error,
  },
})

const TextInput = ({ touched, error, placeholder, style, ...props }) => {
  return (
    <>
      <TextInputNative
        placeholder={placeholder}
        style={[styles.textInput, touched && error && styles.error, style]}
        {...props}
      />
      {touched && error && <Text color='error'>{error}</Text>}
    </>
  )
}

export default TextInput
