const form = document.querySelector(".input__form");
const formInput = document.querySelector(".input__field");

const taskContainer = document.querySelector(".tasks");

const clearButton = document.querySelector(".input__clearButton");

let taskList = [];

const filterStatus = Object.freeze({
    ALL : "All",
    ACTIVE: "Active",
    COMPLETED: "Completed"
});

// Temp, will need to load it based on local storage
let currentFilterStatus = filterStatus.ALL;

// Function to create a task card based on the task
function CreateTaskCard(task){
    // Create a task card element
    let taskCard = document.createElement("li");
    taskCard.classList.add("tasks__card");
    taskCard.classList.add("debug-border");
    taskCard.classList.add("blue");
    taskContainer.appendChild(taskCard);

    // When the task card is hovered
    taskCard.addEventListener("mouseenter", function(e){
        // Create the delete element
        let deleteButton = document.createElement("label");
        deleteButton.classList.add("tasks__deleteButton");
        deleteButton.classList.add("fa-solid", "fa-xmark");
        // deleteButton.classList.add("debug-border", "blue");
        this.appendChild(deleteButton);

        // When the delete button is clicked
        deleteButton.addEventListener("click", ()=>{
            // Remove the task from the task list
            const taskIndex = taskList.indexOf(task);
            if (taskIndex == -1){
                console.error("Unregistered task found");
                return;
            }
            taskList.splice(taskIndex, 1);
            UpdatePage();

            // Remove the task card
            this.remove();
        });
    });

    // When the task card is moved away from hover
    taskCard.addEventListener("mouseleave", function(e){
        // Try get delete button
        let deleteButton = this.querySelector(".tasks__deleteButton");
        if (!deleteButton) return;

        // Remove the delete button
        deleteButton.remove();
    });

    // Create task name child element under task card
    let taskName = document.createElement("label");
    taskName.textContent = task.name;
    taskCard.appendChild(taskName);

    // Create a checkbox to the card
    let checkBox = document.createElement("i");
    // checkBox.type="checkbox";
    checkBox.classList.add("tasks__checkbox");
    checkBox.classList.add("far", "fa-circle");
    taskCard.appendChild(checkBox);

    if(task.completed == false){
        taskName.style.textDecoration = "none";
        checkBox.classList.add("fa-circle");
        checkBox.classList.remove("fa-circle-check");
    }
    else{
        taskName.style.textDecoration = "line-through";
        checkBox.classList.remove("fa-circle");
        checkBox.classList.add("fa-circle-check");
    };

    // Add listener to clear / unclear task when checkbox is clicked
    // Might need to change logic here, make sure its based on the array data instead of the css style
    checkBox.addEventListener("click", function(e){
        // Try get clear button
        const clearCompletedButton = document.querySelector(".details__clearButton");
        if(task.completed == true){
            taskName.style.textDecoration = "none";
            this.classList.add("fa-circle");
            this.classList.remove("fa-circle-check");
            task.completed = false;

            UpdatePage();
        }
        else{
            taskName.style.textDecoration = "line-through";
            this.classList.remove("fa-circle");
            this.classList.add("fa-circle-check");
            task.completed = true;

            UpdatePage();
        };
    });

}

// Function to create the details card
function CreateDetailsCard(){
    // Details card
    const detailCard = document.createElement("li");
    detailCard.classList.add("details");
    taskContainer.appendChild(detailCard);

    // Task count
    let activeCounter = 0;
    let completedCounter = 0;
    taskList.forEach(function(task){
        if (task.completed == false){
            activeCounter += 1;
        }
        else{
            completedCounter += 1;
        }
    });
    
    const taskCount = document.createElement("label");
    taskCount.classList.add("details__taskCount");
    taskCount.textContent = `${activeCounter} item${activeCounter == 1 ? "" : "s"} left`;
    detailCard.appendChild(taskCount);
    
    // Filter container
    const detailsFilter = document.createElement("ul");
    detailsFilter.classList.add("details__filter");
    detailCard.appendChild(detailsFilter);

    // Filter button
    const filterAllButton = document.createElement("li");
    filterAllButton.classList.add("details__button");
    filterAllButton.textContent = "All";
    filterAllButton.addEventListener("click", function(e){
        currentFilterStatus = filterStatus.ALL;
        UpdatePage();
    });
    detailsFilter.appendChild(filterAllButton);
    
    const filterActiveButton = document.createElement("li");
    filterActiveButton.classList.add("details__button");
    filterActiveButton.textContent = "Active";
    filterActiveButton.addEventListener("click", function(e){
        currentFilterStatus = filterStatus.ACTIVE;
        UpdatePage();
    });
    detailsFilter.appendChild(filterActiveButton);

    const filterCompletedButton = document.createElement("li");
    filterCompletedButton.classList.add("details__button");
    filterCompletedButton.textContent = "Completed";
        filterCompletedButton.addEventListener("click", function(e){
        currentFilterStatus = filterStatus.COMPLETED;
        UpdatePage();
    });
    detailsFilter.appendChild(filterCompletedButton);


    switch(currentFilterStatus){
        case filterStatus.ALL:
            filterAllButton.classList.add("details__button--active");
            break;
        case filterStatus.ACTIVE:
            filterActiveButton.classList.add("details__button--active");
            break;
        case filterStatus.COMPLETED:
            filterCompletedButton.classList.add("details__button--active");
            break;
    }

    const detailsClearButton = document.createElement("label");
    detailsClearButton.textContent = "Clear Completed";
    detailsClearButton.classList.add("details__clearButton");
    detailCard.appendChild(detailsClearButton);

    if(completedCounter == 0 && detailsClearButton.classList.contains("details__clearButton--active")){
        detailsClearButton.classList.remove("details__clearButton--active");
    }
    else if(completedCounter > 0 && !detailsClearButton.classList.contains("details__clearButton--active")){
       detailsClearButton.classList.add("details__clearButton--active");
    }

    detailsClearButton.addEventListener("click", function(){
        taskList = taskList.filter(task => !task.completed);
        UpdatePage();
    })
}

// Main function to update the page
function UpdatePage(){
    console.table(taskList);
    // Clear the container first
    taskContainer.innerHTML = "";

    // Remove the form shadow
    clearButton.style.display = "none";

    // Reset Input
    formInput.style.boxShadow = "var(--shadow)";

    // If the task list is empty, return
    if (taskList.length == 0) return;

    // Update input to remove shadow
    formInput.style.boxShadow = "none";

    // Display the "clear all" button
    if (clearButton.style.display = "none"){
        clearButton.style.display = "inline";
        clearButton.classList.add("fas", "fa-check");
    }

    // For each task available, create task card
    taskList.forEach((task)=>{
        // Display all if current filter is ALL
        if (currentFilterStatus == filterStatus.ALL){
            CreateTaskCard(task);
        }
        // Display only non-completed task if current filter is ACTIVE
        else if (currentFilterStatus == filterStatus.ACTIVE){
            if (task.completed == false){
                CreateTaskCard(task);
            }
        }
        // Display only completed task if current filter is COMPLETED
        else{
            if (task.completed == true){
                CreateTaskCard(task);
            }
        }
    });

    // Create the details card
    CreateDetailsCard();
}

// When the user submitted a task
form.addEventListener("submit", function(e){
    // Prevent Reset
    e.preventDefault();

    // Cache the submit value
    const submitValue = e.target.elements["task"].value;

    // Check if its empty
    if (submitValue.trim() == "") return;

    // Reset task input
    e.target.elements["task"].value = "";

    // Register the new task
    const task= new Object();
    task.name = submitValue;
    task.completed = false;

    // Add the newly created task to the array
    taskList.push(task);

    // Update Page
    UpdatePage();
  
});

// When the user click the "clear all" function
clearButton.addEventListener("click", function(e){
    taskList.forEach(task=> task.completed = true);
    UpdatePage();
});