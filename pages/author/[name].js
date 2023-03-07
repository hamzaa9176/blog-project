import {BlogCard} from "../../components";
import { getAuthors, getAuthorPost } from "../../services";
import Head from "next/head";



const authorPage = ({ result, authorPosts }) => {

  const authorName = result.authors.map((author) => (author.name));

  return (
    <div className="p-16">
      <Head>
        <title key="title">{`${authorName} - Blogging a blogging site`}</title>
        <meta name="description" content={authorName+" posts, bio, contact"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-8 bg-slate-700 rounded-xl bg-opacity-40 shadow mt-24">
        <div className="">

          <div className="relative pb-10">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img src={result.authors.map((author) => (author.avatar.url))} className=" object-cover w-full h-full rounded-full" />

            </div>
          </div>

        </div>
        <div className="mt-20 text-center pb-0">
          <h1 className="text-4xl font-medium text-white">{result.authors.map((author) => (author.name))}
          </h1>
        </div>
        <div className="mt-12 flex flex-col justify-center border-b border-violet-400">
          <p className="text-white text-center font-light lg:px-16">{result.authors.map((author) => (author.bio))}</p>
        </div>


        <section className="py-0 sm:py-12 dark:dark:bg-gray-800 dark:dark:text-gray-100">
          <div className="container p-6 mx-auto space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl text-white font-bold">My<span className="text-violet-400"> Posts</span></h2>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">

              {authorPosts.map((f) => (

                <BlogCard
                  title={f.node.title}
                  author={f.node.author}
                  coverPhoto={f.node.coverPhoto}
                  key={f.node.id}
                  datePublished={f.node.createdAt}
                  slug={f.node.slug}
                />

              ))
              }

            </div>
          </div>
        </section>



      </div>
    </div>

  )
}

export default authorPage


export async function getStaticPaths() {
  const result = await getAuthors();
  return {
    paths: result.map((c) => ({ params: { name: c.name.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const name = params.name;
  const result = await getAuthorPost(name);
  const authorPosts = result.postsConnection.edges;
  return {
    props: {
      result,
      authorPosts
    },
    revalidate: 10,
  };
}