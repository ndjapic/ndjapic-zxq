 window.onload = function () {
  var kb = {enter: 13, esc: 27, left: 37, up: 38, right: 39, down: 40};
  var i = 0; // move to first slide
  var slides = document.querySelectorAll('body > div.slide');
  var t;
  function showSlide(i) {
   slides.item(i).classList.add('visible'); // show current slide
  }
  showSlide(0);

  document.onkeydown = function (evt) {
   evt = evt || window.event;
   var code = evt.keyCode;
   slides.item(i).classList.remove('visible'); // hide current slide
   if( code === kb.left || code === kb.esc ) {
    evt.preventDefault();
    if(i > 0) {i -= 1}; // move to previous slide
   } else if( code === kb.right || code === kb.enter ) {
    evt.preventDefault();
    if(i < slides.length - 1) {i += 1}; // move to next slide
   }
   showSlide(i);
//   return false;
  };
 };
