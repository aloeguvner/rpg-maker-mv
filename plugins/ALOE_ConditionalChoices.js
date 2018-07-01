"use strict";

//=============================================================================
// RPG Maker MV - Conditional Show Choices
// ALOE_Event_Ladder_Counter.js
//=============================================================================


//=============================================================================
/*:
* @plugindesc v1.0.1
* Define conditions to hide or disable choices in the event menu
* @author Aloe Guvner
*
* @param patternStart
* @text Start Pattern
* @type text
* @desc Pattern that indicates the start of the conditions.
* Recommended not to change this unless necessary.
* @default <<
*
* @param patternEnd
* @text End Pattern
* @type text
* @desc Pattern that indicates the end of the conditions.
* Recommended not to change this unless necessary.
* @default >>
* 
* @help
* 
* //=========================================================================
* // Background
* //=========================================================================
*
* This plugin allows developers to set conditions directly in the "Show Choices"
* event command.
* These conditions can determine whether the choice is hidden or disabled.
*
* No scripting knowledge or plugin commands are required!
* Everything is done directly in the "Show Choices" event command, providing
* an intuitive and efficient way to increase the depth of your story-telling
* through more interesting choices.
* 
* //=========================================================================
* // How to use
* //=========================================================================
*
* The conditions to hide or disable the choice are written directly into the choice.
*
* An example is shown below. In this example, the first choice is hidden if
* switch #1 is ON, and the second choice is hidden if variable #1 is greater
* than zero. The third choice does not contain any conditions.
*
* ◆Show Choices：First Choice <<s[1]>>, Second Choice <<v[1] > 0>>, Third Choice (Window, Right, #3, #2)
* ：When First Choice <<s[1]>> 
*   ◆
* ：When Second Choice <<v[1] > 0>> 
*   ◆
* ：When Third Choice 
*   ◆
* ：End
*
* The format of the conditions is:
* <<HIDE,DISABLE>>
*
* If the HIDE condition is true, the choice will be hidden.
* If the DISABLE condition is true, the choice will be disabled.
*
* To include only a HIDE condition, no comma is needed:
* <<HIDE>>
*
* To include only a DISABLE condition, a comma is needed:
* <<,DISABLE>>
*
* To include both a HIDE and a DISABLE condition, separate with a comma:
* <<HIDE,DISABLE>>
*
* //=========================================================================
* // Short-Hand Abbreviations
* //=========================================================================
*
* The following short-hand abbreviations may be used inside the conditions:
* s[x] --> Game Switch #x
* v[x] --> Game Variable #x
* a[x] --> Actor #x (database id)
* p[x] --> Party Member x (index, which starts at 0)
* t[x] --> Troop Member x (index, which starts at 0)
*
* //=========================================================================
* // Javascript reference
* //=========================================================================
* 
* All valid Javascript is usable within the conditions. Some useful references:
* &&  --> AND
* ||  --> OR
* !   --> NOT
*
* === --> EQUAL TO
* !== --> NOT EQUAL TO
* >   --> GREATER THAN
* >=  --> GREATER THAN OR EQUAL TO
* <   --> LESS THAN
* <=  --> LESS THAN OR EQUAL 
*
* +   --> ADDITION
* -   --> SUBTRACTION / NEGATIVE
* *   --> MULTIPLICATION
* /   --> DIVISION
* %   --> MODULO
* **  --> EXPONENT
*
* //=========================================================================
* // Examples
* //=========================================================================
* 
* To hide a choice if Switch # 4 is ON:
* My Choice <<s[4]>>
*
* To disable a choice if Switch #4 is ON:
* My Choice <<,s[4]>>
*
* To hide a choice if Switch # 6 is OFF:
* My Choice <<!s[6]>>
*
* To hide a choice if Variable # 2 is greater than 10:
* My Choice <<v[2] > 10>>
*
* To hide a choice if Variable # 3 is less than or equal to 10:
* My Choice <<v[3] <= 10>>
*
* To hide a choice if Variable #1 is less than 10 and disable if Variable #1
* is less than 20:
* My Choice <<v[1] < 10, v[1] < 20>>
* 
* To hide a choice if Switch #17 AND Switch #18 are ON:
* My Choice <<s[17] && s[18]>>
*
* To disable a choice if Variable #17 equals 100 OR Variable #18 equals 100:
* My Choice <<,v[17] === 100 || v[18] === 100>>
*
* To hide a choice if the Party leader's HP is less than 50:
* My Choice <<p[0].hp < 50>>
*
* To disable a choice if the Actor #1's name is NOT Banjo:
* My Choice <<,a[1].name() !== 'Banjo'>>
*
* To hide a choice if none in the party are named Kazooie:
* My Choice <<p.every(member => member.name() !== 'Kazooie')>>
*
* To hide a choice if any in the party learned skill #4:
* My Choice <<p.some(member => member.hasSkill(4)>>
*
* To disable a choice if every troop member's HP is below 25%:
* My Choice <<,t.every(member => member.hp < member.mhp * .25)>>
* 
* =========================================================================
* Version History
* =========================================================================
*
* v1.0.1 - July 1 2018:
* --Fixed bug with calculating the window width
* v1.0.0 - June 26 2018:
* --Initial Release
*
* =========================================================================
* End of Help Section
* =========================================================================
*/

(function () {

    //=============================================================================
    // Read Parameters
    //=============================================================================

    var params = PluginManager.parameters("ALOE_ConditionalChoices");

    //=============================================================================
    // New Methods - RPG Maker base engine classes
    //=============================================================================
    // Game_Message:
    // --Create removeHiddenChoices to filter the choice array for only visible choices
    // --Create updateVisibleIndexes to track original index for visible choices
    // Window_ChoiceList:
    // --Create markDisabledCommands to update window commands to disable choices
    // --Create removeRegexPattern to remove the <<.*>> pattern from the choice
    //=============================================================================

    Game_Message.prototype.removeHiddenChoices = function (choices) {
        var _this = this;

        var regex = new RegExp(params.patternStart + "(.*)" + params.patternEnd);
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = $gameActors._data;
        var p = $gameParty.members();
        var t = $gameTroop.members();
        return choices.filter(function (choice) {
            var match = regex.exec(choice);
            if (match && match[1]) {
                match[1] = match[1].split(",");
                if (match[1][0]) {
                    try {
                        var visible = !eval(match[1][0]);
                        if (visible) {
                            _this._visibleChoices.push(choice);
                        }
                        return visible;
                    } catch (error) {
                        console.log("Evaluation error for hide condition of choice: " + choice);
                        console.log("Evaluation formula: " + match[1][0]);
                        console.error(error);
                        _this._visibleChoices.push(choice);
                        return true;
                    }
                }
            }
            _this._visibleChoices.push(choice);
            return true;
        });
    };

    Game_Message.prototype.updateVisibleIndexes = function (choices) {
        var _this2 = this;

        this._visibleChoices.forEach(function (visibleChoice, index) {
            _this2._visibleChoiceIndexes[index] = choices.indexOf(visibleChoice);
        });
    };

    Window_ChoiceList.prototype.markDisabledCommands = function () {
        var regex = new RegExp(params.patternStart + ".*,(.*)" + params.patternEnd);
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var a = $gameActors._data;
        var p = $gameParty.members();
        var t = $gameTroop.members();
        this._list = this._list.map(function (listItem) {
            var disabled = void 0;
            var match = regex.exec(listItem.name);
            if (match && match[1]) {
                try {
                    disabled = eval(match[1]);
                } catch (error) {
                    console.log("Evaluation error for disable condition of choice: " + listItem.name);
                    console.log("Evaluation formula: " + match[1]);
                    console.error(error);
                    disabled = false;
                }
            }
            listItem.enabled = !disabled;
            return listItem;
        });
    };

    Window_ChoiceList.prototype.removeRegexPattern = function () {
        var regex = new RegExp(params.patternStart + "(.*)" + params.patternEnd);
        this._list = this._list.map(function (listItem) {
            listItem.name = listItem.name.replace(regex, "");
            return listItem;
        });
    };

    //=============================================================================
    // Modifications - RPG Maker base engine methods (aliased)
    //=============================================================================
    // Game_Interpreter:
    // --Modify the $gameMessage.choices() to remove the choices that are hidden
    // Window_ChoiceList:
    // --Modify makeCommandList to mark disabled choices and remove the regex pattern
    // Game_Message:
    // --Modify clear to initialize the visible choices mapping objects
    //=============================================================================


    var Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function (params) {
        Game_Interpreter_setupChoices.apply(this, arguments);
        var choices = $gameMessage.removeHiddenChoices(params[0]);
        $gameMessage.updateVisibleIndexes(params[0]);
        var cancelType = params[1];
        var defaultType = params.length > 2 ? params[2] : 0;
        $gameMessage.setChoices(choices, defaultType, cancelType);
    };

    var Window_ChoiceList_makeCommandList = Window_ChoiceList.prototype.makeCommandList;
    Window_ChoiceList.prototype.makeCommandList = function () {
        Window_ChoiceList_makeCommandList.call(this);
        this.markDisabledCommands();
        this.removeRegexPattern();
    };

    var Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function () {
        Game_Message_clear.call(this);
        this._visibleChoices = [];
        this._visibleChoiceIndexes = {};
    };

    //=============================================================================
    // Overwrites - RPG Maker base engine methods
    //=============================================================================
    // Window_ChoiceList:
    // --Overwrite drawItem to draw disabled commands in a lighter color.
    // --Overwrite callOkHandler to utilize 
    // --Overwrite maxChoiceWidth to calculate without the regex
    //=============================================================================

    Window_ChoiceList.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawTextEx(this.commandName(index), rect.x, rect.y);
    };

    Window_ChoiceList.prototype.callOkHandler = function () {
        $gameMessage.onChoice($gameMessage._visibleChoiceIndexes[this.index()]);
        this._messageWindow.terminateMessage();
        this.close();
    };

    Window_ChoiceList.prototype.maxChoiceWidth = function () {
        var regex = new RegExp(params.patternStart + "(.*)" + params.patternEnd);
        var maxWidth = 96;
        var choices = $gameMessage.choices();
        for (var i = 0; i < choices.length; i++) {
            var choiceWidth = this.textWidthEx(choices[i].replace(regex, "")) + this.textPadding() * 2;
            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }
        return maxWidth;
    };

    //=============================================================================
    // End of Plugin
    //=============================================================================
})();
