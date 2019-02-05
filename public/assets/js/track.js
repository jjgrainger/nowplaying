// Track HTML template
const trackTemplate = (track) => {
    return `<div id="${track.id}" class="track">
        <div class="track-media">
            <img class="track-cover" src="${track.cover}" alt="${track.album}">
        </div>
        <div class="track-body">
            <p class="track-title">
                <span class="track-name">${track.title}</span> by
                <span class="track-artist">${track.artist}</span>
            </p>
            <span class="track-album">${track.album}</span>
            <span class="track-time">${track.time}</span>
        </div>
    </div>`;
};
