import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function extractThemeColor(imgEl) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 1; canvas.height = 1
  try {
    ctx.drawImage(imgEl, 0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return `rgb(${r},${g},${b})`
  } catch {
    return null
  }
}

// bezpieczna zamiana "characters/bennett.html" -> "/characters/bennett"
function linkToPath(link = '') {
  return '/' + String(link).replace(/^(\.\/)?/, '').replace(/\.html?$/i, '')
}

export default function CharacterCard({ char, index }) {
  const liRef = useRef(null)
  const imgRef = useRef(null)
  const [show, setShow] = useState(false)

  // ustaw kolor motywu po załadowaniu obrazka (także z cache)
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const applyTheme = () => {
      const color = extractThemeColor(img)
      if (color && liRef.current) {
        liRef.current.style.setProperty('--theme-color', color)
      }
    }

    const onLoad = () => applyTheme()
    const onError = () => {
      // fallback: wyczyść kolor, dodaj klasę błędu jeśli chcesz w CSS
      if (liRef.current) liRef.current.style.removeProperty('--theme-color')
      img.classList.add('img-error')
    }

    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)

    // jeśli obraz już w cache i complete — nałóż od razu
    if (img.complete && img.naturalWidth > 0) applyTheme()

    return () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
    }
  }, [char.image])

  // prosty reveal; jak chcesz animację, zmień delay
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = prefersReduced ? 0 : 0 // ustaw np. 150 dla animacji
    const id = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(id)
  }, [index])

  const to = linkToPath(char.link)

  return (
    <li
      ref={liRef}
      className={`character-card element-${char.element} ${show ? 'show' : 'hidden'}`}
      data-element={char.element}
      style={{ ['--delay']: `${index * 30}ms` }}
    >
      <Link to={to} aria-label={char.name}>
        <img
          ref={imgRef}
          src={char.image}
          alt={char.name}
          className="character-image"
          loading="lazy"
          decoding="async"
        />
        <div className="character-name">{char.name}</div>
      </Link>
    </li>
  )
}
