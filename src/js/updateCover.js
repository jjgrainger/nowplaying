// Update cover image
import trackTemplate from "./track.js";

export default (track) => {
  const body = document.querySelector('body');
  const container = document.querySelector('.cover');
  const content = document.querySelector('.cover-content');
  const background = document.querySelector('.cover-background');

  // Hide the current track container
  container.classList.add('is-hidden');

  // Preload the album image
  let artwork = new Image();
  artwork.src = track.cover;

  artwork.onload = () => {
    // Add delay to allow for CSS transitions
    setTimeout(() => {
      // Create and set new track HTML
      content.innerHTML = trackTemplate(track);
      background.style.backgroundImage = 'url(' + track.cover + ')';

      container.classList.remove('is-hidden');
      body.classList.remove('is-loading');
    }, 750);
  };
}
