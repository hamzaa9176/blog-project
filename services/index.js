import { GraphQLClient, gql } from 'graphql-request'


const graphcms = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clerb27ka1dzz01ukhe6p5p08/master');


export async function getCategories(){
  const CATEGORYLIST = gql`
  query GetGategories {
    categories {
      name
      slug
    }
  }
`;
  const result = await graphcms.request(CATEGORYLIST);
  return result.categories;
}

