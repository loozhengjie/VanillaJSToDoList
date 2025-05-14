const form = document.querySelector(".input__form");
const formInput = document.querySelector(".input__field");

const taskContainer = document.querySelector(".tasks");

let taskList = [];

form.addEventListener("submit", function(e){
    // Prevent Reset
    e.preventDefault();

    // Cache the submit value
    const submitValue = e.target.elements["task"].value;
    // console.log(e, e.target.elements["task"].value);

    // Check if its empty
    if (submitValue.trim() == "") return;

    // Remove the form shadow
    formInput.style.boxShadow = "none";

    e.target.elements["task"].value = "";

    // Add the task to the array
    taskList.push(submitValue);

    // Create a task card element
    let taskCard = document.createElement("li");
    taskCard.classList.add("tasks__card");
    taskCard.classList.add("debug-border");
    taskCard.classList.add("blue");
    taskContainer.appendChild(taskCard);

    // Create task name child element under task card
    let taskName = document.createElement("label");
    taskName.textContent = submitValue;
    taskCard.appendChild(taskName);

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
    })

})