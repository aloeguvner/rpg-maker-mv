"use strict";

/*:
* @plugindesc v1.0.0 Plays sound effects in the aftermath
* level up screen. 
* @author Aloe Guvner
*
*
* @param everyActor
* @text Play for Every Actor
* @type boolean
* @default true
* @desc true - Play SE for every actor that levels up
* false - only play SE for the first actor
*
* @param soundEffectSetup
* @text Sound Effect Setup
* @type struct<soundEffectSetup>[]
* @desc List the sound effect that will play for each
* actor. Use 0 for the default.
*
*
* 
* @help
*
* //=============================================================================
* Background:
* //=============================================================================
*
* The Aftermath Level Up plugin shows a window describing the changes to an actor
* when they leveled up.
* This extension allows the developer to play a Sound Effect to celebrate the
* actor leveling up. Additionally, each actor may use their own sound effect.
*
* If the actor doesn't have a sound effect specifically set for them, a default
* is used. To set the default, set a sound effect in the parameters for the actor
* ID of 0   (zero).
*
*
* //=============================================================================
* Terms of Use:
* //=============================================================================
* Free to use in Commercial or Non-Commercial projects.
* 
* Attribution:
* This code is released under the MIT License.
* https://opensource.org/licenses/MIT
* 
* Credits must be still given to Yanfly Engine Plugins as dictated by YEP.
* 
* //=============================================================================
* Version History:
* //=============================================================================
* 
* v1.0.0 (July 1 2018)
* --Initial release
* 
* //=============================================================================
* End of Help File
* //=============================================================================
*/

/*~struct~soundEffect:
 * @param name
 * @text Sound Effect Name
 * @type file
 * @dir audio/se
 * @desc Sound effect to play when the button is pressed.
 * @default
 * @require 1
 * 
 * @param volume
 * @text Volume
 * @type number
 * @min 0
 * @max 100
 * @desc Volume of the sound effect, in %
 * Allowed values: 0% - 100%
 * @default 90
 * 
 * @param pitch
 * @text Pitch
 * @type number
 * @min 50
 * @max 150
 * @desc Pitch of the sound effect, in %
 * Allowed values: 50% - 150%
 * @default 100
 * 
 * @param pan
 * @text Pan
 * @type number
 * @min -100
 * @max 100
 * @desc Pan of the sound effect
 * Allowed values: -100 - 100
 * @default 0
 * 
*/

/*~struct~soundEffectSetup:
* @param actorId
* @text Actor ID
* @type number
* @desc Actor ID that this sound effect plays for.
* Use zero to create a default SE.
*
* @param soundEffect
* @text Sound Effect
* @type struct<soundEffect>
* @desc Sound Effect to play when in the level up window.
* 
*/

(function () {

  if (Imported.YEP_X_AftermathLevelUp) {

    //=============================================================================
    // Utils
    //=============================================================================
    // Create a utility function to parse complex parameters.
    //=============================================================================

    Utils.recursiveParse = function (param) {
      try {
        return JSON.parse(param, function (key, value) {
          try {
            return this.recursiveParse(value);
          } catch (e) {
            return value;
          }
        }.bind(this));
      } catch (e) {
        return param;
      }
    };

    //=============================================================================
    // Parameters
    //=============================================================================
    // Read and parse parameters into a locally scoped Parameters object.
    //=============================================================================

    var Parameters = {};

    Object.keys(PluginManager.parameters("ALOE_YEP_AftermathLevelUp_SE")).forEach(function (a) {
      return Parameters[a] = Utils.recursiveParse(PluginManager.parameters("ALOE_YEP_AftermathLevelUp_SE")[a]);
    });

    //=============================================================================
    // Scene_Battle
    //=============================================================================
    // Alias the aftermath setup to play a sound effect, if defined.
    //=============================================================================

    var Scene_Battle_setupNextAftermathLevelUpActor = Scene_Battle.prototype.setupNextAftermathLevelUpActor;
    Scene_Battle.prototype.setupNextAftermathLevelUpActor = function () {
      Scene_Battle_setupNextAftermathLevelUpActor.call(this);
      var actorId = this._levelUpActor.actorId();
      var se = Parameters.soundEffectSetup.find(function (param) {
        return param.actorId === actorId;
      }) || Parameters.soundEffectSetup.find(function (param) {
        return param.actorId === 0;
      });
      if (!Parameters.everyActor && this._levelUpSePlayed) {
        return;
      }
      if (se) {
        AudioManager.playSe(se.soundEffect);
        this._levelUpSePlayed = true;
      }
    };

    //=============================================================================
    // End of extension
    //=============================================================================

    //=============================================================================
    // Polyfill for Array.prototype.find for MV versions 1.5 and older
    //=============================================================================

    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
        // 1. Let O be ? ToObject(this value).
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          var o = Object(this);

          // 2. Let len be ? ToLength(? Get(O, "length")).
          var len = o.length >>> 0;

          // 3. If IsCallable(predicate) is false, throw a TypeError exception.
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }

          // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
          var thisArg = arguments[1];

          // 5. Let k be 0.
          var k = 0;

          // 6. Repeat, while k < len
          while (k < len) {
            // a. Let Pk be ! ToString(k).
            // b. Let kValue be ? Get(O, Pk).
            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
            // d. If testResult is true, return kValue.
            var kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            }
            // e. Increase k by 1.
            k++;
          }

          // 7. Return undefined.
          return undefined;
        },
        configurable: true,
        writable: true
      });
    }

  } else {
    console.log("ALOE_YEP_AftermathLevelUp_SE is enabled, but YEP_X_AftermathLevelUp is not enabled.");
  }
})();
