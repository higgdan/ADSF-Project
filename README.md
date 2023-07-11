# Project 1 - Interactive Front-End Application
## Storio: A story translation application by ADSF

For the first bootcamp group project, our team, ADSF (Arshad , Daniel and Shaun!) set out to collaboratively build an interactive application that solves a real world problem. 

![An example of the landing page for Accentio](./assets/images/placeholder1.png)

## Choosing a problem to solve!
Settling on an idea that would address a real-world problem wasn't easy! A top-down approach of spit-balling ideas of problems we wanted to solve, then finding the relevant APIs didn't work for us, so we settled for browsing websites with lists of free APIs hoping to find two that would synergise together in a meaningful way. 

Team member Shaun had brought an initial mock-up of an application that utilised the spotify API as proof of concept for integrating a fetch method call with search functionality, generating a list of artists and songs. So, as a starting point we had music as a theme for our application. Further browsing the free API lists we came across a language translation API that could provide a novel problem to solve with our project. Despite this, detailed further below, **we made the call mid-project to pivot from music lyrics to *telling stories.***

In order to get a clear idea of what we wanted to achieve, we needed to define the user story for our proposed application:
```
AS A multilingual parent
I WANT to be able to translate the stories contained in Aesop's Fables, into a language other than English
SO THAT I can read stories with a moral to my child in their mother tongue
```

And in planning the functionality of our application, in order to define the specifications for a minimum viable product, we laid out the following criteria for the user experience:
```
GIVEN a search input on the landing page of the application
WHEN the user enters a search query for a story
THEN they are presented with a list of closest matches to their search 
WHEN the user clicks on their desired choice
THEN a modal appears and presents the user with the chosen story in the default language
GIVEN a select box on the modal with options for multiple languages
WHEN a language is selected
THEN the story, and moral tagline, are replaced with a translated version in the selected language
WHEN the user reloads the page
THEN the application will again present a modal with a translated story in the selected language from the previous session
```

## Finding the right APIs to work with, and pivoting the application
In the research phase, we endeavored to locate APIs that suited our needs, that ideally had clear documentation and example code that we could modify into our application.
### API 1 - ~~Song Lyrics~~ Short Stories
The initial mockup of our application utilised the spotify API to generate a list of artists and songs. We wanted to replace this with an API with that had a lyrics output tied to songs we wanted to search for. There were plenty of options to consider: LyricAPI; GeniusAPI, MusixmatchAPI, OpenAPI, and Charlytic API. 

Team member Arshad spent considerable time narrowing down our options and had almost settled on Carlytic API, but even that had issues. Many of the lyric APIs returned the same error, i.e. no-cors, which we could not resolve on our end. Due to time constraints, our team decided to change our focus and instead use the Short Stories API, which was much easier to make requests from and also to implement the output.

![An example of the story selection function in action](./assets/images/placeholder2.png)

### API 2 - Translation
Initially we narrowed down the candidates for a possible translation APIs to Libre, Lecto and Google. Libre Translate was initially very appealing as the documentation was understandable and had examples that were clear and implementable given our current capability. On closer inspection, Libre actually required considerable paid access ($30!) for an API key. Google on the other hand was a step too far, beyond our capability to understand and implement quickly.

Lecto Translation API worked for us as there were over 90 languages to translate to; the documentation was well laid out, easy to understand; and the examples were robust, for multiple coding languages, including vanilla JavaScript (all contained in its own github repo!)

![An example of the modal with a translated story](./assets/images/placeholder3.png)

## CSS Styling
One key requirement of the project was to style our application with a new CSS framework not previously encountered in the coursework. Tailwind seemed like an easy choice that had name recognition. The features of Tailwind that we found streamlined styling our application was being able to quickly implement styling from within the HTML file, and the  modular, class-naming paradigm reduced the need to continually come up with unique class names.

## Other Challenges
Other that settling on our APIs, there were a couple of merge conflicts and issues that arose that became valuable learning experiences into the aspects of group collaboration.
* Our first pseudo-conflict arose when a modal was initially constructed as static HTML, but moved to become dynamically populated in the JavaScript, thus impeding another feature branch that was developed on the assumption that the references modal were still in the HTML. 
* When a pull request in github had conflicts that prevented merging, yet we were ok with the proposed changes, we learned how tho accept changes between main and the feature branch within VSCode.


## Future Development
In order to extend our application beyond the MVP delivered, we believe our application could be further developed in the following ways:
* Extending the values in local storage to include multiple languages.
* Also potentially store entire stories into local storage to save on fetch calls to 3rd party servers.
* cleanup code: the list of supported languages was long, but was manually constructed as the list required editing down (double-ups and extraneous ISO codes, BCP47 language tags). There is provision to dynamically populate the language selector from the API, so perhaps that can be done while also cleaning up the values that mess up the list.


## Associated links:

Repo:
https://github.com/higgdan/ADSF-Project

Application:
https://higgdan.github.io/ADSF-Project/

Project Kanban Board:
https://github.com/users/higgdan/projects/1

Lecto Translation API:
https://lecto.ai/

Short Stories API:
https://github.com/poseidon-code/shortstories-api