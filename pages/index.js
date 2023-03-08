import Head from 'next/head'
import {BlogCard} from '../components'
import {getPosts} from '../services'



export async function getStaticProps() {
  const { posts } = await getPosts();
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
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
