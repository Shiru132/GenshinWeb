// app root
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DataProvider } from './providers/DataContext.jsx'
import CharacterPage from './pages/CharacterPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx' // ← DODANE

export default function App() {
  return (
    <DataProvider>
      <Routes>
        {/* start aplikacji – jeśli wolisz listę: */}
        <Route path="/" element={<Navigate to="/gallery" replace />} />
        {/* lista postaci */}
        <Route path="/gallery" element={<GalleryPage />} />
        {/* pojedyncza postać */}
        <Route path="/characters/:slug" element={<CharacterPage />} />
        {/* stare .html → przekierowania, opcjonalnie */}
        <Route path="/gallery.html" element={<Navigate to="/gallery" replace />} />
        <Route path="/weapons.html" element={<Navigate to="/weapons" replace />} />
        <Route path="/artifacts.html" element={<Navigate to="/artifacts" replace />} />
        {/* fallback */}
        <Route path="*" element={<div style={{ padding: 24 }}>Nie znaleziono strony.</div>} />
      </Routes>
    </DataProvider>
  )
}
