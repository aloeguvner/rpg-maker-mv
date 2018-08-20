'use strict';

/*:
 * @plugindesc Modifies SRD Skill Extender to remember the last command
 * that the player selected for the actor.
 * @author Aloe Guvner
 *
 * @help
 * 
 * //=============================================================================
 * //Background
 * //=============================================================================
 * 
 * The Skill Extender window does not properly remember the last command selected.
 * This plugin extension fixes that behavior to improve the player experience.
 *
 * //=============================================================================
 * // Version History:
 * //=============================================================================
 * 
 * v1.0.1 (August 20 2018)
 * --Fixed a bug where enemies weren't deselected (visually) when a multiple target
 * skill selection was cancelled from an extended skill if YEP_BattleEngineCore
 * is activated.
 * 
 * v1.0.0 (June 25 2018)
 * --Initial release
 * 
 * //=============================================================================
 * // End of Help File
 * //=============================================================================
 * 
 * 
 */

(function () {

    if (Imported["SumRndmDde Skill Extender"]) {

        //=============================================================================
        // Overwrites - SRD_SkillExtender methods
        //=============================================================================
        // Scene_Battle:
        // --Overwrite commandSkillExtend to remember the last "extend" skill selected
        // Scene_Skill:
        // --Overwrite item to return the item instead of the string 'extend'
        // Window_SkillExtend:
        // --Overwrite selectLast to select the last "extend" skill remembered
        //=============================================================================

        Scene_Battle.prototype.commandSkillExtend = function () {
            var skill = this._skillExtend.item();
            var action = BattleManager.inputtingAction();
            action.setSkill(skill.id);
            BattleManager.actor().setlastBattleExtendSkill(skill);
            this.onSelectAction();
        };

        Scene_Skill.prototype.item = function () {
            var item = Scene_ItemBase.prototype.item.call(this);
            if (item._se_extendSkills) {
                if (this._skillExtend.isClosed()) {
                    return item;
                } else {
                    return this._skillExtend.item();
                }
            } else {
                return item;
            }
        };

        Window_SkillExtend.prototype.selectLast = function () {
            var skill = void 0;
            if ($gameParty.inBattle()) {
                skill = this._actor.lastBattleExtendSkill();
            } else {
                skill = this._actor.lastMenuExtendSkill();
            }
            var index = this._data.indexOf(skill);
            this.select(index >= 0 ? index : 0);
        };

        //=============================================================================
        // Modifications - SRD_SkillExtender methods
        //=============================================================================
        // Scene_Battle:
        // --Modify openSkillExtendWindow to select the remembered "extend" skill
        // Scene_Skill:
        // --Modify createSkillExtendWindow to use the commandSkillExtend handler
        // --Modify openSkillExtendWindow to select the remembered "extend" skill
        //=============================================================================

        var Scene_Battle_openSkillExtendWindow = Scene_Battle.prototype.openSkillExtendWindow;
        Scene_Battle.prototype.openSkillExtendWindow = function (skill) {
            Scene_Battle_openSkillExtendWindow.apply(this, arguments);
            this._skillExtend.selectLast();
        };

        var Scene_Skill_createSkillExtendWindow = Scene_Skill.prototype.createSkillExtendWindow;
        Scene_Skill.prototype.createSkillExtendWindow = function () {
            Scene_Skill_createSkillExtendWindow.call(this);
            this._skillExtend.setHandler('ok', this.commandSkillExtend.bind(this));
        };

        var Scene_Skill_openSkillExtendWindow = Scene_Skill.prototype.openSkillExtendWindow;
        Scene_Skill.prototype.openSkillExtendWindow = function (skill) {
            Scene_Skill_openSkillExtendWindow.apply(this, arguments);
            this._skillExtend.selectLast();
        };

        //=============================================================================
        // New Methods - SRD_SkillExtender methods
        //=============================================================================
        // Scene_Skill:
        // --Create commandSkillExtend to return the last "extend" skill selected
        //=============================================================================

        Scene_Skill.prototype.commandSkillExtend = function () {
            var skill = this._skillExtend.item();
            this.actor().setlastMenuExtendSkill(skill);
            this.determineItem();
        };

        //=============================================================================
        // New Methods - RPG Maker base engine
        //=============================================================================
        // Game_Actor:
        // --Create lastBattleExtendSkill to return the last "extend" skill selected
        // --Create setLastBattleExtendSkill to set the last "extend" skill when selected
        // --Create lastBattleExtendSkill to return the last "extend" skill selected
        // --Create setlastMenuExtendSkill to set the last "extend" skill when selected
        //=============================================================================

        Game_Actor.prototype.lastBattleExtendSkill = function () {
            return this._lastBattleExtendSkill.object();
        };

        Game_Actor.prototype.setlastBattleExtendSkill = function (skill) {
            this._lastBattleExtendSkill.setObject(skill);
        };

        Game_Actor.prototype.lastMenuExtendSkill = function () {
            return this._lastMenuExtendSkill.object();
        };

        Game_Actor.prototype.setlastMenuExtendSkill = function (skill) {
            this._lastMenuExtendSkill.setObject(skill);
        };

        //=============================================================================
        // Modifications - RPG Maker base engine methods (aliased)
        //=============================================================================
        // Game_Actor:
        // --Modify initMembers to initialize the last extend skill.
        // Scene_Battle:
        // --Modify onSkillOk to always set the last battle skill when a skill is selected.
        // --Modify onActorCancel to return to the extend window when appropriate
        // --Modify onEnemyCancel to return to the extend window when appropriate
        // Scene_Skill:
        // --Modify onItemOk to set the last menu skill and open the extend window
        // --Modify hideSubWindow to return to the extend window if appropriate
        //=============================================================================

        var Game_Actor_initMembers = Game_Actor.prototype.initMembers;
        Game_Actor.prototype.initMembers = function () {
            Game_Actor_initMembers.call(this);
            this._lastBattleExtendSkill = new Game_Item();
            this._lastMenuExtendSkill = new Game_Item();
        };

        var Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
        Scene_Battle.prototype.onSkillOk = function () {
            var skill = this._skillWindow.item();
            if (skill._se_extendSkills) {
                BattleManager.actor().setLastBattleSkill(skill);
                this.openSkillExtendWindow(skill);
            } else {
                Scene_Battle_onSkillOk.call(this);
            }
        };

        var Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
        Scene_Battle.prototype.onActorCancel = function () {
            if (this._actorCommandWindow.currentSymbol() === 'skill' && BattleManager.actor().lastBattleSkill()._se_extendSkills) {
                this._actorWindow.hide();
                this._skillWindow.show();
                this.openSkillExtendWindow(BattleManager.actor().lastBattleSkill());
            } else {
                Scene_Battle_onActorCancel.call(this);
            }
        };

        var Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
        Scene_Battle.prototype.onEnemyCancel = function () {
            if (this._actorCommandWindow.currentSymbol() === 'skill' && BattleManager.actor().lastBattleSkill()._se_extendSkills) {
                this._enemyWindow.hide();
                this._skillWindow.show();
                this.openSkillExtendWindow(BattleManager.actor().lastBattleSkill());
                if (Imported.YEP_BattleEngineCore) {
                    if (BattleManager.isAllSelection()) {
                        BattleManager.stopAllSelection();
                    }
                    BattleManager.clearInputtingAction();
                }
            } else {
                Scene_Battle_onEnemyCancel.call(this);
            }
        };

        var Scene_Skill_onItemOk = Scene_Skill.prototype.onItemOk;
        Scene_Skill.prototype.onItemOk = function () {
            var item = this.item();
            if (item._se_extendSkills) {
                this.actor().setLastMenuSkill(item);
                this.openSkillExtendWindow(item);
            } else {
                Scene_Skill_onItemOk.call(this);
            }
        };

        var Scene_Skill_hideSubWindow = Scene_Skill.prototype.hideSubWindow;
        Scene_Skill.prototype.hideSubWindow = function (window) {
            if (this.actor().lastMenuSkill()._se_extendSkills) {
                window.hide();
                window.deactivate();
                this.openSkillExtendWindow(this.actor().lastMenuSkill());
            } else {
                Scene_Skill_hideSubWindow.apply(this, arguments);
            }
        };

        //=============================================================================
        // End of Plugin Extension
        //=============================================================================

    } else {
        console.log("Warning: SRD Skill Extender is not installed.");
    }
})();
