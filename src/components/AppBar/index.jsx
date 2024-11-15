import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../../theme'
import AppBarTab from './AppBarTab'
import { useApolloClient, useQuery } from '@apollo/client'
import { GET_USER } from '../../graphql/queries'
import Text from '../Text'
import useAuthStorage from '../../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
  },
  button: {
    padding: 20,
  },
})

const AppBar = () => {
  const { data, loading } = useQuery(GET_USER)

  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/')
  }

  if (loading) {
    return <Text>loading</Text>
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' url='/' />
        {data.me ? (
          <>
            <AppBarTab text='Create a Review' url='/review/' />
            <AppBarTab text='My Reviews' url='/user/reviews/' />
            <Pressable style={styles.button} onPress={handleSignOut}>
              <Text color='white' fontWeight='bold'>
                Sign Out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab text='Sign In' url='/sign-in/' />
            <AppBarTab text='Sign Up' url='/sign-up/' />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
