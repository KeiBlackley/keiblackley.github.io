function responsiveNav() {
  var x = document.getElementById("responsiveNav");
  if (x.className === "responsiveNav") x.className += " responsive";
  else x.className = "responsiveNav";
}