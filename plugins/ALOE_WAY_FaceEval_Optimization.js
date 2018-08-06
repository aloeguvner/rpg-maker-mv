'use strict';

//=============================================================================
// RPG Maker MV - Face Eval Optimization
// ALOE_WAY_FaceEval_Optimization.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0.0 Optimizes WAY_CustomFaceImageEval to reduce lag.
 * @author Aloe Guvner
 * 
 * @help
 * 
 * //=============================================================================
 * // Background
 * //=============================================================================
 * 
 * This extension to WAY_CustomFaceImageEval addresses two (2) inefficiencies
 * to reduce runtime lag.
 * 
 * 1. The original plugin uses 'eval' to evaluate the notetag formula.
 * --The plain text is compiled to Javascript (slow) and then evaluated every time
 * the actor is refreshed.
 * --In this optimized version, the plain text is compiled to Javascript only once
 *    when the game is started, and cached as a function for faster execution without
 *    using 'eval'.
 * 
 * 2. The original plugin sets the actor's face image after evaluating the
 * formula, even if the face image does not change. 
 * --When combined with YEP_BattleStatusWindow, for example, this creates lag because
 *    the window is needlessly re-drawn every time the actor's face image is set. 
 * --This function is replaced with an optimized version that only sets the face
 *    image if it actually changes.
 * 
 * //=============================================================================
 * // ACTION REQUIRED:
 * //=============================================================================
 * 
 * In order to utilize the optimizations provided by this plugin,
 * a modification to WAY_CustomFaceImageEval is required.
 * In that plugin, near line 157, locate the following six (6) lines.
 * Comment out these lines by putting a double backslash "//" in front of 
 * each line.
 * 
 * var _Game_Actor_refresh = Game_Actor.prototype.refresh;
 * Game_Actor.prototype.refresh = function() {
 *    _Game_Actor_refresh.call(this);
 *    var image = this.evalCustomFaceImageEval();
 *    this.setFaceImage(image.faceName, image.faceIndex);
 * };
 * 
 * This allows the optimized function to replace the original function.
 * 
 * //=============================================================================
 * // Installation
 * //=============================================================================
 * 
 * Install directly below WAY_CustomFaceImageEval.
 * 
 * //=============================================================================
 * // End of Help File
 * //=============================================================================
 * 
 */

(function () {
  if (Imported.WAY_CustomFaceImageEval) {

    DataManager.processWAYCFIENotetags = function (group) {
      for (var n = 1, length = group.length; n < length; n++) {
        var obj = group[n];
        var notedata = obj.note.split(/[\r\n]+/);
        var regex1 = /<(?:CUSTOM FACE IMAGE EVAL)>/i;
        var regex2 = /<\/(?:CUSTOM FACE IMAGE EVAL)>/i;

        obj.customFaceImageEval = '';

        var evalMode = 'none';

        for (var i = 0; i < notedata.length; i++) {
          var line = notedata[i];
          if (line.match(regex1)) {
            evalMode = 'custom face image eval';
            obj.customFaceImageEval += 'var faceName = null;\nvar faceIndex = null;\n';
          } else if (line.match(regex2)) {
            evalMode = 'none';
            break;
          } else if (evalMode === 'custom face image eval') {
            obj.customFaceImageEval += line + '\n';
          }
        }
        if (obj.customFaceImageEval) {
          obj.customFaceImageEval += 'if (!faceName) {faceName = user._defaultFaceName;}\n';
          obj.customFaceImageEval += 'if (!faceIndex) {faceIndex = user._defaultFaceIndex;}\n';
          obj.customFaceImageEval += 'return {faceName: faceName, faceIndex: faceIndex};';
          obj.customFaceImageFunc = Function('user', 'a', 's', 'v', 'p', obj.customFaceImageEval);
        } else {
          obj.customFaceImageFunc = null;
        }
      }
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.evalCustomFaceImageEval = function () {
      var func = this.actor().customFaceImageFunc;
      if (!func) {
        return { faceName: this._faceName, faceIndex: this._faceIndex };
      }
      var user = this;
      var a = this;
      var s = $gameSwitches._data;
      var v = $gameVariables._data;
      var p = $gameParty;
      var image = {};
      try {
        image = func(user, a, s, v, p);
      } catch (e) {
        console.error(e);
        throw Error('CUSTOM FACE IMAGE ERROR - Press F8 for more details');
      }
      return image;
    };

    if (Game_Actor.prototype.refresh.toString().contains('evalCustomFaceImageEval')) {
      console.error('The Game_Actor.prototype.refresh function must be commented\n      out from WAY_CustomFaceImageEval. Be sure to follow the directions in the help\n\t  file of this plugin.');
      Utils.RPGMAKER_VERSION >= '1.6.0' ? nw.Window.get().showDevTools() : require('nw.gui').Window.get().showDevTools();
    } else {
      var _Game_Actor_refresh = Game_Actor.prototype.refresh;
      Game_Actor.prototype.refresh = function () {
        _Game_Actor_refresh.call(this);
        var image = this.evalCustomFaceImageEval();
        if (image.faceName !== this._faceName || image.faceIndex !== this._faceIndex) {
          this.setFaceImage(image.faceName, image.faceIndex);
        }
      };
    }
  }
})();
