'use strict';


class View {
    updateVinput(x) {
        this.updateVisitingUnit();
        let visitInput = document.getElementById("vInput");
        x = parseInt(x);
        Math.round(x);
        visitInput.innerHTML += x;
    }

    updateVisitingUnit(){
        let visitUnit = document.getElementById("Unit");
        let SelectedUnit = document.getElementById("VisingPicture");
        visitUnit.innerText = SelectedUnit.innerText;
    }

    updateResultUnit(){
        let visitUnit = document.getElementById("Unit");
        let SelectedUnit = document.getElementById("HomePicture");
        visitUnit.innerText = SelectedUnit.innerText;
    }

    clear(){
        let visitInput = document.getElementById("vInput");
        let visitUnit = document.getElementById("Unit");
        visitInput.innerHTML = "";
        visitUnit.innerText = "";

    }

    setVisitFlag(x) {
        let img = document.getElementById("Flag1");
        img.setAttribute("src", `${x}.png`);
    }
    setHomeFlag(x) {
        let img = document.getElementById("Flag2");
        img.setAttribute("src", `${x}.png`);
    }

}

