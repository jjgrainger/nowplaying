// Update recent tracks
import trackTemplate from "./track.js";

export default (tracks) => {
  const container = document.querySelector('.recent-tracks');

  container.innerHTML = ``;

  tracks
    .map(trackTemplate)
    .forEach((track, i) => {
      let item = document.createElement('li');
      item.dataset.number = i+1;
      item.innerHTML = track;
      container.appendChild(item);
    });
};
