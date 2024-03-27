import Footer from './layouts/Footer'
import Header from './layouts/Header'
import Main from './layouts/Main'
import { log } from './service/console.service'

function App() {
  log('App is connected')

  return (
    <>
      <Header />
      <Main>
        <h1>Hello, world!</h1>
      </Main>
      <Footer />
    </>
  )
}

export default App
