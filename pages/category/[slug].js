import BlogCard from "../../components/BlogCard";
import Head from "next/head";
import {getCategories, GetCategoryPost} from '../../services'



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
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-white">category: <span className="text-violet-400">{slug.toLowerCase()}</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
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
      posts,
      slug,
    },
    revalidate: 10,
  };
}
