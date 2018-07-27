"use strict";

//=============================================================================
// YEP Party System and Row Formation Modifications
// ALOE_YEP_PartyRow_Modifications
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0.0 YEP Party System and Row Formation Modifications
 * @author Aloe Guvner
 *
 * @param formationCompareStrictness
 * @text Formation Compare Strictness
 * @type select
 * @option Loose
 * @value 1
 * @option Strict
 * @value 2
 * @desc Strictness level to check if cooldown should
 * be triggered after the Party Formation scene. (see help)
 * @default 1
 * 
 * @param cooldownBarType
 * @text Cooldown Bar Type
 * @type select
 * @option Text
 * @value 1
 * @desc Whether the cooldown by is described by text
 * or a gauge (gauge not available yet)
 * @default 1
 * 
 * @param cooldownBarMode
 * @text Cooldown Bar Mode
 * @type select
 * @option Fill
 * @value 1
 * @option Drain
 * @value 2
 * @desc Controls whether the cooldown bar will "fill"
 * or "drain" as the cooldown decreases.
 * @default 1
 * 
 * @param cooldownEmptyCharacter
 * @text Cooldown Empty Character
 * @type text
 * @desc This is the character that shows the "empty"
 * part of the cooldown bar.
 * @default ░
 * 
 * @param cooldownFilledCharacter
 * @text Cooldown Filled Character
 * @type text
 * @desc This is the character that shows the "filled"
 * part of the cooldown bar.
 * @default ▓
 * 
 * @param cooldownBeginningCharacter
 * @text Cooldown Beginning Character
 * @type text
 * @desc A character that can be added before the "empty"
 * and "filled" characters.
 * @default
 * 
 * @param cooldownEndingCharacter
 * @text Cooldown Ending Character
 * @type text
 * @desc A character that can be added after the "empty"
 * and "filled" characters.
 * @default
 * 
 * @help
 * Current Functionality:
 * 
 * 1. Modifies the cooldown behavior on the Row command to only trigger
 * the cooldown if the rows are changed.
 * 2. Modifies the cooldown behavior on the Party System command to only
 * trigger the cooldown if the party is changed.
 *
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * __Formation Compare Strictness__
 * 
 * The party is examined before and after the player uses the Party Formation
 * scene to change their party.
 * The cooldown of this command will trigger if any change is detected in the
 * party from this scene.
 * 
 * The options available for this parameter control how 'strict' the check
 * for changes is.
 * 
 * Loose --> The cooldown is triggered if battle members are substituted.
 * --Example: Harold (in battle) is swapped for Suzie (in reserves)
 * --Example: Lucius (in battle) is sent to reserves (no replacement)
 * --Note: Rearranging actors in battle such as swapping Harold/Marsha (1st/3rd)
 * does not trigger the cooldown.
 * 
 * Strict --> The cooldown is triggered if battle members are substituted OR
 * change order.
 * --Example: Harold (in battle) is swapped for Suzie (in reserves)
 * --Example: Lucius (in battle) is sent to reserves (no replacement)
 * --Example: Harold (1st) and Marsha (3rd) swap positions.
 * 
*/
//=============================================================================

var Parameters = {};

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

Object.keys(PluginManager.parameters("ALOE_YEP_PartyRow_Modifications")).forEach(function (a) {
    return Parameters[a] = Utils.recursiveParse(PluginManager.parameters("ALOE_YEP_PartyRow_Modifications")[a]);
});

//=============================================================================
// Row Formation section
//=============================================================================

//=============================================================================
// Aliased Methods - Row Formation section
//=============================================================================

// Cooldown is currently set when the Row screen is opened, reset the cooldown instead
var Scene_Battle_partyCommandRow = Scene_Battle.prototype.partyCommandRow;
Scene_Battle.prototype.partyCommandRow = function () {
    Scene_Battle_partyCommandRow.call(this);
    $gameSystem.resetBattleRowCooldown();
};

// Cache a snapshot of the row state upon entering the scene
var Scene_Row_initialize = Scene_Row.prototype.initialize;
Scene_Row.prototype.initialize = function () {
    Scene_Row_initialize.call(this);
    if ($gameParty.inBattle()) {
        $gameTemp.oldRowState = this.getCurrentRowState();
    }
};

// Insert the cooldown check into the popScene handler
var Scene_Row_popScene = Scene_Row.prototype.popScene;
Scene_Row.prototype.popScene = function () {
    if ($gameParty.inBattle()) {
        if (this.didAnythingChange($gameTemp.oldRowState)) {
            $gameSystem.setBattleRowCooldown();
        }
        delete $gameTemp.oldRowState;
    }
    Scene_Row_popScene.call(this);
};

//=============================================================================
// New Methods - Row Formation Cooldown Modification
//=============================================================================

/**
 * Get a snapshot of the current state of the Actor IDs and Row IDs.
 *
 * @method Scene_Row.prototype.getCurrentRowState
 * @return {Object} Object containing a mapping of Actor ID to Row ID.
 */
Scene_Row.prototype.getCurrentRowState = function () {
    return $gameParty.battleMembers().reduce(function (acc, cur, i) {
        acc[i] = cur.row();
        return acc;
    }, {});
};

/**
 * Check if the current state is different than the cached state.
 *
 * @method Scene_Row.prototype.didAnythingChange
 * @param {Object} object The old state of the actor rows.
 * @return {Boolean} True if the new state is different than the old state.
 */
Scene_Row.prototype.didAnythingChange = function (oldState) {
    var currentState = this.getCurrentRowState();
    for (var actorId in oldState) {
        if (oldState[actorId] !== currentState[actorId]) {
            return true;
        }
    }
    return false;
};

//=============================================================================
// Party Formation Cooldown Modification
//=============================================================================

//=============================================================================
// Aliased Methods - Party Formation section
//=============================================================================

// Cooldown is currently set when the Formation screen is opened, reset the cooldown instead
var Scene_Battle_partyCommandFormation = Scene_Battle.prototype.partyCommandFormation;
Scene_Battle.prototype.partyCommandFormation = function () {
    Scene_Battle_partyCommandFormation.call(this);
    $gameSystem.resetBattleFormationCooldown();
};

// Cache a snapshot of the formation state upon entering the scene
var Scene_Party_initialize = Scene_Party.prototype.initialize;
Scene_Party.prototype.initialize = function () {
    Scene_Party_initialize.call(this);
    if ($gameParty.inBattle()) {
        $gameTemp.oldFormationState = this.getCurrentFormationState();
    }
};

// Insert the cooldown check into the commandFinish handler
var Scene_Party_commandFinish = Scene_Party.prototype.commandFinish;
Scene_Party.prototype.commandFinish = function () {
    if ($gameParty.inBattle()) {
        if (this.didAnythingChange($gameTemp.oldFormationState)) {
            $gameSystem.setBattleFormationCooldown();
        }
        delete $gameTemp.oldFormationState;
    }
    Scene_Party_commandFinish.call(this);
};

//=============================================================================
// New Methods - Party Formation section
//=============================================================================

/**
 * Get a current list of the actors in the battle/party.
 *
 * @method Scene_Party.prototype.getCurrentRowState
 * @return {Array} Array containing actors currently in battle/party.
 */
Scene_Party.prototype.getCurrentFormationState = function () {
    return $gameParty.battleMembers().map(function (actor) {
        return actor.actorId();
    });
};

/**
 * Check if the current state is different than the cached state.
 *
 * @method Scene_Party.prototype.didAnythingChange
 * @param {Object} object The old state of the actor formation.
 * @return {Boolean} True if the new state is different than the old state.
 */
Scene_Party.prototype.didAnythingChange = function (oldState) {
    var currentState = this.getCurrentFormationState();
    switch (Parameters.formationCompareStrictness) {
        case 1:
            // loose
            return !oldState.sort().equals(currentState.sort());
        case 2:
            // strict
            return !oldState.equals(currentState);
    }
};

Window_PartyCommand.prototype.addRowCommand = function () {
    if (!$gameSystem.isShowRowBattle()) return;
    var index = this.findSymbol('escape');
    var enabled = $gameSystem.isEnabledRowBattle();
    var text = '';
    var currentCooldown = $gameSystem._battleRowCooldown;
    if (currentCooldown === 0) {
        text = Yanfly.Param.RowCmdName;
    } else {
        var maxCooldown = Yanfly.Param.RowCooldown;
        text = this.generatePartyRowCommandText(currentCooldown, maxCooldown);
    }
    this.addCommandAt(index, text, 'row', enabled);
};

Window_PartyCommand.prototype.addFormationCommand = function () {
    if (!$gameSystem.isShowBattleFormation()) return;
    var index = this.findSymbol('escape');
    var enabled = $gameSystem.isBattleFormationEnabled();
    var text = '';
    var currentCooldown = $gameSystem._battleFormationCooldown;
    if (currentCooldown === 0) {
        text = TextManager.formation;
    } else {
        var maxCooldown = Yanfly.Param.PartyCooldown;
        text = this.generatePartyRowCommandText(currentCooldown, maxCooldown);
    }
    this.addCommandAt(index, text, 'formation', enabled);
};

Window_PartyCommand.prototype.generatePartyRowCommandText = function (currentCooldown, maxCooldown) {
    var text = '';
    if (Parameters.cooldownBeginningCharacter) {
        text += Parameters.cooldownBeginningCharacter;
    }
    if (Parameters.cooldownBarMode === 1) {
        //fill mode
        var filledCharacterNum = maxCooldown - currentCooldown;
        var emptyCharacterNum = currentCooldown;
        text += Parameters.cooldownFilledCharacter.repeat(filledCharacterNum);
        text += Parameters.cooldownEmptyCharacter.repeat(emptyCharacterNum);
    } else if (Parameters.cooldownBarMode === 2) {
        //drain mode
        var _emptyCharacterNum = maxCooldown - currentCooldown;
        var _filledCharacterNum = currentCooldown;
        text += Parameters.cooldownFilledCharacter.repeat(_filledCharacterNum);
        text += Parameters.cooldownEmptyCharacter.repeat(_emptyCharacterNum);
    }
    if (Parameters.cooldownEndingCharacter) {
        text += Parameters.cooldownEndingCharacter;
    }
    return text;
};
