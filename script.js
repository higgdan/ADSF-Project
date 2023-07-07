const searchBtn = document.getElementById('search-btn');
const songList = document.getElementById('song');
const songDetailsContent = document.querySelector('.song-details-content');
const songDetails = document.querySelector('.song-details');
const recipeCloseBtn = document.getElementById('modal-close-btn');
const modalTitle = document.querySelector("#track-title");
const modalArtwork = document.querySelector("#track-song-img");
const modalCategory = document.querySelector("#track-category");
const modalTrackLink = document.querySelector("#track-link");

// event listeners
searchBtn.addEventListener('click', getsongList);
songList.addEventListener('click', getsongTrack);
recipeCloseBtn.addEventListener('click', () => {
    songDetails.style.display = "none";
    songDetailsContent.parentElement.classList.remove('showTrack');
});


// get song list that matches with the ingredients
function getsongList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(song => {
                    html += `
                        <div class="song-item" data-id="${song.idMeal}">
                            <div class="song-img">
                                <img src="${song.strMealThumb}" alt="song">
                            </div>
                            <div class="song-name">
                                <h3 class="pt-8">${song.strMeal}</h3>
                                <p class="text-slate-500">${song.strMeal}</p>
                                <a href="#" class="track-btn pb-4">Get Lyrics</a>
                            </div>
                        </div>
                    `;
                });
                songList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any song!";
                songList.classList.add('notFound');
            }

            songList.innerHTML = html;
        });
}


// get track of the song
function getsongTrack(e) {
    e.preventDefault();
    if (e.target.classList.contains('track-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => songTrackModal(data.meals[0]));
    }
}

// create a modal
function songTrackModal(meal) {
    songDetails.style.display = "block";
    songDetailsContent.parentElement.classList.add('showTrack');
    modalTitle.innerText = meal.strMeal;
    modalArtwork.innerHTML = `<img src="${meal.strMealThumb}" alt="Album Artwork">`;
    modalCategory.innerText = meal.strCategory;
    modalTrackLink.textContent = meal.strInstructions;
}
