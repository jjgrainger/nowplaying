class Scrobbler {
    constructor() {
        this.interval = false;
        this.listeners = {
            'update': [],
        };
    }

    // do something with the tracks
    update(tracks) {
        this.listeners['update'].forEach((listener) => {
            listener(tracks);
        });
    }

    // add event listeners
    on(event, callback) {
        if (!(event in this.listeners)) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);

        return this;
    }

    // fetch the latest tracks
    fetch() {
        axios
            .get('https://ws.audioscrobbler.com/2.0/', {
                params: {
                    method: "user.getrecenttracks",
                    limit: 11,
                    user: "jjgrainger",
                    api_key: "d6e011940033319dbaa1994e1e163080",
                    format: "json",
                }
            })
            .then(response => response.data.recenttracks.track)
            .then(tracks => tracks.map(this.transform))
            .then(this.update.bind(this));
    }

    // transform raw api track data
    transform(track) {
        let node = {
            id: 0,
            title: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            cover: 'https://placehold.it/300x300/000&text=&nbsp;',
            timestamp: false,
            time: 'Listening now...'
        };

        if (track.date) {
            node.timestamp = parseInt(track.date.uts) * 1000;
            node.time = moment(node.timestamp).fromNow();
        }

        if (track.image[2]['#text']) {
            node.cover = track.image[2]['#text'];
        }

        if (track.mbid) {
            node.id = track.mbid;
        } else {
            node.id = `${track.name}-${track.artist['#text']}`;
            node.id = node.id.replace(/ /g, '-').toLowerCase();
        }

        return node;
    }

    // run the scrobbler and fetch data on regular interval
    listen(interval = 5000) {
        // call initial fetch
        this.fetch();

        // set interval for regular checkin
        this.interval = setInterval(this.fetch.bind(this), interval);
    }

    // cancel interval
    cancel() {
        clearInterval(this.interval);
        this.interval = false;
    }
}
