'use strict'

module.exports = function async(f) {
  var it = f();
  (function _async(current) {
    if (!current.done)
      return current.value.then(function(_) {
        var next = it.next(_);
        if (!next.done) return _async(next);
      }).catch(err => it.throw(err));
  })(it.next());
}