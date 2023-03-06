import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request'
import { Inter } from 'next/font/google'
import styles from "../styles/Home.module.css";
import BlogCard from '../components/BlogCard'




const graphcms = new GraphQLClient('https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clerb27ka1dzz01ukhe6p5p08/master');
const QUERY = gql`
{
  posts(orderBy: publishedAt_DESC) {
    id,
    title, 
    datePublished,
    createdAt
    slug,
    content{
      html
    }
    author{
      name, 
      avatar{
        url
      }
    }
    categories {
      name
      slug
    }
    coverPhoto{
      createdBy {
        id
      },
      
      url
    }
  }
}
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <div className="container w-4/5 m-auto">

      <Head>
        <title>Blogging - a blogging site</title>
        <meta name="description" content="Bloggy - a blogging site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-6 sm:py-12 dark:dark:bg-gray-800 dark:dark:text-gray-100">
        <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Checkout<span className="text-violet-400"> My Posts</span></h2>
            <p className="font-serif text-sm dark:text-gray-400">-----</p>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">

            {
              posts.map((post, index) => (
                <BlogCard
                  title={post.title}
                  author={post.author}
                  coverPhoto={post.coverPhoto}
                  key={post.id}
                  datePublished={post.createdAt}
                  slug={post.slug}
                />
              ))
            }

          </div>
        </div>
      </section>
    </div>
  )
}
