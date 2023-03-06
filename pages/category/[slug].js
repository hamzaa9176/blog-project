import React from "react";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../../components/BlogCard";
import Head from "next/head";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clerb27ka1dzz01ukhe6p5p08/master"
);
const QUERY = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(where: { categories_some: { slug: $slug } }) {
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
const CATEGORYLIST = gql`
  query GetGategories {
    categories {
      name
      slug
    }
  }
`;

const Category = ({ posts, slug }) => {
  return (
    <div className="container w-4/5 m-auto">
      <Head>
        <title>Category Page - Blogging - a blogging site</title>
        <meta name="description" content={slug} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-6 sm:py-12 dark:dark:bg-gray-800 dark:dark:text-gray-100">
        <div className="container p-6 mx-auto space-y-8">
          <div class="space-y-2 text-center">
            <h2 class="text-3xl font-bold">Category: <span className="text-violet-400">{slug.charAt(0).toUpperCase()+slug.slice(1)}</span></h2>
            <p class="font-serif text-sm dark:text-gray-400">-----</p>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <BlogCard
                title={post.node.title}
                author={post.node.author}
                coverPhoto={post.node.coverPhoto}
                key={post.node.slug}
                datePublished={post.node.datePublished}
                slug={post.node.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  const { categories } = await graphcms.request(CATEGORYLIST);
  return {
    paths: categories.map((c) => ({ params: { slug: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const posts = data.postsConnection.edges;
  return {
    props: {
      posts,
      slug,
    },
    revalidate: 10,
  };
}
