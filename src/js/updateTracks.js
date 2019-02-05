// Update recent tracks
import trackTemplate from "./track.js";

export default (tracks) => {
  const container = document.querySelector('.recent-tracks');

  container.innerHTML = ``;

  tracks
    .map(trackTemplate)
    .forEach((track) => {
      let item = document.createElement('li');
      item.innerHTML = track;
      container.appendChild(item);
    });
};
