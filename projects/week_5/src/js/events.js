const form = require('./form');
const map = require('./map');
const myMap = require('./map');

function onMapClick(e) {
    const coords = e.get('coords');
    myMap.openBalloon(coords);
}

function onGeoObjectClick(e) {
    const target = e.get('target');
    const coords = target.geometry.getCoordinates();
    const geoObjects = target.properties.get('geoObjects');

    if (!geoObjects) {
        myMap.openBalloon(coords);
        target.options.set({
            iconLayout: "default#image",
            iconImageHref: "img/sprites.png",
            iconImageSize: [62, 80],
            iconImageOffset: [-31, -80],
            iconImageClipRect: [[-10, 0], [0, -10]],
        });
    } else {
        myMap.openClusterer(target);
    }
}

async function documentClick(e) {
    e.preventDefault();
    if (e.target.dataset.role) {
        let role = e.target.dataset.role;
        if (role === 'review-close') {
            ymaps.map.balloon.close();
        } else if (role === 'clusterer-link') {
            const coords = e.target.dataset.coords.split(",");
            myMap.openBalloon(coords);
        } else if (role === 'review-add') {
            const rebound = await form.getForm();

            if (rebound) {
                map.createPlacemarks(rebound);
            }
        }
    }

}

function click() {
    ymaps.map.events.add('click', onMapClick);
    ymaps.map.geoObjects.events.add('click', onGeoObjectClick);
    document.body.addEventListener('click', documentClick);
}

module.exports = {
    click
};