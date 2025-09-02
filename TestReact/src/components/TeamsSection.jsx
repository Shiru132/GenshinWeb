// src/components/TeamsSection.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function TeamsSection({ teamsData, slug, name, element }) {
  if (!teamsData) return null

const entry = teamsData.characters.find(c => c.slug === slug || c.name === name)
const groups = entry ? entry.teams : []


 
  const slugify = (s = '') =>
    s
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')

 (np. .../characters/shogun.html) -> /characters/shogun
  const toCharactersPath = (input, fallbackName) => {
    const src = String(input || '').trim()

 
    const match = src.match(/\/characters\/([^/?#]+)/i)
    if (match) {
      const last = match[1].replace(/\.html?$/i, '')
      return `/characters/${last}`
    }

 
    if (typeof input === 'string' && input && !input.includes('/')) {
      return `/characters/${input.replace(/\.html?$/i, '')}`
    }


    const s = slugify(fallbackName)
    return s ? `/characters/${s}` : '/characters/arlecchino'
  }

  return (
    <section className="card-teams">
      <h2>Proponowane drużyny</h2>

      {groups.length === 0 ? (
        <p className="empty-state">Brak propozycji drużyn.</p>
      ) : (
        <div>
          {groups.map((group, idx) => {
            const [title, members = []] = Object.entries(group)[0] || ['Zespół', []]

            const mainChar = {
              name,
              image: `/img/portretyZdj/p${slug}.png`,
              link: `/characters/${slug}`,
              element: element || ''
            }

            const fullMembers = [mainChar, ...members]

            return (
              <div key={idx}>
                <div className="team-title">{title}</div>
                <ul className="team-list">
                  {fullMembers.map((m, i) => {
                    const memberName = m.name || 'Postać'
                    const memberImg = m.image
                    const memberElement = m.element
                    const memberPath = toCharactersPath(m.link || m.slug, memberName)

                    return (
                      <li key={i} id={memberElement}>
                        <Link to={memberPath}>
                          <img src={memberImg} alt={memberName} />
                        </Link>
                        
                        <span>{memberName}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
