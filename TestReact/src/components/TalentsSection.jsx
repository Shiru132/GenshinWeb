// talents section
import React from 'react'

export default function TalentsSection({ name, talentsData }) {
  if (!talentsData) return null

  const entry = talentsData.find(t => t.character === name)
  const t = entry?.talents

  return (
    <section className="card-talents">
      <h2>Talenty</h2>

      {!t ? (
        <p className="empty-state">Brak danych o talentach dla tej postaci.</p>
      ) : (
        <>
          <ul className="talents">
            <li>
              <img src={t.normalAttack.icon} alt={t.normalAttack.name} />
              <div>
                <div>{t.normalAttack.name}</div>
                <p>{t.normalAttack.description}</p>
              </div>
            </li>
            <li>
              <img src={t.elementalSkill.icon} alt={t.elementalSkill.name} />
              <div>
                <div>{t.elementalSkill.name}</div>
                <p>{t.elementalSkill.description}</p>
              </div>
            </li>
            <li>
              <img src={t.elementalBurst.icon} alt={t.elementalBurst.name} />
              <div>
                <div>{t.elementalBurst.name}</div>
                <p>{t.elementalBurst.description}</p>
              </div>
            </li>
          </ul>

          <h2>Talenty pasywne</h2>
          {t.passiveTalents?.length ? (
            <ul className="passive">
              {t.passiveTalents.map((p, idx) => (
                <li key={idx}>
                  <img src={p.icon} alt={p.name} />
                  <div>
                    <div>{p.name}</div>
                    <p>{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Brak talentów pasywnych.</p>
          )}
        </>
      )}
    </section>
  )
}
