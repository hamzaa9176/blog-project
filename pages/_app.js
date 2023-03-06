import '@/styles/globals.css'
import Navbar from '../components/Navbar'
export default function App({ Component, pageProps }) {
  return <div className='font-raleway'>
  <Navbar categories={pageProps.categories}/>
  <Component {...pageProps} />
  </div>
}
