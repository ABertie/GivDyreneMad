//DOM REFERENCER
const pointBox = document.querySelector("#score"); //point tavle
const dragFoodBox = document.querySelectorAll(".foodcontainer div");//mad
const targetAnimal = document.querySelectorAll("#animals div");//dyrene
const foodBox = document.querySelector(".foodcontainer");//madkassen

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

function dropMad(event) {
    //console.log("der er droppet mad");
    let madId = event.dataTransfer.getData("foodId");
    let madType = event.dataTransfer.getData("foodName");

    //let gammelemoji = this.querySelector(".mood");
    
    const sp1 = document.createElement("span");
    // Give it an class attribute called 'mood'
    sp1.className = "mood";

    if (madType == this.dataset.food) {
        //let heart = document.createTextNode("🥰");
        //this.appendChild(heart);
        
        // Create some content for the span.
        let nyemoji = document.createTextNode("🥰");
        // Apply that content to the new element
        sp1.appendChild(nyemoji);

        //this.replaceChild(sp1, sp2);
        this.replaceChild(sp1, gammelemoji);

        pointBox.innerHTML = parseInt(pointBox.innerHTML) + 100;
    } else {
        // Create some content for the span.
        let nyemoji = document.createTextNode("🤢");
        // Apply that content to the new element
        sp1.appendChild(nyemoji);

        //this.replaceChild(sp1, sp2);
        this.replaceChild(sp1, gammelemoji);

        pointBox.innerHTML = parseInt(pointBox.innerHTML) - 100;
        foodBox.removeChild(document.querySelector("#" + madId));
    }
}
