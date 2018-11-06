// Define elements
const body = document.querySelector('body');
const title = document.querySelector('title');
const container = document.querySelector('.content');
const background = document.querySelector('.background');

// Set current track state.
var currentTrack = false;
var baseTitle = title.innerHTML;

// Get the latest track from LastFM API.
function getLatestTrack() {
    // Create the Lastfm API request url
    let url = buildUrl('https://ws.audioscrobbler.com/2.0/', {
        "method": "user.getrecenttracks",
        "user": "jjgrainger",
        "api_key": "d6e011940033319dbaa1994e1e163080",
        "format": "json",
    });

    fetch(url)
        .then((response) => {
            return response.json();
        }).then((response) => {
            // Pull the most recent played track.
            let data = response.recenttracks.track.shift();
            // Convert api response to track object
            let track = transform(data);

            // If the current displayed track isn't the same...
            if (track.id !== currentTrack) {
                update(track);
            }
        }).catch((err) => {
            console.error(err);
        });
}

// Transform track data to a usable object
function transform(data) {
    // Create track object
    let track = {
        cover: data.image[3]['#text'],
        artist: data.artist['#text'],
        album: data.album['#text'],
        title: data.name,
        timestamp: false,
    };

    if (data.date) {
        track.timestamp = parseInt(data.date.uts) * 1000;
    }

    // create a unique id from the object
    track.id = btoa(JSON.stringify(track));

    return track;
}

// Build url from base and query object.
function buildUrl(base, query) {
    let qs = Object.keys(query).map((k) => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`
    }).join('&');

    return `${base}?${qs}`;
}

// Update display to show latest track.
function update(track) {
    console.log('update track');

    // Hide the current track state.
    body.classList.add('is-hidden');

    // set the current track state
    currentTrack = track.id;

    // preload the album cover art
    let cover = new Image();
    cover.src = track.cover;

    // Once cover art is loaded...
    cover.onload = () => {
        console.log('track loaded');
        // Cover art can load quicker than CSS animations so we
        // delay it to keep it things running smooth.
        setTimeout(() => {
            // Update track markup
            container.innerHTML = `<div class="track">
                <img class="track-cover" src="${track.cover}" alt="${track.album}">
                <p track="track-title">
                    <span class="track-name">${track.title}</span><br>
                    <span class="track-artist">${track.artist}</span><br>
                    <span class="track-album">${track.album}</span>
                </p>
            </div>`;

            // Set the background image to cover art.
            background.style.backgroundImage = 'url(' + track.cover + ')';

            // Udpate the page title to include the current track.
            title.innerHTML = track.title + ' by ' + track.artist + ' | ' + baseTitle;

            // Animate track in...
            body.classList.remove('is-hidden');
            console.log('track fadein');
        }, 750);
    };
}

// Initialize.
getLatestTrack();

// Check for an update every 5 seconds.
setInterval(() => getLatestTrack(), (1000 * 5));
