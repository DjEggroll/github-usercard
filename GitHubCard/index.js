import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
STEP 2: Inspect and study the data coming back, this is YOUR
github info! You will need to understand the structure of this
data in order to use it to build your component function

Skip to STEP 3 (line 34).
*/

/*
STEP 4: Pass the data received from Github into your function,
and append the returned markup to the DOM as a child of .cards
*/

/*
STEP 5: Now that you have your own card getting added to the DOM, either
follow this link in your browser https://api.github.com/users/<Your github name>/followers,
manually find some other users' github handles, or use the list found at the
bottom of the page. Get at least 5 different Github usernames and add them as
Individual strings to the friendsArray below.

Using that array, iterate over it, requesting data for each user, creating a new card for each
user, and adding that card to the DOM.
*/

const followersArray = ['minasoha', 'Prismateria', 'justsml', 'luishrd',
'danielgirardin'];


/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function getCards (arr){
  const allCards = document.querySelector('.cards');
  arr.forEach(github => {   
    axios.get(`https://api.github.com/users/${github}`)
    .then((res) => {
      // console.log(res.data)
      allCards.appendChild(cardMaker(res.data));
    })
    .catch((err) => {
      console.error(err);
    });
  }); 
  return allCards;
}

getCards(followersArray);


function cardMaker({avatar_url, name, login, location, html_url, followers, following, bio}) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add("card");

  const image = document.createElement("img");
  image.src = avatar_url;
  cardContainer.appendChild(image);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  cardContainer.appendChild(cardInfo);

  const person = document.createElement("h3");
  person.classList.add("name");
  person.textContent = name;
  cardInfo.appendChild(person);

  const userName = document.createElement('p');
  userName.classList.add('username');
  userName.textContent = login;
  cardInfo.appendChild(userName);

  const area = document.createElement('p');
  area.textContent = `Location: ${location}`
  cardInfo.appendChild(area);

  const profile = document.createElement('p');
  profile.textContent = 'Profile:';
  cardInfo.appendChild(profile);

  const profileLink = document.createElement('a');
  profileLink.href = html_url;
  profileLink.textContent = html_url;
  profile.appendChild(profileLink);

  const totalFollowers = document.createElement('p');
  totalFollowers.textContent = `Followers: ${followers}`
  cardInfo.appendChild(totalFollowers);

  const totalFollowing = document.createElement('p');
  totalFollowing.textContent = `Following: ${following}`
  cardInfo.appendChild(totalFollowing);

  const userBio = document.createElement('p');
  userBio.textContent = `Bio: ${bio}`;
  cardInfo.appendChild(userBio);

  return cardContainer;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
