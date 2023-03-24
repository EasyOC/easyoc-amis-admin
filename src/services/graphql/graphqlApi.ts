
import { ContentTypeEnum } from "@/utils/http"
import defaultRequest from "../requests/defaultRequest"

export const GraphqlServiceAPI = '/api/graphql'
export type GraphQLQueryParams = {
  operationName?: string
  query: string
  variables?: LuceneCommonQueryParams
}
export const excuteGraphqlQuery = async (query: GraphQLQueryParams) => {
  const result = await defaultRequest.request({
    url: GraphqlServiceAPI,
    method: 'POST',
    data: query
  })
  console.log('excuteGraphqlQuery result: ', result);
  // return result.data
  return result.data;

}

export const excuteGraphqlGetQuery = async (params: { query: string }) => {
  const result = await defaultRequest.request({
    url: GraphqlServiceAPI,
    method: 'GET',
    params: params,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  })

  console.log('excuteGraphqlQuery result: ', result);
  return result.data
}

export type SqlCommonQueryParams = {
  fist: string
  skip: string
}

export type LuceneCommonQueryParams = {
  filters?: { method: string; key?: string; value: string }[]
  from?: number
  skip?: number
  [key: string]: any
}

//#region GraphQLSchema
const querySchema = ` 
query IntrospectionQuery {
  __schema { 
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
  
  
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}
`
//#endregion

export const loadGraphQLSchema = async () => {
  return excuteGraphqlQuery({ query: querySchema })
}
