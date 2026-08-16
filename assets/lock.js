document.addEventListener("DOMContentLoaded",()=>{
const dateDisplay=document.getElementById("dateDisplay");
const selectedDate=document.getElementById("selectedDate");
const calendar=document.getElementById("calendar");
const monthYear=document.getElementById("monthYear");
const days=document.getElementById("days");
const prevMonth=document.getElementById("prevMonth");
const nextMonth=document.getElementById("nextMonth");
const dateForm=document.getElementById("dateForm");
const dateError=document.getElementById("dateError");

const correctDate="2026-08-27";
const today=new Date();
let currentDate=new Date(today.getFullYear(),today.getMonth(),1);
let chosenDate="";

function renderCalendar(){
const year=currentDate.getFullYear();
const month=currentDate.getMonth();

monthYear.textContent=currentDate.toLocaleString("en-US",{
month:"long",
year:"numeric"
});

days.innerHTML="";

const firstDay=new Date(year,month,1).getDay();
const totalDays=new Date(year,month+1,0).getDate();

for(let i=0;i<firstDay;i++){
const empty=document.createElement("span");
empty.className="empty";
days.appendChild(empty);
}

for(let day=1;day<=totalDays;day++){
const button=document.createElement("button");
button.type="button";
button.textContent=day;

const date=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

if(date===chosenDate){
button.classList.add("selected");
}

button.addEventListener("click",()=>{
chosenDate=date;
selectedDate.textContent=`${String(day).padStart(2,"0")} / ${String(month+1).padStart(2,"0")} / ${year}`;
calendar.classList.remove("open");
renderCalendar();
});

days.appendChild(button);
}
}

dateDisplay.addEventListener("click",(event)=>{
event.preventDefault();
event.stopPropagation();
calendar.classList.toggle("open");
});

prevMonth.addEventListener("click",(event)=>{
event.preventDefault();
event.stopPropagation();
currentDate.setMonth(currentDate.getMonth()-1);
renderCalendar();
});

nextMonth.addEventListener("click",(event)=>{
event.preventDefault();
event.stopPropagation();
currentDate.setMonth(currentDate.getMonth()+1);
renderCalendar();
});

dateForm.addEventListener("submit",(event)=>{
event.preventDefault();

if(chosenDate===correctDate){
window.location.href="home.html";
}else{
dateError.textContent="Hmm... Wrong answer 😠 Try again!";
dateError.style.color="#b32f51";
}
});

document.addEventListener("click",(event)=>{
if(!calendar.contains(event.target)&&!dateDisplay.contains(event.target)){
calendar.classList.remove("open");
}
});

renderCalendar();
});
