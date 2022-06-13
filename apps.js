let employees = [];
let urlAPI =  `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const nextBtn = document.querySelector(".next");
const backBtn = document.querySelector("back");


fetch(urlAPI)
.then( response => response.json())
.then(response => response.results)
.then(displayEmployees)
.catch(err => console.log(err))



function displayEmployees(employeeData) {

employees = employeeData;
///Store the employee HTML as we create it
let employeeHTML = ' ';


///Loop through each employee and create HTML markup
employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

////Template literal to add information to the DOM
employeeHTML += `
<div class="card" data-index= "${index}" >
    <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="city">${city}</p>
        </div>
</div>
`

});

gridContainer.innerHTML = employeeHTML;

}

function displayModal(index) {

////Use Object desructuring make our template literal cleaner

    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    let month = ('0' + date.getMonth()).slice(-2);

    let day = ('0'+ date.getMonth()).slice(-2);

    modalHTML = `
        <img class="avatar" src="${picture.large}"/>
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="city">${city}</p>
        <p class="phone">${phone}</p>
        <p class="address">${street.number} ${street.name} ${state} ${postcode}</p>
        <p class="bday">Birthday:
        ${month}/${day}/${date.getFullYear()}</p> 
        `;

        overlay.classList.remove('hidden');
        modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener("click", e => {


///make sure the clicks is not on the gridContainer itself
    if(e.target !== gridContainer) {


        ///Select the card element based on its proximity to actual elements clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
})

