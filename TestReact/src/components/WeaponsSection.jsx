// weapons section
import React from 'react'

export default function WeaponsSection({ name, weaponsData }) {
  if (!weaponsData) return null
  const list = weaponsData[name] || []

  return (
    <section className="card-weapons">
      <h2 id="weapons-title">Rekomendowane bronie</h2>

      {list.length === 0 ? (
        <p className="empty-state">Brak rekomendowanych broni dla tej postaci.</p>
      ) : (
        <ul className="weapon-list">
          {list.map((w, idx) => (
            <li key={idx}>
              <img src={w.image} alt={w.name} />
              <div>
                <h4>{w.name}</h4>
                <p>{w.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
