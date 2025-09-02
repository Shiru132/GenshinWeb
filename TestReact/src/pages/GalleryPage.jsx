import React, { useEffect, useMemo, useState, useRef } from 'react'
import CharacterCard from '../components/CharacterCard.jsx'
import Hamburger from '../components/Hamburger.jsx'
import ScrollToTopButton from '../components/scrollToUp.jsx'
import { useDebounce } from '../hooks/useDebounce.js'
import { Link, useLocation } from 'react-router-dom'
import '../gallery.css' 

export default function GalleryPage() {
  const [characters, setCharacters] = useState([])
  const [elementFilter, setElementFilter] = useState('all')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 200)
  const [showToTop, setShowToTop] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const firstMobileLinkRef = useRef(null)
  const hamburgerRef = useRef(null)
  const location = useLocation()

  // fetch data
  useEffect(() => {
    fetch('/js/galeriaJS/galleryCharacters.json')
      .then(r => r.json())
      .then(data => {
        const sorted = [...(data.characters || [])].sort((a, b) => a.name.localeCompare(b.name))
        setCharacters(sorted)
      })
      .catch(err => console.error('Błąd wczytywania postaci:', err))
  }, [])


  useEffect(() => {
    const onScroll = () => setShowToTop(window.pageYOffset > 300)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = e => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  
  useEffect(() => {
    if (mobileOpen) {
      firstMobileLinkRef.current?.focus()
    } else {
      hamburgerRef.current?.focus()
    }
  }, [mobileOpen])

 
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const filtered = useMemo(() => {
    const byElement = elementFilter === 'all'
      ? characters
      : characters.filter(c => c.element === elementFilter)

    const q = debouncedQuery.trim().toLowerCase()
    return q ? byElement.filter(c => c.name.toLowerCase().includes(q)) : byElement
  }, [characters, elementFilter, debouncedQuery])

  return (
    <div className="page gallery-page">
      
        <Hamburger className=".gallery-page" title={name} />
              <ScrollToTopButton className=".gallery-page" />
        

      <main className="content-wrapper">
        <section className="characters-section">
          <h1 className="section-title">Postacie Genshin Impact</h1>

          <div className="search-filter">
            <input
              type="text"
              placeholder="Wyszukaj postać..."
              className="search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <select
              className="filter-select"
              value={elementFilter}
              onChange={e => setElementFilter(e.target.value)}
            >
              <option value="all">Wszystkie elementy</option>
              <option value="pyro">Pyro</option>
              <option value="hydro">Hydro</option>
              <option value="anemo">Anemo</option>
              <option value="electro">Electro</option>
              <option value="cryo">Cryo</option>
              <option value="geo">Geo</option>
              <option value="dendro">Dendro</option>
            </select>
          </div>

          <ul className="characters-grid" id="gallery">
            {filtered.length ? (
              filtered.map((char, idx) => (
                <CharacterCard key={char.name} char={char} index={idx} />
              ))
            ) : (
              <p className="NoSearchingResult">Brak wyników</p>
            )}
          </ul>
        </section>
      </main>

      <footer>
        <aside>
          <ul>
           
            <li><a href="#">Edit</a></li>
            <li><a href="#">View</a></li>
            <li><a href="help.html">Pomoc</a></li>
          </ul>
        </aside>
        <div className="footer-bottom">
          <p className="footer-creators">Twórcy: NaTesta</p>
          <p className="footer-copyright">© 2025 Gamers. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>

      {showToTop && (
        <button
          className="scroll-to-top show"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
    </div>
  )
}
