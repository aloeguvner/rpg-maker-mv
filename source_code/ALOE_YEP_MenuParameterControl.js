//=============================================================================
// Extension for Yanfly Engine Plugins
// Parameter Control - All Menus
// ALOE_YEP_MenuParameterControl.js
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.1.1 Extension to YEP menus to allow
* the developer to choose which actor parameters are shown in these menus.
* @author Aloe Guvner
*
* @param ===Parameter Labels===
*
* @param xparamLabels
* @text Ex-Parameter Labels
* @desc Names of the Ex-Params that will appear
* in the menus. See help section for defaults.
* @type text[]
* @default ["Hit Rate","Evasion Rate","Critical Rate","Critical Evasion","Magic Evasion","Magic Reflection","Counter Attack","HP Regeneration","MP Regeneration","TP Regeneration"]
* @parent ===Parameter Labels===
*
* @param sparamLabels
* @text Sp-Parameter Labels
* @desc Names of the Sp-Params that will appear
* in the menus. See help section for defaults.
* @type text[]
* @default ["Target Rate","Guard Effect","Recovery Effect","Pharmacology","MP Cost Rate","TP Charge Rate","Physical Damage Rate","Magical Damage Rate","Floor Damage Rate","Experience Rate"]
* @parent ===Parameter Labels===
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
* @type struct<complexParams>[]
* @desc Parameters to show in the equip screen comparison window.
* See the help section for the number codes to use.
* @default ["{\"paramType\":\"param\",\"paramId\":\"0\"}","{\"paramType\":\"param\",\"paramId\":\"1\"}","{\"paramType\":\"param\",\"paramId\":\"2\"}","{\"paramType\":\"param\",\"paramId\":\"3\"}","{\"paramType\":\"param\",\"paramId\":\"4\"}","{\"paramType\":\"param\",\"paramId\":\"5\"}","{\"paramType\":\"param\",\"paramId\":\"6\"}","{\"paramType\":\"param\",\"paramId\":\"7\"}"]
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
* @type struct<complexParams>[]
* @desc The parameters to show in the stat compare window for class changes.
* See the help section for the number codes to use.
* @default ["{\"paramType\":\"param\",\"paramId\":\"0\"}","{\"paramType\":\"param\",\"paramId\":\"1\"}","{\"paramType\":\"param\",\"paramId\":\"2\"}","{\"paramType\":\"param\",\"paramId\":\"3\"}","{\"paramType\":\"param\",\"paramId\":\"4\"}","{\"paramType\":\"param\",\"paramId\":\"5\"}","{\"paramType\":\"param\",\"paramId\":\"6\"}","{\"paramType\":\"param\",\"paramId\":\"7\"}"]
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
* @parent ===ItemInfoWindow===
* 
* @param itemParams
* @text Item Info Window Parameters
* @type struct<complexParams>[]
* @default ["{\"paramType\":\"param\",\"paramId\":\"0\"}","{\"paramType\":\"param\",\"paramId\":\"1\"}","{\"paramType\":\"param\",\"paramId\":\"2\"}","{\"paramType\":\"param\",\"paramId\":\"3\"}","{\"paramType\":\"param\",\"paramId\":\"4\"}","{\"paramType\":\"param\",\"paramId\":\"5\"}","{\"paramType\":\"param\",\"paramId\":\"6\"}","{\"paramType\":\"param\",\"paramId\":\"7\"}"]
* @desc The parameters to show in the item info window.
* See the help section for the number codes to use.
* @parent ===ItemInfoWindow===
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
* @type struct<complexParams>[]
* @default ["{\"paramType\":\"param\",\"paramId\":\"0\"}","{\"paramType\":\"param\",\"paramId\":\"1\"}","{\"paramType\":\"param\",\"paramId\":\"2\"}","{\"paramType\":\"param\",\"paramId\":\"3\"}","{\"paramType\":\"param\",\"paramId\":\"4\"}","{\"paramType\":\"param\",\"paramId\":\"5\"}","{\"paramType\":\"param\",\"paramId\":\"6\"}","{\"paramType\":\"param\",\"paramId\":\"7\"}"]
* @desc The parameters to show in the shop item info window.
* See the help section for the number codes to use.
* @parent ===ShopInfoWindow===
*
* @param shopActorParams
* @text Shop Actor Window Parameters
* @type struct<complexParams>[]
* @default ["{\"paramType\":\"param\",\"paramId\":\"0\"}","{\"paramType\":\"param\",\"paramId\":\"1\"}","{\"paramType\":\"param\",\"paramId\":\"2\"}","{\"paramType\":\"param\",\"paramId\":\"3\"}","{\"paramType\":\"param\",\"paramId\":\"4\"}","{\"paramType\":\"param\",\"paramId\":\"5\"}","{\"paramType\":\"param\",\"paramId\":\"6\"}","{\"paramType\":\"param\",\"paramId\":\"7\"}"]
* @desc The parameters to show in the shop actor info window.
* See the help section for the number codes to use.
* @parent ===ShopInfoWindow===
*
*
/*
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
* The following values can be used for normal parameters.
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
* The following values can be used for ex parameters (xParams)
*
* 0 --> Hit Rate (HIT)
* 1 --> Evasion Rate (EVA)
* 2 --> Critical Rate (CRI)
* 3 --> Critical Evasion (CEV)
* 4 --> Magic Evasion (MEV)
* 5 --> Magic Reflection (MRF)
* 6 --> Counter Attack (CNT)
* 7 --> HP Regeneration (HRG)
* 8 --> MP Regeneration (MRG)
* 9 --> TP Regeneration (TRG)
* 
* The following values can be used for special parameters (sParams)
*
* 0 --> Target Rate (TGR)
* 1 --> Guard Effect (GRD)
* 2 --> Recovery Effect (REC)
* 3 --> Pharmacology (PHA)
* 4 --> MP Cost Rate (MCR)
* 5 --> TP Charge Rate (TCR)
* 6 --> Physical Damage Rate (PDR)
* 7 --> Magical Damage Rate (MDR)
* 8 --> Floor Damage Rate (FDR)
* 9 --> Experience Rate (EXR)
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
* Version 1.1.1:
* -Bug fix for incorrect function call in the equip core
* -Bug fix for incorrect display of xparam in percent format
* -Move Ex-Param and Sp-Param names into customizable plugin parameters
*
* Version 1.1.0:
* Released updated version that allows XParams and SParams in these menus:
* -EquipCore
* -ClassChangeCore
* -ItemCore
* -ShopMenuCore
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


/*~struct~complexParams:
 * @param paramType
 * @text Parameter Type
 * @type select
 * @option Parameter
 * @value param
 * @option Ex-Parameter
 * @value xparam
 * @option Sp-Parameter
 * @value sparam
 * @desc The type of parameter to display.
 * @default param
 * 
 * @param paramId
 * @text Parameter ID
 * @type number
 * @min 0
 * @max 9
 * @desc The parameter to show.
 * See the help section for the number codes to use.
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
  // Create utility functions to return Ex-Paramaters and Sp-Parameters names.
  //=============================================================================

  Utils.getXParamName = function (paramId) {
    return Parameters.xparamLabels[paramId];
  };

  Utils.getSParamName = function (paramId) {
    return Parameters.sparamLabels[paramId];
  };

  Utils.getParamName = function (paramId, paramType) {
    switch (paramType) {
      case "param":
        return TextManager.param(paramId);
      case "xparam":
        return Utils.getXParamName(paramId);
      case "sparam":
        return Utils.getSParamName(paramId);
    }
  };

  //=============================================================================
  // Create utility functions for Ex-Paramaters and Sp-Parameters values (actors).
  //=============================================================================

  Utils.getXParamValue = function (paramId, actor) {
    if (actor) {
      return Math.round(actor.xparam(paramId) * 100);
    }
  };

  Utils.getSParamValue = function (paramId, actor) {
    if (actor) {
      return Math.round(actor.sparam(paramId) * 100);
    }
  };

  Utils.getParamValue = function (paramId, paramType, actor) {
    switch (paramType) {
      case "param":
        return actor.param(paramId);
      case "xparam":
        return Utils.getXParamValue(paramId, actor);
      case "sparam":
        return Utils.getSParamValue(paramId, actor);
    }
  };

  //=============================================================================
  // Create utility functions for Ex-Paramaters and Sp-Parameters values (items).
  //=============================================================================

  Utils.traitsWithId = function (code, id, traits) {
    return traits.filter(function (trait) {
      return trait.code === code && trait.dataId === id;
    });
  };

  Utils.traitsPi = function (code, id, traits) {
    return this.traitsWithId(code, id, traits).reduce(function (r, trait) {
      return r * trait.value;
    }, 1);
  };

  Utils.getItemParameterValue = function (paramId, paramType, item) {
    if (paramType === "param") {
      return item.params[paramId];
    } else if (paramType === "xparam") {
      let value = Utils.traitsPi(Game_BattlerBase.TRAIT_XPARAM, paramId, item.traits);
      return value !== 1 ? value * 100 : 0;
      //return Utils.traitsPi(Game_BattlerBase.TRAIT_XPARAM, paramId, item.traits) * 100;
    } else if (paramType === "sparam") {
      return Utils.traitsPi(Game_BattlerBase.TRAIT_SPARAM, paramId, item.traits) * 100 - 100;
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
        this._arrowWidth = this.textWidth('\u2192' + ' ');
        var buffer = this.textWidth(' ');
        for (var i = 0; i < Parameters.equipParams.length; i++) {
          var paramId = Parameters.equipParams[i].paramId;
          var paramType = Parameters.equipParams[i].paramType;
          var value1 = this.textWidth(Utils.getParamName(paramId, paramType))
          var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(paramId)));
          this._paramNameWidth = Math.max(value1, this._paramNameWidth);
          this._paramValueWidth = Math.max(value2, this._paramValueWidth);
        }
        this._bonusValueWidth = this._paramValueWidth;
        this._bonusValueWidth += this.textWidth('(+)') + buffer;
        this._paramNameWidth += buffer;
        this._paramValueWidth;
        if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
          this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
      };

      Window_StatCompare.prototype.refresh = function () {
        this.contents.clear();
        if (!this._actor) return;
        for (var i = 0; i < Parameters.equipParams.length; i++) {
          this.drawItem(0, this.lineHeight() * i, Parameters.equipParams[i].paramId, Parameters.equipParams[i].paramType);
        }
      };

      Window_StatCompare.prototype.drawItem = function (x, y, paramId, paramType) {
        this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
        this.drawParamName(y, paramId, paramType);
        this.drawCurrentParam(y, paramId, paramType);
        this.drawRightArrow(y);
        if (!this._tempActor) return;
        this.drawNewParam(y, paramId, paramType);
        this.drawParamDifference(y, paramId, paramType);
      };

      Window_StatCompare.prototype.drawParamName = function (y, paramId, paramType) {
        var x = this.textPadding();
        this.changeTextColor(this.systemColor());
        var paramName = Utils.getParamName(paramId, paramType);
        this.drawText(paramName, x, y, this._paramNameWidth);
      };

      Window_StatCompare.prototype.drawCurrentParam = function (y, paramId, paramType) {
        var x = this.contents.width - this.textPadding();
        x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
        this.resetTextColor();
        var actorparam = Yanfly.Util.toGroup(Utils.getParamValue(paramId, paramType, this._actor));
        if (paramType === "xparam" || paramType === "sparam") {
          actorparam += "%";
        }
        this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
      };

      Window_StatCompare.prototype.drawNewParam = function (y, paramId, paramType) {
        var x = this.contents.width - this.textPadding();
        x -= this._paramValueWidth + this._bonusValueWidth;
        var newValue = Utils.getParamValue(paramId, paramType, this._tempActor);
        var diffvalue = newValue - Utils.getParamValue(paramId, paramType, this._actor);
        var actorparam = Yanfly.Util.toGroup(newValue);
        if (paramType === "xparam" || paramType === "sparam") {
          actorparam += "%";
        }
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
      };


      Window_StatCompare.prototype.drawParamDifference = function (y, paramId, paramType) {
        var x = this.contents.width - this.textPadding();
        x -= this._bonusValueWidth;
        var newValue = Utils.getParamValue(paramId, paramType, this._tempActor);
        var diffvalue = newValue - Utils.getParamValue(paramId, paramType, this._actor);
        if (diffvalue === 0) return;
        var actorparam = Yanfly.Util.toGroup(newValue);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        var text = Yanfly.Util.toGroup(diffvalue);
        if (diffvalue > 0) {
          text = ' (+' + text + ')';
        } else {
          text = ' (' + text + ')';
        }
        this.drawText(text, x, y, this._bonusValueWidth, 'left');
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
          }
          else if (count === 7) {
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
          }
          else if (count === 8) {
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
          }
          else if (count === 9) {
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
      }

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
        this._arrowWidth = this.textWidth('\u2192' + ' ');
        var buffer = this.textWidth(' ');
        for (var i = 0; i < Parameters.classParams.length; i++) {
          var paramId = Parameters.classParams[i].paramId;
          var paramType = Parameters.classParams[i].paramType;
          var value1 = this.textWidth(Utils.getParamName(paramId, paramType))
          var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(paramId)));
          this._paramNameWidth = Math.max(value1, this._paramNameWidth);
          this._paramValueWidth = Math.max(value2, this._paramValueWidth);
        }
        this._bonusValueWidth = this._paramValueWidth;
        this._bonusValueWidth += this.textWidth('(+)') + buffer;
        this._paramNameWidth += buffer;
        this._paramValueWidth;
        if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
          this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
      };

      Window_StatCompare.prototype.refresh = function () {
        this.contents.clear();
        if (!this._actor) return;
        for (var i = 0; i < Parameters.classParams.length; i++) {
          this.drawItem(0, this.lineHeight() * i, Parameters.classParams[i].paramId, Parameters.classParams[i].paramType);
        }
      };

      Window_StatCompare.prototype.drawItem = function (x, y, paramId, paramType) {
        this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
        this.drawParamName(y, paramId, paramType);
        this.drawCurrentParam(y, paramId, paramType);
        this.drawRightArrow(y);
        if (!this._tempActor) return;
        this.drawNewParam(y, paramId, paramType);
        this.drawParamDifference(y, paramId, paramType);
      };

      Window_StatCompare.prototype.drawParamName = function (y, paramId, paramType) {
        var x = this.textPadding();
        this.changeTextColor(this.systemColor());
        var paramName = Utils.getParamName(paramId, paramType);
        this.drawText(paramName, x, y, this._paramNameWidth);
      };

      Window_StatCompare.prototype.drawCurrentParam = function (y, paramId, paramType) {
        var x = this.contents.width - this.textPadding();
        x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
        this.resetTextColor();
        var actorparam = Yanfly.Util.toGroup(Utils.getParamValue(paramId, paramType, this._actor));
        if (paramType === "xparam" || paramType === "sparam") {
          actorparam += "%";
        }
        this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
      };

      Window_StatCompare.prototype.drawNewParam = function (y, paramId, paramType) {
        var x = this.contents.width - this.textPadding();
        x -= this._paramValueWidth + this._bonusValueWidth;
        var newValue = Utils.getParamValue(paramId, paramType, this._tempActor);
        var diffvalue = newValue - Utils.getParamValue(paramId, paramType, this._actor);
        var actorparam = Yanfly.Util.toGroup(newValue);
        if (paramType === "xparam" || paramType === "sparam") {
          actorparam += "%";
        }
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
      };


      Window_StatCompare.prototype.drawParamDifference = function (y, paramId, paramType) {
        var x = this.contents.width - this.textPadding();
        x -= this._bonusValueWidth;
        var newValue = Utils.getParamValue(paramId, paramType, this._tempActor);
        var diffvalue = newValue - Utils.getParamValue(paramId, paramType, this._actor);
        if (diffvalue === 0) return;
        var actorparam = Yanfly.Util.toGroup(newValue);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        var text = Yanfly.Util.toGroup(diffvalue);
        if (diffvalue > 0) {
          text = ' (+' + text + ')';
        } else {
          text = ' (' + text + ')';
        }
        this.drawText(text, x, y, this._bonusValueWidth, 'left');
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
          var paramId = Parameters.itemParams[i].paramId;
          var paramType = Parameters.itemParams[i].paramType;
          rect = this.getRectPosition(rect, i);
          var dx = rect.x + this.textPadding();
          var dw = rect.width - this.textPadding() * 2;
          this.changeTextColor(this.systemColor());
          this.drawText(Utils.getParamName(paramId, paramType), dx, rect.y, dw);
          this.changeTextColor(this.paramchangeTextColor(Utils.getItemParameterValue(paramId, paramType, item)));
          var text = Yanfly.Util.toGroup(Utils.getItemParameterValue(paramId, paramType, item));
          if (paramType === "xparam" || paramType === "sparam") {
            text += "%";
          }
          if (Utils.getItemParameterValue(paramId, paramType, item) >= 0) {
            text = '+' + text;
          }
          if (text === '+0' || text === "+0%") this.changePaintOpacity(false);
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
          var paramId = Parameters.shopItemParams[i].paramId;
          var paramType = Parameters.shopItemParams[i].paramType;
          rect = this.getRectPosition(rect, i);
          var dx = rect.x + this.textPadding();
          var dw = rect.width - this.textPadding() * 2;
          this.changeTextColor(this.systemColor());
          this.drawText(Utils.getParamName(paramId, paramType), dx, rect.y, dw);
          this.changeTextColor(this.paramchangeTextColor(Utils.getItemParameterValue(paramId, paramType, item)));
          var text = Yanfly.Util.toGroup(Utils.getItemParameterValue(paramId, paramType, item));
          if (paramType === "xparam" || paramType === "sparam") {
            text += "%";
          }
          if (Utils.getItemParameterValue(paramId, paramType, item) >= 0) {
            text = '+' + text;
          }
          if (text === '+0' || text === "+0%") this.changePaintOpacity(false);
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
          var paramId = Parameters.shopActorParams[i].paramId;
          var paramType = Parameters.shopActorParams[i].paramType;
          this.changePaintOpacity(true);
          var rect = this.getRectPosition(i);
          rect.x += this.textPadding();
          rect.width -= this.textPadding() * 2;
          this.changeTextColor(this.systemColor());
          var text = Utils.getParamName(paramId, paramType);
          this.drawText(text, rect.x, rect.y, rect.width);
          if (!canEquip) this.drawActorCantEquip(actor, rect);
          if (canEquip) this.drawActorChange(actor, rect, item1, paramId, paramType);
        }
        this.changePaintOpacity(true);
      };

      Window_ShopStatus.prototype.drawActorChange = function (actor, rect, item1, paramId, paramType) {
        var change = Utils.getItemParameterValue(paramId, paramType, this._item);
        change -= (item1 ? Utils.getItemParameterValue(paramId, paramType, item1) : 0);
        this.changePaintOpacity(change !== 0);
        this.changeTextColor(this.paramchangeTextColor(change));
        if (paramType === "param") {
          var text = (change > 0 ? '+' : '') + Yanfly.Util.toGroup(change);
        } else {
          var text = (change >= 0 ? '+' : '') + Yanfly.Util.toGroup(change);
        }
        if (paramType === "xparam" || paramType === "sparam") {
          text += "%";
        }
        this.drawText(text, rect.x, rect.y, rect.width, 'right');
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