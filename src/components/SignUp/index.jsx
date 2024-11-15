import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextInput from '../TextInput'
import Button from '../Button'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../graphql/mutations'
import useSignIn from '../../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
})

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    try {
      await mutate({ variables: { user: { username, password } } })
      await signIn({ username, password })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Username is required')
          .min(5, 'Username must be at least 5 characters')
          .max(30, 'Username must be at most 30 characters'),
        password: Yup.string()
          .required('Password is required')
          .min(5, 'Password must be at least 5 characters')
          .max(30, 'Password must be at most 30 characters'),
        confirmPassword: Yup.string()
          .required('Passwords must match')
          .oneOf([Yup.ref('password')], 'Passwords must match'),
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
          <TextInput
            placeholder='Confirm password'
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
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

export default SignUp
