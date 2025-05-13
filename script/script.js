const form = document.querySelector(".input__form");
const formInput = document.querySelector(".input__field");

const taskContainer = document.querySelector(".tasks");

form.addEventListener("submit", function(e){
    e.preventDefault();
    const submitValue = e.target.elements["task"].value
    // console.log(e, e.target.elements["task"].value);

    // Check if its empty
    if (submitValue.trim() == "") return;

    // Create a task card element
    let taskCard = document.createElement("li");
    taskCard.classList.add("tasks__card");
    taskCard.textContent = e.target.elements["task"].value;
    taskContainer.appendChild(taskCard);

})