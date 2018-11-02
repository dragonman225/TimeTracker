/* Database Helper
Planned to implement for two backends:
  - SQLite for Android / iOS
  - IndexedDB for browser
With a proxy that provides same call interface
*/

var dbHelper = (function(dbProxy) {
  var isMobile = -1
  var checkMobile = function() {
    if (isMobile === -1) {
      switch (state.cordova) {
        case 0:
          isMobile = 0
          return false
        case 1:
          isMobile = 1
          return true
        default:
          Util.logDebug({
            type: 'Error',
            message: 'state.cordova is not set'
          })
      }
    } else if (isMobile === 1) {
      return true
    } else {
      return false
    }
  }

  dbProxy.writeHistory = function(history) {
    if (checkMobile()) {
      sqliteHelper.writeHistory(history)
    } else {

    }
  }

  dbProxy.readHistory = function(callback) {
    if (checkMobile()) {
      sqliteHelper.readHistory(callback)
    } else {

    }
  }

  dbProxy.writeCache = function(tmpState) {
    if (checkMobile()) {
      sqliteHelper.writeCache(tmpState)
    } else {

    }
  }

  dbProxy.readCache = function(callback) {
    if (checkMobile()) {
      sqliteHelper.readCache(callback)
    } else {

    }
  }
  return dbProxy;
}(dbHelper || {}));

var sqliteHelper = {
  writeHistory: function(history) {
    var data = [history['startTime'], history['endTime'], history['name']]
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS History (startTime, endTime, name)');
      tx.executeSql('INSERT INTO History VALUES (?,?,?)', data);
    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('Insert History OK');
    });
  },
  readHistory: function(callback) {
    db.transaction(function(tr) {
      tr.executeSql('SELECT * FROM History', [], function(tr, result) {
        var userHistory = []
        for (var i = 0; i < result.rows.length; i += 1) {
          userHistory.push(result.rows.item(i))
        }
        callback(userHistory)
      });
    });
  },
  writeCache: function(state) {
    var data = [state.eventNameInput, state.logging, state.startTime]
    db.transaction(function(tx) {
      tx.executeSql('DROP TABLE IF EXISTS Cache');
      tx.executeSql('CREATE TABLE IF NOT EXISTS Cache (eventNameInput, logging, startTime)');
      tx.executeSql('INSERT INTO Cache VALUES (?,?,?)', data);
    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
    }, function() {
      console.log('Insert Cache OK, logging:' + state.logging);
    });
  },
  readCache: function(callback) {
    db.transaction(function(tr) {
      tr.executeSql('SELECT * FROM Cache', [], function(tr, result) {
        var cache = result.rows.item(0)
        callback(cache)
      });
    });
  }
}
