async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);
  const cities = await request.json();
  console.log(cities);
  function findMatches(wordToMatch, cities) {
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

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;