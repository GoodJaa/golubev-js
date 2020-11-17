const api = require('./api');

const placemarkIcon = {
    iconLayout: "default#image",
    iconImageHref: "img/sprites.png",
    iconImageSize: [62, 80],
    iconImageOffset: [-31, -80],
    iconImageClipRect: [[0, -10], [-10, 0]],
};

async function geoLocation() {
    const currentPosition = await ymaps.geolocation.get({ provider: 'auto' });
    return currentPosition.geoObjects.position;
}

function map (coords, containerMap) {
    ymaps.map = new ymaps.Map(containerMap, {
        center: coords,
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });
}

function clusterer() {
    ymaps.clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: 'true',
        clusterOpenBaloonClick: 'false',
        clusterBalloonContentLayout: "cluster#balloonCarousel",
        clusterBalloonItemContentLayout: 'my#clustererItemLayout'
    });

    ymaps.map.geoObjects.add(ymaps.clusterer);
}

async function openBalloon (coords) {
    ymaps.map.balloon.open(coords, 'Загрузка...', { closeButton: false});

    const comments = await api.getPlacemark(coords);
    const address = await geoCoder(coords);
    const data = {
        address,
        coords,
        comments
    };

    ymaps.map.balloon.open(coords, data, {layout: 'my#customBalloon'} );
}

async function openClusterer (target) {
    const coords = target.geometry.getCoordinates();
    
    ymaps.map.balloon.open(coords, 'Загрузка...', { closeButton: false });

    const geoObjects = target.getGeoObjects();

    for( const geoObject of geoObjects) {
        const coords = geoObject.geometry.getCoordinates();
        const comments = await api.getPlacemark(coords);
        const address = await geoCoder(coords);

        geoObject.properties.set("comments", comments).set("address", address).set("coords", coords);
    }

    ymaps.map.balloon.close(coords);
    ymaps.clusterer.balloon.open(target);
}

function createPlacemarks(placemarks = {}) {
    for (let placemark in placemarks) {
        const coords = placemark.split(",");
        const data = placemarks[placemark];

        ymaps.clusterer.add(new ymaps.Placemark(coords, data, placemarkIcon));
    }
}

async function geoCoder (coords) {
    const geocoder = await new ymaps.geocode(coords, { result: 1 });
    return geocoder.geoObjects.get(0).properties.get('name');
}

module.exports = {
    geoLocation,
    clusterer,
    openBalloon,
    geoCoder,
    createPlacemarks,
    map,
    openClusterer
};