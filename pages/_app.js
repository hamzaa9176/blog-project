import '@/styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function App({ Component, pageProps }) {
  return <div className='font-raleway'>
  <Navbar categories={pageProps.categories}/>
  <Component {...pageProps} />
  <Footer/>
  </div>
}
