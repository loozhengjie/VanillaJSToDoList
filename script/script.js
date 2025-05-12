const form = document.querySelector(".input__form");
const formInput = document.querySelector(".input__field");

form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log(e, e.target.elements["task"].value);

})