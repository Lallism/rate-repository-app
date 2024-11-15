import { gql } from '@apollo/client'
import { REPOSITORY_INFO, REVIEW_INFO } from './fragments'

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_INFO}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryInfo
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_USER = gql`
  ${REVIEW_INFO}
  query User($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewInfo
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  ${REPOSITORY_INFO}
  ${REVIEW_INFO}
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      url
      ...RepositoryInfo
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewInfo
            user {
              username
              id
            }
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`
