import { View, StyleSheet } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import TextInput from '../TextInput'
import Button from '../Button'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../../graphql/mutations'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
})

const ReviewForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating: Number(rating), text },
      },
    })
    navigate(`/repository/${data.createReview.repositoryId}`)
  }

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={Yup.object({
        ownerName: Yup.string().required('Repository owner name is required'),
        repositoryName: Yup.string().required('Repository name is required'),
        rating: Yup.number()
          .typeError('Rating must be a number')
          .integer('Rating must be a number')
          .positive('Rating must be between 0 and 100')
          .max(100, 'Rating must be between 0 and 100')
          .required('Rating is required'),
        text: Yup.string(),
      })}
      onSubmit={onSubmit}
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
            placeholder='Repository owner name'
            touched={touched.ownerName}
            error={errors.ownerName}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
          />
          <TextInput
            placeholder='Repository name'
            touched={touched.repositoryName}
            error={errors.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
          />
          <TextInput
            placeholder='Rating (0 - 100)'
            touched={touched.rating}
            error={errors.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
          />
          <TextInput
            placeholder='Review'
            touched={touched.text}
            error={errors.text}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            multiline
          />
          <Button color='white' onPress={handleSubmit}>
            Create
          </Button>
        </View>
      )}
    </Formik>
  )
}

export default ReviewForm
