let cards = document.querySelectorAll(".testimonial__card");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

let index = 0;

function showSlide(i){
  cards.forEach(card => card.classList.remove("active"));
  cards[i].classList.add("active");
}

// Arrow click
nextBtn.addEventListener("click", ()=>{
  index++;
  if(index >= cards.length){ index = 0; }
  showSlide(index);
});

prevBtn.addEventListener("click", ()=>{
  index--;
  if(index < 0){ index = cards.length-1; }
  showSlide(index);
});

// Auto slide every 3 sec
setInterval(()=>{
  index++;
  if(index >= cards.length){ index = 0; }
  showSlide(index);
},3000);
