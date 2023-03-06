import {useState, useEffect} from 'react'
import Link from 'next/link'
import {getCategories} from '../services'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import {MdOutlineDeveloperMode} from 'react-icons/md'

const Navbar = () => {
  
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });  }, [])
  const [val, setVal] = useState('hidden')
    return (
        <>
           
<nav className="p-3 border-gray-200 rounded bg-violet-400 dark:bg-violet-400 dark:border-gray-700">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
    <Link href={'/'} className="flex items-center hover:text-white transition-all duration-100 ease-linear">
        <div className=" text-3xl mr-3 sm:h-10 "><MdOutlineDeveloperMode/></div>
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">dev book</span>
    </Link>
    <button onClick={()=>{
      if(val==='hidden'){
        setVal('block')
      }else {
        setVal('hidden')
      }
    }} data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 ml-3 text-sm transition-all duration-75 ease-in-out text-violet-800 rounded-lg border-2 md:hidden hover:bg-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <HiOutlineMenuAlt3 className='text-white w-10 h-10'/>
    </button>
    <div className={` w-full ${val} md:block md:w-auto ` } id="navbar-solid-bg">
      <ul className="flex flex-col mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        {
          categories.map((category)=>(
        <li key={category.slug}>
          <Link href={`/category/${category.slug}`} onClick={()=>{setVal('hidden')}} className="block py-2 pl-3 pr-4 font-bold text-gray-800 transition-colors duration-75 ease-in dark:text-white hover:text-white rounded md:bg-transparent md:text-gray-800 md:p-0 md:dark:text-gray-800 md:dark:bg-transparent" aria-current={category.slug}>{category.name}</Link>
        </li>
          ))
        }
        
       
       
      </ul>
    </div>
  </div>
</nav>

        </>
    )
}

export default Navbar