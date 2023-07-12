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
let storyId = "";

// create a function to define the actions to fire when opening the application
let onLoad = function () {
    // if the local storage is NOT empty, set the langSelectEl option value and the chosen language variables 
    if (localStorage.getItem("Storio-langCode") !== null) {
        langSelectEl.value = localStorage.getItem("Storio-langCode");
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
    localStorage.setItem("Storio-langCode", chosenLangCode);
    console.log("DDD " + storyId);
    fetchStoryMoral();
}

// every time an new language option is chosen run the selectLang function
langSelectEl.onchange = selectLang;

// event listeners
searchBtn.addEventListener('click', getStoryList);
storyList.addEventListener('click', setStoryIdVar);
recipeCloseBtn.addEventListener('click', () => {
    storyDetails.style.display = "none";
    storyDetailsContent.parentElement.classList.remove('showTrack');
});


let usedImageUrls = [];
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

    // Check if all image URLs have been used
    if (usedImageUrls.length === imageUrls.length) {
        // Reset the used image URLs array
        usedImageUrls = [];
    }

    // Generate a random index that hasn't been used before
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * imageUrls.length);
    } while (usedImageUrls.includes(randomIndex));

    // Mark the generated index as used
    usedImageUrls.push(randomIndex);

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

                data.forEach(story => {
                    const randomImageUrl = generateRandomImageUrl();
                    html += `
                        <div class="story-item" data-id="${story._id}">
                            <div class="story-img">
                                <img src="${randomImageUrl}" alt="story">
                            </div>
                            <div class="story-name pb-2">
                                <h3 class="font-bold pt-4">${story.title}</h3>
                                <p class="text-slate-400">${"~" + story.author}</p>
                                <a href="#" class="track-btn pb-4">Get Story</a>
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

// sets storyId variable to match story chosen tyhen fires fetchStoryMoral function
function setStoryIdVar(e) {
    e.preventDefault();
    if (e.target.classList.contains('track-btn')) {
        let storyItem = e.target.parentElement.parentElement;
        storyId = $(storyItem).data("id");
        console.log("DDD " + storyId);

        fetchStoryMoral();
    }
}

// fetches story and moral and feeds data into create modal and translate functions
let fetchStoryMoral = function() {
    fetch(`https://shortstories-api.onrender.com/stories/`)
    .then(response => response.json())
    .then(function (data) {
        for (i = 0; i < data.length; i++) {
            if (data[i]._id === storyId) {
                storyTrackModal(data[i]);
                console.log(data[i].story + "\n" + data[i].moral);
                if (localStorage.getItem("Storio-langCode") !== null) {
                    translateStory(data[i].story, data[i].moral)
                }
            }
            else {
                console.log("no story");
            }
        }
    });
}

// 33 story body over 1000char, 0 moral, 44 combined
// first story is under combined char limit
// second story is over combined char limit
// third story is over story char limit

// create a modal
function storyTrackModal(data) {
    storyDetails.style.display = "block";
    storyDetailsContent.parentElement.classList.add('showTrack');
    modalTitle.innerText = data.title;
    if (localStorage.getItem("Storio-langCode") !== null) {
        modalTrackLink.textContent = "Please wait, translating...";
        modalCategory.innerText = "";
    } else {modalTrackLink.textContent = data.story;
            modalCategory.innerText = data.moral;
    };
}

// input the story body and moral text and chosen language into the fetch method
// modified sample code from the Lecto Translation API
// story/moral/text(s) to translate and target language must be set within an array.
let translateStory = function (storyBody, storyMoral) {
    const url = 'https://api.lecto.ai/v1/translate/text';
    const apiKey = 'HHVCNBF-2FJ4J48-NHYT9HA-TY41ZRY';
    const payload = {
        texts: [storyBody, storyMoral],
        to: [chosenLangCode],
        from: "en"
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let translatedStoryBody = data.translations[0].translated[0];
            let translatedStoryMoral = data.translations[0].translated[1];
            console.log(translatedStoryBody + "\n" + translatedStoryMoral);
            replaceStoryBody(translatedStoryBody, translatedStoryMoral)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

let replaceStoryBody = function(repStory, repMoral) {
    if (localStorage.getItem("Storio-langCode") !== null) {
    modalTrackLink.textContent = repStory;
    modalCategory.innerText = repMoral;
    }
}

// execute application
onLoad();