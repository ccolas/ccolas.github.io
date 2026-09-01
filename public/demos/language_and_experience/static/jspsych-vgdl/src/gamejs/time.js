/**
 * @fileoverview
 * Only used by GameJs internally to provide a game loop.
 * @ignore
 */

import {Callback} from './utils/callback.js'

var TIMER_LASTCALL = null;
var STARTTIME = null;

/** @ignore **/
export var _CALLBACKS = [];
// `window` is not accessible in webworker (would lead to TypeError)
// @@ this cross-browser fuckery has to go away ASAP.
var reqAnimationFrame = typeof(window) != 'undefined' ?
                        window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        null : null;

var reqAniFrameRecursive = function() {
   perInterval();
   reqAnimationFrame(reqAniFrameRecursive);
};

var triggerCallbacks = function(msDuration) {
   _CALLBACKS.forEach(function(c) {
      c.trigger(msDuration);
   });
};

/**
 * @ignore
 */
export var init = function() {
   STARTTIME = Date.now();

   if (reqAnimationFrame) {
      reqAnimationFrame(reqAniFrameRecursive);
   } else {
      setInterval(perInterval, 10);
   }
   return;
};

var perInterval = function() {
   var msNow = Date.now();
   triggerCallbacks(msNow - (TIMER_LASTCALL || msNow));
   TIMER_LASTCALL = msNow;
   return;
};
