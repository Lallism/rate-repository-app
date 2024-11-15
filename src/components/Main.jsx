import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import Repository from './Repository'
import ReviewForm from './ReviewForm'
import SignUp from './SignUp'
import UserReviews from './UserReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/sign-in/' element={<SignIn />} />
        <Route path='/repository/:id' element={<Repository />} />
        <Route path='/review/' element={<ReviewForm />} />
        <Route path='/sign-up/' element={<SignUp />} />
        <Route path='/user/reviews/' element={<UserReviews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main
