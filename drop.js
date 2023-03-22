function dropMad(event) {
    //console.log("der er droppet mad");
    let madId = event.dataTransfer.getData("foodId");
    let madType = event.dataTransfer.getData("foodName");

    let iLike = this.dataset.food;
    let gammelemoji = this.querySelector(".mood");
    
    const sp1 = document.createElement("span");
    // Give it an class attribute called 'mood'
    sp1.className = "mood";

    if ( iLike.includes(madType) ) {
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
