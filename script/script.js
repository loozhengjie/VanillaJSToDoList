const form = document.querySelector(".input__form");
const formInput = document.querySelector(".input__field");

const taskContainer = document.querySelector(".tasks");

const dropDown = document.querySelector(".input__dropdown");

let taskList = [];

function createTaskCard(task){
    // Create a task card element
    let taskCard = document.createElement("li");
    taskCard.classList.add("tasks__card");
    taskCard.classList.add("debug-border");
    taskCard.classList.add("blue");
    taskContainer.appendChild(taskCard);

    // Div
    let taskDiv = document.createElement("div");
    taskCard.appendChild(taskDiv);


    // Create a checkbox to the card
    let checkBox = document.createElement("input");
    checkBox.type="checkbox";
    taskDiv.appendChild(checkBox);


    // Create task name child element under task card
    let taskName = document.createElement("label");
    taskName.textContent = task;
    taskDiv.appendChild(taskName);

    // When the task card is hovered
    taskCard.addEventListener("mouseenter", function(e){
        // Create the delete element
        let deleteButton = document.createElement("label");
        deleteButton.textContent = "x ";
        deleteButton.classList.add("debug-border");
        deleteButton.classList.add("blue");
        deleteButton.classList.add("task__deleteButton");
        this.appendChild(deleteButton);

        // When the delete button is clicked
        deleteButton.addEventListener("click", ()=>{
            // Remove the task card
            this.remove();
        });
    });

    // When the task card is moved away from hover
    taskCard.addEventListener("mouseleave", function(e){
        let deleteButton = this.querySelector(".task__deleteButton");
        if (!deleteButton) return;

        // Remove the delete button
        deleteButton.remove();
    });
}

form.addEventListener("submit", function(e){
    // Prevent Reset
    e.preventDefault();

    // Cache the submit value
    const submitValue = e.target.elements["task"].value;
    // console.log(e, e.target.elements["task"].value);

    // Check if its empty
    if (submitValue.trim() == "") return;

    if (dropDown.style.display = "none"){
        dropDown.style.display = "inline";
    }

    // Remove the form shadow
    formInput.style.boxShadow = "none";

    e.target.elements["task"].value = "";

    // Add the task to the array
    taskList.push(submitValue);

    // Clear the container first
    taskContainer.innerHTML = "";

    // For each task available, create task card
    taskList.forEach((task)=>{
        createTaskCard(task);
    });

    
});

dropDown.addEventListener("click", function(e){

});