const inputTaskValue = document.querySelector(".inpur-box input"),
displayTask = document.querySelector(".show-task"),
filterTaskBtn = document.querySelectorAll(".filter-task li");

let isEdit = false;
let isTaskId;

// get local store data
const taskStoreData = JSON.parse(localStorage.getItem("localStoreData")) ?? [];


// display task function
const displayTaskFunction = (prom)=>{
    
    // get local store data
    const taskStoreData = JSON.parse(localStorage.getItem("localStoreData")) ?? [];

    taskStoreData.forEach((tasklist,index)=>{
        
        // display tasks with filter button condetion
        if(tasklist.stutas === prom ||prom == "all" )
        {
            let li = `<li id="${index}">
                        <div onclick="taskCheckFun(this)" class="task-name">
                            <input ${taskStoreData[index].stutas == "completed" ? "checked" : ""} type="checkbox">
                            <label class="${taskStoreData[index].stutas == "completed" ? "checked" : ""}"> ${tasklist.taskName} </label>
                        </div>
                        <div onclick="showSubMenu(this)" class="menu-task">
                            <i class='bx bx-dots-horizontal-rounded' ></i>
                            <div class="sub-menu">
                                <button onclick="taskeditFun(${index})">edit</button>
                                <button onclick="taskdeleteFun(${index})">delet</button>
                            </div>
                        </div>
                    </li>`;

            displayTask.innerHTML += li;
        }
        
    });
}


// click on add button,and then add to Tasks....function defiend
const addTask = ()=>{

    // add a new task data in array
    const newTaskadd = ()=>{
        const taskStoreData = JSON.parse(localStorage.getItem("localStoreData")) ?? [];
        // check inpur box empty 
        !inputTaskValue.value ? "" : taskStoreData.push(
            {
                id : taskStoreData.length,
                taskName : inputTaskValue.value,
                stutas : "panding"
            }
        );
        localStorage.setItem("localStoreData",JSON.stringify(taskStoreData))
    }

    // check condition to task update or add new task
    !isEdit ? newTaskadd() : upDateTask();

    displayTask.innerHTML = "";
    displayTaskFunction("all");
    inputTaskValue.value = "";

}

// update new task function difiend
const upDateTask =()=>{

    const taskStoreData = JSON.parse(localStorage.getItem("localStoreData")) ?? [];
    isEdit = false;
    document.querySelector(".add-task-btn").innerHTML = "<i class='bx bx-message-square-add'></i>";
    taskStoreData[isTaskId].taskName = inputTaskValue.value;
    localStorage.setItem("localStoreData",JSON.stringify(taskStoreData))

    displayTask.innerHTML = "";
    displayTaskFunction("all");
}

// check task stutas pasding or completed
const taskCheckFun = (e)=>{
    
    const taskStoreData = JSON.parse(localStorage.getItem("localStoreData")) ?? [];
    let task = e.parentElement.id;
    taskStoreData[task].stutas = taskStoreData[task].stutas === "panding" ? "completed" : "panding";
    localStorage.setItem("localStoreData",JSON.stringify(taskStoreData))

    displayTask.innerHTML = "";
    displayTaskFunction("all");
}

// click to filter button display tasks
filterTaskBtn.forEach(filterBtn=>{
    filterBtn.addEventListener("click",()=>{
        displayTask.innerHTML = "";
        displayTaskFunction(filterBtn.id);
    })
})

// task delete button 
const taskdeleteFun = (taskId)=>{
    const taskStoreData = JSON.parse(localStorage.getItem("localStoreData")) ?? [];
    taskStoreData.splice(taskId, 1);
    localStorage.setItem("localStoreData",JSON.stringify(taskStoreData))
    displayTask.innerHTML = "";
    displayTaskFunction("all")
}

// task edit button 
const taskeditFun = (taskId)=>{
    const taskStoreData = JSON.parse(localStorage.getItem("localStoreData")) ?? [];
    inputTaskValue.value = taskStoreData[taskId].taskName;
    localStorage.setItem("localStoreData",JSON.stringify(taskStoreData));
    document.querySelector(".add-task-btn").innerHTML = "<i class='bx bx-cloud-upload'></i>";
    isTaskId = taskId;
    isEdit = true;
}

// show sub menu  
const showSubMenu = showMenu=> showMenu.classList.toggle("show");

// defold function call
displayTaskFunction("all")
