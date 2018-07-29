//=============================================================================
// RPG Maker MV - Command Icons
// ALOE_CommandIcons.js
//=============================================================================

let Imported = Imported || {};
Imported.ALOE_CommandIcons = true;

//=============================================================================
/*:
 * @plugindesc v1.0.1 Allows the developer to add icons to any command
 * in a command window.
 * @author Aloe Guvner
 * 
 * @param Icon Settings
 * @default
 * 
 * @param commandWindows
 * @text Command Windows
 * @type struct<commandWindow>[]
 * @desc Define the list of command windows where icons
 * are displayed. See help file Debug section for details.
 * @parent Icon Settings
 * 
 * @param iconPosition
 * @text Icon Position
 * @type select
 * @option Beginning
 * @value 1
 * @option End
 * @value 2
 * @desc Draw the icon in the beginning/front of the
 * command or at the end/back.
 * @default 1
 * @parent Icon Settings
 * 
 * @param iconSize
 * @text Icon Size
 * @type number
 * @desc Width of the icons in pixels.
 * Default icons are 32x32
 * @default 32
 * @parent Icon Settings
 * 
 * @param Attack Command Settings
 * @default
 *
 * @param drawEquippedWeapon
 * @text Draw Equipped Weapon
 * @type boolean
 * @desc Draw the icon for the equipped weapon on the
 * "Attack" command of Window_ActorCommand. See help.
 * @parent Attack Command Settings
 * @default true
 * 
 * @param nonWeaponIcon
 * @text Non-Weapon Icon
 * @type number
 * @desc Draws this icon on the Attack command if no
 * weapon equipped & draw weapons enabled.
 * @parent drawEquippedWeapon
 * @default 0
 * 
 *
 * @param DEBUG
 * @default
 * 
 * @param debugMode
 * @text Debug Mode
 * @type boolean
 * @desc Enable Debug Mode. This will log all command windows
 * and commands to the console. (more in help section)
 * @default false
 * @parent DEBUG
 * 
 * 
 * @help
 * 
 * //=============================================================================
 * // Background
 * //=============================================================================
 * 
 * This plugin allows the developer to define icons that will appear next to a 
 * command in any command window. Specifically, this will work in any window that
 * is a child of Window_Command.
 * 
 * All commands from all command windows work the same, except for the Attack
 * command, which can draw a dynamic icon based on the actor's weapon instead of
 * only a static icon. Please see the section "Draw Equipped Weapon Icon" below.
 * 
 * //=============================================================================
 * // Configuration
 * //=============================================================================
 * 
 * The main configuration required for this plugin is developing the relationship
 * between the window, the command name, and the icon that is to be drawn.
 * 
 * The "Command Windows" parameter is populated with a list of command windows to
 * configure. The name of these command windows must match the official name of the
 * window.
 * **For example: Window_TitleCommand, Window_ItemCategory, Window_ActorCommand, etc.
 * 
 * To assist the developer in determining the correct window name, a Debug Mode has
 * been created. Please see the section "Debug Mode" below.
 * 
 * For each command window, the list of Command Name <--> Icon Index relationships
 * are configured.
 * **For example:
 * Within Window_TitleCommand, a relationship can be set between the Command Name
 * of "New Game" and the Icon Index of 1. During play, the icon located at index 1
 * will be drawn alongside the "New Game" command in the title.
 * 
 * //=============================================================================
 * // Draw Equipped Weapon Icon
 * //=============================================================================
 * 
 * The "Attack" command in Window_ActorCommand during battle may dynamically
 * show the icon of the weapon that the actor has equipped. The following rules
 * govern the behavior of this feature:
 * 
 * 1.) If 'Draw Equipped Weapon' is enabled, and the actor has a weapon equipped,
 * the icon of that weapon is drawn alongside the "Attack" command.
 * 
 * 2.) If 'Draw Equipped Weapon' is enabled, the actor does not have a weapon
 * equipped, and an icon is given for 'Non-Weapon Icon', then the 'Non-Weapon Icon'
 * is drawn alongside the "Attack" command.
 * 
 * 3.) If 'Draw Equipped Weapon' is enabled, the actor does not have a weapon
 * equipped, and no icon is given for 'Non-Weapon Icon', then the icon configured
 * for the "Attack" command is drawn alongside the "Attack" command.
 * 
 * 4.) If 'Draw Equipped Weapon' is not enabled, the icon configured
 * for the "Attack" command is drawn alongside the "Attack" command.
 * 
 * 5.) If the Attack command is not configured for Window_ActorCommand, no icon is
 * drawn.
 * 
 * **Note:
 * Even if 'Draw Equipped Weapon' is enabled, the "Attack" command must still
 * be configured for Window_ActorCommand in the parameters. A dummy value
 * or a 0 value may be used if desired.
 * 
 * //=============================================================================
 * // Debug Mode
 * //=============================================================================
 * 
 * This plugin requires the icons to be defined per command window that they will
 * appear. The command window is defined to improve performance, as it narrows the
 * scope of data that is searched when the icons are drawn at runtime.
 * An example of a command window name is "Window_PartyCommand".
 * 
 * Debug Mode will assist the developer in determining what windows and commands
 * are shown on the screen.
 * 
 * To activate Debug Mode, change the parameter to "true". During a playtest, press
 * F8 to open the Console, and whenever a command window is present in a scene, it
 * will tell you the name of that window and the commands that it has.
 * 
 * //=============================================================================
 * // Version History
 * //=============================================================================
 * v1.0.1
 * --Added polyfill for Array.prototype.findIndex for older versions of MV
 * v1.0.0
 * --Initial release
 * 
 * //=============================================================================
 * // End of Help File
 * //=============================================================================
 */

 /*~struct~commandWindow:
 *
 * @param windowName
 * @text Window Name
 * @type text
 * @desc The name of the command window.
 * Ex. Window_MenuCommand, Window_PartyCommand, etc.
 * 
 * @param iconCommands
 * @text Icon Commands
 * @type struct<iconCommands>[]
 * @desc Configure which icon will be shown for each command.
 * 
 */

   /*~struct~iconCommands:
 * @param commandName
 * @text Command Name
 * @type text
 * @desc The name of the command as it appears on the screen.
 * Examples: Escape, Formation, Save, etc.
 * 
 * @param icon
 * @text Icon Index
 * @type number
 * @desc The index of the icon to draw in the command.
 * @default 0
 * 
 */

let ALOE = {} || ALOE;
ALOE.CommandIconsParams = {};

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
// Read and parse parameters into global params object in namespace ALOE.
//=============================================================================

Object.keys(PluginManager.parameters("ALOE_CommandIcons")).forEach(a =>
    ALOE.CommandIconsParams[a] = Utils.recursiveParse(PluginManager.parameters("ALOE_CommandIcons")[a]));

//=============================================================================
// Window_Command - New Methods
//=============================================================================
// New Methods to locate the command icon from parameters
//=============================================================================

Window_Command.prototype.drawCommandIcon = function(index, rect) {
    const wins = ALOE.CommandIconsParams.commandWindows;
    const wIndex = wins.findIndex(win => win.windowName === this.constructor.name);
    const cIndex = this.findCommandParameterIndex(index, wins, wIndex);
    if (cIndex >= 0) {
        const iconSize = ALOE.CommandIconsParams.iconSize;
        const iIndex = this.findCommandIconIndex(wins, wIndex, cIndex, index);
        if (ALOE.CommandIconsParams.iconPosition === 1) {
            this.drawIcon(iIndex, rect.x-2, rect.y+2);
            rect.x += iconSize;
        } else {
            this.drawIcon(iIndex, rect.x-2+rect.width-iconSize, rect.y+2);
        }
        rect.width -= iconSize;
    }
};

Window_Command.prototype.findCommandParameterIndex = function(index, wins, wIndex) {
    let cIndex = -1;
    if (wIndex >= 0) {
        const commandName = this.commandName(index);
        cIndex = wins[wIndex].iconCommands.findIndex(c => 
            c.commandName.toLowerCase() === commandName.toLowerCase());
        }
    return cIndex;
};

Window_Command.prototype.findCommandIconIndex = function(wins, wIndex, cIndex, index) {
    return wins[wIndex].iconCommands[cIndex].icon;
};

//=============================================================================
// Overwrite for Attack command specific functionality
//=============================================================================

Window_ActorCommand.prototype.findCommandIconIndex = function(wins, wIndex, cIndex, index) {
    if (ALOE.CommandIconsParams.drawEquippedWeapon &&
        this.commandName(index) === TextManager.attack) {
        if (this._actor.weapons()[0]) {
            return this._actor.weapons()[0].iconIndex;
        } else {
            if (ALOE.CommandIconsParams.nonWeaponIcon) {
                return ALOE.CommandIconsParams.nonWeaponIcon;
            } else {
                return wins[wIndex].iconCommands[cIndex].icon;
            }
        }
    } else {
        return wins[wIndex].iconCommands[cIndex].icon;
    }
};

//=============================================================================
// Draw Item - Overwrite
//=============================================================================
// Add a line to draw the icon
//=============================================================================

Window_Command.prototype.drawItem = function(index) {
    const rect = this.itemRectForText(index);
    const align = this.itemTextAlign();
    this.resetTextColor();
    this.drawCommandIcon(index, rect); // line added
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

//=============================================================================
// Debug Mode
//=============================================================================
// Log all command windows and their commands to the console at the start of 
// each scene.
//=============================================================================

if (ALOE.CommandIconsParams.debugMode) {
    (function() {
        const Scene_Base_addWindow = Scene_Base.prototype.addWindow;
        Scene_Base.prototype.addWindow = function(window) {
            Scene_Base_addWindow.call(this, window);
            if (window.constructor.prototype instanceof Window_Command) {
                window.logCommandInfo();
            }
        };
        
        Window_Command.prototype.logCommandInfo = function() {
            const logObject = {};
            logObject[this.constructor.name] = this._list.map(command => command.name);
            console.log(logObject);
        }
    })();
}

//=============================================================================
// Polyfill - Array findIndex - For RPG Maker MV versions less than 1.6.0
//=============================================================================

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
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
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }
  
        // 7. Return -1.
        return -1;
      },
      configurable: true,
      writable: true
    });
  }