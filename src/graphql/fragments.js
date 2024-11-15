import { gql } from '@apollo/client'

export const REPOSITORY_INFO = gql`
  fragment RepositoryInfo on Repository {
    fullName
    description
    id
    language
    ownerAvatarUrl
    forksCount
    reviewCount
    ratingAverage
    stargazersCount
  }
`

export const REVIEW_INFO = gql`
  fragment ReviewInfo on Review {
    id
    createdAt
    rating
    text
  }
`
