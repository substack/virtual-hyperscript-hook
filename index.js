var isArray = require('x-is-array');

module.exports = function (h, opts) {
    if (!opts) opts = {};
    var pre = opts.prefix !== undefined ? opts.prefix : '';
    var hkey = pre + (opts.hookName ? opts.hookName : 'hook');
    var ukey = pre + (opts.unhookName ? opts.unhookName : 'unhook');
    var attr = pre + (opts.attrName ? opts.attrName : 'hook-attr');
    
    return function (tagName, properties, children) {
        var props, H;
        if (!children && isChildren(properties)) {
            children = properties;
            props = {};
        }
        props = props || properties || {};
        
        if (isfn(props[hkey]) || isfn(props[ukey])) {
            H = function () {};
        }
        if (isfn(props[hkey])) {
            H.prototype.hook = function (node) { props[hkey](node) };
        }
        if (isfn(props[ukey])) {
            H.prototype.unhook = function (node) { props[ukey](node) };
        }
        return h(tagName, props, children);
    };
};

function isChild(x) {
    return x && /^(Widget|Thunk|Virtual(Node|Text))$/.test(x.type);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function isfn (x) { return typeof x === 'function' }
