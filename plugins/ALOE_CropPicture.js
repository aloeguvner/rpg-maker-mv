"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//=============================================================================
// RPG Maker MV - Crop Picture
// ALOE_CropPicture.js
//=============================================================================
if (typeof Imported !== 'undefined') {
  Imported.ALOE_ConditionalChoices = true;
} else {
  window.Imported = {
    ALOE_ConditionalChoices: true
  };
} //=============================================================================

/*:
* @plugindesc Crop a picture using a plugin command v1.1.1
* @author Aloe Guvner
*
* @param resetCropOnErase
* @text Reset Crop on Erase
* @type boolean
* @desc Resets the crop settings when the picture is erased
* @default true
*
* @help
* 
* =========================================================================
* Background
* =========================================================================
*
* RPG Maker MV does not provide the capability to crop a picture through
* event commands. This plugin provides a plugin command to crop a picture.
* 
* =========================================================================
* Plugin Commands
* =========================================================================
*
* CropPicture [pictureId] [x] [y] [width] [height]
* ex. CropPicture 4 100 40 250 150
* This will crop picture 4 starting at x=100, y=40 and crop leaving 250
* as the width and 150 as the height. The x and y positions are relative
* to the origin of the picture.
*
* CropPicture reset [pictureId]
* ex. CropPicture reset 4
* This will reset the cropping on picture 4.
*
* =========================================================================
* Version History
* =========================================================================
*
* v1.1.0 - January 19 2019:
* --Add plugin command to reset the cropping
* --Add Object.values polyfill for old versions of MV
* v1.0.0 - January 19 2019:
* --Initial Release
*
* =========================================================================
* End of Help Section
* =========================================================================
*/
// =========================================================================
// Create Namespace
// =========================================================================


if (typeof ALOE !== 'undefined') {
  ALOE.CropPicture = {
    Alias: {},
    Parameters: {}
  };
} else {
  window.ALOE = {
    CropPicture: {
      Alias: {},
      Parameters: {}
    }
  };
}

(function () {
  var pluginName = 'ALOE_CropPicture';
  var params = PluginManager.parameters(pluginName);

  if (Object.keys(params).length === 0) {
    console.error("Error reading parameters, ensure that the plugin is named ".concat(pluginName, ".js\n        and it is up to date in the Plugin Manager"));
  }

  ALOE.CropPicture.Parameters.resetCropOnErase = params.resetCropOnErase === 'true';
})(); // =========================================================================
// Game_Picture
// 
// Create property of the Game_Picture and associated methods to hold crop
// information.
// Property is set from the plugin command and read from the sprite.
// =========================================================================


ALOE.CropPicture.Alias.initBasic = Game_Picture.prototype.initBasic;

Game_Picture.prototype.initBasic = function () {
  ALOE.CropPicture.Alias.initBasic.apply(this, arguments);
  this._crop = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  this._resetCrop = false;
};

Game_Picture.prototype.getCrop = function () {
  return this._crop;
};

Game_Picture.prototype.setCrop = function (x, y, width, height) {
  this._crop = {
    x: x,
    y: y,
    width: width,
    height: height
  };
};

Game_Picture.prototype.resetCrop = function (bool) {
  this._resetCrop = bool;
};

Game_Picture.prototype.needsResetCrop = function () {
  return this._resetCrop;
}; // =========================================================================
// Sprite_Picture
//
// Read the crop data from the Game_Picture object and update the sprite frame.
// =========================================================================


ALOE.CropPicture.Alias.update = Sprite_Picture.prototype.update;

Sprite_Picture.prototype.update = function () {
  ALOE.CropPicture.Alias.update.apply(this, arguments);

  if (this.visible) {
    this.updateCrop();
  }
};

Sprite_Picture.prototype.updateCrop = function () {
  var picture = this.picture();

  if (picture.getCrop().width !== 0 && picture.getCrop().height !== 0) {
    this.setFrame.apply(this, _toConsumableArray(Object.values(picture.getCrop())));
    Object.keys(picture.getCrop()).forEach(function (key) {
      return picture.getCrop()[key] = 0;
    });
  }

  if (picture.needsResetCrop()) {
    this.setFrame(0, 0, this.bitmap.baseTexture.width, this.bitmap.baseTexture.height);
    picture.resetCrop(false);
  }
};

if (ALOE.CropPicture.Parameters.resetCropOnErase) {
  // Reset the stage just before the bitmap is destroyed 
  ALOE.CropPicture.Alias.updateBitmap = Sprite_Picture.prototype.updateBitmap;

  Sprite_Picture.prototype.updateBitmap = function () {
    var picture = this.picture();

    if (!picture && this.bitmap && this.bitmap.baseTexture) {
      this.setFrame(0, 0, this.bitmap.baseTexture.width, this.bitmap.baseTexture.height);
    }

    ALOE.CropPicture.Alias.updateBitmap.call(this);
  };
} // =========================================================================
// Game_Interpreter
//
// Create the plugin command to set the crop property on the Game_Picture.
// =========================================================================


ALOE.CropPicture.Alias.pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function (command, args) {
  ALOE.CropPicture.Alias.pluginCommand.call(this, command, args);

  if (command.toLowerCase() === 'croppicture') {
    if (args[0].toLowerCase() === 'reset') {
      var picture = $gameScreen.picture(parseInt(args[1]));

      if (picture) {
        picture.resetCrop(true);
      }
    } else {
      var ints = args.map(function (arg) {
        return parseInt(arg);
      });

      var _picture = $gameScreen.picture(ints[0]);

      if (_picture) {
        _picture.setCrop(ints[1], ints[2], ints[3], ints[4]);
      }
    }
  }
}; // =========================================================================
// Polyfills
//
// Simple polyfills to support older versions of MV.
// =========================================================================


if (!Object.values) {
  Object.values = function (object) {
    return Object.keys(object).map(function (key) {
      return object[key];
    });
  };
}
