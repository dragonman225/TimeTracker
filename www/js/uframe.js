/* Micro DOM Manipulator */

var displayCache = {
  initialized: false,
  storage: {}
}

// Deep object copy, normal '=' only sends reference
function objClone(obj) {
  var objCopy = {}
  var key
  for (key in obj) {
    if (typeof obj[key] === 'object') objCopy[key] = objClone(obj[key])
    else objCopy[key] = obj[key]
  }
  return objCopy
}

function objMerge(target, patch) {
  var key
  for (key in patch) {
    target[key] = objClone(patch[key])
  }
  patch = null
}

function render(displayChange) {
  Object.keys(displayChange).forEach(function(index) {
    if (typeof displayChange[index] === 'object' && typeof displayChange[index].length === 'undefined') {
      var element = document.getElementById(index)
      if (typeof displayChange[index].html !== 'undefined') {
        if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
          element.value = Util.basicEscape(displayChange[index].html)
        } else {
          element.innerHTML = Util.basicEscape(displayChange[index].html)
        }
      }
      if (typeof displayChange[index].class !== 'undefined' && displayChange[index].class.length > 0) {
        /* Remove classes that don't exist in new classList */
        var newClassList = displayChange[index].class
        for (var i = 0; i < element.classList.length; i += 1) {
          if (!newClassList.includes(element.classList[i])) {
            element.classList.remove(element.classList[i])
          }
        }
        /* Add classes that are not in old classList */
        element.classList.add(...newClassList)
      }
    } else if (typeof displayChange[index] === 'object' && displayChange[index].length >= 0) {
      var element = document.getElementById(index)
      var fragment = document.createDocumentFragment();
      while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
      }
      displayChange[index].forEach(function(item) {
        var newNode = document.createElement("div")
        newNode.innerHTML = Util.basicEscape(item.html)
        newNode.classList.add(...item.class)
        fragment.appendChild(newNode)
      })
      element.appendChild(fragment)
    } else {
      Util.logDebug({
        type: 'Error',
        message: 'incorrect displayChange format',
        dump: index
      })
    }
  })
}

function refresh(newDisplay) {
  if (typeof newDisplay === 'undefined') {
    Util.logDebug({
      type: 'Error',
      message: 'undefined new display'
    })
  } else {
    if (displayCache.initialized) {
      render(newDisplay)
    } else {
      displayCache.initialized = true
      render(newDisplay)
    }
    objMerge(displayCache.storage, newDisplay)
    for (var key in newDisplay) {
      delete newDisplay[key]
    }
  }
}

function setup(interactionList) {
  if (typeof interactionList === 'undefined') {
    Util.logDebug({
      type: 'Error',
      message: 'undefined interaction'
    })
  } else {
    Object.keys(interactionList).forEach(function(index) {
      var interaction = interactionList[index]
      if (typeof interaction === 'object' && typeof interaction.length === 'undefined') {
        var element = document.getElementById(index)
        if (typeof interaction.type === 'object' && interaction.type.length >= 0) {
          for (var i in interaction.type) element.addEventListener(interaction.type[i], interaction.handler)
        } else {
          element.addEventListener(interaction.type, interaction.handler)
        }
      } else if (typeof interaction === 'object' && interaction.length >= 0) {
        var element = document.getElementById(index)
        for (var i = 0; i < element.children.length; i += 1) {
          element.children[i].key = interaction[i].key
          element.children[i].addEventListener(interaction[i].type, interaction[i].handler)
        }
      } else {
        Util.logDebug({
          type: 'Error',
          message: 'incorrect interaction format'
        })
      }
    })
  }
}
