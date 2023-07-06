const searchBtn = document.getElementById('search-btn');
const songList = document.getElementById('song');
const songDetailsContent = document.querySelector('.song-details-content');
const recipeCloseBtn = document.getElementById('modal-close-btn');

// event listeners
searchBtn.addEventListener('click', getsongList);
songList.addEventListener('click', getsongTrack);
recipeCloseBtn.addEventListener('click', () => {
    songDetailsContent.parentElement.classList.remove('showTrack');
});


// get song list that matches with the ingredients
function getsongList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(song => {
                html += `
                    <div class = "song-item" data-id = "${song.idMeal}">
                        <div class = "song-img">
                            <img src = "${song.strMealThumb}" alt = "song">
                        </div>
                        <div class = "song-name">
                            <h3 class = "pt-8">${song.strMeal}</h3>
                            <p class = "text-slate-500">${song.strMeal}</p>
                            <a href = "#" class = "track-btn pb-4">Get Lyrics</a>
                        </div>
                    </div>
                `;
            });
            songList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any song!";
            songList.classList.add('notFound');
        }

        songList.innerHTML = html;
    });
}


// get track of the song
function getsongTrack(e){
    e.preventDefault();
    if(e.target.classList.contains('track-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => songTrackModal(data.meals));
    }
}

// create a modal
function songTrackModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        
        <div class = "track-song-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "track-title">${meal.strMeal}</h2>
            <p class = "track-category">${meal.strCategory}</p>
        <div class = "track-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "track-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    songDetailsContent.innerHTML = html;
    songDetailsContent.parentElement.classList.add('showTrack');
}
