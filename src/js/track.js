// Track HTML template
export default (track) => {

  let { id, cover, title, artist, album, time } = track;

  return `<div id="${id}" class="track">
    <div class="track-media">
      <img class="track-cover" src="${cover}" alt="${album}">
    </div>
    <div class="track-body">
      <span class="track-name">${title}</span>
      <span class="track-artist">${artist}</span>
      <span class="track-album">${album}</span>
      <span class="track-time">${time}</span>
    </div>
  </div>`;
};
