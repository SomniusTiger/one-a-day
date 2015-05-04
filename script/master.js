// Main JS file

var oneaday = new function() {
  var self = this;
  var windowHeight;
  var windowWidth;
  var activePost;
  var currPage = 1;

  this.init = function() {
    // Functions to run on init
    self.fitvidsInit();
    self.imageToggle();
    self.getPostPos();
    self.keyboardNav();
    self.infiniteScroll();
    self.dropdown();
  };

  this.getCurrentWindowSize = function() {
    // Get page width & height
    windowHeight =  window.innerHeight || window.documentElement.clientHeight || window.body.clientHeight;
    windowWidth =   window.innerWidth  || window.documentElement.clientWidth  || window.body.clientWidth;
  };

  this.fitvidsInit = function() {
    $('.video-player').fitVids();
  };

  this.imageHeight = function() {
    // Change padding sizes on browser width
    self.getCurrentWindowSize();

    if (windowWidth >= 870) {
      $('.post').not('.active').css({'padding-bottom': 369});
    }
    else {
      $('.post').not('.active').css({'padding-bottom': '42.4137931%'});
    }
  };

  this.imageToggle = function() {
    $('#main').on('click', '.post.photo', function() {
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
    self.getCurrentWindowSize();
    var currImageWidth = $(post).find('img').width();
    var currImageHeight = $(post).find('img').height();

    var newImageWidth;
    var newImageHeight;

    // Get height of image in post
    if (windowWidth >= 1320) {
      newImageWidth = 1280;
    }
    else {
      newImageWidth = windowWidth;
    }
    newImageHeight = Math.round( (currImageHeight * newImageWidth)/currImageWidth );

    // Make sure expanded image height does not become larger than window height
    if (newImageHeight > windowHeight - 200) {
      newImageHeight = windowHeight - 200;
      newImageWidth = Math.round( (newImageHeight * currImageWidth)/currImageHeight );
    }

    // Collapse all other posts after expanding
    self.imageCollapse( $('.post') );
    // Expand clicked post
    $(post).transition({'padding-bottom': newImageHeight + 80, 'max-width': newImageWidth, 'margin': '40px auto'}, { duration: 300, easing: 'easeOutQuint', queue: false });
    $(post).find('.date').transition({'opacity': 1, 'bottom': 0}, { duration: 600, easing: 'ease', queue: false });
    $(post).addClass('active');

    self.scrollToPost(post, newImageWidth, newImageHeight);
  };

  this.imageCollapse = function(post) {
    self.getCurrentWindowSize();
    if (windowWidth >= 870) {
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
      if (activePost) {
        if(e.keyCode == 38 || e.keyCode == 37) {
          // Up or Left
          if ( $(activePost).prev().length > 0 ) {
            e.preventDefault();
            self.imageExpand( $(activePost).prev() );
            activePost = $(activePost).prev();
          }
        }
        if(e.keyCode == 40 || e.keyCode == 39) {
          // Down or Right
          if ( $(activePost).next().length > 0 ) {
            e.preventDefault();
            self.imageExpand( $(activePost).next() );
            activePost = $(activePost).next();
          }
        }
      }
      else {
        if(e.keyCode == 40 || e.keyCode == 39) {
          // Down or Right to first post
          if ( $('.post').first().length > 0 ) {
            e.preventDefault();
            self.imageExpand( $('.post').first() );
            activePost = $('.post').first();
          }
        }
      }
    }, false);
  };

  this.getPostPos = function() {
    if ( $('.post').hasClass('active') ) {
      // Get difference in height
      heightDiff = ($('.post.active').outerHeight() + 80) - $('.post').not('.active').first().outerHeight();
      $('.post.active').nextAll('.post').each(function() {
        $(this).attr('data-offset-top', $(this).offset().top - heightDiff);
      });
    }
    else {
      $('.post').each(function() {
        $(this).attr('data-offset-top', $(this).offset().top);
      });
    }
  };

  this.scrollToPost = function(post, postWidth, postHeight) {
    self.getCurrentWindowSize();
    // Scroll to that post, center post on the page
    var sizeDiff = (windowHeight - (postHeight + 200) ) / 2;
    var scrollDiff = $(post).attr('data-offset-top') - sizeDiff;
    $('body, html').stop();
    $('body, html').animate({ scrollTop: scrollDiff });
  };

  this.infiniteScroll = function() {
    $('#main').infinitescroll({
      loading: {
        finished: self.onInfiniteScroll,
        finishedMsg: "",
        img: "",
        msg: null,
        msgText: ""
      },
      navSelector: ".pagination",
      nextSelector: ".pagination a.next",
      itemSelector: ".post"
    });
  };

  this.onInfiniteScroll = function() {
    self.getPostPos();
  };

  this.dropdown = function() {
    $('.btn-dropdown').click(function() {
      if ( !$('.dropdown-menu').hasClass('show') ) {
        $('.dropdown-menu').addClass('show');
      }
      else {
        $('.dropdown-menu').removeClass('show');
      }
    });
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
  oneaday.getPostPos();
});
