function toggleTab(evt, tabID) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.querySelectorAll(".tabbed button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  style = document.getElementById(tabID).style.display;
  if (style === "block") {
    document.getElementById(tabID).style.display = "none";
    evt.currentTarget.className += " active";
  } else {
    document.getElementById(tabID).style.display = "block";
    evt.currentTarget.className -= " active";
}
} 