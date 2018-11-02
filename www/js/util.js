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
  // - Usage: 'new' instances with functions and throttling timeout.
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

  // Advanced console.log
  util.logDebug = function(info) {
    if (DEBUG) {
      console.log('[' + basicEscape(info.type) + ']' + ' ' + basicEscape(info.message))
      if (typeof info.dump !== 'undefined') console.log(info.dump)
    }
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

Util.logDebug({
  type: 'Info',
  message: 'test',
  dump: {Anything: 'ok'}
})

*/
