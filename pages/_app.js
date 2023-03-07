import '@/styles/globals.css'
import {Navbar, Footer} from '../components'


export default function App({ Component, pageProps }) {
  return <div className='font-raleway'>
  <Navbar categories={pageProps.categories}/>
  <Component {...pageProps} />
  <Footer/>
  </div>
}
