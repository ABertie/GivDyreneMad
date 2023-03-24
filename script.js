//DOM REFERENCER
let pointBox = document.querySelector("#score"); //point tavle
var point = 0; //point in point tavlen
const dragFoodBox = document.querySelectorAll(".foodcontainer div");//mad
const targetAnimal = document.querySelectorAll("#animals div");//dyrene
const foodBox = document.querySelector(".foodcontainer");//madkassen
const lostFoodBox = document.querySelector(".lostMad") // section med classen lostMad
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

    if (iLike.includes(madType)) {
        // hvis iLike includere madtype skal den:

        let nyemoji = document.createTextNode("🥰");// Laver en emoji og kalder den -> nyeemoji
        moodSpan.appendChild(nyemoji); // sætter nyemoji ind i den skabte span med class = mood
        this.replaceChild(moodSpan, gammelemoji); // replace gammelemoji med den nye span 

        // aninmation (Giver den nye span en aninmation når den får mad)
        let moodAnimate = this.querySelector(".mood");
        moodAnimate.classList.add('animate__animated', 'animate__pulse');

        point = point + 100; //giv 100 point til point tælleren
    } else {
        let nyemoji = document.createTextNode("🤢");// Laver en emoji og kalder den -> nyeemoji
        moodSpan.appendChild(nyemoji); // sætter nyemoji ind i den skabte span med class = mood
        this.replaceChild(moodSpan, gammelemoji); // replace gammelemoji med den nye span 

        // aninmation (Giver den nye span en aninmation når den får mad)
        let moodAnimate = this.querySelector(".mood");
        moodAnimate.classList.add('animate__animated', 'animate__pulse');

        point = point - 100; //fjerner 100 point til point tælleren
        let clickFoodBox = document.querySelector("#" + madId); // kalder på maden  der er droppet forkert med dens Id
        lostFoodBox.appendChild(clickFoodBox); // flytter maden til lostFoodBox
    }

    if (point == "1000") {
        document.querySelector(".hura").style.display = "block";
        document.querySelector(".tryAgain").style.display = "block"
    } // Når man får 1000 point viser den elementerne med classen = hura og tryAgain

    if (foodBox.innerHTML.trim() == "") {
        document.querySelector(".dead").style.display = "block";
        document.querySelector(".tryAgain").style.display = "block"
    } // Når foodBoxen er tom viser den elementerne med classen = dead og tryAgain

    /*  // ignore dette 
         if (point < "0") {
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

    if (point >= "500") {
        // hvis man har 500 point eller mere
        const CharacterButton = document.querySelector(".button-character");

        CharacterButton.style.display = "inline"; // viser knappen med classen = Button-character

        CharacterButton.addEventListener("click", function () {
            // Hvis knappen bliver trykket
            const character = document.querySelector(".character"); // kalder elementet med classen = character -> character
            character.style.opacity = "1"; // giver character en opacitiy på 1
            character.disabled = false; // fjerner disabled på character
            point = point - 500; //fjerner 500 point til point tælleren
            pointBox.innerHTML = point //sætter point ind i pointBox
            CharacterButton.remove(".button-character"); // fjerne knappen
        })
    }

    if (lostFoodBox.innerHTML.trim() != "") {
        if (point >= "100") {
            // hvis der er noget i lostFoodBox og point er minst 100 point:
            const foodButton = document.querySelector(".button-food") // kalder på knappen med classen button-food
            foodButton.style.display = "inline"; // Viser knappen
            clickFoodBox = document.querySelector(".food") // henter den første element med classen food (hvirker kun vis boxen maden er flyttet over i er placeret før foodBox)

            foodButton.addEventListener("click", function () {
                // Når knappen clickes
                foodButton.style.display = "none"; // fjerner knappen så man ikke kan se den
                foodBox.appendChild(clickFoodBox) // flytter den første fjerne mad tilbage til foodBox 
                point = point - 100; //fjerner 100 point til point tælleren
                pointBox.innerHTML = point //sætter point ind i pointBox
            });
        };
    };
    pointBox.innerHTML = point //sætter point ind i pointBox
}
pointBox.innerHTML = point //sætter point ind i pointBox

