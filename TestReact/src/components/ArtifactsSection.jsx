// artifacts section
import React from 'react'

export default function ArtifactsSection({ name, artifactsData }) {
  if (!artifactsData) return null

  const entry = artifactsData.characters?.find(c => c.name === name)
  const list = entry?.artifacts || []

  return (
    <section className="card-artifacts">
      <h2 id="artifacts-title">Rekomendowane artefakty</h2>

      {list.length === 0 ? (
        <p className="empty-state">Brak rekomendowanych artefaktów dla tej postaci.</p>
      ) : (
        <ul className="artifact-grid ">
          {list.map((a, idx) => (
            <li key={idx}>
              <img src={a.image} alt={a.artifactName} />
              <div>
                <h3>{a.artifactName}</h3>
                <p>{a.describe}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
