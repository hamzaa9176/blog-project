import Head from 'next/head'
import {BlogCard} from '../components'
import {getPosts} from '../services'
import useSWR from 'swr'
import { request } from 'graphql-request';
import { useState } from 'react';
const fetcher = (enpoint, query, variable) => request(enpoint, query, variable);

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getStaticProps() {
  const data = await getPosts();
  return {
    props: {
      fallback: {
       posts: data
      }
    }
  };
}

export default function Home({ fallback }) {

  const [next, setNext] = useState(0)

  const { data } = useSWR([graphqlAPI,
`query MyQuery($next: Int) {
  postsConnection(first: 4, skip: $next, orderBy: createdAt_DESC) {
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
}`, next], 
([end, query])=>  request(end, query, {next}),
{fallbackData:fallback.posts, revalidateOnFocus:true}
  );


  return (
    <div className="container mb-auto w-4/5 m-auto">
      <Head>
        <title>dev book - developer book by a learning dev</title>
        <meta name="description" content="Bloggy - a blogging site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-6 mb-auto sm:py-12 dark:dark:bg-gray-800 dark:dark:text-gray-100">
        <div className="container p-6 mx-auto space-y-8">
        <div className="space-y-2 text-center">
            <h2 className="text-3xl text-white font-bold">Checkout<span className="text-violet-400"> My Posts</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {
              data.postsConnection?.edges.map((post) => (
                <BlogCard
                  title={post.node.title}
                  author={post.node.author}
                  coverPhoto={post.node.coverPhoto}
                  key={post.node.id}
                  datePublished={post.node.createdAt}
                  slug={post.node.slug}
                />
              ))
            }
          </div>
          <button disabled={!data?.postsConnection?.pageInfo.hasPreviousPage} onClick={() => setNext(next - 4)} class="text-white disabled:bg-red-400 disabled:text-gray-800 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Prev</button>
        <button disabled={!data?.postsConnection?.pageInfo.hasNextPage} onClick={() => setNext(next + 4)}  class="text-white disabled:bg-gray-400 disabled:text-gray-800 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >Next</button>
  
        </div>
          
       
      </section>
    </div>
  )
}
