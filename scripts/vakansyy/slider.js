let slider_cont = document.querySelector('slider__cont');
let item = document.querySelector('.slider__item')
let btnForw = document.getElementById('forw');
let photos = document.querySelectorAll('.line__item');
let img = document.querySelectorAll('.img');
let slider_line = document.querySelector('.slider__line')

let photosArr = Array.from(photos);
let pag = document.querySelector('.pagination');
pag.style.top = (document.querySelector('.slider__cont').offsetHeight - document.querySelector(
    '.pagination').offsetHeight) + 'px';
pag.style.left = (document.querySelector('.slider__cont').offsetWidth - document.querySelector(
    '.pagination').offsetWidth) / 2 + 'px';
let counter = 0;

// btnForw.addEventListener('click', () => {
//     moveForw();
// });
// document.getElementById('back').addEventListener('click', () => {
//     moveBack();//
// })
// btnForw.addEventListener('click', () => {
//     moveForw();
// })
// document.getElementById('Back').addEventListener('click', () => {
//     moveBack();
// })
setInterval(moveForw, 5000)

function moveForw() {
    counter++;
    check();
    let width = document.querySelector('.slider__cont').offsetWidth;
    photos.forEach(item => item.style.width = width + 'px');
    slider_line.style.left = `${-(width * counter)}px`
    console.log(width * counter)
    console.log(counter)

    for (let i = 0; i < pagbtn.length; i++) {
        if (i === counter) {
            pagbtn[counter].classList.add('active')
        } else {
            pagbtn[i].classList.remove('active')
        }
    }
}

function moveBack() {
    counter--;
    check();
    let width = document.querySelector('.slider__cont').offsetWidth;
    photos.forEach(item => item.style.width = width + 'px');
    slider_line.style.left = `${-(width * counter)}px`
    console.log(width * counter)
    console.log(counter)
}

function check() {
    if (counter > photosArr.length - 1) {
        counter = 0;
        console.log("стоп")
    } else if (counter < 0) {
        counter = photosArr.length - 1;
    }
    console.log('sdad')
}




let pagbtn = document.querySelectorAll('.pag__elem');
let pagbtnArr = Array.from(pagbtn);
let ind;
pag.onclick = () => {
    console.log('adssdadasd')
    let target = event.target;
    console.log('asdsad')

    ind = pagbtnArr.indexOf(target);
    if (ind === -1) {
        return
    }
    console.log(ind);
    find(ind)
    pagbtn[ind].classList.add('active')
    for (let i = 0; i < pagbtn.length; i++) {
        i !== ind ? pagbtn[i].classList.remove('active') : pagbtn[i].classList.add('active');
    }

}


function find(ind) {
    let width = document.querySelector('.slider__cont').offsetWidth;
    slider_line.style.left = `${-(width * ind)}px`
}


let slider_item = document.querySelectorAll('.img');
let slider_item_arr = Array.from(slider_item);
let modal_window = document.querySelectorAll('.modal__wind');
let closeWind = document.querySelectorAll('.close');
let closeArr = Array.from(closeWind);
let modal = Array.from(modal_window)
slider_item.forEach(item=>{
    item.onclick =()=> {
        let target = event.target;
        console.log(',ouseover')
        let ind = slider_item_arr.indexOf(target)
        modal_window[ind].classList.add('active');
    }
})
closeWind.forEach(item=>{
    item.onclick=()=>{
        let t = event.target;
        modal_window[closeArr.indexOf(t)].classList.remove('active');
    }
})

