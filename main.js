// import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  // console.log("hello");
  e.preventDefault();
  const searchTerm = searchInput.value;
  // console.log(searchTerm);
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // console.log(sortBy);
  const searchLimit = document.getElementById('limit').value;
  console.log(searchLimit);

  if (searchTerm === '') {
    showMessage('Please add a search term', 'alert-danger');
  }

  // searchInput.value = '';
  // search reddit
  search(searchTerm, searchLimit, sortBy)
    .then(results => {
      console.log(results);
      let output = '<div class="card-columns">';
      results.forEach(post => {
        // check for image
        const image = post.preview ? post.preview.images[0].source.url :
          'https://media.buzz.ie/uploads/2019/02/25152150/new-icon.png';

        output += `
        <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title.substring(0, 120)}</h5>
              <p class="card-text">${post.selftext.substring(0, 170)}</p>
              <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
        </div>
          `;
      });
      output += '</div>'
      document.getElementById('results').innerHTML = output;
    });

});


// show message
function showMessage(message, className) {
  // create div
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  // console.log(div);
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search');
  // console.log(search);
  searchContainer.insertBefore(div, search);
  // console.log(searchContainer);
  setTimeout(() => div.remove(), 1000);

}

function search(searchTerm, searchLimit, sortBy) {

  const proxy = "https://cors-anywhere.herokuapp.com/"; 
  const url = `${proxy}http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err));
}