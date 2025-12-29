import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Home from './pages/Home/index.jsx'
import Orcamento from './pages/Orcamento/index.jsx'
import Cadastro from './pages/Cadastro/index.jsx'

const router = createBrowserRouter([
  {
    path: "/", // A raiz agora será entendida como /HubDespachanteAlpha/
    element: <Orcamento />,
  },
  {
    path: "cadastro", // Sem a barra no início para ser relativa ao basename
    element: <Cadastro />,
  },
  {
    path: "orcamento", // Sem a barra no início
    element: <Orcamento />,
  }
], {
  basename: "/HubDespachanteAlpha" 
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
