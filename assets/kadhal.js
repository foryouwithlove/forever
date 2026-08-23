const reasons=document.querySelectorAll(".reason");

reasons.forEach(reason=>{
reason.addEventListener("click",()=>{
reason.classList.add("clicked");

setTimeout(()=>{
reason.classList.remove("clicked");
},200);
});
});