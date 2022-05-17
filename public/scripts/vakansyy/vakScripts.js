let pageNo = parseInt(document.getElementById('pagenum').innerHTML);

const btnF = document.getElementById('btn__forward');
const btnB = document.getElementById('btn__back');
const searchField = document.getElementById("searchQuery");
btnF.addEventListener("click",showF)
btnB.addEventListener('click',showB);
searchField.addEventListener("input",search);
function search(){
    console.log(searchField.value);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/vakansyy/search?searchquery=${searchField.value}`,true);
    xhr.responseType="json";
    xhr.onload = function(){
        var status = xhr.status;
        if(status===200){
            console.log(xhr.response);
            var searchData = xhr.response;
        }
        var output=''
        for(let i = 0; i < searchData.length;i++){
            output += `<a class="text-black bg-light" style="font-size: 15px; line-height:15px ;padding: 0; margin:0" href="#" class="suggest-item">${searchData[i].title}</a>`
        }
        document.querySelector('.suggest').innerHTML = output;
    }
   xhr.send();
}
let suggestArr = Array.from(document.querySelectorAll('.suggest-item'));
suggestArr.forEach((item)=>{
    item.addEventListener('click',function (event){
        var target = event.target;
        document.getElementById("searchQuery").value= target.innerHTML
    })
})
document.getElementById('selected__city').onchange = function (){
    console.log(document.getElementById('selected__city').value)
    fetchData();
}
document.getElementById("selected__privateness").onchange = function (){
    fetchData()
}

if(pageNo === 1){
    fetchData();
}

function showF(){
    pageNo =  parseInt(document.getElementById('pagenum').innerHTML) +1;
    document.getElementById('pagenum').innerHTML = pageNo;
    fetchData();
}
console.log(document.getElementById('selected__city').value)


function showB(){
    pageNo = parseInt(document.getElementById('pagenum').innerHTML) -1;
    if(pageNo <= 0){
        alert("LIMIT")
        pageNo++;
        return;
    }
    document.getElementById('pagenum').innerHTML = pageNo;
    fetchData();

}

// function fetchData(){
//     var xhr = new XMLHttpRequest;
//     xhr.open("GET",`http://localhost:3000/vakansyy/vaklist/pag?pageNum=${pageNo}&City=${document.getElementById("selected__city").value}&Privateness=${document.getElementById("selected__privateness").value}&search=${document.getElementById("searchQuery").value}`,true);
//     xhr.responseType = "json";
//     xhr.onload = function() {
//         var status = xhr.status
//         if (status === 200) {
//             var data = xhr.response;
//             console.log(data);
//             var output='';
//             const start = new Date().getTime();
//             for(let i = 0; i < data.length; i++){
//                 output +=`<div class="list__cont__item"><div class="list__cont__item__container"><h3 class="cont__item__title">${data[i].title}</h3>
// <ul class="cont__item__list"><li class="cont__item__list__child__name">Name: ${data[i].name_of_comp}</li><li class="cont__item__list__child__name">Sphere: ${data[i].sphere}</li>
// <li class="cont__item__list__child">City: ${data[i].city}</li>
// <li class="cont__item__list__child">Privateness: ${data[i].privateness}</li>
// <li class="cont__item__list__child__salary">Salary :${data[i].salary}</li></ul>
// <p class="text">Details:${data[i].details}</p>
// <button class="btn btn-primary p-2 w-25">See more </button>
// </div>
// </div>`
//             }
//             document.querySelector('.list__cont').innerHTML = output
//             const end = new Date().getTime();
//             console.log(end-start)
//         }
//     }
//     xhr.send();
// }