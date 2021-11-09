$(document).ready(function(){

   
    $(function(){
      activate('img[src*=".svg"]');
  
      function activate(string){
          jQuery(string).each(function(){
              var $img = jQuery(this);
              var imgID = $img.attr('id');
              var imgClass = $img.attr('class');
              var imgURL = $img.attr('src');
  
              jQuery.get(imgURL, function(data) {
                  // Get the SVG tag, ignore the rest
                  var $svg = jQuery(data).find('svg');
  
                  // Add replaced image's ID to the new SVG
                  if(typeof imgID !== 'undefined') {
                      $svg = $svg.attr('id', imgID);
                  }
                  // Add replaced image's classes to the new SVG
                  if(typeof imgClass !== 'undefined') {
                      $svg = $svg.attr('class', imgClass+' replaced-svg');
                  }
  
                  // Remove any invalid XML tags as per http://validator.w3.org
                  $svg = $svg.removeAttr('xmlns:a');
  
                  // Replace image with new SVG
                  $img.replaceWith($svg);
  
              }, 'xml');
          });
      }
  
  
  });
  
  });
  
  
  $('.hamburger').click(function () {
    $('#menu').toggleClass('active');
    $('.hamburger').toggleClass('active');
    $('#header').toggleClass('active');
  });
  
 
  $(function() {
     $.scrollify({
         section:".slide",
         easing:"easeOutQuad",
         scrollSpeed:1100,
         scrollbars:false,
         sectionName:false,
         setHeights:false,
         overflowScroll:false,
         before:function(i) {
             var active = $(".slide.active");
             active.addClass("remove");
 
 

             //setTimeout(function() {
             $("body").removeClass("screen0");
             $("body").removeClass("screen1");
             $("body").removeClass("screen2");
             $("body").removeClass("screen3");
             $("body").addClass("screen" + i);
             $("[data-slide=" + i + "]").addClass("active");
             active.removeClass("remove active");
             //},300);
   
 
             var currentSlide = $.scrollify.current();
             var hiringWidth = $(".right-side li .hiring").width() + 19;
             var productsWidth = $(".right-side li .hiring").width() + 30;

        




             if (currentSlide.context.id == "a"){
                $("#roller").css("width", '0');
                $("#roller").css("left", '0');
             } else if (currentSlide.context.id == "b"){
                $("#roller").css("width", productsWidth);
                $("#roller").css("left", '0');
             } else if (currentSlide.context.id == "c"){
                $("#roller").css("width", productsWidth);
                $("#roller").css("left", '0');
             } else if (currentSlide.context.id == "d"){
                $("#roller").css("width", hiringWidth);
                $("#roller").css("left", "calc(100% - " + hiringWidth + "px)");
             }


 
         },
         afterRender() {
             $(".panel").each(function() {
             $(this).css("height", parseInt($(window).height())*6 );
     
             $(this).find(".inner").css("height", $(window).height());
   


         });
         
   
         $.scrollify.update();
         $("[data-slide=0]").addClass("active");
         
       },
     });
     
   });
   


 
 