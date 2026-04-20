import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';

import Home from './pages/Home/index.jsx'
import Orcamento from './pages/Orcamento/index.jsx'
import Cadastro from './pages/Cadastro/index.jsx'
import ProcuracaoPage from './pages/ProcuracaoPage/index.jsx';

const router = createBrowserRouter([
  {
    path: "/", // A raiz agora será entendida como /HubDespachanteAlpha/
    element: <Orcamento />,
  },
  {
    path: "/procuracao",
    element: <ProcuracaoPage />,
  },
  {
    path: "/orcamento", 
    element: <Orcamento />,
  }
], {
  basename: "/HubDespachanteAlpha"
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
)
