import { Formik } from 'formik'
import { StyleSheet, View } from 'react-native'
import * as Yup from 'yup'
import useSignIn from '../../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import Button from '../Button'
import TextInput from '../TextInput'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
})

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <TextInput
            placeholder='Username'
            touched={touched.username}
            error={errors.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          <TextInput
            placeholder='Password'
            touched={touched.password}
            error={errors.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
          />
          <Button color='white' onPress={handleSubmit}>
            Submit
          </Button>
        </View>
      )}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signIn({ username, password })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
