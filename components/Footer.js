import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    
<footer className="p-4 flex flex-col justify-center md:block md:px-6 md:py-8 bg-primary">
    <span className="block m-auto text-sm text-typing sm:text-center">© {new Date().getFullYear()  } <Link href={'/'} className="text-accent hover:underline">dev book</Link>. All Rights Reserved.
    </span>
</footer>

  )
}

export default Footer