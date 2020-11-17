const containerMap = document.querySelector('#map');
const myMap = require('./js/map');
const events = require('./js/events');
const api = require('./js/api');


ymaps.ready(async () => {
    const customBalloonTemplate = document.getElementById('customBalloonTemplate').innerHTML;
    const customClustererItemLayout = document.getElementById('customClustererItemLayout').innerHTML;

    const balloonTemplate = ymaps.templateLayoutFactory.createClass(customBalloonTemplate);
    const clustererItemLayout = ymaps.templateLayoutFactory.createClass(customClustererItemLayout);

    ymaps.layout.storage.add('my#customBalloon', balloonTemplate);
    ymaps.layout.storage.add('my#clustererItemLayout', clustererItemLayout);

    try {
        const coords = await myMap.geoLocation();
        const placemarks = await api.getPlacemarks();

        myMap.map(coords, containerMap);
        myMap.clusterer();
        myMap.createPlacemarks(placemarks);

        events.click();
    } catch (error) {
        console.log(error);
    }
});