import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    
<footer className="p-4 shadow md:px-6 md:py-8 bg-gray-900">
    <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()  } <Link href={'/'} className="text-white hover:text-violet-400 hover:underline">dev book</Link>. All Rights Reserved.
    </span>
</footer>

  )
}

export default Footer