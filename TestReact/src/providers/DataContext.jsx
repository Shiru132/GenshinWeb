// data context
import React, { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [weapons, setWeapons] = useState(null)
  const [artifacts, setArtifacts] = useState(null)
  const [teams, setTeams] = useState(null)
  const [talents, setTalents] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function loadAll() {
      try {
        const [w, a, t, tl] = await Promise.all([
          fetch('/js/postacieJS/rWeapons.json').then(r => r.json()),
          fetch('/js/postacieJS/Recartifacts.json').then(r => r.json()),
          fetch('/js/postacieJS/rTeams.json').then(r => r.json()),
          fetch('/js/postacieJS/talents.json').then(r => r.json()),
        ])
        if (!cancelled) {
          setWeapons(w)
          setArtifacts(a)
          setTeams(t)
          setTalents(tl)
          setLoading(false)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e)
          setLoading(false)
        }
      }
    }
    loadAll()
    return () => { cancelled = true }
  }, [])

  return (
    <DataContext.Provider value={{ weapons, artifacts, teams, talents, loading, error }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
