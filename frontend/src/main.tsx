import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import First from "@/pages/first"
import Wait from "./pages/wait";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/wait" element={<Wait/>}/>
            <Route path="/first" element={<First/>}/>
        </Routes>
    </BrowserRouter>
)
