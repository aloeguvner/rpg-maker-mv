"use strict";

//=============================================================================
// Extension for Yanfly Engine Plugins
// Parameter Control - All Menus
// ALOE_YEP_MenuParameterControl.js
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0.0 Extension to YEP menus to allow
* the developer to choose which actor parameters are shown in these menus.
* @author Aloe Guvner
* 
* @param ===MenuEquipScreen===
* @desc Menu Equip Screen
* 
* @param changeEquip
* @text Change Menu Equip Window?
* @type boolean
* @default true
* @desc Indicator whether this plugin affects the Menu Equip window or not.
* Set false to keep the default YEP_EquipCore.js functionality.
* @parent ===MenuEquipScreen===
* 
* @param equipParams
* @text Equip Screen Comparison Parameters
* @type number[]
* @default ["0","1","2","3","4","5","6","7"]
* @desc The parameters to show in the equip screen comparison window.
* See the help section for the number codes to use.
* @parent ===MenuEquipScreen===
* 
* @param ===MenuStatusScreen===
* @desc Menu Status Screen
* 
* @param changeMenuStatus
* @text Change Menu Status Window?
* @type boolean
* @default true
* @desc Indicator whether this plugin affects the Menu Status window or not.
* Set false to keep the default YEP_StatusMenuCore.js functionality.
* @parent ===MenuStatusScreen===
* 
* @param statusGeneralParams
* @text Status Screen (General) Parameters
* @type number[]
* @default ["0","1","2","3","4","5","6","7"]
* @desc The parameters to show in the status screen general section.
* See the help section for the number codes to use.
* @parent ===MenuStatusScreen===
* 
* @param statusParamsParams
* @text Status Screen (Parameters) Parameters
* @type number[]
* @default ["2","3","4","5","6","7"]
* @desc The parameters (gauges) to show in the status screen parameters section.
* See the help section for the number codes to use.
* @parent ===MenuStatusScreen===
* 
* @param ===InBattleStatus===
* @desc In Battle Status Window
* 
* @param changeInBattleStatus
* @text Change In Battle Status Window?
* @type boolean
* @default true
* @desc Indicator whether this plugin affects the In Battle Status window or not.
* Set false to keep the default YEP_X_InBattleStatus.js functionality.
* @parent ===InBattleStatus===
* 
* @param inBattleStatusParams
* @text In Battle Status Parameters
* @type number[]
* @default ["2","3","4","5","6","7"]
* @desc The parameters to show in the status screen within the battle.
* See the help section for the number codes to use.
* @parent ===InBattleStatus===
* 
* @param ===ClassChangeCompareWindow===
* @desc Class Change Stat Compare Window
* 
* @param changeClass
* @text Change Class change Status Window?
* @type boolean
* @default true
* @desc Indicator whether this plugin affects the Class change window or not.
* Set false to keep the default YEP_ClassChangeCore.js functionality.
* @parent ===ClassChangeCompareWindow===
* 
* @param classParams
* @text Class Change Parameters
* @type number[]
* @default ["0","1","2","3","4","5","6","7"]
* @desc The parameters to show in the stat compare window for class changes.
* See the help section for the number codes to use.
* @parent ===ClassChangeCompareWindow===
* 
* @param ===ItemInfoWindow===
* @desc Item Core change info window
* 
* @param changeItem
* @text Change Item info Window?
* @type boolean
* @default true
* @desc Indicator whether this plugin affects the item info window or not.
* Set false to keep the default YEP_ItemCore.js functionality.
* @parent ===ItemChangeInfoWindow===
* 
* @param itemParams
* @text Item Info Window Parameters
* @type number[]
* @default ["0","1","2","3","4","5","6","7"]
* @desc The parameters to show in the item info window.
* See the help section for the number codes to use.
* @parent ===ItemChangeInfoWindow===
*
* @param ===ShopInfoWindow===
* @desc Shop Core change info window
* 
* @param changeShop
* @text Change Shop info Window?
* @type boolean
* @default true
* @desc Indicator whether this plugin affects the shop info window or not.
* Set false to keep the default YEP_ShopMenuCore.js functionality.
* @parent ===ShopInfoWindow===
* 
* @param shopItemParams
* @text Shop Info Window Parameters
* @type number[]
* @default ["0","1","2","3","4","5","6","7"]
* @desc The parameters to show in the shop item info window.
* See the help section for the number codes to use.
* @parent ===ShopInfoWindow===
*
* @param shopActorParams
* @text Shop Info Window Parameters
* @type number[]
* @default ["0","1","2","3","4","5","6","7"]
* @desc The parameters to show in the shop actor info window.
* See the help section for the number codes to use.
* @parent ===ShopInfoWindow===
*
* @help
* 
* Extends:
* -EquipCore
* -StatusMenuCore
* -InBattleStatus 
* -ClassChangeCore
* -ItemCore
* -ShopMenuCore
* 
* If you do not have any of the plugins above installed, this extension
* will simply ignore that plugin.
* 
* Installation: Install below all YEP plugins.
* 
* The following values can be used for the Equip, Status(General) and
* Status(Parameters) screens.
* 
* 0 --> Max HP (MHP)
* 1 --> Max MP (MMP)
* 2 --> Attack (ATK)
* 3 --> Defense (DEF)
* 4 --> Magic Attack Power (MAT)
* 5 --> Magic Defense Power (MDF)
* 6 --> Agility (AGI)
* 7 --> Luck (LUK)
* 
* The order of these is taken into account, allowing the developer to 
* change the order in which these are displayed.
* The screens will automatically resize to the appropriate size based
* on the parameters that are chosen by the developer.
* 
* Terms of Use:
* Free to use in Commercial or Non-Commercial projects.
* 
* Attribution:
* This code is released under the MIT License.
* https://opensource.org/licenses/MIT
* 
* Credits must be still given to Yanfly Engine Plugins as dictated by YEP.
*
* ============================================================================
* Change Log
* ============================================================================
*
* Version 1.0.0:
* Released initial version that extends:
* -EquipCore
* -StatusMenuCore
* -InBattleStatus
* -ClassChangeCore
* -ItemCore
* -ShopMenuCore
* 
*/
//=============================================================================

(function () {

  "use strict";

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

  var Parameters = {};

  Object.keys(PluginManager.parameters("ALOE_YEP_MenuParameterControl")).forEach(function (a) {
    return Parameters[a] = Utils.recursiveParse(PluginManager.parameters("ALOE_YEP_MenuParameterControl")[a]);
  });

  //=============================================================================
  // Equip Menu Changes
  //=============================================================================

  if (Imported.YEP_EquipCore) {
    if (Parameters.changeEquip) {

      //=============================================================================
      // Window_StatCompare
      //=============================================================================

      Window_StatCompare.prototype.createWidths = function () {
        this._paramNameWidth = 0;
        this._paramValueWidth = 0;
        this._arrowWidth = this.textWidth("\u2192" + ' ');
        var buffer = this.textWidth(' ');
        for (var i = 0; i < Parameters.equipParams.length; i++) {
          var value1 = this.textWidth(TextManager.param(Parameters.equipParams[i]));
          var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(Parameters.equipParams[i])));
          this._paramNameWidth = Math.max(value1, this._paramNameWidth);
          this._paramValueWidth = Math.max(value2, this._paramValueWidth);
        }
        this._bonusValueWidth = this._paramValueWidth;
        this._bonusValueWidth += this.textWidth('(+)') + buffer;
        this._paramNameWidth += buffer;
        this._paramValueWidth;
        if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
      };

      Window_StatCompare.prototype.refresh = function () {
        this.contents.clear();
        if (!this._actor) return;
        for (var i = 0; i < Parameters.equipParams.length; i++) {
          this.drawItem(0, this.lineHeight() * i, Parameters.equipParams[i]);
        }
      };

      //=============================================================================
      // End of Equip Menu Changes
      //=============================================================================
    }
  }

  //=============================================================================
  // Status Menu Changes
  //=============================================================================

  if (Imported.YEP_StatusMenuCore) {
    if (Parameters.changeMenuStatus) {

      //=============================================================================
      // Window_StatusInfo
      //=============================================================================

      Window_StatusInfo.prototype.drawGeneralParam = function () {
        var rect = new Rectangle();
        rect.width = (this.contents.width - this.standardPadding()) / 2;
        rect.y = this.lineHeight() * 2;
        rect.height = this.lineHeight();
        var dx = rect.x + this.textPadding();
        var dw = rect.width - this.textPadding() * 2;
        this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.level, dx, rect.y, dw, 'left');
        this.changeTextColor(this.normalColor());
        var text = Yanfly.Util.toGroup(this._actor.level);
        this.drawText(text, dx, rect.y, dw, 'right');
        var count = Parameters.statusGeneralParams.length + 1;
        for (var i = 0; i < Parameters.statusGeneralParams.length; ++i) {
          if (count < 7) {
            rect.y += this.lineHeight();
          } else if (count === 7) {
            if (i < 4) {
              rect.y += this.lineHeight();
            } else if (i === 4) {
              rect.y += this.lineHeight();
              rect.width /= 2;
              dw = rect.width - this.textPadding() * 2;
            } else if (i === 5) {
              rect.x += rect.width;
              dx += rect.width;
            }
          } else if (count === 8) {
            if (i < 3) {
              rect.y += this.lineHeight();
            } else if (i === 3) {
              rect.y += this.lineHeight();
              rect.width /= 2;
              dw = rect.width - this.textPadding() * 2;
            } else if (i % 2 === 1) {
              rect.x = 0;
              dx = rect.x + this.textPadding();
              rect.y += this.lineHeight();
            } else {
              rect.x += rect.width;
              dx += rect.width;
            }
          } else if (count === 9) {
            if (i < 2) {
              rect.y += this.lineHeight();
            } else if (i === 2) {
              rect.y += this.lineHeight();
              rect.width /= 2;
              dw = rect.width - this.textPadding() * 2;
            } else if (i % 2 === 0) {
              rect.x = 0;
              dx = rect.x + this.textPadding();
              rect.y += this.lineHeight();
            } else {
              rect.x += rect.width;
              dx += rect.width;
            }
          }
          this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
          this.changeTextColor(this.systemColor());
          this.drawText(TextManager.param(Parameters.statusGeneralParams[i]), dx, rect.y, dw, 'left');
          this.changeTextColor(this.normalColor());
          text = Yanfly.Util.toGroup(this._actor.param(Parameters.statusGeneralParams[i]));
          this.drawText(text, dx, rect.y, dw, 'right');
        }
      };

      Window_StatusInfo.prototype.drawParameters = function () {
        var dx = 0;
        var dy = this.lineHeight() / 2;
        var dw = this.contents.width;
        var dh = this.lineHeight();
        var dw2;
        var text;
        this.changeTextColor(this.systemColor());
        this.drawText(Yanfly.Param.StatusGraphText, dx, dy, dw, 'center');
        dy = this.lineHeight();
        dx = this.standardPadding();
        dw -= this.standardPadding() * 2;
        for (var i = 0; i < Parameters.statusParamsParams.length; i++) {
          dy += Math.floor(6 * this.lineHeight() / Parameters.statusParamsParams.length);
          var rate = this.drawParamGauge(dx, dy, dw, Parameters.statusParamsParams[i]);
          this.changeTextColor(this.systemColor());
          this.drawText(TextManager.param(Parameters.statusParamsParams[i]), dx + 4, dy, dw - 4);
          text = Yanfly.Util.toGroup(this._actor.param(Parameters.statusParamsParams[i]));
          this.changeTextColor(this.normalColor());
          dw2 = dw * rate;
          this.drawText(text, dx, dy, dw2 - 4, 'right');
        }
      };

      //=============================================================================
      // End of Status Menu Changes
      //=============================================================================
    }
  }

  //=============================================================================
  // In Battle Status Changes
  //=============================================================================

  if (Imported.YEP_X_InBattleStatus) {
    if (Parameters.changeInBattleStatus) {

      //=============================================================================
      // Window_InBattleStatus
      //=============================================================================

      Window_InBattleStatus.prototype.refresh = function () {
        this.contents.clear();
        if (!this._battler) return;
        var x = this.standardPadding() + eval(Yanfly.Param.IBSStatusListWidth);
        this.drawActorFace(this._battler, x, 0, Window_Base._faceWidth);
        var x2 = x + Window_Base._faceWidth + this.standardPadding();
        var w = this.contents.width - x2;
        this.drawActorSimpleStatus(this._battler, x2, 0, w);
        w = this.contents.width - x;
        var y = Math.ceil(this.lineHeight() * 4.5);
        var h = this.contents.height - y;
        var count = Parameters.inBattleStatusParams.length;
        var w2 = Math.floor(w / 2);
        x2 = x + w2;
        for (var i = 0; i < count; i++) {
          if (count < 4) {
            this.drawParam(Parameters.inBattleStatusParams[i], x, y, w, this.lineHeight());
            y += this.lineHeight();
          } else if (count === 4) {
            if (i < 2) {
              this.drawParam(Parameters.inBattleStatusParams[i], x, y, w, this.lineHeight());
              y += this.lineHeight();
            } else if (i === 2) {
              this.drawParam(Parameters.inBattleStatusParams[i], x, y, w2, this.lineHeight());
            } else {
              this.drawParam(Parameters.inBattleStatusParams[i], x2, y, w2, this.lineHeight());
            }
          } else if (count === 5) {
            if (i < 1) {
              this.drawParam(Parameters.inBattleStatusParams[i], x, y, w, this.lineHeight());
              y += this.lineHeight();
            } else if (i % 2 === 1) {
              this.drawParam(Parameters.inBattleStatusParams[i], x, y, w2, this.lineHeight());
            } else {
              this.drawParam(Parameters.inBattleStatusParams[i], x2, y, w2, this.lineHeight());
              y += this.lineHeight();
            }
          } else if (count > 5) {
            if (i % 2 === 0) {
              this.drawParam(Parameters.inBattleStatusParams[i], x, y, w2, this.lineHeight());
            } else {
              this.drawParam(Parameters.inBattleStatusParams[i], x2, y, w2, this.lineHeight());
              y += this.lineHeight();
            }
          }
        }
      };

      //=============================================================================
      // End of In Battle Status Changes
      //=============================================================================
    }
  }

  //=============================================================================
  // Class Menu Changes
  //=============================================================================

  if (Imported.YEP_ClassChangeCore) {
    if (Parameters.changeClass) {

      //=============================================================================
      // Window_StatCompare
      //=============================================================================

      Window_StatCompare.prototype.createWidths = function () {
        this._paramNameWidth = 0;
        this._paramValueWidth = 0;
        this._arrowWidth = this.textWidth("\u2192" + ' ');
        var buffer = this.textWidth(' ');
        for (var i = 0; i < Parameters.equipParams.length; i++) {
          var value1 = this.textWidth(TextManager.param(Parameters.classParams[i]));
          var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(Parameters.classParams[i])));
          this._paramNameWidth = Math.max(value1, this._paramNameWidth);
          this._paramValueWidth = Math.max(value2, this._paramValueWidth);
        }
        this._bonusValueWidth = this._paramValueWidth;
        this._bonusValueWidth += this.textWidth('(+)') + buffer;
        this._paramNameWidth += buffer;
        this._paramValueWidth;
        if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
      };

      Window_StatCompare.prototype.refresh = function () {
        this.contents.clear();
        if (!this._actor) return;
        for (var i = 0; i < Parameters.classParams.length; i++) {
          this.drawItem(0, this.lineHeight() * i, Parameters.classParams[i]);
        }
      };

      //=============================================================================
      // End of Class Menu Changes
      //=============================================================================
    }
  }

  //=============================================================================
  // Item Menu Changes
  //=============================================================================

  if (Imported.YEP_ItemCore) {
    if (Parameters.changeItem) {

      //=============================================================================
      // Window_ItemStatus
      //=============================================================================

      Window_ItemStatus.prototype.drawEquipInfo = function (item) {
        var rect = new Rectangle();
        if (eval(Yanfly.Param.ItemShowIcon)) {
          rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
        } else {
          rect.width = this.contents.width / 2;
        }
        for (var i = 0; i < Parameters.itemParams.length; i++) {
          rect = this.getRectPosition(rect, i);
          var dx = rect.x + this.textPadding();
          var dw = rect.width - this.textPadding() * 2;
          this.changeTextColor(this.systemColor());
          this.drawText(TextManager.param(Parameters.itemParams[i]), dx, rect.y, dw);
          this.changeTextColor(this.paramchangeTextColor(item.params[Parameters.itemParams[i]]));
          var text = Yanfly.Util.toGroup(item.params[Parameters.itemParams[i]]);
          if (item.params[i] >= 0) text = '+' + text;
          if (text === '+0') this.changePaintOpacity(false);
          this.drawText(text, dx, rect.y, dw, 'right');
          this.changePaintOpacity(true);
        }
      };

      //=============================================================================
      // End of Item Menu Changes
      //=============================================================================
    }
  }

  //=============================================================================
  // Shop Menu Changes
  //=============================================================================

  if (Imported.YEP_ShopMenuCore) {
    if (Parameters.changeShop) {

      //=============================================================================
      // Window_ShopInfo
      //=============================================================================

      Window_ShopInfo.prototype.drawEquipInfo = function (item) {
        var rect = new Rectangle();
        if (eval(Yanfly.Param.ItemShowIcon)) {
          rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
        } else {
          rect.width = this.contents.width / 2;
        }
        for (var i = 0; i < Parameters.shopItemParams.length; ++i) {
          rect = this.getRectPosition(rect, i);
          var dx = rect.x + this.textPadding();
          var dw = rect.width - this.textPadding() * 2;
          this.changeTextColor(this.systemColor());
          this.drawText(TextManager.param(Parameters.shopItemParams[i]), dx, rect.y, dw);
          this.changeTextColor(this.paramchangeTextColor(item.params[Parameters.shopItemParams[i]]));
          var text = Yanfly.Util.toGroup(item.params[Parameters.shopItemParams[i]]);
          if (item.params[Parameters.shopItemParams[i]] >= 0) text = '+' + text;
          if (text === '+0') this.changePaintOpacity(false);
          this.drawText(text, dx, rect.y, dw, 'right');
          this.changePaintOpacity(true);
        }
      };

      //=============================================================================
      // Window_ShopStatus
      //=============================================================================

      Window_ShopStatus.prototype.drawActorStatInfo = function (actor) {
        this.contents.fontSize = Yanfly.Param.ShopStatFontSize;
        var item1 = this.currentEquippedItem(actor, this._item.etypeId);
        var canEquip = actor.canEquip(this._item);
        for (var i = 0; i < Parameters.shopActorParams.length; ++i) {
          this.changePaintOpacity(true);
          var rect = this.getRectPosition(i);
          rect.x += this.textPadding();
          rect.width -= this.textPadding() * 2;
          this.changeTextColor(this.systemColor());
          var text = TextManager.param(Parameters.shopActorParams[i]);
          this.drawText(text, rect.x, rect.y, rect.width);
          if (!canEquip) this.drawActorCantEquip(actor, rect);
          if (canEquip) this.drawActorChange(actor, rect, item1, Parameters.shopActorParams[i]);
        }
        this.changePaintOpacity(true);
      };

      //=============================================================================
      // End of Shop Menu Changes
      //=============================================================================
    }
  }

  //=============================================================================
  // End of Plugin
  //=============================================================================
})();