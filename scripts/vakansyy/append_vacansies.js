




fetch('/collection_of_vacansi/list.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        localStorage.setItem('data', JSON.stringify(data));
    })

let list_container = document.querySelector('.list__cont');
let btnBack = document.querySelector('.btn__back');
let btnForward = document.querySelector('.btn__forward');
let pageNum = 1;
let database = JSON.parse(localStorage.getItem('data'))
let cardNum;
let start;
let end;
let current__page = document.querySelector('.pagenum')
const width1280 = window.matchMedia('(min-width: 1247px)');
let cardArr = [];
let cardBtnArr = []
console.log('launch')


function appendCards() {
    for (let i = start; i < end; i++) {
        let list__cont__item = document.createElement('div');
        list__cont__item.className='list__cont__item';
        let list__cont__item__container = document.createElement('div');
        list__cont__item__container.className='list__cont__item__container';
        let cont__item__title = document.createElement('h3');
        cont__item__title.className='cont__item__title';
        let cont__item__list = document.createElement('ul');
        cont__item__list.className='cont__item__list';
        let cont__item__list__child__name=document.createElement('li');
        cont__item__list__child__name.className='cont__item__list__child__name';
        let cont__item__list__child__type = document.createElement('li');
        cont__item__list__child__type.className='cont__item__list__child';
        let cont__item__list__child__city = document.createElement('li');
        cont__item__list__child__city.className='cont__item__list__child';
        let text = document.createElement('p');
        text.className='text';
        list_container.appendChild(list__cont__item);
        list__cont__item.appendChild(list__cont__item__container);
        cont__item__title.innerHTML="Email : " + database[i].email;
        cont__item__list__child__name.innerHTML="Name : " + database[i].name;
        cont__item__list__child__city.innerHTML="City : " + database[i].city;
        cont__item__list__child__type.innerHTML="Privateness : " + database[i].type;
        text.innerHTML="Details : " + database[i].text;
        list__cont__item__container.appendChild(cont__item__title);
        cont__item__list.appendChild(cont__item__list__child__name)
        cont__item__list.appendChild(cont__item__list__child__city)
        cont__item__list.appendChild(cont__item__list__child__type);
        list__cont__item__container.appendChild(cont__item__list);
        list__cont__item__container.appendChild(text);
        cardArr.push(list__cont__item);
    }
}


function definePoints(cardOnPage) {
    if (localStorage.getItem('current') === null) {
        localStorage.setItem('current', pageNum);
    } else {
        pageNum = localStorage.getItem('current');
    }
    start = (parseInt(pageNum) - 1) * cardOnPage;
    end = parseInt(start) + cardOnPage;
    current__page.innerHTML = localStorage.getItem('current');
}



btnForward.addEventListener('click', () => {
    pageNum = current__page.innerHTML
    pageNum = parseInt(pageNum) + 1;
    start = (parseInt(pageNum) - 1) * cardNum;
    end = parseInt(start) + cardNum
    if (database.slice(start, end).length !== 0) {
        if (database.slice(start, end).length < cardNum) {
            localStorage.setItem('maxPageValue', localStorage.getItem('current'));
        }
        cardArr.forEach(item => {
            item.style.display = "none";
        })
        localStorage.setItem('current', pageNum);
        current__page.innerHTML = localStorage.getItem('current')
        appendCards()
    }
})


btnBack.addEventListener('click', () => {
    if (parseInt(current__page.innerHTML) > 1) {
        cardBtnArr.splice(0, cardBtnArr.length)
        pageNum = current__page.innerHTML;
        pageNum = parseInt(pageNum) - 1;
        start = (parseInt(pageNum) - 1) * cardNum;
        end = parseInt(start) + cardNum;
        localStorage.setItem('current', pageNum)
        if (database.slice(start, end).length !== 0) {
            btnForward.classList.add('active')
            cardArr.forEach(item => {
                item.style.display = "none";
            })
            current__page.innerHTML = localStorage.getItem('current');
            appendCards();
        }
    }
})

const appendEight = matchMedia("(min-width:1247px)");

function showFirst(cardNum) {
    cardArr.forEach(item => {
        item.style.display = "none";
    })
    cardBtnArr.splice(0, cardBtnArr.length)
    cardArr.splice(0, cardArr.length)
    definePoints(cardNum);
    appendCards();
}


function resize() {
    if (appendEight.matches) {
        cardNum = 12;
        showFirst(cardNum);
    }
    if (window.innerWidth < 1240 && window.innerWidth > 545) {
        cardNum = 8;
        showFirst(cardNum);
    }
    if (window.innerWidth < 545 && window.innerWidth > 100) {
        cardNum = 6;
        showFirst(cardNum);
    }
}
window.addEventListener('resize', resize);
resize();

