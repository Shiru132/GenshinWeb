// character page
import React from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../providers/DataContext.jsx'
import { getCharacterMetaFromSlug } from '../hooks/useSlugToCharacter.js'
import WeaponsSection from '../components/WeaponsSection.jsx'
import ArtifactsSection from '../components/ArtifactsSection.jsx'
import TeamsSection from '../components/TeamsSection.jsx'
import TalentsSection from '../components/TalentsSection.jsx'
import Hamburger from '../components/Hamburger.jsx'
import ScrollToTopButton from '../components/scrollToUp.jsx'
import '../pyro.css' // ← ważne: import lokalny, nie absolutny

export default function CharacterPage() {
  const { slug } = useParams()
  const { name, element } = getCharacterMetaFromSlug(slug)
  const { weapons, artifacts, teams, talents, loading, error } = useData()

  if (loading) {
    return (
      <div className="page character-page">
        <div className="main-content">Ładowanie danych…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page character-page">
        <div className="main-content">Błąd ładowania danych.</div>
      </div>
    )
  }

  return (
    <div className={`page character-page theme-${element}`}>
      <Hamburger title={name} />
      <ScrollToTopButton />

      <main className="main-content">
        <figure>
          <img
            src={`/img/zdj/${slug}.png`}
            alt={`${name} portret`}
            className="character-image"
          />
        </figure>

        <div className="grid-container" id="builds">
          <WeaponsSection name={name} weaponsData={weapons} />
          <ArtifactsSection name={name} artifactsData={artifacts} />
        </div>

        <section id="teams">
          <h2 id="teams-section-title">Drużyny</h2>
          <div className="grid-container">
            <TeamsSection
              teamsData={teams}
              slug={slug}
              name={name}
              element={element}
            />
          </div>
        </section>

        <div className="grid-container">
          <TalentsSection name={name} talentsData={talents} />
        </div>
      </main>

      <footer>
        <div className="footer-bottom">
          <p className="footer-creators">Twórcy: NaTesta</p>
          <p className="footer-copyright">
            © 2025 Gamers. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}
