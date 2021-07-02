const div1 = document.querySelector('.div1');
const clear = document.querySelector('.clear');
const cardboxs = document.getElementsByClassName("cardbox");
const footer = document.querySelector("footer");
const requestURL = "./data.json";
const request = new XMLHttpRequest();
let filtersContainer = document.querySelector(".filters-container");
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
  const empresas = request.response;
  for (let i = 0; i < empresas.length; i++) {
    newCardBox(empresas[i]);
  }
};

let filtros = [];
let aux = ["HTML","CSS","JavaScript","Python","Ruby"];


function eventRemove(element) {
  let index = filtros.indexOf(element);
  if (index > -1) {
    filtros.splice(index, 1);
    hideCardboxs();
    searchFilter();
  }
  if (filtros.length === 0) {
    filtersContainer.style.display = "none";
    deleteFilters();
  }
}

function eventAdd(element, str) {
  if (element.textContent === str) {
    element.addEventListener("click", (e) => {
      if (filtros.indexOf(str) === -1) {
        filtros.push(str);
        newFilter(str);
        hideCardboxs();
        searchFilter();
      }
    });
  }
}

function newFilter(filter) {
  filtersContainer.style.display = "flex";
  let newInnerContainer = document.createElement("div");
  let newFilter = document.createElement("p");
  let newCross = document.createElement("div");
  let clear = document.createElement('p');
  div1.appendChild(newInnerContainer);
  newInnerContainer.appendChild(newFilter);
  newInnerContainer.appendChild(newCross);
  newInnerContainer.classList.add("filters-inner-container");
  newFilter.classList.add("filters");
  newCross.classList.add("cross");
  newFilter.textContent = filter;
  newInnerContainer.style.display = "flex";
  clear.textContent = 'Clear';

  newCross.addEventListener("click", (e) => {
    newInnerContainer.style.display = "none";
    eventRemove(filter);
  });
}

clear.addEventListener('click', (e)=>{
    
});

function newCardBox(empresas) {
  let newCardBox = document.createElement("div");
  let newLogo = document.createElement("img");
  let innerContainer = document.createElement("div");
  let newNameContainer = document.createElement("div");
  let newCompanyName = document.createElement("h1");
  let isNew = document.createElement("p");
  let isFeatured = document.createElement("p");
  let position = document.createElement("p");
  let roleContainer = document.createElement("div");
  let postedAt = document.createElement("p");
  let point1 = document.createElement("p");
  let contract = document.createElement("p");
  let point2 = document.createElement("p");
  let location = document.createElement("p");
  let newLine = document.createElement("div");
  let tagsContainer = document.createElement("div");
  let role = document.createElement("p");
  let level = document.createElement("p");

  newCardBox.classList.add("cardbox");
  newLogo.classList.add("logo");
  innerContainer.classList.add("inner-container");
  newNameContainer.classList.add("name");
  newCompanyName.classList.add("nameCompany");
  position.classList.add("position");
  roleContainer.classList.add("role-container");
  postedAt.classList.add("posted-At");
  contract.classList.add("contract");
  location.classList.add("location");
  point1.classList.add("point");
  point2.classList.add("point");
  newLine.classList.add("line");
  tagsContainer.classList.add("tags-container");
  role.classList.add("tags");
  level.classList.add("tags");

  document.body.insertBefore(newCardBox, footer);
  newCardBox.appendChild(newLogo);
  newCardBox.appendChild(innerContainer);
  innerContainer.appendChild(newNameContainer);
  newNameContainer.appendChild(newCompanyName);
  innerContainer.appendChild(position);
  innerContainer.appendChild(roleContainer);
  roleContainer.appendChild(postedAt);
  roleContainer.appendChild(point1);
  roleContainer.appendChild(contract);
  roleContainer.appendChild(point2);
  roleContainer.appendChild(location);
  newCardBox.appendChild(newLine);
  newCardBox.appendChild(tagsContainer);
  tagsContainer.appendChild(role);
  tagsContainer.appendChild(level);

  newLogo.src = empresas.logo;

  newCompanyName.textContent = empresas.company;
  position.textContent = empresas.position;
  role.textContent = empresas.role;
  level.textContent = empresas.level;
  postedAt.textContent = empresas.postedAt;
  contract.textContent = empresas.contract;
  location.textContent = empresas.location;
  point1.textContent = "·";
  point2.textContent = "·";

  //Languages array

  empresas.languages.forEach((element) => {
    let languages = document.createElement("p");
    languages.classList.add("tags");
    newCardBox.classList.add(element);
    languages.textContent = element;
    tagsContainer.appendChild(languages);

    eventAdd(languages, "JavaScript");
    eventAdd(languages, "HTML");
    eventAdd(languages, "CSS");
    eventAdd(languages, "Python");
    eventAdd(languages, "Ruby");
  });

  //Tools array

  empresas.tools.forEach((element) => {
    let tools = document.createElement("p");
    tools.classList.add("tags");
    newCardBox.classList.add(element);
    tools.textContent = element;
    tagsContainer.appendChild(tools);

    eventAdd(tools, "React");
    eventAdd(tools, "Sass");
    eventAdd(tools, "Ruby");
    eventAdd(tools, "RoR");
    eventAdd(tools, "Vue");
    eventAdd(tools, "Django");
  });

  if (empresas.new) {
    isNew.classList.add("new");
    newNameContainer.appendChild(isNew);
    isNew.textContent = "NEW!";
  }
  if (empresas.featured) {
    isFeatured.classList.add("featured");
    newNameContainer.appendChild(isFeatured);
    isFeatured.textContent = "FEATURED";
    newCardBox.classList.add("border-new");
  }

  eventAdd(position, "Full Stack Engineer");
  eventAdd(position, "Junior Frontend Developer");
  eventAdd(position, "Front-end Dev");
  eventAdd(position, "Junior Developer");
  eventAdd(position, "Junior Backend Developer");
  eventAdd(position, "Software Engineer");
  eventAdd(position, "Fullstack Developer");
  eventAdd(position, "Senior Frontend Developer");

  eventAdd(level, "Junior");
  eventAdd(level, "Midweight");
  eventAdd(level, "Senior");
  newCardBox.classList.add(empresas.level);

  eventAdd(role, "Frontend");
  eventAdd(role, "Fullstack");
  eventAdd(role, "Backend");
  newCardBox.classList.add(empresas.role);
}

function hideCardboxs() {
  for (let i = 0; i < cardboxs.length; i++) {
    cardboxs[i].style.display = "none";
  }
}


function searchFilter() {
  for (let i = 0; i < cardboxs.length; i++) {
    if (cardboxs.item(i).classList.contains(filtros[0]) &&
    cardboxs.item(i).classList.contains(filtros[1]) &&
    cardboxs.item(i).classList.contains(filtros[2]) &&
    cardboxs.item(i).classList.contains(filtros[2])) {
      console.log('4')
      cardboxs[i].style.display = "block";
      return;
    }
    else if (
      cardboxs.item(i).classList.contains(filtros[0]) &&
      cardboxs.item(i).classList.contains(filtros[1]) &&
      cardboxs.item(i).classList.contains(filtros[2])
    ) {
      console.log('3')
      cardboxs[i].style.display = "block";
      return;
    }
    else if (cardboxs.item(i).classList.contains(filtros[0]) &&
    cardboxs.item(i).classList.contains(filtros[1])) {
      console.log('2')
      cardboxs[i].style.display = "block";
      return;
    }
    else if (cardboxs.item(i).classList.contains(filtros[0])) {
      console.log('1')
      cardboxs[i].style.display = "block";
    }
  }
}

function deleteFilters() {
  for (let i = 0; i < cardboxs.length; i++) {
    cardboxs[i].style.display = "block";
  }
}
