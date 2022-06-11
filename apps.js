let employees = [];
let urlAPI =  `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


fetch(urlAPI)
.then( response => response.json())
.then(response => response.results)
.then(displayEmployees)
.catch(err => console.log(err))



function displayEmployees(employeeData) {

employees = employeeData;

let employeeHTML = ' ';

employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.city;
    let picture = employee.picture;


employeeHTML += `
<div class="card" data-index= "${index}" >
    <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
</div>
`

});

gridContainer.innerHTML = employeeHTML;

}