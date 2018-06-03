"use strict";

//=============================================================================
// RPG Maker MV - Events as Ladders
// ALOE_EventLadders.js
//=============================================================================

var Imported = Imported || {};
Imported.ALOE_EventLadders = true;

//=============================================================================
/*:
* @plugindesc "Ladder" functionality for events
* @author Aloe Guvner
* 
* @help
* This plugin allows events to have the "ladder" functionality
* as seen in the tileset. 
* When on a "ladder", the character is always facing upwards regardless
* of the direction of movement. This affects:
* -The player
* -The player's followers
* -Other events (NPC) that are climbing the ladder
* 
* A common usage example would be a ladder that appears when a switch
* is turned on. The ladder would in fact be events that are activated
* by the switch.
* 
* Notetags:
* In the "note" field of the event which is to act as a ladder, add
* the following note (not case-sensitive):
* 
* <ladder>
* 
* Note that this plugin does not change anything about the passability
* of the events, only the direction fix associated with ladders.
*/

(function () {

    //Overwrite
    Game_Map.prototype.isLadder = function (x, y) {
        return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x20) || this.isEventLadder(x, y));
    };

    //Alias
    var alias_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function () {
        alias_Game_Map_setupEvents.call(this);
        this.eventLadderNotetag($dataMap.events);
    };

    //New Methods
    Game_Map.prototype.eventLadderNotetag = function (data) {
        var regExp = /<Ladder>/i;
        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                var match = data[i].note.match(regExp);
                this._events[i]._ladder = match ? true : false;
            }
        }
    };

    Game_Map.prototype.isEventLadder = function (x, y) {
        var event = this.eventsXy(x, y);
        return event.some(function (item) {
            return item.isLadder();
        });
    };

    Game_Event.prototype.isLadder = function () {
        return this._ladder;
    };
})();