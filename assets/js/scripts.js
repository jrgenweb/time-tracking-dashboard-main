let timeData = [];

const dashBoard = document.querySelector('.dashboard');

const selectorLinks = document.querySelectorAll('.selector_link');
let selectedLink = 'weekly'

selectorLinks.forEach(link => {
    link.addEventListener('click', changeSelection)
    if (link.dataset.selected === selectedLink) {
        link.classList.add('active');
    }
})

async function fetchProducts() {
    try {
        const response = await fetch("/data.json");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        timeData = data;
        renderDashboard();
    } catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}



function createCardEl(selected, data) {
    const cardEl = document.createElement('article')
    cardEl.classList.add('card');
    cardEl.dataset.title = data.title;

    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card__body');



    const cardTitleEl = document.createElement('h2');
    cardTitleEl.classList.add('card__title');
    cardTitleEl.innerText = data.title;

    const cardTimeEl = document.createElement('p');
    cardTimeEl.classList.add('card__time');
    cardTimeEl.innerText = data["timeframes"][selected]["current"] + 'hrs';

    const cardLinkEl = document.createElement('a');
    cardLinkEl.classList.add('card__link');
    cardLinkEl.setAttribute('href', '#');
    cardLinkEl.innerHTML = '<img src="\/assets/images/icon-ellipsis.svg\">';

    const cardLastEl = document.createElement('p');
    cardLastEl.classList.add('card__last');
    cardLastEl.innerText = "Last Week - " + data["timeframes"][selected]["previous"] + "hrs";


    cardBodyEl.appendChild(cardTitleEl);
    cardBodyEl.appendChild(cardTimeEl);
    cardBodyEl.appendChild(cardLinkEl);
    cardBodyEl.appendChild(cardLastEl);
    cardEl.appendChild(cardBodyEl);

    return cardEl;
}

function changeSelection(event) {


    selectorLinks.forEach(link => {
        link.classList.remove('active')
        console.log(link);
    });
    const selected = event.target.dataset.selected;
    selectedLink = selected;
    event.target.classList.add('active')

    renderDashboard();
}

function renderDashboard() {


    //remove all previous card element
    const cardsEl = document.querySelectorAll('.dashboard .card');
    cardsEl.forEach(element => element.remove());
    timeData.forEach(element => {
        dashBoard.appendChild(createCardEl(selectedLink, element));
    });
}


fetchProducts();