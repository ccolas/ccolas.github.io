import * as display from './display.js'
import {Callback} from './utils/callback.js'

/**
 * @fileoverview
 * Deal with mouse and keyboard events.
 *
 * You can either handle all events in one callback with `gamejs.event.onEvent()`:
 *
 *     gamejs.onEvent(function(event) {
 *        if (event.type === gamejs.event.MOUSE_UP) {
 *          gamejs.logging.info(event.pos, event.button);
 *        } else if (event.type === gamejs.event.KEY_UP) {
 *          gamejs.logging.info(event.key);
 *        }
 *     });
 *
 * Or recieve more specific callbacks, e.g. only for `KEY\_UP` with  `gamejs.event.onKeyUp()`:
 *
 *     gamejs.onKeyUp(function(event) {
 *          gamejs.logging.info(event.key);
 *     });
 *
 * All events passed to your callback are instances of `gamejs.event.Event` and have a `type` property to help
 * you distinguish between the different events. This `type` property is set to one of those constants:
 *
 *  * gamejs.event.MOUSE\_UP
 *  * gamejs.event.MOUSE\_MOTION
 *  * gamejs.event.MOUSE\_DOWN
 *  * gamejs.event.KEY\_UP
 *  * gamejs.event.KEY\_DOWN
 *  * gamejs.event.DISPLAY\_FULLSCREEN\_ENABLED
 *  * gamejs.event.DISPLAY\_FULLSCREEN\_DISABLED
 *  * gamejs.event.QUIT
 *  * gamejs.event.MOUSE_WHEEL
 *  * gamejs.event.TOUCH\_DOWN
 *  * gamejs.event.TOUCH\_UP
 *  * gamejs.event.TOUCH\_MOTION
 *
 * ### Keyboard constants
 *
 * There are also a lot of keyboard constants for ASCII. Those are all prefixed with `K\_`, e.g. `gamejs.event.K\_a` would be the "a"
 * key and `gamejs.event.K_SPACE` is the spacebar.
 *
 * ## Touch events
 *
 * Touch events do not have a single position but for all `TOUCH\_*` events you get an array of
 * `touches`, which each have their own `pos` attribute and a unique `identifier` for tracking
 * this touch across multiple `TOUCH\_MOTION` events.
 *
 * ## User defined events
 *
 * All user defined events can have the value of `gamejs.event.USEREVENT` or higher.
 * Make sure your custom event ids follow this system.
 *
 * @example
 *     gamejs.onEvent(function(event) {
 *        if (event.type === gamejs.event.MOUSE_UP) {
 *          gamejs.logging.log(event.pos, event.button);
 *        } else if (event.type === gamejs.event.KEY_UP) {
 *          gamejs.logging.log(event.key);
 *        }
 *     });
 *
 */

var _CALLBACKS = [];

/** @ignore **/
export var _triggerCallbacks = function() {
  var args = arguments;
  _CALLBACKS.forEach(function(cb) {
    if (cb.type === 'all' || args[0].type === cb.type) {
      cb.callback.apply(cb.scope, args);
    }
  });
};

//export {_triggerCallbacks}
/*
exports.onQuit(callback)
exports.onVisiblityChange(callback)
*/

/**
 * Pass a callback function to be called when Fullscreen is enabled or disabled.
 * Inspect `event.type` to distinguis between entering and exiting fullscreen.
 *
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onFullscreen = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
   _CALLBACKS.push({
      callback: callback,
      scope: scope,
      type: DISPLAY_FULLSCREEN_ENABLED
   });
   _CALLBACKS.push({
      callback: callback,
      scope: scope,
      type: DISPLAY_FULLSCREEN_DISABLED
   });
};

/**
 * The function passsed to `onEvent` will be called whenever
 * any event (mouse, keyboard, etc) was triggered.
 *
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onEvent = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: 'all'
  });
};


/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onDisplayResize = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   };

  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: DISPLAY_RESIZE
  });
}

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onMouseMotion = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: MOUSE_MOTION
  });
};

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onMouseUp = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: MOUSE_UP
  });
};

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onMouseDown = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: MOUSE_DOWN
  });
};

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onTouchMotion = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: TOUCH_MOTION
  });
};

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onTouchUp = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: TOUCH_UP
  });
};

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onTouchDown = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: TOUCH_DOWN
  });
};

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onKeyDown = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: KEY_DOWN
  });
};

/**
 * @param {Function} callback to be called
 * @param {Object} scope within which the callback should be called. It's `this` during invocation. (optional)
 */
export var onKeyUp = function(callback, scope) {
   if (typeof(callback) !== 'function') {
      throw new Error('Callback must be a function');
   }
  _CALLBACKS.push({
    callback: callback,
    scope: scope,
    type: KEY_UP
  });
};

// key constants
export var K_UP = 38;
export var K_DOWN = 40;
export var K_RIGHT = 39;
export var K_LEFT = 37;

export var K_SPACE = 32;
export var K_BACKSPACE = 8;
export var K_TAB = 9;
export var K_ENTER = 13;
export var K_SHIFT = 16;
export var K_CTRL = 17;
export var K_ALT = 18;
export var K_ESC = 27;

export var K_0 = 48;
export var K_1 = 49;
export var K_2 = 50;
export var K_3 = 51;
export var K_4 = 52;
export var K_5 = 53;
export var K_6 = 54;
export var K_7 = 55;
export var K_8 = 56;
export var K_9 = 57;
export var K_a = 65;
export var K_b = 66;
export var K_c = 67;
export var K_d = 68;
export var K_e = 69;
export var K_f = 70;
export var K_g = 71;
export var K_h = 72;
export var K_i = 73;
export var K_j = 74;
export var K_k = 75;
export var K_l = 76;
export var K_m = 77;
export var K_n = 78;
export var K_o = 79;
export var K_p = 80;
export var K_q = 81;
export var K_r = 82;
export var K_s = 83;
export var K_t = 84;
export var K_u = 85;
export var K_v = 86;
export var K_w = 87;
export var K_x = 88;
export var K_y = 89;
export var K_z = 90;

export var K_KP1 = 97;
export var K_KP2 = 98;
export var K_KP3 = 99;
export var K_KP4 = 100;
export var K_KP5 = 101;
export var K_KP6 = 102;
export var K_KP7 = 103;
export var K_KP8 = 104;
export var K_KP9 = 105;

// event type constants
export var NOEVENT = 0;
export var NUMEVENTS = 32000;

export var DISPLAY_FULLSCREEN_ENABLED = 300;
export var DISPLAY_FULLSCREEN_DISABLED = 301;
export var DISPLAY_RESIZE = 302;

export var QUIT = 0;
export var KEY_DOWN = 1;
export var KEY_UP = 2;
export var MOUSE_MOTION = 3;
export var MOUSE_UP = 4;
export var MOUSE_DOWN = 5;
export var MOUSE_WHEEL = 6;
export var TOUCH_UP = 7;
export var TOUCH_DOWN = 8;
export var TOUCH_MOTION = 9;
export var USEREVENT = 2000;



/**
 * Properties of the `event` object argument passed to the callbacks.
 * @class
 */

export var Event = function() {
    /**
     * The type of the event. e.g., gamejs.event.QUIT, KEYDOWN, MOUSEUP.
     */
    this.type = null;
    /**
     * key the keyCode of the key. compare with gamejs.event.K_a, gamejs.event.K_b,...
     */
    this.key = null;
    /**
     * relative movement for a mousemove event
     */
    this.rel = null;
    /**
     * the number of the mousebutton pressed
     */
    this.button = null;
    /**
     * pos the position of the event for mouse events
     */
    this.pos = null;
};

/**
 * @ignore
 */
export var init = function() {

   var lastPos = [];

   // anonymous functions as event handlers = memory leak, see MDC:elementAddEventListener

   function onMouseDown (ev) {
      if (display._getCanvas() == null) {
         return;
      }
      var canvasOffset = display._getCanvasOffset();
      _triggerCallbacks({
         'type': MOUSE_DOWN,
         'pos': [ev.clientX - canvasOffset[0], ev.clientY - canvasOffset[1]],
         'button': ev.button,
         'shiftKey': ev.shiftKey,
         'ctrlKey': ev.ctrlKey,
         'metaKey': ev.metaKey
      });
   }

   function onMouseUp (ev) {
      if (display._getCanvas() == null) {
         return;
      }
      var canvasOffset = display._getCanvasOffset();
      _triggerCallbacks({
         'type':MOUSE_UP,
         'pos': [ev.clientX - canvasOffset[0], ev.clientY - canvasOffset[1]],
         'button': ev.button,
         'shiftKey': ev.shiftKey,
         'ctrlKey': ev.ctrlKey,
         'metaKey': ev.metaKey
      });
   }

   function onKeyDown (ev) {
      var key = ev.keyCode || ev.which;
      _triggerCallbacks({
         'type': KEY_DOWN,
         'key': key,
         'shiftKey': ev.shiftKey,
         'ctrlKey': ev.ctrlKey,
         'metaKey': ev.metaKey
      });

      // if the display has focus, we surpress default action
      // for most keys
      if (display._hasFocus() && (!ev.ctrlKey && !ev.metaKey &&
         ((key >= K_LEFT && key <= K_DOWN) ||
         (key >= K_0    && key <= K_z) ||
         (key >= K_KP1  && key <= K_KP9) ||
         key === K_SPACE ||
         key === K_TAB ||
         key === K_ENTER)) ||
         key === K_ALT) {
        ev.preventDefault();
      }
   }

   function onKeyUp (ev) {
      _triggerCallbacks({
         'type': KEY_UP,
         'key': ev.keyCode,
         'shiftKey': ev.shiftKey,
         'ctrlKey': ev.ctrlKey,
         'metaKey': ev.metaKey
      });
   }

   function onMouseMove (ev) {
      if (display._getCanvas() == null) {
         return;
      }
      var canvasOffset = display._getCanvasOffset();
      var currentPos = [ev.clientX - canvasOffset[0], ev.clientY - canvasOffset[1]];
      var relativePos = [];
      if (lastPos.length) {
         relativePos = [
            lastPos[0] - currentPos[0],
            lastPos[1] - currentPos[1]
         ];
      }
      _triggerCallbacks({
         'type': MOUSE_MOTION,
         'pos': currentPos,
         'rel': relativePos,
         'buttons': null, // FIXME, fixable?
         'timestamp': ev.timeStamp,
         'movement': [ev.movementX       ||
                      ev.mozMovementX    ||
                      ev.webkitMovementX || 0,
                      ev.movementY       ||
                      ev.mozMovementY    ||
                      ev.webkitMovementY || 0
                      ]
      });
      lastPos = currentPos;
      return;
   }

   function onMouseScroll(ev) {
      if (display._getCanvas() == null) {
         return;
      }
      var canvasOffset = display._getCanvasOffset();
      var currentPos = [ev.clientX - canvasOffset[0], ev.clientY - canvasOffset[1]];
      _triggerCallbacks({
         type: MOUSE_WHEEL,
         pos: currentPos,
         delta: ev.detail || (- ev.wheelDeltaY / 40)
      });
      return;
   }

   function onBeforeUnload (ev) {
      _triggerCallbacks({
         'type': QUIT
      });
      return;
   };

   // convert a w3c touch event into gamejs event
   function w3cTouchConvert(touchList) {
      if (display._getCanvas() == null) {
         return;
      }
      var canvasOffset = display._getCanvasOffset();
      var tList = [];
      for (var i = 0; i < touchList.length; i++) {
         var touchEvent = touchList.item(i);
         tList.push({
            identifier: touchEvent.identifier,
            pos: [touchEvent.clientX - canvasOffset[0], touchEvent.clientY - canvasOffset[1]]
         });
      }
      return tList;
   }

   function onTouchDown(ev) {
      if (display._getCanvas() == null) {
         return;
      }
      var canvasOffset = display._getCanvasOffset();
      var changedTouches = w3cTouchConvert(ev.changedTouches);
      _triggerCallbacks({
         'type': TOUCH_DOWN,
         'touches': changedTouches
      });
   };

   function onTouchUp(ev) {
      var changedTouches = w3cTouchConvert(ev.changedTouches);
      _triggerCallbacks({
         'type': TOUCH_UP,
         'touches': changedTouches,
      });
   }
   function onTouchMotion(ev) {
      var changedTouches = w3cTouchConvert(ev.changedTouches);
      _triggerCallbacks({
         'type': TOUCH_MOTION,
         'touches': changedTouches
      });
      ev.preventDefault();
   }

   // IE does not support addEventListener on document itself
   // FX events don't reach body if mouse outside window or on menubar
   if (display._getCanvas() != null) {

      var canvas = display._getCanvas();
      document.addEventListener('mousedown', onMouseDown, false);
      document.addEventListener('mouseup', onMouseUp, false);
      document.addEventListener('keydown', onKeyDown, false);
      document.addEventListener('keyup', onKeyUp, false);
      document.addEventListener('mousemove', onMouseMove, false);
      canvas.addEventListener('mousewheel', onMouseScroll, false);
      // MOZFIX
      // https://developer.mozilla.org/en/Code_snippets/Miscellaneous#Detecting_mouse_wheel_events
      canvas.addEventListener('DOMMouseScroll', onMouseScroll, false);
      canvas.addEventListener('beforeunload', onBeforeUnload, false);
      // touchs
      canvas.addEventListener("touchstart", onTouchDown, false);
      canvas.addEventListener("touchend", onTouchUp, false);
      canvas.addEventListener("touchcancel", onTouchUp, false);
      canvas.addEventListener("touchleave", onTouchUp, false);
      canvas.addEventListener("touchmove", onTouchMotion, false);
   }

};
