// Update cover image
const updateCover = (track) => {
    let cover = app.components.cover;

    // Hide the current track container
    cover.container.classList.add('is-hidden');

    // Preload the album image
    let artwork = new Image();
    artwork.src = track.cover;

    artwork.onload = () => {
        // Add delay to allow for CSS transitions
        setTimeout(() => {
            // Create and set new track HTML
            cover.content.innerHTML = trackTemplate(track);;
            cover.background.style.backgroundImage = 'url(' + track.cover + ')';

            cover.container.classList.remove('is-hidden');
        }, 750);
    };
}
