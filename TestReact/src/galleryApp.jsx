import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import GalleryPage from './pages/GalleryPage.jsx'
import CharacterPage from './pages/CharacterPage.jsx' // nowy plik niżej

 export default function App() {

 return (
    <Routes>
      <Route path="/" element={<Navigate to="/gallery" replace />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/characters/:slug" element={<CharacterPage />} />
      {/* fallback */}
      <Route path="*" element={<Navigate to="/gallery" replace />} />
    </Routes>
  )
 }