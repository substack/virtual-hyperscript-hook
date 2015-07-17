var vdom = require('virtual-dom')
var h = require('../')(vdom.h)
var main = require('main-loop')
var state = { focus: 0 }
var loop = main(state, render, vdom)
function update (st) { state = st; loop.update(st) }
document.querySelector('#content').appendChild(loop.target)

window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 38) {
    update({ focus: (state.focus - 1 + 10) % 10 })
  }
  if (ev.keyCode === 40) {
    update({ focus: (state.focus + 1) % 10 })
  }
})

function render (state) {
  var inputs = []
  for (var i = 0; i < 10; i++) (function (n) {
    var active = state.focus === n
    inputs.push(h('div', h('input', {
      style: { backgroundColor: active ? 'lime' : 'lightgray' },
      hook: function (elem) {
        if (active) elem.focus()
      },
      onfocus: function () { update({ focus: n }) }
    })))
  })(i)
  return h('div', inputs)
}

