import React, { useState, useEffect } from "react"

export default function Hamburger({ title }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(o => !o)
  const closeMenu = () => setIsOpen(false)
  function formatName(name) {
    if(name===""){
      return;
    }
  return name.replace(/-/g, ' ');
}


  // zamykanie ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="glass-effect">
      <nav className="nav-container">
        <h1 className="logo">{formatName(title)}</h1>


        {/* desktop */}
        <ul className="nav-links desktop-menu">
          <li><a href="/gallery" className="nav-link">Postacie</a></li>
          <li><a href="/weapons" className="nav-link">Bronie</a></li>
          <li><a href="/artifacts" className="nav-link">Artefakty</a></li>
        </ul>

        {/* hamburger */}
        <button className="hamburger" onClick={toggleMenu} aria-expanded={isOpen} aria-label="Otwórz menu">
          ☰
        </button>
      </nav>

      {/* mobile menu + overlay (renderowane zawsze, sterowane klasą .open) */}
      <div className={`menu-overlay${isOpen ? ' open' : ''}`} onClick={closeMenu} />
      <div className={`mobile-menu${isOpen ? ' open' : ''}`}>
        <a href="/gallery" className="nav-link" onClick={closeMenu}>Postacie</a>
        <a href="/weapons" className="nav-link" onClick={closeMenu}>Bronie</a>
        <a href="/artifacts" className="nav-link" onClick={closeMenu}>Artefakty</a>
      </div>
    </header>
  )
}
