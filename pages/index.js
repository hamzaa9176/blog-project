import Head from 'next/head'
import { BlogCard } from '../components'
import { getPosts } from '../services'
import useSWR from 'swr'
import { request } from 'graphql-request';
import { useState } from 'react';
import { SlArrowDown } from 'react-icons/sl'
import { AiOutlineMinus } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'


import Link from 'next/link'

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
    ([end, query]) => request(end, query, { next }),
    { fallbackData: fallback.posts, revalidateOnFocus: true }
  );


  return (
    <div className="mainContent mb-auto w-full m-auto">
      <Head>
        <title>dev book - developer book by a learning dev</title>
        <meta name="description" content="Bloggy - a blogging site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='banner py-5'>
        <div className="w-4/5 wrapper flex flex-col gap-6 mx-auto md:py-20 md:flex-row md:justify-between">
          <div className='details flex flex-col gap-5'>
            <h1 className='font-bold text-6xl'>Hi, i’m Hamza </h1>
            <h3 className='font-bold text-4xl'>A learner</h3>
            <p className=' border-l-typing border-l-2 pl-2 md:w-3/5'>On this blog I share tips and tricks, frameworks, projects, tutorials, etc
              Make sure you subscribe to get the latest updates</p>
            <div className='flex mt-5'>
              <input type="text" placeholder='Enter your email' className='text-sm w-3/4 text-typing rounded-md px-5 bg-secondary md:p-5 md:w-3/5' />
              <button className='bg-accent text-sm text-secondary ml-3 font-bold px-3 py-1 rounded-md md:ml-3'>Join Our Fam</button>
            </div>
          </div>
          <div className='profilePic '>
            <img className='' src="/profile.png" alt="" />
          </div>
        </div>
        <div className='m-auto flex justify-center text-xl mt-10 md:mt-0'><SlArrowDown/></div>

      </section>
      <section className='categoriesList bg-primary'>
        <div className='w-4/5 wrapper m-auto py-10'>
          <h1 className='font-bold mb-10 flex leading-3'>Browse The Category <span className='ml-2'><AiOutlineMinus/></span></h1>
          <div className="card  grid grid-cols-2 gap-x-4 gap-y-8  md:grid-cols-2 lg:grid-cols-5">
            <div className="flex p-10 flex-col justify-center items-center gap-3 bg-secondary rounded-lg">
              <img alt="" className="object-cover w-20 h-20 rounded-t-lg" src={'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg'} />
              <h2 className='m-auto'>Css</h2>
            </div>

            <div className="flex p-10 flex-col justify-center items-center gap-3 bg-secondary rounded-lg">
              <img alt="" className="object-cover w-20 h-20 rounded-t-lg" src={'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg'} />
              <h2 className='m-auto'>Css</h2>
            </div>

            <div className="flex p-10 flex-col justify-center items-center gap-3 bg-secondary rounded-lg">
              <img alt="" className="object-cover w-20 h-20 rounded-t-lg" src={'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg'} />
              <h2 className='m-auto'>Css</h2>
            </div>

            <div className="flex p-10 flex-col justify-center items-center gap-3 bg-secondary rounded-lg">
              <img alt="" className="object-cover w-20 h-20 rounded-t-lg" src={'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg'} />
              <h2 className='m-auto'>Css</h2>
            </div>

            <div className="flex p-10 flex-col justify-center items-center gap-3 bg-secondary rounded-lg">
              <img alt="" className="object-cover w-20 h-20 rounded-t-lg" src={'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg'} />
              <h2 className='m-auto'>Css</h2>
            </div>

           
          </div>
        </div>
      </section>
      <section className="py-6 mb-auto sm:py-12 bg-secondary">
        <div className="container p-6 mx-auto space-y-8">
          <div className="flex leading-4 justify-between">
          <h1 className='font-bold mb-10 flex leading-4'>Latest Posts <span className='ml-2'><AiOutlineMinus/></span></h1>
          <h2 className='font-semibold '><Link href={''} className='flex gap-2 text-accent hover:text-typing'>View All Posts <IoIosArrowForward/></Link></h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
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
          <button disabled={!data?.postsConnection?.pageInfo.hasPreviousPage} onClick={() => setNext(next - 4)} className="text-white bg-accent disabled:bg-primary disabled:text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Prev</button>
          <button disabled={!data?.postsConnection?.pageInfo.hasNextPage} onClick={() => setNext(next + 4)} className="text-white bg-accent disabled:bg-primary disabled:text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >Next</button>

        </div>


      </section>
    </div>
  )
}
