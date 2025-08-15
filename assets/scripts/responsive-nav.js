// Toggle mobile nav
var mobilenaviconElement = document.querySelector(".mobilenav-icon");
var navElement = document.querySelector("nav");

mobilenaviconElement.addEventListener('click', function() {
  navElement.classList.toggle('responsive'); 
});