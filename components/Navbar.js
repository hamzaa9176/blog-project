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

//hiding responsive nav when resizing windows because i using val to hide or display nav on mobile screen so i have to use this way of hidding nav.
    useEffect(() => {
      const handleWindowResize = () => {
        setVal('hidden')
      };
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    });


  const [val, setVal] = useState('hidden')

  return (
        <>
           
<nav className="p-3 shadow-lg z-10 bg-primary">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
    <Link href={'/'} onClick={()=>setVal('hidden')} className="flex items-center hover:text-white transition-all duration-100 ease-linear">
        <div className="text-3xl mr-3 sm:h-10 text-accent"><MdOutlineDeveloperMode/></div>
        <span className="self-center text-xl font-semibold whitespace-nowrap text-typing">dev book</span>
    </Link>
    <button   onClick={()=>{
      if(val==='hidden'){
        setVal('block text-center absolute top-11 left-0 right-0 z-50')
        
      }else {
        setVal('hidden')
       
      }
    }} type="button" className="relative inline-flex  items-center p-2 ml-3 text-sm transition-all duration-75 ease-in-out rounded-lg border-2 border-typing md:hidden hover:bg-accent hover:border-accent focus:outline-none " aria-controls="navbar-solid-bg" aria-expanded="false">
      <span className="sr-only ">Open main menu</span>
      <HiOutlineMenuAlt3 className='text-typing w-5 h-5  hover:text-secondary'/>
    </button>
    <div className={`  w-full ${val} transition-all ease-out duration-500 md:block md:w-auto ` } id="navbar-solid-bg">
      <ul className=" flex bg-typing text-secondary flex-col mt-3 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
        {
          categories.map((category)=>(
        <li key={category.slug} >
          <Link href={`/category/${category.slug}`} onClick={()=>{setVal('hidden')}} className=" block py-2 pl-3 pr-4 font-bold text-secondary transition-colors duration-75 ease-in hover:text-accent rounded md:bg-transparent md:text-gray-800 md:p-0 md:dark:text-gray-800 md:dark:bg-transparent" aria-current={category.slug}>{category.name}</Link>
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