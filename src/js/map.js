let myMap;
const homeMap = document.querySelector('.home-map #map')
const contactMap = document.querySelector('.index-contacts #map')

ymaps.ready(homeInit);
ymaps.ready(contactInit);

function homeInit () {
  if (!homeMap) return;

  myMap = new ymaps.Map(homeMap, {
    center: [52.46605350805378,104.16052432812492],
    zoom: 10,
    controls: ['smallMapDefaultSet']
  });
}
function contactInit () {
  if (!contactMap) return;
  const cord = [52.28930157189103,104.28436149999999]
  const size = innerWidth > 1279 ? 50 : 40

  myMap = new ymaps.Map(contactMap, {
    center: [52.28901209026871,104.28449024603272],
    zoom: 17,
    controls: ['smallMapDefaultSet']
  });

  let pin = new ymaps.Placemark(cord, {
    hintContent: 'Пролетарская, 8',
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'pin.svg',
    iconImageSize: [size, size],
    iconImageOffset: [-size/2, -size/2],
  });
  myMap.behaviors.disable('scrollZoom');
  myMap.geoObjects.add(pin);
}
