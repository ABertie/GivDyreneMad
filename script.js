//DOM REFERENCER
let pointBox = document.querySelector("#score"); //point tavle
const dragFoodBox = document.querySelectorAll(".foodcontainer div");//mad
const targetAnimal = document.querySelectorAll("#animals div");//dyrene
const foodBox = document.querySelector(".foodcontainer");//madkassen
if (sessionStorage["Profile"] != null) {
    document.querySelector(".character").selectedIndex = sessionStorage["Profile"];
}


//EVENTS på elementerne

dragFoodBox.forEach(function (element) {
    element.addEventListener("dragstart", startDrag);
})

targetAnimal.forEach(function (element) {
    element.addEventListener("dragover", cancelDefault);
    element.addEventListener("drop", dropMad);
})

//FUNKTIONER

function startDrag(event) {
    //console.log("jo jo den kan hives");
    event.dataTransfer.setData("foodId", this.id);
    event.dataTransfer.setData("foodName", this.dataset.food);
}

function cancelDefault(event) {
    event.preventDefault();
    //Kan bruges til at "aflyse" eventet
}

function SelectProfile() {
    sessionStorage["Profile"] = document.querySelector(".character").selectedIndex;
}

