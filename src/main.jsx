import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Home from './pages/Home/index.jsx'
import Orcamento from './pages/Orcamento/index.jsx'
import Cadastro from './pages/Cadastro/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Orcamento />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/orcamento",
    element: <Orcamento />,
  }
], {
  basename: "/HubDespachanteAlpha/"
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
