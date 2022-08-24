function responsiveNav() {
  var x = document.getElementById("responsiveNav");
  if (x.className === "responsiveNav") x.className += " responsive";
  else x.className = "responsiveNav";
}

$(document).ready(function(){
  // Expand and Collapse Nav
  $('.toggle').on('click', function(){
    $('#main-navigation').toggleClass('open');
  });
  
  // Nav Items
  $('.item').each(function(){
    var me = $(this);
    me.on('click', function(){
      console.log(me);
      if(me.hasClass('has-menu')) {
        
        // Hide all open nav menus
        $('.item').not(this).each(function(){
          if($(this).hasClass('show-menu')) {
            $(this).toggleClass('show-menu');
          }
        });
        
        // Show/Hide this items menu
        // Focus/UnFocus this item
        me.toggleClass('show-menu');
        me.toggleClass('focused');
        
      } else {
        $('.item').each(function(){
          // Clear all active items
          if($(this).hasClass('active')) {
            $(this).toggleClass('active');
          }
          // Close all menus
          if($(this).hasClass('show-menu')) {
            $(this).toggleClass('show-menu');
          }
        });
        
        // Make this item active
        me.addClass('active');
      }
      
    });
  });
  
  // Menu items
  $('.menu').find('.subitem').each(function(){
    // Clickable items
    if(!$(this).hasClass('no-cursor')) {
      $(this).click(function(e){
        e.stopPropagation(); // prevents parent nav item click event
        $('.item').each(function(){
          // Clear all active menu items
          if($(this).hasClass('active')) {
            $(this).toggleClass('active');
          }
          
          // Close all open menus after clicking a menu item
          if($(this).hasClass('show-menu')) {
            $(this).toggleClass('show-menu');
          }
        });
        
        // Set this menu item's parent as active item
        $(this).parent().parent().addClass('active');
      }); 
    }
  });
});