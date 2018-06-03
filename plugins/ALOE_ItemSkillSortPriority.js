"use strict";

//=============================================================================
// Aloe Guvner - Item & Skill Sort Priority
// ALOE_ItemSkillsortPriority.js
//=============================================================================

var Imported = Imported || {};
Imported.ALOE_ItemSkillSortPriority = true;

var ALOE = ALOE || {};
ALOE.Alias = ALOE.Alias || {};

//=============================================================================
/*:
* @plugindesc Allows items, weapons, armors, and skills to appear in an
* order defined by the developer through notetags.
* @author Aloe Guvner
* 
* 
* @help
* ============================================================================
* Introduction
* ============================================================================
*
* By default, the items/weapons/armors/skills are sorted by database ID number
* in menu windows, and there is no way to change this order from the editor.
* 
* This simple plugin allows the developer to use a notetag in the database
* in order to define a custom order for the items/weapons/armors/skills to
* appear.
*
* ============================================================================
* Instructions
* ============================================================================
* 
* The following notetag may be added to the notes on a database entry for 
* items/weapons/armors/skills.
* 
* <Sort Priority: X>
* 
* X --> The sort priority for the item/weapon/armor/skill.
* 
* Example:
* <Sort Priority: 2>
* 
* If a database entry does not contain this notetag, its sort priority
* is set to the ID# of the entry.
* If a database entry has a defined sort priority that is the same as the
* ID# of an entry without a notetag, the entry with the notetag is
* prioritized.
* 
* ============================================================================
* Terms of Use
* ============================================================================
*
* - Free for use in both non-commercial and commercial projects.
* - You are free to edit this plugin as you see fit.
* - Credits are required to: Aloe Guvner
* 
*
* ============================================================================
* Changelog
* ============================================================================
*
* Version 1.00:
* - Initial release with support for items, weapons, armors, and skills
*/
//=============================================================================

//=============================================================================
// Notetag Processing
//=============================================================================
// Read the database objects for the <Sort Priority: X> notetag and set a
// sortPriority property.
//=============================================================================

ALOE.notetagsLoaded = false;

ALOE.Alias.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!ALOE.Alias.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!ALOE.notetagsLoaded) {
        this.sortPriorityNotetag($dataSkills);
        this.sortPriorityNotetag($dataItems);
        this.sortPriorityNotetag($dataWeapons);
        this.sortPriorityNotetag($dataArmors);
        ALOE.notetagsLoaded = true;
    }
    return true;
};

DataManager.sortPriorityNotetag = function (data) {
    var regExp = /<Sort\s*Priority\s*:\s*(\d+)\s*>/i;
    for (var i = 0; i < data.length; i++) {
        if (data[i]) {
            var match = data[i].note.match(regExp);
            data[i].sortPriority = match ? Number(match[1]) : data[i].id + 0.1;
        }
    }
};

//=============================================================================
// Window_SkillList & Window_ItemList
//=============================================================================
// Alias the makeItemList methods to sort the data it is mined and filtered.
//=============================================================================

ALOE.Alias.Window_SkillList_makeItemList = Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function () {
    ALOE.Alias.Window_SkillList_makeItemList.call(this);
    this.sortPriorityList();
};

ALOE.Alias.Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function () {
    ALOE.Alias.Window_ItemList_makeItemList.call(this);
    this.sortPriorityList();
};

//=============================================================================
// Window_Selectable
//=============================================================================
// Method to sort the data objects based on the sortPriority property.
// For an unknown reason, the data used in the equip scene contains a null
// entry at the end of the array, which must be handled separately.
//=============================================================================

Window_Selectable.prototype.sortPriorityList = function () {
    if (this._data) {
        if (this._data[this._data.length - 1] === null) {
            //equip item list
            this._data = this._data.filter(function (a) {
                return a;
            });
            this._data.sort(function (a, b) {
                return a.sortPriority - b.sortPriority;
            });
            this._data.push(null);
        } else {
            //all other item lists
            this._data.sort(function (a, b) {
                return a.sortPriority - b.sortPriority;
            });
        }
    }
};