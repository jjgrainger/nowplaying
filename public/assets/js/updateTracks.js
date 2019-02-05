// Update recent tracks
const updateTracks = (tracks) => {
    let container = app.components.recent;

    container.innerHTML = ``;

    tracks
        .map(trackTemplate)
        .forEach((track) => {
            let item = document.createElement('li');
            item.innerHTML = track;
            container.appendChild(item);
        });
};
