import Scrobbler from "./scrobbler.js";
import updateCover from "./updateCover.js";
import updateTracks from "./updateTracks.js";

document.addEventListener('DOMContentLoaded', () => {
  // Main application
  const app = {
    state: {
      latest: false,
    }
  };

  // initialize scrobbler
  const scrobbler = new Scrobbler();

  scrobbler.on('update', (tracks) => {
    // Grab the last played track
    let latest = tracks.shift();

    // If there is a new latest track
    if (latest.id !== app.state.latest) {
      // Update the track cover
      updateCover(latest);

      // update track listing...
      updateTracks(tracks);

      // Update state
      app.state.latest = latest.id;
    }
  });

  scrobbler.listen();
});
