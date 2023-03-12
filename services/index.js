import { request, gql } from 'graphql-request';

const fetcher = (enpoint, query, variable) => request(enpoint, query, variable);
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


export async function getCategories() {
  const CATEGORYLIST = gql`
  query GetGategories {
    categories {
      name
      slug
    }
  }
`;
  const result = await request(graphqlAPI,CATEGORYLIST);
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
const result = await request(graphqlAPI,QUERY, {slug});
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
  const result = await request(graphqlAPI, authorsList);
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

  const result = await request(graphqlAPI, QUERY, {name});
  return result;
}


export async function getPosts(){
  const QUERY = gql`
  query MyQuery() {
    postsConnection(first: 4, skip: 0, orderBy: createdAt_DESC) {
      edges {
        node {
          author {
            name
            avatar {
              url
            }
          }
          categories {
            name
            slug
          }
          content {
            html
          }
          coverPhoto {
            url
          }
          id
          title
          slug
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        pageSize
      }
    }
  }
`;

const result = await fetcher(graphqlAPI, QUERY);
return result;

}

//used in posts/[slug].js
export async function getAllSlugs(){
  const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;
const result = await request(graphqlAPI, SLUGLIST);
return result;
}


export async function getPostDetail(slug){
  const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      categories {
        id,
        name,
        slug
      },
      id
      title
      slug
      datePublished
      author {
        id
        name
        bio
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const data = await request(graphqlAPI, QUERY, { slug });

return data;
}