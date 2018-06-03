//=============================================================================
// Aloe Guvner - Map Select Skill Help Window
// ALOE_YEP_X_MapSelectSkill_Help.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.0.0 Extension of YEP_MapSelectSkill.
 * Original author: Yanfly Engine Plugins
 * @author Aloe Guvner
 *
 * @param helpWindowX
 * @text Help Window X
 * @type number
 * @desc X coordinate of the help window
 * @default 0
 * 
 * @param helpWindowY
 * @text Help Window Y
 * @type number
 * @desc Y coordinate of the help window
 * @default 0
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin is an extension of YEP_MapSelectSkill.js
 * The purpose of the extension is to create a help window to show the
 * skill description in the Map Select Skill window.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.0:
 * - Initial version
 */
//=============================================================================

var ALOE = ALOE || {};
ALOE.YEP_X_MapSelectSkill_Help = ALOE.YEP_X_MapSelectSkill_Help || {};

var Imported = Imported || {};
Imported["ALOE_YEP_X_MapSelectSkill_Help"] = 1.00;

(function(_) {

    var params = PluginManager.parameters("ALOE_YEP_X_MapSelectSkill_Help");
    var x = Number(params.helpWindowX) || 0;
    var y = Number(params.helpWindowY) || 0;

//=============================================================================
// Scene_Map
//=============================================================================
// Alias of Scene_Map methods specific to the help window.
// One new method to create the help window.
//=============================================================================

    var Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        this.createMapSelectSkillHelpWindow();
        Scene_Map_createAllWindows.call(this);
    };

    var Scene_Map_createMapSelectSkillWindow = Scene_Map.prototype.createMapSelectSkillWindow;
    Scene_Map.prototype.createMapSelectSkillWindow = function() {
        Scene_Map_createMapSelectSkillWindow.call(this);
        this._mapSelectSkillWindow.setHelpWindow(this._mapSelectSkillHelpWindow);
    };

    var Scene_Map_onMapSelectSkillOk = Scene_Map.prototype.onMapSelectSkillOk;
    Scene_Map.prototype.onMapSelectSkillOk = function() {
        this._mapSelectSkillHelpWindow.close();
        Scene_Map_onMapSelectSkillOk.call(this);
    };
    
    var Scene_Map_onMapSelectSkillCancel = Scene_Map.prototype.onMapSelectSkillCancel;
    Scene_Map.prototype.onMapSelectSkillCancel = function() {
        this._mapSelectSkillHelpWindow.close();
        Scene_Map_onMapSelectSkillCancel.call(this);
    };

    var Scene_Map_setupMapSelectSkill = Scene_Map.prototype.setupMapSelectSkill;
    Scene_Map.prototype.setupMapSelectSkill = function(varId, actorId, stypeId) {
        this._mapSelectSkillHelpWindow.open();
        Scene_Map_setupMapSelectSkill.call(this, varId, actorId, stypeId);
    };

    Scene_Map.prototype.createMapSelectSkillHelpWindow = function() {
        this._mapSelectSkillHelpWindow = new Window_MapSelectSkillHelp(x, y);
        this.addWindow(this._mapSelectSkillHelpWindow);
    };

//=============================================================================
// Window_MapSelectSkillHelp
//=============================================================================
// New type of window which inherits prototypes from Window_Help
//=============================================================================

    function Window_MapSelectSkillHelp() {
        this.initialize.apply(this, arguments);
    }
    
    Window_MapSelectSkillHelp.prototype = Object.create(Window_Help.prototype);
    Window_MapSelectSkillHelp.prototype.constructor = Window_MapSelectSkillHelp;
    
    Window_MapSelectSkillHelp.prototype.initialize = function(x, y) {
        Window_Help.prototype.initialize.call(this);
        this.openness = 0;
        this.x = x;
        this.y = y;
    };

})();