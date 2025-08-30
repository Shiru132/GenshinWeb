import React from "react"
import useScrollToTop from "../hooks/scrollToUp.js"

export default function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useScrollToTop(300)

  return (
    <button
      className={`scroll-to-top ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Przewiń do góry"
    >
      ↑
    </button>
  )
}
