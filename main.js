let search = document.getElementById('search')
let image = document.querySelectorAll('.img')
let title = document.querySelectorAll('.title')
let year = document.querySelectorAll('.year')
let released = document.querySelectorAll('.released')
let genre = document.querySelectorAll('.genre')
let rated = document.querySelector('.rated')
let runtime = document.querySelector('.runtime')
let plot = document.querySelectorAll('.plot')
let language = document.querySelector('.language')
let writers = document.querySelector('.writers')
let actors = document.querySelector('.actors')
let awards = document.querySelector('.awards')
let country = document.querySelector('.country')
let boxoffice = document.querySelector('.boxoffice')
let director = document.querySelector('.director')
let production = document.querySelector('.production')
let nominate = document.querySelectorAll('.add')
let option = document.querySelector('.options')
let array = []
let ids = 0

document.querySelector('.seeNom').onclick = function () {
  document.querySelector('.nomination').classList.toggle('nominationed')}
document.querySelector('.closeNom').onclick = function () {
  document.querySelector('.nomination').classList.toggle('nominationed')}
search.oninput = function () {
  image.forEach(item => item.src = "")
  
  year.forEach(item => item.textContent = "")
  title.forEach(item => item.textContent = "")
  released.forEach(item => item.textContent = "")
  
  genre.forEach(item => item.textContent = "")
  
  rated.textContent = "";
  runtime.textContent = "";
  
  plot.forEach(item => item.textContent = "")
  language.textContent = "";
  writers.textContent = "";
  actors.textContent = "";
  awards.textContent = "";
  boxoffice.textContent = "";
  country.textContent = "";
  production.textContent = "";
  director.textContent = "";
  nominate.forEach(item => item.style.clipPath = "inset(100% 0% 0% 0%)")
    
    
 document.querySelector('.anims').style.display = "none"
}

search.onsearch = getEm;
document.querySelector('.button1').onclick = () => {
  getEm()
}
function check(arg) {
  if (arg == "N/A") {
    return "Not available"
  } else {
    return arg
  }
}
async function getEm () {
  let value = search.value
  let searchVal = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=69e544b2&t=${value}`)
  .then(results => results.json())
   .catch(err => err);
 
 if (searchVal.Response == "False" || searchVal.Title == "") {
   document.querySelector('.anims').style.display = "block"
   search.value = ""
 } else {
   document.querySelector('.anims').style.display = "none"
 
 image.forEach(item => item.src = searchVal.Poster)
  
 year.forEach(item => item.textContent = check(searchVal.Year))
 title.forEach(item => item.textContent = check(searchVal.Title))
 released.forEach(item => item.textContent = check(searchVal.Released))
 
 genre.forEach(item => item.textContent = check(searchVal.Genre))
 
 rated.textContent = check(searchVal.Rated)
 runtime.textContent = check(searchVal.Runtime)
 
 plot.forEach(item => item.textContent = check(searchVal.Plot))
 language.textContent = check(searchVal.Language)
 writers.textContent = check((searchVal.Writers
|| searchVal.Writer) )
  actors.textContent = check((searchVal.Actors || searchVal.Actor))
  awards.textContent = check(searchVal.Awards)
 boxoffice.textContent = check(searchVal.BoxOffice)
 country.textContent = check(searchVal.Country)
production.textContent = check(searchVal.Production)
 director.textContent = check(searchVal.Director)
 
  if (array.length) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].title == searchVal.Title) {
      nominate.forEach(item => item.style.clipPath = "inset(100% 0% 0% 0%)")
    
    }else {
  nominate.forEach(item => item.style.clipPath = "inset(0% 0% 0% 0%)");
 
 
    
  }
  }
  } else {
  nominate.forEach(item => item.style.clipPath = "inset(0% 0% 0% 0%)");
  
    
  }
 }
}
document.querySelector('.close').addEventListener('click',function () {
  document.querySelector('.see-card').classList.toggle('saw-card')
 document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})
document.querySelector('.see').addEventListener('click',function () {
  document.querySelector('.see-card').classList.toggle('saw-card')
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})


nominate.forEach(item => item.addEventListener('click',function () {
nominate.forEach(item => item.style.clipPath = "inset(100% 0% 0% 0%)")
 
 let obj = {
   title:title[0].textContent,
   year: year[0].textContent,
   plot:plot[0].textContent,
   image:image[0].src,
 }
 if (array.length >= 5 || ids >= 5) {
   document.querySelector(".banner").style.display = 'block'
 } else {
   array.push(obj)
   let cover = document.createElement("div")
   cover.classList.add('article')
   cover.innerHTML = `<div class="cover">
        
        <div class="">
          <img class="nameI" src=${obj.image} alt="" />
        </div>
        <div class="name">
     <h3 class="nameT">${obj.title}</h3> 
     <h6 class="nameY">${obj.year}</h6>
        </div>
     <button class="del"><img class="delimg" src="delete.svg" alt="" /></button>
     <input type="hidden" name="" id="input" value="${ids}" />   
      </div>`;
      document.querySelector('.container').appendChild(cover);
 localStorage.setItem("no"+ids,JSON.stringify(obj))
 ids++
 }
 
getDelete() 
}))

window.addEventListener('load', function () {
  document.querySelector('.anims').style.display = "none"
  for (var i = 0; i < localStorage.length; i++) {
 if (localStorage.getItem("no" + [i]) !==  null) {
   let obj2 = localStorage.getItem("no" + [i])   
   array.push(JSON.parse(obj2))
   
  }
 }
 
 for (var i = 0; i < array.length; i++) {
   let obj3 = array[i]  
      let cover = document.createElement("div")
   cover.classList.add('article')
   cover.innerHTML = `<div class="cover">
        
        <div class="coverImg">
          <img class="nameI" src=${obj3.image} alt="" />
        </div>
        <div class="name">
     <h3 class="nameT">${obj3.title}</h3> 
     <h6 class="nameY">${obj3.year}</h6>
        </div>
        
          <button class="del"><img class="delimg" src="delete.svg" alt="" /></button>
          
           <input type="hidden" name="" id="input" value="${ids}" />
        
      </div>`;
      document.querySelector('.container').appendChild(cover)
      ids++
 }
 getDelete()
})

function getDelete() {
  var del = document.getElementsByClassName('del');
for (var i = 0; i < del.length; i++) {
  del[i].onclick = function() {
    var parent = this.parentElement;
    parent.parentElement.style.display = "none";
  let  c = parent.childNodes;
  
  localStorage.removeItem("no"+c[7].value) 
    
  }
}
}
document.querySelector('.closeBan').onclick = function () {
  this.parentElement.style.display = "none"
}