import {BlogCard} from "../../components";
import Head from "next/head";
import {getCategories, GetCategoryPost} from '../../services'
import useSWR from 'swr'
import { request } from 'graphql-request';
import { useState } from 'react';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


const Category = ({ fallback, slug }) => {
  const [next, setNext] = useState(0)

  const { data } = useSWR([graphqlAPI,
`query GetCategoryPost($slug: String!, $next: Int) {
  postsConnection(where: { categories_some: { slug: $slug } },first:4, skip:$next, orderBy: createdAt_DESC) {
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
  pageInfo{
    hasNextPage
    hasPreviousPage
    pageSize
  }
  }
}`, next, slug], 
([end, query])=>  request(end, query, {next, slug}),
{fallbackData:fallback, revalidateOnFocus:true}
  );

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
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-white">category: <span className="text-violet-400">{slug.toLowerCase()}</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            { data?.postsConnection?.edges.map((post) => (

                //console.log(post.node.title)
              <BlogCard
                title={post.node.title}
                author={post.node.author}
                coverPhoto={post.node.coverPhoto}
                key={post.node.slug}
                datePublished={post.node.createdAt}
                slug={post.node.slug}
              />
            ))}
          </div>
          {(data?.postsConnection?.pageInfo.pageSize>1)&&(<><button disabled={!data?.postsConnection?.pageInfo.hasPreviousPage} onClick={() => setNext(next - 4)} className="text-white disabled:bg-red-400 disabled:text-gray-800 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Prev</button>
        <button disabled={!data?.postsConnection?.pageInfo.hasNextPage} onClick={() => setNext(next + 4)}  className="text-white disabled:bg-gray-400 disabled:text-gray-800 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >Next</button>
        </>)}
        </div>
      </section>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  const categories  = await getCategories();
  return {
    paths: categories.map((c) => ({ params: { slug: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await GetCategoryPost(slug);
  const posts = data.postsConnection.edges;
  return {
    props: {
      fallback: {
        posts: posts,
       },
       slug
    }
  };
}
