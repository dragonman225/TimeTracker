var Util = (function(util) {
  var data = {
    colorClass: ['midnightblue', 'wisteria', 'pomegranate', 'pumpkin', 'belizehole', 'belizehole'],
  }

  // Randomly return one of pre-defined classNames representing colors.
  util.randomColorClass = function() {
    var randomNum = Math.floor(Math.random() * data.colorClass.length)
    return data.colorClass[randomNum]
  }

  // Throttle frequently called or time-consuming functions.
  // - New instances with functions and throttling timeout.
  util.throttle = function(func, ms) {
    this.func = func
    this.ms = ms
    this.lastExec = 0
  }

  util.throttle.prototype.run = function() {
    var now = Date.now()
    if ((now - this.lastExec) > this.ms) {
      this.func()
      this.lastExec = now
    }
  }

  // JS Timestamp to Date Conversion
  util.toDate = function(ts) {
    return 'NI'
  }

  return util;
}(Util || {}));

/* Usage Examples

Util.randomColorClass()

var heavyFunc = new Util.throttle(function() {
  console.log('hi')
  console.log(i)
}, 1)

for (var i = 0; i < 10000; i += 1) {
  heavyFunc.run()
}

*/
