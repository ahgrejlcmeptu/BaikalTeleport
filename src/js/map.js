let myMap;
const map = document.querySelector('#map')

ymaps.ready(init);

function init () {
  if (!map) return;

  myMap = new ymaps.Map(map, {
    center: [52.46605350805378,104.16052432812492],
    zoom: 10,
    controls: []
  });

}
