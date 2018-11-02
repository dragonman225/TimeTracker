/* Main App Entry */

// App is divided into 3 sections:
// display: Control texts and classes of elements
// interaction: Setup event listeners for user-interactable elements
// state: Store data used to drive app logic

// With 2 core implementation scripts:
// eventHandler.js: Handle interactive events
// uframe.js: Manipulate DOM Objects

// Some coding rules:
// 1. Each key in display object or interaction object correspond to an id with the same name in the DOM
// 2. Prevent directly styling elements with id, use class only

var db = null;

var display = {
  appName: {
    html: "Tracker",
  },
  status: {
    html: "",
    class: ["hidden"]
  },
  timer: {
    html: "",
  },
  eventUserInput: {
    html: "+ New Event"
  },
  setBtn: {
    html: "&#10148;",
  },
  sideBar: {
    class: ["side-bar"]
  },
  activityList: [],
  loggerView: {
    class: []
  },
  historyView: {
    class: ["hidden"]
  },
  historyList: []
}

var interaction = {
  setBtn: {
    type: 'click',
    handler: handleSetBtn
  },
  sidebarOpen: {
    type: 'click',
    handler: handleSidebarBtn
  },
  sidebarClose: {
    type: 'click',
    handler: handleSidebarBtn
  },
  eventUserInput: {
    type: ['input', 'focus', 'focusout'],
    handler: handleEventName
  },
  loggerEntry: {
    type: 'click',
    handler: handleLoggerEntry
  },
  historyEntry: {
    type: 'click',
    handler: handleHistoryEntry
  },
  activityList: []
}

var state = {
  logging: 0,
  sidebarOpen: 0,
  eventNameInput: "",
  history: [],
  userActivities: []
}

// Browser
// document.addEventListener('DOMContentLoaded', appStart, false);

function initHistory(data) {
  state.history = data
  renderHistoryList()
}

function initActivities(acts) {
  state.userActivities = acts
  for (var i in acts) {
    acts[i].key = i
    display.activityList.push({
      html: acts[i].name,
      class: ["rec-item", acts[i].color]
    })
    interaction.activityList.push({
      type: 'click',
      handler: handleActivityClick,
      key: i
    })
  }
}

function restoreCache(data) {
  if (data.logging) {
    state.eventNameInput = data.eventNameInput
    state.logging = 1
    logger.start()
    logger.startTime = data.startTime
    display.eventUserInput = {html: data.eventNameInput}
    display.setBtn = {html: "&#10003;"}
    refresh(display)
  }
}

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({
    name: 'history.db',
    location: 'default',
    androidDatabaseProvider: 'system'
  });
  sqliteHelper.readHistory(initHistory)
  appStart()
  sqliteHelper.readCache(restoreCache)
}, false);

function appStart() {
  initActivities(userData.userActivities)
  refresh(display)
  setup(interaction)
  logDebug({ type: 'INFO', message: 'app loaded' })
}
