import * as Types from '../../../graphql/types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetComparisonQueryVariables = Types.Exact<{
  getComparisonId: Types.Scalars['String'];
}>;


export type GetComparisonQuery = { __typename?: 'Query', getComparison: { __typename?: 'Comparison', description: string, id?: string | null | undefined, title: string, updatedAt: string, createdAt: string, category: { __typename?: 'ComparisonCategory', createdAt: string, description: string, id?: string | null | undefined, title: string }, comparisonEntities: Array<{ __typename?: 'ComparisonEntity', createdAt: string, description: string, id?: string | null | undefined, link: string, type: Types.ComparisonEntityType, title: string, updatedAt: string }> } };


export const GetComparisonDocument = gql`
    query GetComparison($getComparisonId: String!) {
  getComparison(id: $getComparisonId) {
    category {
      createdAt
      description
      id
      title
    }
    comparisonEntities {
      createdAt
      description
      id
      link
      type
      title
      updatedAt
    }
    description
    id
    title
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useGetComparisonQuery__
 *
 * To run a query within a React component, call `useGetComparisonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComparisonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComparisonQuery({
 *   variables: {
 *      getComparisonId: // value for 'getComparisonId'
 *   },
 * });
 */
export function useGetComparisonQuery(baseOptions: Apollo.QueryHookOptions<GetComparisonQuery, GetComparisonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComparisonQuery, GetComparisonQueryVariables>(GetComparisonDocument, options);
      }
export function useGetComparisonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComparisonQuery, GetComparisonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComparisonQuery, GetComparisonQueryVariables>(GetComparisonDocument, options);
        }
export type GetComparisonQueryHookResult = ReturnType<typeof useGetComparisonQuery>;
export type GetComparisonLazyQueryHookResult = ReturnType<typeof useGetComparisonLazyQuery>;
export type GetComparisonQueryResult = Apollo.QueryResult<GetComparisonQuery, GetComparisonQueryVariables>;
export const namedOperations = {
  Query: {
    GetComparison: 'GetComparison'
  }
}