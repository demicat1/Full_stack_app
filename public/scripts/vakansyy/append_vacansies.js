fetch('/static/scripts/vakansyy/list.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        localStorage.setItem('data', JSON.stringify(data));
    })

fetch('/static/scripts/vakansyy/searchRES.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        localStorage.getItem('dataSearch', JSON.stringify(data));
    })


let database
let databaseINIT
if (JSON.parse(localStorage.getItem('dataSearch'))) {
    database = JSON.parse(localStorage.getItem('dataSeacrh'))
    databaseINIT = JSON.parse(localStorage.getItem("dataSeacrh"));
} else {
    database = JSON.parse(localStorage.getItem('data'))
    databaseINIT = JSON.parse(localStorage.getItem("data"));
}

let list_container = document.querySelector('.list__cont');
let btnBack = document.querySelector('.btn__back');
let btnForward = document.querySelector('.btn__forward');
let pageNum = 1;
let cardNum;
let start;
let end;
let current__page = document.querySelector('.pagenum')
const width1280 = window.matchMedia('(min-width: 1247px)');
let cardArr = [];
let cardBtnArr = []
console.log('launch')




//filtration parametres
// try{
//     if(JSON.parse(localStorage.getItem("FilteredArr")).length !==0){
//         database = JSON.parse(localStorage.getItem("FilteredArr"));
//     }
// }
// catch (err){
//     console.log(err)
// }
// if((localStorage.getItem("CityParam")) !==""){
//     filter__city.value = localStorage.getItem("CityParam");
// }

//показываю такие вакансии на нажаную кнопку
// let selectionBtn = document.querySelectorAll('.filter__item');
// let selectionBtnArr = Array.from(selectionBtn);
// selectionBtn.forEach(item => {
//     item.onclick = () => {
//         databaseINIT = database.filter(el => {
//             if (el.sphere === item.innerHTML) {
//                 return el;
//             }
//         })
//         console.log(item.innerHTML);
//         console.log(databaseINIT)
//         return databaseINIT
//     }
// })

let filter__city = document.getElementById('selected__city');
let FilterOptionCity;
let filter__privateness = document.getElementById('select__privateness');
let FilterOptionPrivateness;





var FilteredArr;
localStorage.setItem("PrivatenessParam", 'all');
localStorage.setItem("CityParam", "all")
filter__privateness.addEventListener("change", () => {
    new Promise((resolve, reject) => {
        let FPV = filter__privateness[filter__privateness.selectedIndex].value;
        if (FPV === "dont care") {
            localStorage.setItem("PrivatenessParam", "all");
        } else {
            localStorage.setItem("PrivatenessParam", FPV);
        }
        if (localStorage.getItem("CityParam") === 'all' && localStorage.getItem("PrivatenessParam") !== "all") {
            FilteredArr = databaseINIT.filter(item => {
                if (item.type === localStorage.getItem("PrivatenessParam")) {
                    return item;
                }
            })
        } else if (localStorage.getItem("PrivatenessParam") === "all" && localStorage.getItem("CityParam") !== "all") {
            FilteredArr = databaseINIT.filter(item => {
                if (item.city === localStorage.getItem("CityParam")) {
                    return item;
                }
            })
        } else if (localStorage.getItem("CityParam") === "all" && localStorage.getItem("PrivatenessParam") === "all") {
            FilteredArr = databaseINIT.map(item => {
                return item;
            });
        } else if (localStorage.getItem("CityParam") !== "all" && localStorage.getItem("PrivatenessParam") !== "all") {
            FilteredArr = databaseINIT.filter(item => {
                if (item.city === localStorage.getItem("CityParam") && item.type === localStorage.getItem("PrivatenessParam")) {
                    return item;
                }
            })
        }
        resolve(FilteredArr);
    }).then((FilteredArr) => {
        cardArr.forEach(item => {
            item.style.display = "none";
        })
        appendCards(FilteredArr)
        if (FilteredArr.length === 0) {
            alert('no vacansies')
        }
    })
})

filter__city.addEventListener("change", () => {
    new Promise((resolve, reject) => {
        localStorage.setItem("CityParam", filter__city[filter__city.selectedIndex].value);
        if (localStorage.getItem("CityParam") === "all" && localStorage.getItem("PrivatenessParam") !== "all") {
            FilteredArr = databaseINIT.filter(item => {
                if (item.type === localStorage.getItem("PrivatenessParam")) {
                    return item;
                }
            })
        } else if (localStorage.getItem("CityParam") === "all" && localStorage.getItem("PrivatenessParam") === "all") {
            FilteredArr = databaseINIT.filter(item => {
                return item;
            });
        } else if (localStorage.getItem("CityParam") !== "all" && localStorage.getItem("PrivatenessParam") === "all") {
            FilteredArr = databaseINIT.filter(item => {
                if (item.city === localStorage.getItem("CityParam")) {
                    return item;
                }
            });
        } else if (localStorage.getItem("CityParam") !== "all" && localStorage.getItem("PrivatenessParam") !== "all") {
            FilteredArr = databaseINIT.filter(item => {
                if (item.city === localStorage.getItem("CityParam") && item.type === localStorage.getItem("PrivatenessParam")) {
                    return item
                }
            })
        }
        resolve(FilteredArr);
    }).then((FilteredArr) => {
        cardArr.forEach(item => {
            item.style.display = "none";
        })
        appendCards(FilteredArr)
        if (FilteredArr.length === 0) {
            alert('no vacansies')
        }
    })
})






function appendCards(database) {
    for (let i = start; i < end; i++) {
        let list__cont__item = document.createElement('div');
        list__cont__item.className = 'list__cont__item';
        let list__cont__item__container = document.createElement('div');
        list__cont__item__container.className = 'list__cont__item__container';
        let cont__item__title = document.createElement('h3');
        cont__item__title.className = 'cont__item__title';
        let cont__item__list = document.createElement('ul');
        cont__item__list.className = 'cont__item__list';
        let cont__item__list__child__name = document.createElement('li');
        cont__item__list__child__name.className = 'cont__item__list__child__name';
        let cont__item__list__child__sphere = document.createElement('li');
        cont__item__list__child__sphere.className = 'cont__item__list__child__name';
        cont__item__list__child__sphere.innerHTML = 'Sphere  : ' + database[i].sphere;
        let cont__item__list__child__type = document.createElement('li');
        cont__item__list__child__type.className = 'cont__item__list__child';
        let cont__item__list__child__city = document.createElement('li');
        cont__item__list__child__city.className = 'cont__item__list__child';
        let cont__item__list__child__salary = document.createElement('li');
        cont__item__list__child__salary.className = 'cont__item__list__child__salary';
        cont__item__list__child__salary.innerHTML = "Salary  : " + database[i].salary;
        let cont__item__btn = document.createElement('button');
        cont__item__btn.className = 'btn btn-primary p-2 w-25';
        cont__item__btn.innerHTML = "See more";
        let text = document.createElement('p');
        text.className = 'text';
        list_container.appendChild(list__cont__item);
        list__cont__item.appendChild(list__cont__item__container);
        cont__item__title.innerHTML = database[i].title;
        cont__item__list__child__name.innerHTML = "Name : " + database[i].name;
        cont__item__list__child__city.innerHTML = "City : " + database[i].city;
        cont__item__list__child__type.innerHTML = "Privateness : " + database[i].type;
        text.innerHTML = "Details : " + database[i].details;
        list__cont__item__container.appendChild(cont__item__title);


        cont__item__list.appendChild(cont__item__list__child__name)
        cont__item__list.appendChild(cont__item__list__child__sphere)
        cont__item__list.appendChild(cont__item__list__child__city)
        cont__item__list.appendChild(cont__item__list__child__type);
        cont__item__list.appendChild(cont__item__list__child__salary);

        list__cont__item__container.appendChild(cont__item__list);
        list__cont__item__container.appendChild(text);
        list__cont__item__container.appendChild(cont__item__btn);
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
    ListForward(database)
})

function ListForward(database) {
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
        appendCards(database)
    }
}

btnBack.addEventListener('click', () => {
    ListBack(databaseINIT);
})

function ListBack(database) {
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
            appendCards(database);
        }
    }
}
const appendEight = matchMedia("(min-width:1247px)");

function showFirst(cardNum) {
    cardArr.forEach(item => {
        item.style.display = "none";
    })
    cardBtnArr.splice(0, cardBtnArr.length)
    cardArr.splice(0, cardArr.length)
    definePoints(cardNum);
    appendCards(databaseINIT);
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