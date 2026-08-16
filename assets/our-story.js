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
