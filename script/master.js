// Main JS file

var oneaday = new function() {
  var self = this;
  var pageHeight;
  var pageWidth;
  var activePost;

  this.init = function() {
    // Functions to run on init
    self.fitvidsInit();
    self.imageToggle();
    self.keyboardNav();
  };

  this.getCurrentWindowSize = function() {
    // Get page width & height
    pageHeight =  window.innerHeight || window.documentElement.clientHeight || window.body.clientHeight;
    pageWidth =   window.innerWidth  || window.documentElement.clientWidth  || window.body.clientWidth;
  };

  this.fitvidsInit = function() {
    $('.video-player').fitVids();
  };

  this.imageHeight = function() {
    // Change padding sizes on browser width
    self.getCurrentWindowSize();

    if (pageWidth >= 870) {
      $('.post').not('.active').css({'padding-bottom': 369});
    }
    else {
      $('.post').not('.active').css({'padding-bottom': '42.4137931%'});
    }
  };

  this.imageToggle = function() {
    $('.post.photo').on('click', function() {
      var post = this;
      activePost = this;

      $(post).stop();
      $(post).find('.date').stop();

      if ( !$(post).hasClass('active') ) {
        self.imageExpand(post);
      }

      else {
        self.imageCollapse(post);
      }
    });
  };

  this.imageExpand = function(post) {
    console.log("Expanding");
    self.getCurrentWindowSize();
    var currImageWidth = $(post).find('img').width();
    var currImageHeight = $(post).find('img').height();

    var newImageWidth;
    var newImageHeight;

    // Get height of image in post
    if (pageWidth >= 1280) {
      newImageWidth = 1280;
    }
    else {
      newImageWidth = pageWidth;
    }
    newImageHeight = Math.round( (currImageHeight * newImageWidth)/currImageWidth );
    // Collapse all other posts after expanding
    self.imageCollapse( $('.post') );
    // Expand clicked post
    $(post).transition({'padding-bottom': (newImageHeight + 80), 'max-width': 1280, 'margin': '40px auto 60px'}, { duration: 300, easing: 'easeOutQuint', queue: false });
    $(post).find('.date').transition({'opacity': 1, 'bottom': 0}, { duration: 600, easing: 'ease', queue: false });
    $(post).addClass('active');
  };

  this.imageCollapse = function(post) {
    self.getCurrentWindowSize();
    if (pageWidth >= 870) {
      // Collapse specified post
      $(post).transition({'padding-bottom': '369px', 'max-width': 870, 'margin': '0 auto'}, { duration: 300, easing: 'easeOutQuint', queue: false });
    }
    else {
      // Collapse specified post
      $(post).transition({'padding-bottom': '42.4137931%', 'max-width': 870, 'margin': '0 auto'}, { duration: 300, easing: 'easeOutQuint', queue: false });
    }
    $(post).find('.date').transition({'opacity': 0, 'bottom': '30px'}, { duration: 600, easing: 'ease', queue: false });
    $(post).removeClass('active');
  };

  this.keyboardNav = function() {
    window.addEventListener('keydown', function(e) {
      console.log(e.keyCode);
      if (activePost) {
        if(e.keyCode == 38) {
          console.log('up');
          // Up
          e.preventDefault();
          self.imageExpand( $(activePost).prev() );
          activePost = $(activePost).prev();
        }
        if(e.keyCode == 40) {
          // Down
          e.preventDefault();
          self.imageExpand( $(activePost).next() );
          activePost = $(activePost).next();
        }
      }
      else {
        if(e.keyCode == 40) {
          // Down
          self.imageExpand( $('.post').first() );
          activePost = $('.post').first();
        }
      }
    }, false);
  };
}

// jQuery Init
$(function() {
  oneaday.init();
});

// jQuery Window Resize
$(window).resize(function() {
  oneaday.imageHeight();
  oneaday.imageCollapse( $('.post') );
});
