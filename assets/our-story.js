const startDate=new Date(2023,5,27,20,30,0);
function updateRelationshipTimer(){
const now=new Date();

/* ============= YEARS, MONTHS AND DAYS ================ */
let years=now.getFullYear()-startDate.getFullYear();
let months=now.getMonth()-startDate.getMonth();
let days=now.getDate()-startDate.getDate();
if(days<0){
months--;
const daysInPreviousMonth=new Date(now.getFullYear(),now.getMonth(),0).getDate();
days+=daysInPreviousMonth;
}
if(months<0){
years--;
months+=12;
}

/* ============= HOURS, MINUTES, SECONDS ================ */
const totalSeconds=Math.floor((now-startDate)/1000);
const seconds=totalSeconds%60;
const minutes=Math.floor(totalSeconds/60)%60;
const hours=Math.floor(totalSeconds/3600)%24;

/* ============= DISPLAY ================ */
document.getElementById("years").textContent=years;
document.getElementById("months").textContent=months;
document.getElementById("days").textContent=days;
document.getElementById("hours").textContent=String(hours).padStart(2,"0");
document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");
document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");
}
updateRelationshipTimer();

/* UPDATE EVERY SECOND */
setInterval(updateRelationshipTimer,1000);

/* ============= TYPEWRITING LOOP ================ */
const titleText="THE LOVE STORY...";
const title=document.getElementById("typewriter-title");
let titleIndex=0;
let deleting=false;

function typeTitle(){
if(!deleting){
title.textContent=titleText.slice(0,titleIndex+1);
titleIndex++;
if(titleIndex===titleText.length){
deleting=true;
setTimeout(typeTitle,2200);
return;
}
setTimeout(typeTitle,140);
}else{
title.textContent=titleText.slice(0,titleIndex-1);
titleIndex--;
if(titleIndex===0){
deleting=false;
setTimeout(typeTitle,700);
return;
}
setTimeout(typeTitle,70);
}
}
typeTitle();

/* ============= REVEAL ================ */
const revealElements=document.querySelectorAll(".reveal");

const revealObserver=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
revealObserver.unobserve(entry.target);
}
});
},{
threshold:.15
});

revealElements.forEach(element=>{
revealObserver.observe(element);
});
