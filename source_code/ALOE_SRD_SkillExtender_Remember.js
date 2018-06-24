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
 * Version History:
 * //=============================================================================
 * 
 * v1.0.0 (June 25 2018)
 * --Initial release
 * 
 * //=============================================================================
 * End of Help File
 * //=============================================================================
 * 
 * 
 */

(function () {

    if (Imported["SumRndmDde Skill Extender"]) {

    //=============================================================================
    // Overwrites - RPG Maker base engine methods
    //=============================================================================
    // Scene_Battle:
    // --Overwrite onActorCancel to return to the extend window when appropriate
    // --Overwrite onEnemyCancel to return to the extend window when appropriate
    //=============================================================================

        Scene_Battle.prototype.onActorCancel = function () {
            this._actorWindow.hide();
            switch (this._actorCommandWindow.currentSymbol()) {
                case 'skill':
                    if (BattleManager.actor().lastBattleSkill()._se_extendSkills) {
                        this._skillWindow.show();
                        this.openSkillExtendWindow(BattleManager.actor().lastBattleSkill());
                    } else {
                        this._skillWindow.show();
                        this._skillWindow.activate();
                    }
                    break;
                case 'item':
                    this._itemWindow.show();
                    this._itemWindow.activate();
                    break;
            }
        };

        Scene_Battle.prototype.onEnemyCancel = function () {
            this._enemyWindow.hide();
            switch (this._actorCommandWindow.currentSymbol()) {
                case 'attack':
                    this._actorCommandWindow.activate();
                    break;
                case 'skill':
                    if (BattleManager.actor().lastBattleSkill()._se_extendSkills) {
                        this._skillWindow.show();
                        this.openSkillExtendWindow(BattleManager.actor().lastBattleSkill());
                    } else {
                        this._skillWindow.show();
                        this._skillWindow.activate();
                    }
                    break;
                case 'item':
                    this._itemWindow.show();
                    this._itemWindow.activate();
                    break;
            }
        };

    //=============================================================================
    // Overwrites - SRD_SkillExtender methods
    //=============================================================================
    // Scene_Battle:
    // --Overwrite commandSkillExtend to remember the last "extend" skill selected
    // --Overwrite openSkillExtendWindow to select the remembered "extend" skill
    // Window_SkillExtend:
    // --Overwrite show to select the last command
    // --Overwrite selectLast to select the last "extend" skill remembered
    //=============================================================================

        Scene_Battle.prototype.commandSkillExtend = function () {
            var skill = this._skillExtend.item();
            var action = BattleManager.inputtingAction();
            action.setSkill(skill.id);
            BattleManager.actor().setlastBattleExtendSkill(skill);
            this.onSelectAction();
        };

        Scene_Battle.prototype.openSkillExtendWindow = function (skill) {
            this._skillExtend.setup(skill);
            this._skillExtend.open();
            this._skillExtend.selectLast();
            this._skillExtend.activate();
        };

        Window_SkillExtend.prototype.show = function () {
            this.selectLast();
            Window_SkillList.prototype.show.call(this);
        };

        Window_SkillExtend.prototype.selectLast = function () {
            let skill = this._actor.lastBattleExtendSkill();
            const index = this._data.indexOf(skill);
            this.select(index >= 0 ? index : 0);
        };

    //=============================================================================
    // New Methods - RPG Maker base engine
    //=============================================================================
    // Game_Actor:
    // --Create lastBattleExtendSkill to return the last "extend" skill selected
    // --Create setLastBattleExtendSkill to set the last "extend" skill when selected
    //=============================================================================

        Game_Actor.prototype.lastBattleExtendSkill = function () {
            return this._lastBattleExtendSkill.object();
        };

        Game_Actor.prototype.setlastBattleExtendSkill = function (skill) {
            this._lastBattleExtendSkill.setObject(skill);
        };

    //=============================================================================
    // Modifications - RPG Maker base engine methods (aliased)
    //=============================================================================
    // Game_Actor:
    // --Modify initMembers to initialize the last extend skill.
    // Scene_Battle:
    // --Modify onSkillOk to always set the last battle skill when a skill is selected.
    //=============================================================================

        const Game_Actor_initMembers = Game_Actor.prototype.initMembers;
        Game_Actor.prototype.initMembers = function () {
            Game_Actor_initMembers.call(this);
            this._lastBattleExtendSkill = new Game_Item();
        };

        const Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
        Scene_Battle.prototype.onSkillOk = function () {
            var skill = this._skillWindow.item();
            if (skill._se_extendSkills) {
                BattleManager.actor().setLastBattleSkill(skill);
                this.openSkillExtendWindow(skill);
            } else {
                Scene_Battle_onSkillOk.call(this);
            }
        };

    //=============================================================================
    // End of Plugin Extension
    //=============================================================================


    } else {
        console.log("Warning: SRD Skill Extender is not installed.");
    }

})();