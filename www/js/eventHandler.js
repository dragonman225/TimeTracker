var handleSetBtn = function() {
  if (state.logging) {
    state.logging = 0
    display.setBtn = {
      html: "&#10148;"
    }
    display.timer = {
      html: ""
    }
    display.eventUserInput = {
      html: "+ New Event"
    }
    var newLog = logger.stop()
    state.history.push(newLog)
    dbHelper.writeHistory(newLog)
    state.eventNameInput = ""
    growTextarea()
    renderHistoryList()
    refresh(display)
  } else {
    state.logging = 1
    display.setBtn = {
      html: "&#10003;"
    }
    display.timer = {
      html: "Since just now"
    }
    logger.start()
    refresh(display)
  }
}

var handleSidebarBtn = function() {
  if (state.sidebarOpen) {
    state.sidebarOpen = 0
    display.sideBar = {
      class: ["side-bar"]
    }
    refresh(display)
  } else {
    state.sidebarOpen = 1
    display.sideBar = {
      class: ["side-bar", "side-bar-open"]
    }
    refresh(display)
  }
}

var handleEventName = function(e) {
  switch (e.type) {
    case 'input':
      state.eventNameInput = Util.basicEscape(document.getElementById('eventUserInput').value)
      growTextarea()
      break
    case 'focus':
      if (state.eventNameInput === "") {
        display.eventUserInput = {
          html: ""
        }
        refresh(display)
      }
      break
    case 'focusout':
      if (state.eventNameInput === "") {
        display.eventUserInput = {
          html: "+ New Event"
        }
        refresh(display)
      }
      if (state.logging) {
        dbHelper.writeCache({
          eventNameInput: state.eventNameInput,
          logging: 1,
          startTime: logger.startTime
        })
      }
      break
  }
}

var handleLoggerEntry = function() {
  handleSidebarBtn()
  display.loggerView = {
    class: ["content"]
  }
  display.historyView = {
    class: ["hidden"]
  }
  display.appName = {
    html: "Tracker"
  }
  refresh(display)
}

var handleHistoryEntry = function() {
  handleSidebarBtn()
  display.loggerView = {
    class: ["hidden"]
  }
  display.historyView = {
    class: ["content"]
  }
  display.appName = {
    html: "History"
  }
  refresh(display)
}

var handleActivityClick = function(e) {
  var key = e.target.key
  var src = state.userActivities[key]
  state.eventNameInput = src.name
  growTextarea()
  display.eventUserInput = {
    html: src.name
  }
  if (state.logging) {
    dbHelper.writeCache({
      eventNameInput: state.eventNameInput,
      logging: 1,
      startTime: logger.startTime
    })
  }
  refresh(display)
}

var logger = {
  loggerInterval: {},
  startTime: 0,
  start: function() {
    logger.startTime = Date.now()
    dbHelper.writeCache({
      eventNameInput: state.eventNameInput,
      logging: 1,
      startTime: logger.startTime
    })
    logger.loggerInterval = setInterval(timerUpdater, 5000)
  },
  stop: function() {
    logger.pastTime = 0
    dbHelper.writeCache({
      eventNameInput: "",
      logging: 0,
      startTime: ""
    })
    clearInterval(logger.loggerInterval)
    return {
      name: state.eventNameInput,
      startTime: logger.startTime.toString(),
      endTime: Date.now().toString()
    }
  }
}

var timerUpdater = function() {
  var displayStr = ""
  var rawVal = (Date.now() - logger.startTime) / 1000
  if (rawVal < 60) displayStr = rawVal.toFixed(0) + ' seconds'
  else if (rawVal >= 60 && rawVal < 120) displayStr = (rawVal / 60).toFixed(0) + ' min'
  else if (rawVal >= 120 && rawVal < 3600) displayStr = (rawVal / 60).toFixed(0) + ' mins'
  else if (rawVal >= 3600 && rawVal < 7200) displayStr = (rawVal / 3600).toFixed(0) + ' hr'
  else if (rawVal >= 3600 && rawVal < 86400) displayStr = (rawVal / 3600).toFixed(0) + ' hrs'
  else displayStr = (rawVal / 86400).toFixed(0) + ' days'
  display.timer = {
    html: 'Since' + ' ' + displayStr
  }
  refresh(display)
}

var renderHistoryList = function() {
  var list = state.history
  var newHistoryList = []
  for (var i = 0; i < list.length; i += 1) {
    var description = list[i].name
    var durationSec = (list[i].endTime - list[i].startTime) / 1000
    var durationHuman = ""
    if ((durationSec / 86400) >= 1) {
      durationHuman += ((durationSec / 86400).toFixed(0).toString() + ' d ')
      durationSec %= 86400
    }
    if ((durationSec / 3600) >= 1) {
      durationHuman += ((durationSec / 3600).toFixed(0).toString() + ' h ')
      durationSec %= 3600
    }
    if ((durationSec / 60) >= 1) {
      durationHuman += ((durationSec / 60).toFixed(0).toString() + ' m ')
      durationSec %= 60
    }
    durationHuman += durationSec.toFixed(0).toString() + ' s '
    newHistoryList.push({
      html: Util.TStoDate(list[i].startTime) + "\n" + description + "\n" + durationHuman + "\n",
      class: ["history-item"]
    })
  }
  display.historyList = newHistoryList
}

var growTextarea = function() {
  var rows = 0
  if (state.eventNameInput.length === 0) rows = 1
  else rows = Math.ceil(state.eventNameInput.length / 10)
  document.getElementById('eventUserInput').attributes.rows.nodeValue = rows
}
