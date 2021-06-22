'use strict';

const model = new Model();
const view = new View();

function loadFromServer() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if(req.readyState === 4 && req.status === 200){
            let elem=req.responseText;
            callback(elem);
        }
    };
    req.open("GET", "https://devweb2020.cis.strath.ac.uk/~aes02112/ecbxml.php", true);
    req.send();
}
function callback(elem) {
    model.newRates(elem);
}


window.addEventListener("load", function() {
        if(model.getCurrentDate() !== model.getStoredDate()){
            loadFromServer();
            console.log("fetching new rates for today");
        }else {
            console.log("Same day");
        }
});

window.addEventListener("load", function() {model.loadData()});
document.getElementById('1').onclick = function() {view.updateVinput(1)};
document.getElementById('2').onclick = function() {view.updateVinput(2)};
document.getElementById('3').onclick = function() {view.updateVinput(3)};
document.getElementById('4').onclick = function() {view.updateVinput(4)};
document.getElementById('5').onclick = function() {view.updateVinput(5)};
document.getElementById('6').onclick = function() {view.updateVinput(6)};
document.getElementById('7').onclick = function() {view.updateVinput(7)};
document.getElementById('8').onclick = function() {view.updateVinput(8)};
document.getElementById('9').onclick = function() {view.updateVinput(9)};
document.getElementById('0').onclick = function() {view.updateVinput(0)};
document.getElementById('Enter').onclick = function() {
    let price = model.calcPrice();
    view.clear();
    view.updateVinput(price);
    view.updateResultUnit();
};
document.getElementById('Clear').onclick = function() {view.clear()};
window.addEventListener("unload", function() {model.saveDate()});
window.addEventListener("unload", function() {model.saveData()});
