function toggleTab(evt, tabID) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  style = document.getElementById(tabID).style.display;
  if (style === "block") document.getElementById(tabID).style.display = "none";
  else document.getElementById(tabID).style.display = "block";
  
} 