import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import Consulta from './routes/Consulta.jsx'
import Chat from './routes/Chat.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Home />,
        path: '/'
      },
      {
        element: <Login />,
        path: '/login'
      },
      {
        element: <Consulta />,
        path: '/consulta'
      },
      {
        element: <Chat />,
        path: '/chat'
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
