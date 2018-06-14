/*:
* @plugindesc Synchronize Variables and Items/Equipment
* @author Aloe Guvner
*
* 
* @param syncItems
* @text Items to Sync
* @type struct<syncItemStruct>[]
* @desc Set which variable(s) and item(s)
* should be synced.
*
* @help
*
* Some menu plugins require data to be stored as variables, which also has to be
* represented as item counts, or vice-versa.
* If multiple currency systems (ex. using gold and gems) require the additional
* currencies to be represented as variables, it would be very useful to
* represent it as items in the inventory as well.
* 
* This plugin will synchronize the value of a variable with the inventory count
* of a certain item/weapon/armor, making sure that they are always the same.
*
*
* For example, if Item #1 (Potion) and Variable #22 are synchronized:
*
* 1.) The party gains 30 potions. The value of Variable #22 is automatically set
* to 30.
* 2.) The value of Variable #22 is set to 50. The party automatically gains 20
* potions - for a total of 50 potions.
* 3.) The value of Variable #22 is set to 46. The party automatically loses 4
* potions - for a total of 46 potions.
*
* Note:
* Only pairs of item/weapon/armor + variable can be synchronized.
* Item/Weapon/Armor <---> Variable
*
* This plugin does not currently support synchronization across groups of multiple
* Item/Weapon/Armor/Variables.
*
* //=============================================================================
* Version History:
* //=============================================================================
* 
* v1.0.0 (June 14 2018)
* --Initial release
* 
* //=============================================================================
* End of Help File
* //=============================================================================
*/

/*~struct~syncItemStruct:
 * @param varId
 * @text Variable ID
 * @type number
 * @desc Variable ID to syncronize.
 * 
 * @param itemType
 * @text Type of Item/Equip
 * @type select
 * @option Item
 * @value item
 * @option Weapon
 * @value weapon
 * @option Armor
 * @value armor
 * @desc The type of item to syncronize with the
 * variable: Item, Weapon, Armor
 * @default item
 * 
 * @param itemId
 * @text Item/Equip ID
 * @type number
 * @desc ID Number of the item/weapon/armor
 * to syncronize with the variable.
 * 
*/


(function () {
    "use strict";

    const Alias = {};

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

    const Parameters = {};

    Object.keys(PluginManager.parameters("ALOE_Sync_Variables_Items")).forEach(a =>
        Parameters[a] = Utils.recursiveParse(PluginManager.parameters("ALOE_Sync_Variables_Items")[a]));

    //=============================================================================
    // Sync Item to Variable
    //=============================================================================
    // When a variable changes in value, increase/decrease the linked item count.
    //=============================================================================

    Alias.Game_Variables_setValue = Game_Variables.prototype.setValue;

    Game_Variables.prototype.setValue = function (variableId, value) {
        Alias.Game_Variables_setValue.call(this, variableId, value);
        let index = Parameters.syncItems.findIndex(a => a.varId === variableId);
        if (index >= 0) {
            switch (Parameters.syncItems[index].itemType) {
                case "item":
                    var item = $dataItems[Parameters.syncItems[index].itemId];
                    break;
                case "weapon":
                    var item = $dataWeapons[Parameters.syncItems[index].itemId];
                    break;
                case "armor":
                    var item = $dataArmors[Parameters.syncItems[index].itemId];
                    break;
            }
            var numItems = $gameParty.numItems(item);
            if (this.value(variableId) !== numItems) {
                $gameParty.gainItem(item, this.value(variableId) - numItems, true);
            }
        }
    };

    //=============================================================================
    // Sync Variable to Item
    //=============================================================================
    // When a item count changes, increase/decrease the linked variable.
    //=============================================================================

    Alias.Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        Alias.Game_Party_gainItem.call(this, item, amount, includeEquip);
        let type;
        if (DataManager.isItem(item)) {
            type = "item";
        } else if (DataManager.isWeapon(item)) {
            type = "weapon";
        } else if (DataManager.isArmor(item)) {
            type = "armor";
        }
        let index = Parameters.syncItems.findIndex(a => a.itemId === item.id && a.itemType === type);
        if (index >= 0) {
            let variableId = Parameters.syncItems[index].varId;
            if ($gameVariables.value(variableId) !== this.numItems(item));
            $gameVariables.setValue(Parameters.syncItems[index].varId, this.numItems(item));
        }
    };

})();