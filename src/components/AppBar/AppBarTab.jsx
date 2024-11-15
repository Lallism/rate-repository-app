import { StyleSheet } from 'react-native'
import Text from '../Text'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
})

const AppBarTab = ({ text, url }) => {
  return (
    <Link style={styles.button} to={url}>
      <Text color='white' fontWeight='bold'>
        {text}
      </Text>
    </Link>
  )
}

export default AppBarTab
