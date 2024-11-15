import { Alert, StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../../graphql/mutations'
import Button from '../Button'
import ReviewItem from '../ReviewItem'

const styles = StyleSheet.create({
  buttons: {
    paddingTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '44%',
  },
})

const ReviewActions = ({ repositoryId, reviewId, refetch }) => {
  const [mutate] = useMutation(DELETE_REVIEW)
  const navigate = useNavigate()

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => {
            mutate({ variables: { deleteReviewId: reviewId } })
            refetch()
          },
        },
      ]
    )
  }

  return (
    <View style={styles.buttons}>
      <Button
        color='white'
        style={styles.button}
        onPress={() => navigate(`/repository/${repositoryId}`)}
      >
        View repository
      </Button>
      <Button
        color='white'
        backgroundColor='error'
        style={styles.button}
        onPress={handleDelete}
      >
        Delete review
      </Button>
    </View>
  )
}

const UserReview = ({ data, refetch }) => {
  return (
    <>
      <ReviewItem
        name={data.repository.fullName}
        date={data.createdAt}
        rating={data.rating}
        text={data.text}
      />
      {data.repository && (
        <ReviewActions
          repositoryId={data.repository.id}
          reviewId={data.id}
          refetch={refetch}
        />
      )}
    </>
  )
}

export default UserReview
