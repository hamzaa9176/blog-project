import moment from 'moment'
import Link from "next/link";


const BlogCard = ({ title, author, datePublished, slug, coverPhoto }) => {
  return (

    <article className="flex flex-col bg-secondary shadow-lg p-3 transition-all duration-100 ease-linear rounded-2xl hover:shadow-2xl ">
      <Link href={`/posts/${slug}`}>
        <img alt="" className="object-cover w-full h-48 rounded-2xl" src={coverPhoto.url} />
      </Link>
      <div className="flex flex-col mt-7 px-2 space-y-2">
        <Link href={`/posts/${slug}`}><h3 className="text-lg text-typing font-bold transition-all duration-75 ease-in-out leading-snug lowercase hover:text-accent">{title}</h3></Link>
        <div className="flex flex-wrap justify-between text-xs text-typing">

          <div className='flex flex-row justify-left w-full mt-5'>
            
              <img src={author.avatar.url} alt={author.name} className=" rounded-full w-10 h-10 object-cover" />
              <div className='flex flex-col ml-5'>
              <Link href={`/author/${author.name}`} className="text-md font-semibold lowercase hover:underline text-accent">{author.name}</Link>
            <span className='text-xs text-typing'>{moment(datePublished).format('MMMM Do YYYY')}</span>
            </div>
          </div>

        </div>
      </div>
    </article>

  )
}

export default BlogCard