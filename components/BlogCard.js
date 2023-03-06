import React from 'react'
import moment from 'moment'
import Link from "next/link";


const BlogCard = ({ title, author, datePublished, slug, coverPhoto }) => {
  return (

    <article className="flex flex-col dark:dark:bg-gray-900">
      <Link href={`/posts/${slug}`}>
        <img alt="" className="object-cover w-full h-52 dark:dark:bg-gray-500" src={coverPhoto.url} />
      </Link>
      <div className="flex flex-col flex-1 p-6">
        <a rel="noopener noreferrer" href="#" className="text-xs tracking-wider uppercase hover:underline dark:dark:text-violet-400">{author.name}</a>
        <Link href={`/posts/${slug}`}><h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{title}</h3></Link>
        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:dark:text-gray-400">
          <span>{moment(datePublished).format('MMMM Do YYYY')}</span>
          
        </div>
      </div>
    </article>

  )
}

export default BlogCard