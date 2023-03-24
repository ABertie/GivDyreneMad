//DOM REFERENCER
let pointBox = document.querySelector("#score"); //point tavle
const dragFoodBox = document.querySelectorAll(".foodcontainer div");//mad
const targetAnimal = document.querySelectorAll("#animals div");//dyrene
const foodBox = document.querySelector(".foodcontainer");//madkassen
if (sessionStorage["Profile"] != null) {
    document.querySelector(".character").selectedIndex = sessionStorage["Profile"];
} //Tjeker om der er blevet valgt en character og hvis der er vise den selvom siden er reloadet


//EVENTS på elementerne

dragFoodBox.forEach(function (element) {
    element.addEventListener("dragstart", startDrag);
}) // Starter startDrag når maden bliver draget

targetAnimal.forEach(function (element) {
    element.addEventListener("dragover", cancelDefault);
    element.addEventListener("drop", dropMad);
}) // Starter cancelDefault når maden bliver dragover dyrene 
// og starter dropMad når maden bliver drop på dyrene


//FUNKTIONER
function startDrag(event) {
    //console.log("jo jo den kan hives");
    event.dataTransfer.setData("foodId", this.id);
    event.dataTransfer.setData("foodName", this.dataset.food);
} // giver den drag mads id til foodId og madens dataset til foodName

function cancelDefault(event) {
    event.preventDefault();
    //Kan bruges til at "aflyse" eventet
} // fjerne dragover default (som jeg tror er at den viser man ikke kan droppe)

function SelectProfile() {
    sessionStorage["Profile"] = document.querySelector(".character").selectedIndex;
} // Gemmer valgte Profile/Character så den kan bruges til senere at vise den når man reloader siden

function dropMad(event) {
    // Når maden bliver droppet
    let madId = event.dataTransfer.getData("foodId"); // kadler foodId -> madId
    let madType = event.dataTransfer.getData("foodName"); // kalder foodName -> madType

    let iLike = this.dataset.food; // kalder dyrets dataset -> iLike
    let gammelemoji = this.querySelector(".mood"); // kalder sulten emojien med classen = mood -> gammelemoji
    
    const moodSpan = document.createElement("span"); // laver en span 
    moodSpan.className = "mood"; // giver den en class mood
        
/*     let x = iLike.split(",");
    console.log(x); 
    // vil splite dyrens iLike til en array
    */

    if ( iLike.includes(madType) ) { 
        // hvis iLike includere madtype skal den:
        
        let nyemoji = document.createTextNode("🥰");// Laver en emoji og kalder den -> nyeemoji
        moodSpan.appendChild(nyemoji); // sætter nyemoji ind i den skabte span med class = mood
        this.replaceChild(moodSpan, gammelemoji); // replace gammelemoji med den nye span 
        
        // aninmation (Giver den nye span en aninmation når den får mad)
        let moodAnimate = this.querySelector(".mood");
        moodAnimate.classList.add('animate__animated', 'animate__pulse'); 
        
        // giv 100 point til point tælleren
        pointBox.innerHTML = parseInt(pointBox.innerHTML) + 100;
    } else {
        let nyemoji = document.createTextNode("🤢");// Laver en emoji og kalder den -> nyeemoji
        moodSpan.appendChild(nyemoji); // sætter nyemoji ind i den skabte span med class = mood
        this.replaceChild(moodSpan, gammelemoji); // replace gammelemoji med den nye span 

        // aninmation (Giver den nye span en aninmation når den får mad)
        let moodAnimate = this.querySelector(".mood");
        moodAnimate.classList.add('animate__animated', 'animate__pulse');
       
        pointBox.innerHTML = parseInt(pointBox.innerHTML) - 100; //fjern 100 point fra point tælleren
        foodBox.removeChild(document.querySelector("#" + madId)); // fjerner den fejlplacerede mad
    }

    if (pointBox.innerHTML == "1000") {
        document.querySelector(".hura").style.display = "block";
        document.querySelector(".tryAgain").style.display = "block"
    } // Når man får 1000 point viser den elementerne med classen = hura og tryAgain

    if (foodBox.innerHTML.trim() == "") {
        document.querySelector(".dead").style.display = "block";
        document.querySelector(".tryAgain").style.display = "block"
    } // Når foodBoxen er tom viser den elementerne med classen = dead og tryAgain

/*  // ignore dette
    if (pointBox.innerHTML >= "100") {
        document.querySelector(".button-food").style.display = "inline";
    } */

/*  // ignore dette 
     if (pointBox.innerHTML < "0") {
        document.querySelector(".button-like").style.display = "inline";

        document.querySelector(".button-like").addEventListener("click", function (){
            document.querySelectorAll(".like").forEach(function(e){
                e.style.display = "block";
            });
        });
    } else {
        document.querySelector(".button-like").style.display = "none";
        document.querySelectorAll(".like").forEach(function(e){
            e.style.display = "none";
        });
    } */

    if (pointBox.innerHTML >= "500") {
        // hvis man har 500 point eller mere
        document.querySelector(".button-character").style.display = "inline"; // viser knappen med classen = button-character

        document.querySelector(".button-character").addEventListener("click", function () {
            // Hvis knappen bliver trykket
            let character = document.querySelector(".character"); // kalder elementet med classen = character -> character
            character.style.opacity = "1"; // giver character en opacitiy på 1
            character.disabled = false; // fjerner disabled på character
            pointBox.innerHTML = parseInt(pointBox.innerHTML) - 500; // fjerner 500 point fra point tælleren
            document.querySelector(".button-character").remove(".button-character"); // fjerne knappen
        }) 
    } else {
        document.querySelector(".button-character").style.display = "none"; // giver knappen en display = none så man ikke kan se den 
    }
}
