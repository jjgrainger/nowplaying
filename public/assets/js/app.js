// Main application
const app = {
    state: {
        latest: false,
    },
    components: {
        doc: {
            body: document.querySelector('body'),
            title: document.querySelector('title'),
        },
        cover: {
            container: document.querySelector('.cover'),
            content: document.querySelector('.cover-content'),
            background: document.querySelector('.cover-background'),
        },
        recent: document.querySelector('.recent-tracks'),
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

            app.components.doc.body.classList.remove('is-loading');

            // Update state
            app.state.latest = latest.id;
        }
    });

scrobbler.listen();
