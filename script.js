const searchBtn = document.getElementById('search-btn');
const storyList = document.getElementById('story');
const storyDetailsContent = document.querySelector('.story-details-content');
const storyDetails = document.querySelector('.story-details');
const recipeCloseBtn = document.getElementById('modal-close-btn');
const modalTitle = document.querySelector("#track-title");
const modalArtwork = document.querySelector("#track-story-img");
const modalCategory = document.querySelector("#track-category");
const modalTrackLink = document.querySelector("#track-link");
const langSelectEl = document.getElementById("language-selector");

// define initial values of variables
let chosenLangCode = "";
let chosenLangText = "";

// create a function to define the actions to fire when opening the appliction
let onLoad = function () {
    // if the local storage is NOT empty, set the langSelectEl option value and the chosen language variables 
    if (localStorage.getItem("Accentio-langCode") !== null) {
        langSelectEl.value = localStorage.getItem("Accentio-langCode");
        setChosenLangVars();
        console.log("Language set to: " + chosenLangText + " (" + chosenLangCode + ")");
    }
}

// update the language name and language code
let setChosenLangVars = function () {
    chosenLangCode = langSelectEl.value;
    chosenLangText = langSelectEl.options[langSelectEl.selectedIndex].text;
}
// set chosen language variables and save to local storage
let selectLang = function () {
    setChosenLangVars();
    console.log("Language set to: " + chosenLangText + " (" + chosenLangCode + ")");
    localStorage.setItem("Accentio-langCode", chosenLangCode)
}

//every time an new langage option is chosen run the selectLang function
langSelectEl.onchange = selectLang;

// event listeners
searchBtn.addEventListener('click', getStoryList);
storyList.addEventListener('click', getStoryTrack);
recipeCloseBtn.addEventListener('click', () => {
    storyDetails.style.display = "none";
    storyDetailsContent.parentElement.classList.remove('showTrack');
});

// Generate a random image URL
function generateRandomImageUrl() {
    const imageUrls = [
        './assets/story/story-1.png',
        './assets/story/story-2.png',
        './assets/story/story-3.png',
        './assets/story/story-4.png',
        './assets/story/story-5.png',
        './assets/story/story-6.png',
        './assets/story/story-7.png',
        './assets/story/story-8.png',
        './assets/story/story-9.png',

        // Add more image URLs as needed
    ];

    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}

// get story list that matches with the ingredients
function getStoryList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://shortstories-api.onrender.com/stories/?q=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            if (data) {
                console.log("hi");
                data.forEach(story => {
                    const randomImageUrl = generateRandomImageUrl();
                    html += `
                        <div class="story-item" data-id="${story._id}">
                            <div class="story-img">
                                <img src="${randomImageUrl}" alt="story">
                            </div>
                            <div class="story-name pb-2">
                                <h3 class="font-bold pt-4">${story.title}</h3>
                                <p class="text-slate-400">${story.title}</p>
                                <a href="#" class="track-btn pb-4">Get Lyrics</a>
                            </div>
                        </div>
                    `;
                });
                storyList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any story!";
                storyList.classList.add('notFound');
            }

            storyList.innerHTML = html;
            document.querySelector('.title').style.display = 'block';
            document.querySelector('.hero').style.display = 'none';
            document.querySelector('.accentio-img').style.display = 'none';
            document.querySelector('.subtext').style.display = 'none';

        });
}


// get track of the story
function getStoryTrack(e) {
    e.preventDefault();
    if (e.target.classList.contains('track-btn')) {
        let storyItem = e.target.parentElement;
        // console.log(storyItem);
        console.log(storyItem._id);
        fetch(`https://shortstories-api.onrender.com/stories/${storyItem.id}`)
            .then(response => response.json())
            .then(data => storyTrackModal(data[0]));
    }
}

// create a modal
function storyTrackModal(data) {
    storyDetails.style.display = "block";
    storyDetailsContent.parentElement.classList.add('showTrack');
    modalTitle.innerText = data.title;
    modalCategory.innerText = data.story;
    modalTrackLink.textContent = data.moral;
}

// execute application
onLoad();