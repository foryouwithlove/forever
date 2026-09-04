document.addEventListener("DOMContentLoaded",()=>{

const successOverlay=document.getElementById("successOverlay");
const successTitle=document.getElementById("successTitle");
const successMessage=document.getElementById("successMessage");
const successButton=document.getElementById("successButton");

if(successOverlay){
successOverlay.classList.remove("show");
}

function showSuccess(title,message,page){
if(!successOverlay)return;

successTitle.textContent=title;
successMessage.textContent=message;
successOverlay.classList.add("show");

successButton.onclick=()=>{
successOverlay.classList.remove("show");
if(page)window.location.href=page;
};
}

function hideSuccess(){
if(successOverlay){
successOverlay.classList.remove("show");
}
}

if(successOverlay){
successOverlay.addEventListener("click",event=>{
if(event.target===successOverlay){
hideSuccess();
}
});
}

/* =========================================================
1. KADHAI - OUR STORY
========================================================= */
  

const storyComplete = document.getElementById("storyComplete");

if (storyPuzzle) {

let draggedTile = null;
let tiles = Array.from(storyPuzzle.children);

function showStoryComplete() {
    if (storyComplete) {
        storyComplete.classList.add("show");
    }
}

function checkStoryPuzzle() {
    const current = Array.from(storyPuzzle.children);

    const solved = current.every((tile, index) => {
        return Number(tile.dataset.correct) === index + 1;
    });

    if (solved) {
        sessionStorage.setItem("storyPuzzleSolved", "true");
        showStoryComplete();

        showSuccess(
            "YAY! YOU GOT IT ♡",
            "Paravalaiye nyabagam irukku, Good job! 🥳",
            "kadhai.html"
        );
    }
}

function setupDrag(tile) {
    tile.draggable = true;

    tile.addEventListener("dragstart", () => {
        draggedTile = tile;
        tile.classList.add("dragging");
    });

    tile.addEventListener("dragend", () => {
        tile.classList.remove("dragging");
        draggedTile = null;
    });

    tile.addEventListener("dragover", event => {
        event.preventDefault();
        tile.classList.add("drag-over");
    });

    tile.addEventListener("dragleave", () => {
        tile.classList.remove("drag-over");
    });

    tile.addEventListener("drop", event => {
        event.preventDefault();
        tile.classList.remove("drag-over");

        if (!draggedTile || draggedTile === tile) return;

        const all = Array.from(storyPuzzle.children);
        const from = all.indexOf(draggedTile);
        const to = all.indexOf(tile);

        if (from < to) {
            storyPuzzle.insertBefore(draggedTile, tile.nextSibling);
        } else {
            storyPuzzle.insertBefore(draggedTile, tile);
        }

        checkStoryPuzzle();
    });
}

function shufflePuzzle() {
const shuffled = [...tiles];

for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] =
    [shuffled[randomIndex], shuffled[i]];
}
  
const alreadySolved = shuffled.every((tile, index) => {
    return Number(tile.dataset.correct) === index + 1;
});

if (alreadySolved) {
    shufflePuzzle();
    return;
}

storyPuzzle.classList.add("shuffling");

setTimeout(() => {
    shuffled.forEach(tile => {
        storyPuzzle.appendChild(tile);
    });

    storyPuzzle.classList.remove("shuffling");
}, 250);

}

if (sessionStorage.getItem("storyPuzzleSolved") === "true") {

    tiles.sort((a, b) => {
        return Number(a.dataset.correct) - Number(b.dataset.correct);
    });

    tiles.forEach(tile => {
        storyPuzzle.appendChild(tile);
    });

    showStoryComplete();

} else {

    shufflePuzzle();

}

Array.from(storyPuzzle.children).forEach(tile => {
    setupDrag(tile);
});

}


/* =========================================================
2. KADHAL - REASONS TO LOVE YOU
========================================================= */

const animeOptions=document.querySelectorAll(".anime-option");
const animeStatus=document.getElementById("anime-status");

const savedAnime=sessionStorage.getItem("selectedAnime");

if(savedAnime){
const savedOption=document.querySelector(`.anime-option[data-option="${savedAnime}"]`);
if(savedOption)savedOption.classList.add("selected");
}

animeOptions.forEach((option,index)=>{
option.dataset.option=index;

option.addEventListener("click",()=>{
animeOptions.forEach(item=>item.classList.remove("selected"));
option.classList.add("selected");

sessionStorage.setItem("selectedAnime",index);

if(option.dataset.correct==="true"){

showSuccess(
"YAY! YOU GOT IT ♡",
"Correct answer! You found the love of my life 😊",
"kadhal.html"
);

sessionStorage.setItem("loveSolved","true");
document.getElementById("loveComplete").classList.add("show");

}else{

sessionStorage.setItem("wrongReturnPage","home.html");
sessionStorage.setItem("restoreScrollPosition",window.scrollY);
window.location.href="wrong.html";

}
});
});

if(sessionStorage.getItem("loveSolved")==="true"){
document.getElementById("loveComplete").classList.add("show");

const solvedOption=document.querySelector('.anime-option[data-correct="true"]');
if(solvedOption)solvedOption.classList.add("selected");
}

window.addEventListener("load",()=>{
const position=sessionStorage.getItem("restoreScrollPosition");

if(position!==null){
setTimeout(()=>{
window.scrollTo(0,Number(position));
sessionStorage.removeItem("restoreScrollPosition");
},100);
}
});

/* =========================================================
3. KASAPPU - REASONS TO HATE YOU
========================================================= */

const numberInput=document.getElementById("number-input");
const numberCheck=document.getElementById("number-check");
const numberStatus=document.getElementById("number-status");
const numberHearts=document.getElementById("number-hearts");
const correctNumber=3;

let numberLives=Number(sessionStorage.getItem("numberLives"));

if(!numberLives){
numberLives=3;
sessionStorage.setItem("numberLives",numberLives);
}

function updateHearts(){
const hearts=numberHearts.querySelectorAll(".heart");

hearts.forEach((heart,index)=>{
if(index<numberLives){
heart.classList.remove("empty");
}else{
heart.classList.add("empty");
}
});
}

updateHearts();

function checkNumber(){

if(!numberInput.value.trim()){
numberStatus.textContent="Enter a number first 😭";
return;
}

const guess=Number(numberInput.value);

if(guess===correctNumber){

sessionStorage.removeItem("numberLives");

numberInput.value="";
numberStatus.textContent="";

showSuccess(
"YAY! YOU GOT IT ♡",
"Ippo othukura, ni enna true ah love panra nu!😁",
"kasappu.html"
);

sessionStorage.setItem("hateSolved","true");
document.getElementById("hateComplete").classList.add("show");

return;
}

numberLives--;

sessionStorage.setItem("numberLives",numberLives);

let hintText="";

if(guess>correctNumber){
hintText="Too high! The number is lower. ↓";
}else{
hintText="Too low! The number is higher. ↑";
}

let chanceText="";

if(numberLives===2){
chanceText="You have 2 chances left ♡";
}else if(numberLives===1){
chanceText="You have 1 chance left ♡";
}else{
chanceText="You have 0 chances left ♡";
}

numberStatus.innerHTML=`${hintText}<br><span class="chance-text">${chanceText}</span>`;

/* CLEAR THE OLD NUMBER */
numberInput.value="";

updateHearts();

if(numberLives<=0){

sessionStorage.removeItem("numberLives");

sessionStorage.setItem(
"wrongReturnPage",
"home.html#hate"
);

setTimeout(()=>{
window.location.href="wrong.html";
},700);
}
}

if(numberCheck){
numberCheck.addEventListener("click",checkNumber);
}

if(numberInput){
numberInput.addEventListener("keydown",event=>{
if(event.key==="Enter"){
checkNumber();
}
});
}
if(sessionStorage.getItem("hateSolved")==="true"){
document.getElementById("hateComplete").classList.add("show");
}

/* =========================================================
4. WHY EVERYONE LOVES YOU
========================================================= */

const mcqSubmit=document.getElementById("mcq-submit");
const mcqStatus=document.getElementById("mcq-status");

const mcqAnswers={
q1:"b",
q2:"c",
q3:"b",
q4:"a"
};

const savedAnswers=JSON.parse(sessionStorage.getItem("everyoneAnswers")||"{}");

Object.entries(savedAnswers).forEach(([question,answer])=>{
const input=document.querySelector(`input[name="${question}"][value="${answer}"]`);
if(input) input.checked=true;
});

document.querySelectorAll('.mcq-card input[type="radio"]').forEach(input=>{
input.addEventListener("change",()=>{
const answers={};
document.querySelectorAll('.mcq-card input[type="radio"]:checked').forEach(selected=>{
answers[selected.name]=selected.value;
});
sessionStorage.setItem("everyoneAnswers",JSON.stringify(answers));
});
});

if(mcqSubmit){
mcqSubmit.addEventListener("click",()=>{
let allAnswered=true;
let allCorrect=true;

Object.entries(mcqAnswers).forEach(([question,answer])=>{
const selected=document.querySelector(`input[name="${question}"]:checked`);

if(!selected){
allAnswered=false;
}else if(selected.value!==answer){
allCorrect=false;
}
});

if(!allAnswered){
mcqStatus.textContent="Answer all four questions first. ❤️";
return;
}

if(!allCorrect){
mcqStatus.textContent="Wrong answer! Try again. 😭";
return;
}

mcqStatus.textContent="";

sessionStorage.setItem("everyoneSolved","true");

showSuccess(
"YAY! YOU KNOW ME ♡",
"You understand me ⊹₊⟡⋆",
"kaandham.html"
);

document.getElementById("everyoneComplete").classList.add("show");
});
}

if(sessionStorage.getItem("everyoneSolved")==="true"){
document.getElementById("everyoneComplete").classList.add("show");
}

/* =========================================================
5. WHY I'M LUCKY - MATCHING
========================================================= */

const matchItems=document.querySelectorAll(".match-item");
const matchStatus=document.getElementById("match-status");

let selectedLeft=null;
let selectedRight=null;
let matchedCount=0;

matchItems.forEach(item=>{
item.addEventListener("click",()=>{
if(item.classList.contains("matched"))return;

const parent=item.closest(".match-column");
const columns=document.querySelectorAll(".match-column");
const isLeft=parent===columns[0];

if(isLeft){
columns[0].querySelectorAll(".match-item").forEach(btn=>btn.classList.remove("selected"));
selectedLeft=item;
item.classList.add("selected");
}else{
columns[1].querySelectorAll(".match-item").forEach(btn=>btn.classList.remove("selected"));
selectedRight=item;
item.classList.add("selected");
}

if(selectedLeft&&selectedRight){

if(selectedLeft.dataset.id===selectedRight.dataset.id){

selectedLeft.classList.remove("selected");
selectedRight.classList.remove("selected");

selectedLeft.classList.add("matched");
selectedRight.classList.add("matched");

matchedCount++;

selectedLeft=null;
selectedRight=null;

if(matchedCount===4){
matchStatus.textContent="";

showSuccess(
"PERFECT MATCH ♡",
"Lucky to have you in my life!",
"lucky.html"
);

sessionStorage.setItem("luckySolved","true");
document.getElementById("luckyComplete").classList.add("show");
}

}else{

selectedLeft.classList.remove("selected");
selectedRight.classList.remove("selected");

selectedLeft.classList.add("wrong");
selectedRight.classList.add("wrong");

setTimeout(()=>{
selectedLeft?.classList.remove("wrong");
selectedRight?.classList.remove("wrong");
selectedLeft=null;
selectedRight=null;
},600);
}
}
});
});

if(sessionStorage.getItem("luckySolved")==="true"){
matchItems.forEach(item=>{
item.classList.add("matched");
});
matchedCount=4;
document.getElementById("luckyComplete").classList.add("show");
}

/* =========================================================
6. KAVITHAI - SONG GUESSING
========================================================= */
const songOptions=document.querySelectorAll('input[name="song-choice"]');
const songStatus=document.getElementById("song-status");

const savedSong=sessionStorage.getItem("selectedSong");

if(savedSong){
const savedInput=document.querySelector(`input[name="song-choice"][value="${savedSong}"]`);
if(savedInput)savedInput.checked=true;
}

songOptions.forEach(input=>{
input.addEventListener("change",()=>{
sessionStorage.setItem("selectedSong",input.value);

if(input.value!=="pogathe"){
sessionStorage.setItem("returnToKavithai","true");
sessionStorage.setItem("kavithaiScroll",window.scrollY);
window.location.href="wrong.html";
return;
}

sessionStorage.setItem("kavithaiSolved","true");

showSuccess(
"YOU GOT IT ♡",
"True soulmates! ◝(ᵔᗜᵔ)◜",
"kavithai.html"
);

document.getElementById("kavithaiComplete").classList.add("show");
});
});

if(sessionStorage.getItem("kavithaiSolved")==="true"){
songOptions.forEach(input=>{
input.disabled=true;
});
document.getElementById("kavithaiComplete").classList.add("show");
}

window.addEventListener("load",()=>{
if(sessionStorage.getItem("returnToKavithai")==="true"){
const savedScroll=sessionStorage.getItem("kavithaiScroll");

sessionStorage.removeItem("returnToKavithai");
sessionStorage.removeItem("kavithaiScroll");

if(savedScroll){
setTimeout(()=>{
window.scrollTo({
top:Number(savedScroll),
behavior:"instant"
});
},100);
}
}
});

/* =========================================================
SECTION COUNTER
========================================================= */

const progress=document.getElementById("sectionProgress");
const sections=document.querySelectorAll("[data-section]");

if(progress&&sections.length){

function updateProgress(){
let current=0;

sections.forEach((section,index)=>{
const rect=section.getBoundingClientRect();

if(rect.top<=window.innerHeight*0.5){
current=index+1;
}
});

progress.textContent=`${current}/6`;
}

window.addEventListener("scroll",updateProgress);
updateProgress();

  const revealItems=document.querySelectorAll(".reveal");

const revealObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
revealObserver.unobserve(entry.target);
}
});
},{threshold:.15});

revealItems.forEach(item=>revealObserver.observe(item));
}

});
