//=============================================================================
// RPG Maker MV - Crop Picture
// ALOE_CropPicture.js
//=============================================================================

if (typeof Imported !== 'undefined') {
    Imported.ALOE_ConditionalChoices = true;
} else {
    window.Imported = {ALOE_ConditionalChoices: true};
}

//=============================================================================
/*:
* @plugindesc Crop a picture using a plugin command
* @author Aloe Guvner
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
* Version History
* =========================================================================
*
* CropPicture [pictureId] [x] [y] [width] [height]
* ex. CropPicture 4 100 40 250 150
* This would crop picture 4 starting at x=100, y=40 and crop leaving 250
* as the width and 150 as the height. The x and y positions are relative
* to the origin of the picture.
* =========================================================================
* Version History
* =========================================================================
*
* v1.0.0 - January 19 2019:
* --Initial Release
*
* =========================================================================
* End of Help Section
* =========================================================================
*/

if (typeof ALOE !== 'undefined') {
    ALOE.CropPicture = {Alias: {}};
} else {
    window.ALOE = {CropPicture: {Alias: {}}};
}

ALOE.CropPicture.Alias.initBasic = Game_Picture.prototype.initBasic;
Game_Picture.prototype.initBasic = function() {
    ALOE.CropPicture.Alias.initBasic.apply(this, arguments);
    this._crop = {x: 0, y: 0, width: 0, height: 0};
};

Game_Picture.prototype.getCrop = function() {
    return this._crop;
};

// params is {x: int, y: int, width: int, height: int}
Game_Picture.prototype.setCrop = function(x, y, width, height) {
    this._crop = { x, y, width, height };
};

ALOE.CropPicture.Alias.update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function() {
    ALOE.CropPicture.Alias.update.apply(this, arguments);
    if (this.visible) {
        this.updateCrop();
    }
};

Sprite_Picture.prototype.updateCrop = function() {
    const picture = this.picture();
    if (picture.getCrop().width !== 0 && picture.getCrop().height !== 0) {
        this.setFrame(...Object.values(picture.getCrop()));
        Object.keys(picture.getCrop()).forEach(key => picture.getCrop()[key] = 0);
    }
};

ALOE.CropPicture.Alias.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    ALOE.CropPicture.Alias.pluginCommand.call(this, command, args);
    if (command.toLowerCase() === 'croppicture') {
        const ints = args.map(arg => parseInt(arg));
        const picture = $gameScreen.picture(ints[0]);
        if (picture) { picture.setCrop(ints[1], ints[2], ints[3], ints[4]); }
    }
};