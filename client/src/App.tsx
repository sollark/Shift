import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'
import { log } from './service/console.service'

function App() {
  log('App is connected')

  return <RouterProvider router={router} />
}

export default App
