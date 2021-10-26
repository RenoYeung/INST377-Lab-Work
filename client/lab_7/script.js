async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  const request = await fetch(endpoint);
  const cities = await request.json();
  const ACCESSTOKEN = 'pk.eyJ1IjoieHhoeWRyYXgiLCJhIjoiY2t1b3N3OXpkNGVsNjJxbnpiNTh6M3hqMCJ9.yanVbgvA5-MpTgB9eKS5Og';

  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  console.log(mymap);
  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTOKEN}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

  function findMatches(wordToMatch) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.category.match(regex);
    });
  }

  //   function numberWithCommas(x) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //   }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities);
    matchArray.slice(0, 5);
    const html = matchArray.map((place) => {
      const {name} = place;

      const {category} = place;

      return `
      <li>
          <span class="name">${name}, ${category}</span>
      </li>`;
    }).join('');
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;