var Util = (function(util) {
  var data = {
    colorClass: ['midnightblue', 'wisteria', 'pomegranate', 'pumpkin', 'belizehole', 'belizehole'],
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
      console.log('[' + util.basicEscape(info.type) + ']' + ' ' + util.basicEscape(info.message))
      if (typeof info.dump !== 'undefined') console.log(info.dump)
    }
  }

  // Escape special characters
  util.basicEscape = function(unsafeString) {
    return unsafeString.replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#x27')
      .replace(/\//g, '&#x2F');
  }

  // JS UTC Timestamp to Date
  util.TStoDate = function(timestampStr) {
    var ts = parseInt(timestampStr)
    var myDate = new Date(ts)
    var date = myDate.getDate()
    var month = data.month[myDate.getMonth()]
    var day = data.day[myDate.getDay()]
    if (month < 10) month = '0' + month
    return day + ', ' + month + ' ' + date
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
