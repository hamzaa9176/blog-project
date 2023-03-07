import { GraphQLClient, gql } from 'graphql-request'


const graphcms = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clerb27ka1dzz01ukhe6p5p08/master');


export async function getCategories() {
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


export async function GetCategoryPost(slug){
  const QUERY = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(where: { categories_some: { slug: $slug } }, orderBy: createdAt_DESC) {
      edges {
        cursor
        node {
          author {
            id
            name
            bio
            avatar {
              url
            }
          }
          createdAt
          slug
          title
          coverPhoto {
            url
          }
          datePublished
          content {
            html
          }

          categories {
            name
            slug
          }
        }
      }
    }
  }
`;
const result = await graphcms.request(QUERY, {slug});
return result;
}

export async function getAuthors() {
  const authorsList = gql`
  query GetAuthorsList {
    authors {
      name
      bio
      avatar {
        url
      }
    }
  }
  `;
  const result = await graphcms.request(authorsList);
  return result.authors;
}


export async function getAuthorPost(name) {
  const QUERY = gql `
  query ($name: String!){
    authors(where: {name: $name}) {
      name
      bio
      avatar {
        url
      }
    }
    postsConnection(where: {author: {name: $name}}, orderBy: createdAt_DESC) {
      edges {
        node {
          id
          content {
            html
          }
          coverPhoto {
            url
          }
          author{
            name
          }
          createdAt
          slug
          title
        }
      }
    }
  }
  
`;

  const result = await graphcms.request(QUERY, {name});
  return result;
}