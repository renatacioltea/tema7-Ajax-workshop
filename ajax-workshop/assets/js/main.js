// https://github.com/typicode/json-server#routes Here you can find information on how to sort, order or search the API resource 
var employeesAPI = 'http://rest.vedinas.ro/employees';

function deserializeResponse(response) {
  // .json() does JSON.parse behind the scenes
  return response.json();
}

function createEmployeeElement(employee) {
  // console.log(employee);

  // <li class="employee">
  //   <div class="name">John Snow</div>
  //   <p><span>Age: 27</span> <span>Salary: 27</span></p>
  //   <button class="remove">X</button>
  // </li>

  // var employeeElementTemplate = `
  //   <div class="name">${employee.name}</div>
  //   <p><span>Age: ${employee.age}</span> <span>Salary: ${employee.salary}</span></p>
  //   <button class="remove">X</button>
  // `

  var employeeElement = document.createElement('li');
  employeeElement.classList.add('employee');
  employeeElement.dataset.id = employee.id;

  var employeeNameElement = document.createElement('div');
  employeeNameElement.classList.add('name');
  employeeNameElement.innerText = employee.name;

  var pElement = document.createElement('p');
  var pInnerHtml = '<span>Age: ' + employee.age + '</span> <span>Salary: ' + employee.salary + '</span>';
  //<span>Age: 27</span> <span>Salary: 27</span>

  var pInnerHtml2 = '';
  pInnerHtml2 += '<span>Age: ';
  pInnerHtml2 += employee.age;
  pInnerHtml2 += '</span> <span>Salary: ';
  pInnerHtml2 += employee.salary;
  pInnerHtml2 += '</span>';

  // template literals
  var pInnerHtml3 = `<span>Age: ${employee.age}</span> <span>Salary: ${employee.salary}</span>`;

  pElement.innerHTML = pInnerHtml3;

  var removeElement = document.createElement('button');
  removeElement.classList.add('remove');
  removeElement.innerText = 'X';
  removeElement.addEventListener('click', removeEmployee);

  employeeElement.appendChild(employeeNameElement);
  employeeElement.appendChild(pElement);
  employeeElement.appendChild(removeElement);

  var formElement = document.querySelector('form');
  formElement.addEventListener('submit', addEmployee);

  return employeeElement;
}

function listEmployees(employees) {
  console.log(employees);
  var agendaElement = document.querySelector('.agenda');
  for (var i = 0; i <employees.length; i++) {
    var employeeElement = createEmployeeElement(employees[i]);
    agendaElement.appendChild(employeeElement);
  }
}

function getEmployees() {
  // We GET employees from API
  fetch(employeesAPI + '?_limit=5') //Here we limit the display of employees to only 5 items
    .then(deserializeResponse)
    .then(listEmployees)
}


function addEmployee(event){
//we stop the submit event form happening
  event.preventDefault();

  // get name from input
  // get age from input
  // get salary from input
  // create employee object
  var inputNameElement = document.querySelector('input[name="name"]');
  var inputAgeElement = document.querySelector('input[name="age"]');
  var inputSalaryElement = document.querySelector('input[name="salary"]');
  
  var employee = {
    name: inputNameElement.value,
    age: inputAgeElement.value,
    salary: inputSalaryElement.value,
  };

  var employeeElement = createEmployeeElement(employee);
  var agendaElement = document.querySelector('.agenda');
  agendaElement.appendChild(employeeElement);

  // POST employeesAPI employee

  fetch(employeesAPI,{
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  })
  .then(function(response){
    return response.json();
  })
  .then(function(jsonResp){
    console.log(jsonResp); 
  })

}

function removeEmployee(event) {
  
  // take event.target // remove button
 //get remove button parent .parent()
  var employeeElement = event.target.parentElement;
  // // var id = dataset.id from parent https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
   var id = employeeElement.dataset.id;
  

  // // remove parent .remove()
  employeeElement.remove();

  // DELETE `employeeAPI/${id}`

  fetch (`employeeAPI/${id}`, {
    method : 'DELETE',
    headers: {
        'Content-Type': 'application/json',
      },
    })
 .then(function(response){
    return response.json();
  
  })
  .then(function(jsonResp){
    console.log(jsonResp);
  })
};


// When the page is finished loading this function is called
function onDOMLoad() {
  // we call getEmployees function
  // to easely get to the function hold ctrl and click on the function name
  getEmployees();
  addEmployee();
  removeEmployee();
}
// DOMContentLoaded is triggered when DOM load is complete
// On page load fetch employess from API
document.addEventListener('DOMContentLoaded', onDOMLoad);

// "how then works behind the scenes"
/*
var cbs = [
  function one(data) {
    console.log('one', data);'
    return 'from one'
  },
  function two(data) {
    console.log('two', data);
    return 'from two'
  },
  function three(data) {
    console.log('three', data);
  },
];

var ourData = 'initial data';
for (var i = 0; i < cbs.length; i++) {
  var currentCB = cbs[i];
  ourData = currentCB(ourData);
}
*/