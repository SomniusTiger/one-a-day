// Main JS file

var oneaday = new function() {
  var self = this;

  this.init = function() {
    // Functions to run on init
    self.fitvidsInit();
  };

  this.fitvidsInit = function() {
    $('.video-player').fitVids();
  };
}

$(function() {
  oneaday.init();
});
