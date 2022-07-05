// Responsive Nav
function responsiveNav() {
    var x = document.getElementById("responsiveNav");
    if (x.className === "responsiveNav") x.className += " responsive";
    else x.className = "responsiveNav";
}

// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}
