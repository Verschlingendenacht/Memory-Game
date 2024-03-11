//if it's a match card turns white
//if it's not a match card turns back to default (blank)

const cardArray = [ //objects are repeated because they need to match with their respective pair
    {
        name: 'fries',
        img: './images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: './images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: './images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: './images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: './images/milkshake.png'
    },
    {
        name: 'pizza',
        img: './images/pizza.png'
    },
    {
        name: 'fries',
        img: './images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: './images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: './images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: './images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: './images/milkshake.png'
    },
    {
        name: 'pizza',
        img: './images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random()) // sort() compares 2 of the array's indexes by using a compare callback, the value of the indexes don't matter, what matter to the comparison is the value that the sort function returns.
//As for the specific algorithm the given operation will result in either a negative number (less than 0) equal to 0 or greater than 0
//Since Math.random() returns a random number between 0 and 1 we might expect results such as: -0.2, 0.4, -0.1, 0.3, -0.5, 0.2, 0.1, -0.4, 0.5, -0.3, etc
//Depending on the returned value from the operation sort() will operate as:

/*
If compareFunction is supplied, the array elements are sorted according to the return value of the compare function. If a and b are two elements being compared, then:

If compareFunction(a, b) is less than 0, sort a to an index lower than b, i.e. a comes first.
If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behavior, and thus not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this.
If compareFunction(a, b) is greater than 0, sort b to a lower index than a.
*/

const gridDisplay = document.querySelector('#grid'); //get the element where the cards will be displayed in
const resultDisplay = document.querySelector('#result'); //get the result (score) display field
let cardsChosen = []; //array with names of chosen cards
let cardsChosenIds = []; //array with ids of chosen cards
let cardsWon = [] //array with matched cards

function createBoard () {
    for (let i = 0; i < cardArray.length; i++) { //create as many cards as we've got in the array
        const card = document.createElement('img'); //create a card
        card.setAttribute('src', './images/blank.png'); //set each image with the specified source
        card.setAttribute('data-id', i); //unique id for each card        
        card.addEventListener('click', flipCard); //add a click listener (event listener) to each card (calls a certain function upon something, in this case a click)
        gridDisplay.appendChild(card); //append() accepts both Node objects and DOMStrings (text i.e: "Hello World") while appendChild accepts only Node objects
        //appending basically places an element inside another.

    }
}
createBoard(); //set the cards on the grid

function flipCard () { //flip the card when we click it
    const cardId = this.getAttribute('data-id'); //this in an event listener refers to the element that received the event, as for the case this translates to "img.data-id"
    //simply getting which card was clicked
    cardsChosen.push(cardArray[cardId].name); //saves the name of the flipped card into another array
    cardsChosenIds.push(cardId); //saves the flipped card's Id into another array
    this.setAttribute('src', cardArray[cardId].img); //set the clicked image to their corresponding image attribute
    //this works because cardArray[cardId].img references a relative URL (basically revealing the card)
    if (cardsChosen.length === 2) { //check for match once we've picked 2 cards
        setTimeout(checkMatch, 500);
    }
}

function checkMatch () {
    const cards = document.querySelectorAll('#grid img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    if (optionOneId === optionTwoId) { //player tries to match card against itself
        cards[optionOneId].setAttribute('src', 'images/blank.png'); //resets match to default image (remember, don't worry, this doesn't change the card itself, as long as the card's Id remain untouched it's true value (image) will be there)
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('You have clicked the same card');
    }

    if(cardsChosen[0] === cardsChosen[1]){ //check if the names of the flipped cards match
        alert('you found a match');
        cards[optionOneId].setAttribute('src', 'images/white.png'); //from all the cards in the grid search for the first match with its Id and set the card as a white
        cards[optionTwoId].setAttribute('src', 'images/white.png'); //we do the same for the second match
        cards[optionOneId].removeEventListener('click', flipCard); //stop first match from listening to events when clicked, removeEventListener() first argument is what event to remove and second argument what callback to disable for said element when the removed event is triggered
        cards[optionTwoId].removeEventListener('click', flipCard); //repeat the same for the second match 
        cardsWon.push(cardsChosen); //save matched cards
    } else { //if it's not a match
        cards[optionOneId].setAttribute('src', 'images/blank.png'); //turn the first pick to default again
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('Sorry, try again!');
    }
    resultDisplay.textContent = cardsWon.length; //Display and update current score every time a match is evaluated

    //reset game's match evaluation after each turn
    cardsChosen = [];
    cardsChosenIds = [];

    if(cardsWon.length === (cardArray.length/2)){ //check if all cards have been matched
        resultDisplay.textContent = 'Congratulations! You found all the matches..'
    }
}
