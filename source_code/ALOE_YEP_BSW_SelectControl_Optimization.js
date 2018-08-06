//=============================================================================
// RPG Maker MV - BSW & Selection Control Optimization
// ALOE_YEP_BSW_SelectControl_Optimization.js
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0.0 Optimizes YEP_BattleStatusWindow
 * and YEP_X_SelectionControl to reduce lag.
 * @author Aloe Guvner
 * 
 * @help
 *   When both YEP_BattleStatusWindow and YEP_X_SelectionControl are used 
 * together, significant lag can occur in the item and skill windows during
 * battle.
 * 
 *   The root cause is when the item/skill window is drawn, the Selection Control
 * plugin runs calculations on every item/skill to determine if it is usable
 * based on the advanced selection criteria. Additionally, these calculations
 * are done again when the player scrolls up or down on the window to new rows.
 * 
 *   With the Battle Status Window plugin, the actor is refreshed multiple times
 * for each item/skill in the item/skill window. The actor refresh calculations
 * can be quite expensive in a project with a large amount of plugins, and it is
 * not necessary to refresh the actor when drawing the item/skill window. This
 * optimization skips the actor refresh calculations when drawing the item/skill
 * window.
 * 
 * Placement: Place directly below YEP_X_SelectionControl
 */

(function() {
    if (Imported && Imported.YEP_BattleStatusWindow && Imported.YEP_X_SelectionControl) {

        // Battle Status Window overwrite
        Game_Action.prototype.setItemObject = function(object, skipRefresh) {
            Yanfly.BSW.Game_Action_setItemObject.call(this, object);
            if (!skipRefresh) {
                this.subject().refresh();
            }
        };
    
        // Selection Control overwrite
        Game_BattlerBase.prototype.hasValidTargets = function(item) {
            if ($gameTemp.isSelectionControlCached(item)) {
              return $gameTemp.getSelectionControlCache(item);
            }
            const action = new Game_Action(this);
            action.setItemObject(item, true); //skip actor refresh
            let targets = []
            if (action.isSpanBothParties()) {
              targets = targets.concat(this.friendsUnit().aliveMembers());
              targets = targets.concat(this.opponentsUnit().aliveMembers());
            } else if (action.isForOpponent()) {
              targets = targets.concat(this.opponentsUnit().aliveMembers());
            } else if (action.isForFriend()) {
              targets = targets.concat(this.friendsUnit().members());
            } else {
              $gameTemp.setSelectionControlCache(item, true);
              return true;
            }
            const length = targets.length;
            for (let i = 0; i < length; ++i) {
              const target = targets[i];
              if (!target) continue;
              if (action.checkAllSelectionConditions(this, target)) {
                $gameTemp.setSelectionControlCache(item, true);
                return true;
              }
            }
            $gameTemp.setSelectionControlCache(item, false);
            return false;
        };
    }
})();