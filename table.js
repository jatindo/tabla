const employeeList = [];

let selectedRow = null;
let viewMode = 'TABLE';
let employeeListMale;

const profile1 = document.getElementById("profile");

const name1 = document.getElementById("name");
const age1 = document.getElementById("age");
const gender1 = document.getElementById("gender");


function setFormValue(name, age, gender) {
    name1.value = name;
    age1.value = age;
    gender1.value = gender;

}


function addRow() {

    document.getElementById("text").style.display = "none";
    document.getElementById("input-form").style.display = "block";
    document.getElementById("table").style.display = "none";
    document.getElementById("add-row").style.backgroundColor = "coral";
    document.getElementById("view-list-container").style.display = "none";

}
function addRow2() {
    addRow();
    document.getElementById("add-row").style.display = "none";
}
function editList(index) {
    document.getElementById("input-form").style.display = "block";
    document.getElementById("view-list-container").style.display = "none";

    selectedRow = index;

    const employee = employeeList[index];
    setFormValue(employee.name, employee.age, employee.gender);




}

function save() {
    const user = {

        name: name1.value,
        age: age1.value,
        gender: gender1.value,

    };

    if (selectedRow === 0 || selectedRow) {
        employeeList[selectedRow] = user;
    } else {
        employeeList.push(user);
    }

    page();
    renderData();
    setFormValue('', '', '');
    selectedRow = null;
}
function gender(value, index) {
    return employeeList[index].gender === "male";

}
function deleteRow(index) {
    const employee = employeeList[index];
    alert("Are you sure to DELETE " + employee.name);
    employeeList.splice(index, 1);
    renderData();
}
function editRow(index) {
    selectedRow = index;
    addRow2();
    const employee = employeeList[index];
    setFormValue(employee.name, employee.age, employee.gender);

}

function page() {
    document.getElementById("input-form").style.display = "none";

    document.getElementById("add-row").style.backgroundColor = "white";
    document.getElementById("add-row").style.display = "flex";
    if (document.getElementById("view1").value === "TABLE") {
        document.getElementById("table").style.display = "table";
    } else {
        document.getElementById("view-list-container").style.display = "block";
    }
}
function cancel() {
    page();
}
function show(value) {
    viewMode = value;
    if (value == "TABLE") {
        document.getElementById("view-list-container").style.display = "none";
        document.getElementById("table").style.display = "table";

    } else {
        document.getElementById("table").style.display = "none";
        document.getElementById("view-list-container").style.display = "block";

    }
    renderData();
}




function renderData() {
    const isTable = viewMode === "TABLE";
    const usersList = document.getElementById(isTable ? 'usersList' : 'view-list');
    let rows = employeeList.reduce((old,employee, index) => {
        const row = isTable ? Handlebars.compile(`<tr>
            <td> <img src="1.jpg" width="20"> </td>
            <td>  {{employee.name}}  </td>
            <td> {{employee.age}} </td>
            <td> {{employee.gender}} </td>
            <td>  
             <button type="button" onclick="deleteRow({{index}})">Delete</button>  
            <button type="button" onclick="editRow({{index}})">Edit</button>
            
            </td>
            
           </tr>`)({ employee, index })
         : `<li> 
    
        <div class="card"> <img src="2.png" width=50 hieght=30 > <h3 class="card0"> ${employee.name} </h3> </div>

        &nbsp<div class="card0"> ${employee.age}</div>
        &nbsp<div class="card0"> ${employee.gender} </div>
         <button class="btn" type="button" onclick="deleteRow(${index})"><i class="fa fa-trash"></i></button>  
                
        <button class="btn" type="button" onclick="editList(${index})"><i class="fa fa-edit"></i></button> 
    
        </li>`
        return old + row;
        
        


    },'')
    
    
    usersList.innerHTML = rows;
    if (rows === '') {
        document.getElementById("text").style.display = "block";
    }
    console.log(employeeList);
    //  employeeListMale = employeeList.filter(gender);

    //  console.log(employeeListMale);
}

renderData();
