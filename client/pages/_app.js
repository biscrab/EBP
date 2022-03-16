import '../styles/globals.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <script src="https://kit.fontawesome.com/ed23fb601b.js" crossOrigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.2.0/css/all.min.css" integrity="sha512-6c4nX2tn5KbzeBJo9Ywpa0Gkt+mzCzJBrE1RB6fmpcsoN+b/w/euwIMuQKNyUoU/nToKN3a8SgNOtPrbW12fug==" crossOrigin="anonymous" />
    <Header/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
