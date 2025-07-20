// main.js


import { getArtifactIds, getArtifactMeta, getLocalArtifacts } from '/js/artefaktyJS/api.js';
import { normalize } from '/js/artefaktyJS/utils.js';
import { renderArtifacts, showError } from '/js/artefaktyJS/render.js';
import { initSearch, filterArtifacts } from '/js/artefaktyJS/search.js';
import { initModal } from '/js/artefaktyJS/modal.js';

(async function main() {
  try {
    // fetch id
    const [ids, localArr] = await Promise.all([
      getArtifactIds(),
      getLocalArtifacts()
    ]);

    document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu({
    hamburgerSelector: '#hamburger',
    menuSelector:      '#mobile-menu',
    overlaySelector:   '#overlay'
  });
});

    
    const artifacts = await Promise.all(
      ids.map(async (id, index) => {
        const meta = await getArtifactMeta(id);

        // find name to img
        const localEntry = localArr.find(entry =>
          normalize(entry.artifactName) === normalize(meta.name)
        );
        const imageUrl = localEntry ? localEntry.image : '';

        // data to description
        const descriptionParts = [
          `Max Rarity: ${meta.max_rarity}`,
          `2-piece bonus: ${meta['2-piece_bonus']}`,
          `4-piece bonus: ${meta['4-piece_bonus']}`,
          localEntry?.describe
        ].filter(Boolean);
        const description = descriptionParts.join(' | ');

      //  console.log(`${index}: ${imageUrl}`);

        return {
          name:        meta.name,
          image:       imageUrl,
          description: description
        };
      })
    );

   
    renderArtifacts(artifacts);

    
    initSearch(query => filterArtifacts(query));

   
    initModal();

  } catch (error) {
    // error
    console.error('Nie udało się zainicjalizować artefaktów:', error);
    showError('Nie udało się wczytać artefaktów. Spróbuj ponownie później.');
  }
})();
