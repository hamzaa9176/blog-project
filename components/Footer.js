import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    
<footer className="p-4 flex flex-col justify-center md:block md:px-6 md:py-8 bg-gray-900">
    <span className="block m-auto text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()  } <Link href={'/'} className="text-white hover:text-violet-400 hover:underline">dev book</Link>. All Rights Reserved.
    </span>
</footer>

  )
}

export default Footer