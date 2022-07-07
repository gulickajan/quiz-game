

let pO = document.getElementById("p1")
let pA = document.getElementById("p2")
let pB = document.getElementById("p3")
let pC = document.getElementById("p4")
let pAnswer = document.getElementById("p5")
let levels;
let randomNumber;
let countNumbersUsed = [0]
let nextBtn = document.getElementById("nextBtn")
let tryBtn = document.getElementById("reloadBtn")
let helpBtn = document.getElementById("helpBtn")
let cancelBtn = document.getElementById("cancelHelp")
let showBtn = document.getElementById("showBtn")
let printBtn = document.getElementById("printBtn")
let help = document.getElementById("helpP")

randomNumber = localStorage.getItem("randomNumberStorage")

showBtn.onclick = function () {
        let showAnswer = document.getElementById("showAnswer")
        showAnswer.classList.remove("hide")
        showAnswer.textContent = levels[randomNumber].answer
}

helpBtn.onclick = function () {
        printBtn.classList.remove("hide")
        help.classList.remove("hide")
        cancelBtn.classList.remove("hide")
}

cancelBtn.onclick = function () {
        help.classList.add("hide")
        cancelBtn.classList.add("hide")
        printBtn.classList.add("hide")

}

printBtn.onclick = function () {
        let print = help.innerHTML;
        let original = document.body.innerHTML;
        document.body.innerHTML = print;
        window.print();
        document.body.innerHTML = original;
}

let startBtn = document.getElementById("startBtn")

startBtn.onclick = function () {
        randomNumber = Math.floor(Math.random() * 10);
        localStorage.setItem("randomNumberStorage", randomNumber)
        location.reload()
}
function aa() {
        if (pAnswer.textContent === levels[randomNumber].answer){
                nextBtn.classList.remove("hide")
        }
        else{
                tryBtn.classList.remove("hide")
                showBtn.classList.remove("hide")
        }
}

nextBtn.onclick = function () {

        countNumbersUsed.push(randomNumber)
        randomNumber = Math.floor(Math.random() * 10);
        localStorage.setItem("randomNumberStorage", randomNumber)
        for (let i = 0; i < countNumbersUsed.length; i++){
                if(countNumbersUsed[i] === randomNumber){
                        randomNumber = Math.floor(Math.random() * 10);
                }
        }

        pO.textContent = levels[randomNumber].question
        pA.textContent = levels[randomNumber].A
        pB.textContent = levels[randomNumber].B
        pC.textContent = levels[randomNumber].C



        if (countNumbersUsed.length === 10){
                countNumbersUsed = [0]
        }

        location.reload()
}

tryBtn.onclick = function () {
        location.reload()
}

function answer(){
        if (pAnswer.textContent !== levels[randomNumber].answer)
                document.getElementById("wrongAnswer").innerHTML = "Your answer is wrong!";
        else
                document.getElementById("wrongAnswer").innerHTML = "";
}


fetch("./gamein.json")
    .then(res => res.json())
    .then(json => {
        levels = json;
            pO.textContent = levels[randomNumber].question
            pA.textContent = levels[randomNumber].A
            pB.textContent = levels[randomNumber].B
            pC.textContent = levels[randomNumber].C
    })


function allowDrop(ev) {
        ev.preventDefault();
}

function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
}

async function registerServiceWorker() {
        if ("serviceWorker" in navigator){
                try {
                        await navigator.serviceWorker.register("./service_worker.js")
                } catch (e){
                        console.log("SW registration failed")
                }
        }
}
window.addEventListener('load', () => {
        registerServiceWorker();
})







