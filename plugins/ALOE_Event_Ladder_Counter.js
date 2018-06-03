"use strict";

//=============================================================================
// RPG Maker MV - Events as Ladders and Counters
// ALOE_Event_Ladder_Counter.js
//=============================================================================

var Imported = Imported || {};
Imported.ALOE_Event_Ladder_Counter = true;

//=============================================================================
/*:
* @plugindesc "Ladder" and "Counter" functionality for events
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
* This plugin also allows events to have the properties of a "counter".
* Any event with a graphic set to a tileset tile that is marked with the
* "counter" property or has a notetag of <counter> is treated as a counter.
* 
* "Counter" allows interaction with other events from 1 space away.
* (Example: Speak to a shop owner standing behind a table)
* 
* =========================================================================
* Notetags:
* In the "note" field of the event which is to act as a ladder
* or counter, add the following note (not case-sensitive):
* 
* <ladder>
* <counter>
* 
* =========================================================================
* Note: If an event is acting like a "counter" by either method, and it has
* it's own Event Commands, the own Event Commands are executed rather than
* the event behind it.
* 
* =========================================================================
* End of Help Section
* =========================================================================
*/

(function () {

    //=============================================================================
    // Game_Map
    // -Define event notetags
    // -Trigger notetag loading
    // -Modify isLadder and isCounter functions
    //=============================================================================

    Game_Map.prototype.eventLadderNotetag = function (data) {
        var regExp = /<Ladder>/i;
        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                var match = data[i].note.match(regExp);
                this._events[i]._ladder = match ? true : false;
            }
        }
    };

    Game_Map.prototype.eventCounterNotetag = function (data) {
        var regExp = /<Counter>/i;
        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                var match = data[i].note.match(regExp);
                this._events[i]._counter = match ? true : false;
            }
        }
    };

    var alias_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function () {
        alias_Game_Map_setupEvents.call(this);
        this.eventLadderNotetag($dataMap.events);
        this.eventCounterNotetag($dataMap.events);
    };

    //Overwrite
    Game_Map.prototype.isLadder = function (x, y) {
        return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x20) || this.isEventLadder(x, y));
    };

    //Overwrite
    Game_Map.prototype.isCounter = function (x, y) {
        return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x80) || this.isEventCounter(x, y));
    };

    Game_Map.prototype.isEventLadder = function (x, y) {
        var flags = this.tilesetFlags();
        return this.eventsXy(x, y).some(function (a) {
            return (flags[a._tileId] & 0x20) !== 0;
        }) || this.eventsXy(x, y).some(function (item) {
            return item.isLadder();
        });
    };

    Game_Map.prototype.isEventCounter = function (x, y) {
        var flags = this.tilesetFlags();
        return this.eventsXy(x, y).some(function (a) {
            return (flags[a._tileId] & 0x80) !== 0;
        }) || this.eventsXy(x, y).some(function (ev) {
            return ev.isCounter();
        });
    };

    //=============================================================================
    // Game_Event
    // Basic functions to return internal properties externally.
    //=============================================================================

    Game_Event.prototype.isLadder = function () {
        return this._ladder;
    };

    Game_Event.prototype.isCounter = function () {
        return this._counter;
    };
})();