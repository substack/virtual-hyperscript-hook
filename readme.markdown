# virtual-hyperscript-hook

element lifecycle hooks for
[virtual-dom](https://npmjs.com/package/virtual-dom)

Instead of adding hook/unhook lifecycle events on a per-property basis
[with a hook instance](https://github.com/Matt-Esch/virtual-dom/blob/master/docs/hooks.md),
this package lets you define simple `hook` and `unhook` properties as ordinary
functions.

# example

[view this example](https://6abf19210c8e9d1b64d8f58952d2fa05a51ae666.htmlb.in)

In this example, we'll construct 10 text input boxes and use the arrow keys to
adjust focus. We can use a simple
`hook: function (elem) { if (active) elem.focus() }` to focus the text boxes
based on the main-loop state.

``` js
var vdom = require('virtual-dom')
var h = require('virtual-hyperscript-hook')(vdom.h)
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

```

# api

``` js
var vdom = require('virtual-dom')
var vhook  require('virtual-hyperscript-hook')
```

or:

``` js
var h  require('virtual-hyperscript-hook/h')
```

## var h = vhook(vdom.h, opts)

Create a virtual-hyperscript function `h` from a hyperscript implementation
`vdom.h` and some options `opts`.

* `opts.prefix` - optional prefix to add before hook and unhook names.
default: `''`
* `opts.hookName` - property to use for hooking. default: `'hook'`
* `opts.unhookName` - property to use for unhooking. default: `'unhook'`
* `opts.attrName` - fake attribute to use for element access.
default: `'hook-attr'`

# var dom = h(tagName, properties={}, children)

Create a virtual-dom instance `dom`.

* `properties.hook` - after element construction, `properties.hook(elem)` gets
called with the real dom element `elem`
* `properties.unhook` - after the element is removed from the dom,
`properties.unhook(elem)` gets called with the real dom element `elem`

The key names of `hook` and `unhook` may be overridden by `opts.hookName` and
`opts.unhookName`.

# install

With [npm](https://npmjs.org) do:

```
npm install virtual-hyperscript-hook
```

# license

MIT
