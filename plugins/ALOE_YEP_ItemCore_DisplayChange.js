'use strict';

//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Attachable Augments
// YEP_X_AttachAugments.js
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0.0 Updates the item scene for visual improvements
* @author Aloe Guvner
* 
* @param simplifyItemStatus
* @text Simplify Item Status
* @type boolean
* @desc Simplifies the Item Status window for items by only
* showing the first four parameters.
* @default true
*
* @param updateHelpWindow
* @text Update Help Window
* @type boolean
* @desc Updates the help window when scrolling over an attached augment.
* @default true
* 
* @help
* 
* This plugin does two things:
* 
* 1.) In the item status window, specifically for items (not armors/weapons), 
* simplifies the display by only showing the first four parameters of the item.
* Widens the rectangles to fill the available space.
* 
* 2.) Update the help window when the player is inside the action window and
* scrolls over an augment that is attached. The help window will show the
* description of the augment that the player is highlighting.
* 
*/
//=============================================================================

(function () {

    var baseParams = PluginManager.parameters('ALOE_YEP_ItemCore_DisplayChange');
    var Parameters = {};
    Object.keys(baseParams).forEach(function (param) {
        Parameters[param] = JSON.parse(baseParams[param]);
    });

    //=============================================================================
    // Begin Visual Changes for the Item Status Window
    //
    // When an item (rather than an armor or weapon) is shown, only show the first
    // four rectangles, and re-arrange to make use of the extra space.
    //=============================================================================

    if (Parameters.simplifyItemStatus) {

        //=============================================================================
        // Window_ItemStatus
        //
        // -Pass a flag to modulate drawing the dark rectangles based on if it's an item
        // -Check the passed flag to adjust the rectangle width and pass the flag onto
        // the positioning function.
        // -Return a modified position if it is an item, otherwise return the normal
        // position.
        // -Increase the item width, add padding, pass a flag to the positioning
        // function, and only draw the first 4 texts
        //=============================================================================

        Window_ItemStatus.prototype.refresh = function () {
            this.contents.clear();
            if (!this._item) {
                this.drawDarkRectEntries(false);
                return;
            }
            if (DataManager.isItem(this._item)) {
                this.drawDarkRectEntries(true);
            } else {
                this.drawDarkRectEntries(false);
            }
            this.contents.fontSize = Yanfly.Param.ItemFontSize;
            this.drawItemEntry();
        };

        Window_ItemStatus.prototype.drawDarkRectEntries = function (isItem) {
            var rect = new Rectangle();
            if (Yanfly.Param.ItemShowIcon) {
                rect.width = Window_Base._faceWidth;
                rect.height = Window_Base._faceHeight;
                this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
                isItem ? rect.width = this.contents.width - Window_Base._faceWidth : rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
            } else {
                isItem ? rect.width = this.contents.width : rect.width = this.contents.width / 2;
            }
            rect.height = this.lineHeight();
            for (var i = 0; i < 8; ++i) {
                rect = this.getRectPosition(rect, i, isItem);
                this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
            }
        };

        var Window_ItemStatus_getRectPosition = Window_ItemStatus.prototype.getRectPosition;
        Window_ItemStatus.prototype.getRectPosition = function (rect, i, isItem) {
            if (isItem) {
                if (Yanfly.Param.ItemShowIcon) {
                    rect.x = Window_Base._faceWidth;
                } else {
                    rect.x = 0;
                }
                rect.y = i * this.lineHeight();
            } else {
                rect = Window_ItemStatus_getRectPosition.call(this, rect, i);
            }
            return rect;
        };

        Window_ItemStatus.prototype.drawItemInfo = function (item) {
            var rect = new Rectangle();
            if (eval(Yanfly.Param.ItemShowIcon)) {
                rect.width = this.contents.width - Window_Base._faceWidth;
            } else {
                rect.width = this.contents.width;
            }
            for (var i = 0; i < 4; ++i) {
                rect = this.getRectPosition(rect, i, DataManager.isItem(item));
                var dx = rect.x + this.textPadding() * 2;
                var dw = rect.width - this.textPadding() * 4;
                this.changeTextColor(this.systemColor());
                var text = this.getItemInfoCategory(i);
                this.drawText(text, dx, rect.y, dw);
                this.drawItemData(i, dx, rect.y, dw);
            }
        };
    }

    //=============================================================================
    // Begin Changes for Help Window Improvements
    //
    // When an armor/weapon is selected and the actions are shown, update the help
    // window to display the description of the augment selected by the player.
    //=============================================================================

    if (Parameters.updateHelpWindow) {

        //=============================================================================
        // Scene_Item
        //
        // Create a link between the help window and the action window.
        // Ensure that the help window is also updated immediately after an augment
        // is attached or detached.
        //=============================================================================

        var Scene_Item_createActionWindow = Scene_Item.prototype.createActionWindow;
        Scene_Item.prototype.createActionWindow = function () {
            Scene_Item_createActionWindow.call(this);
            this._itemActionWindow.setHelpWindow(this._helpWindow);
        };

        var Scene_Item_onAugmentListCancel = Scene_Item.prototype.onAugmentListCancel;
        Scene_Item.prototype.onAugmentListCancel = function () {
            Scene_Item_onAugmentListCancel.call(this);
            this._itemActionWindow.updateHelp();
        };

        //=============================================================================
        // Window_ItemActionCommand
        //
        // Utility function to check if an item can hold augments.
        // Utility function to parse the augment item ID from the holder.
        // Update the help window when the cursor is over an augment.
        //=============================================================================

        Window_ItemActionCommand.prototype.isAugmentHolder = function (item) {
            return item.augmentSlotItems && item.augmentSlotItems.length > 0;
        };

        Window_ItemActionCommand.prototype.parseItemId = function (str) {
            var regExp = /item\s*(.+)/i;
            var match = str.match(regExp);
            if (match && match[1]) {
                return parseInt(match[1]);
            }
            return null;
        };

        Window_ItemActionCommand.prototype.updateHelp = function () {
            var item = this._item;
            var i = this._index;
            if (this.isAugmentHolder(item)) {
                var maxAugments = item.augmentSlotItems.length;
                if (i > 0 && i < maxAugments + 1) {
                    var augmentId = this.parseItemId(item.augmentSlotItems[i - 1]);
                    if (augmentId) {
                        var augment = $dataItems[augmentId];
                        this.setHelpWindowItem(augment);
                    } else {
                        this.setHelpWindowItem(item);
                    }
                } else {
                    this.setHelpWindowItem(item);
                }
            }
        };
    }
})();
