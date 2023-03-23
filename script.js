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



function dropMad(event) {
    //console.log("der er droppet mad");
    let madId = event.dataTransfer.getData("foodId");
    let madType = event.dataTransfer.getData("foodName");

    let iLike = this.dataset.food;
    let gammelemoji = this.querySelector(".mood");
    
    const sp1 = document.createElement("span");
    // Give it an class attribute called 'mood'
    sp1.className = "mood";
        
    let x = iLike.split(",");
    console.log(x);


    if ( iLike.includes(madType) ) {
        //let heart = document.createTextNode("🥰");
        //this.appendChild(heart);
        
        // Create some content for the span.
        let nyemoji = document.createTextNode("🥰");
        // Apply that content to the new element
        sp1.appendChild(nyemoji);

        //this.replaceChild(sp1, sp2);
        this.replaceChild(sp1, gammelemoji);
        
        // aninmation
        let moodAnimate = this.querySelector(".mood");
        moodAnimate.classList.add('animate__animated', 'animate__pulse');
        
        // giv point
        pointBox.innerHTML = parseInt(pointBox.innerHTML) + 100;
    } else {
        // Create some content for the span.
        let nyemoji = document.createTextNode("🤢");
        // Apply that content to the new element
        sp1.appendChild(nyemoji);

        //this.replaceChild(sp1, sp2);
        this.replaceChild(sp1, gammelemoji);

        // aninmation
        let moodAnimate = this.querySelector(".mood");
        moodAnimate.classList.add('animate__animated', 'animate__pulse');

        //fjern point og maden
        pointBox.innerHTML = parseInt(pointBox.innerHTML) - 100;
        foodBox.removeChild(document.querySelector("#" + madId));
    }

    if (pointBox.innerHTML == "1000") {
        document.querySelector(".hura").style.display = "block";
        document.querySelector(".tryAgain").style.display = "block"
    }

    if (foodBox.innerHTML.trim() == "") {
        document.querySelector(".dead").style.display = "block";
        document.querySelector(".tryAgain").style.display = "block"
    }

    // if (pointBox.innerHTML >= "100") {
    //     document.querySelector(".button-food").style.display = "inline";
    // }

    // if (pointBox.innerHTML < "0") {
    //     document.querySelector(".button-like").style.display = "inline";

    //     document.querySelector(".button-like").addEventListener("click", function (){
    //         document.querySelectorAll(".like").forEach(function(e){
    //             e.style.display = "block";
    //         });
    //     });
    // } else {
    //     document.querySelector(".button-like").style.display = "none";
    //     document.querySelectorAll(".like").forEach(function(e){
    //         e.style.display = "none";
    //     });
    // }

    if (pointBox.innerHTML >= "500") {
        document.querySelector(".button-character").style.display = "inline";

        document.querySelector(".button-character").addEventListener("click", function () {
            var character = document.querySelector(".character");
            character.style.opacity = "1";
            character.disabled = false;
            pointBox.innerHTML = parseInt(pointBox.innerHTML) - 500;
            document.querySelector(".button-character").remove(".button-character");
        })
    } else {
        document.querySelector(".button-character").style.display = "none";
    }
}

let arr = [1, 2, 3 , [4, 5], [6, 7]]

console.log(arr.flat());