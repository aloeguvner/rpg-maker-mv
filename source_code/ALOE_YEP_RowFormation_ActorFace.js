//=============================================================================
// Aloe Guvner - Row Formation Actor Face
// Extension to add an option to show the actor face in the row setup window.
// ALOE_YEP_RowFormation_ActorFace.js
//
// Extends YEP_RowFormation.js
//=============================================================================


//=============================================================================
 /*:
 * @plugindesc Extension to YEP_RowFormation to give an option to show the actor
 * face in the Row Formation setup window.
 * @author Aloe Guvner
 *
 * @param showFace
 * @text Show Actor's Face?
 * @type boolean
 * @default true
 * @desc Show the actor's face in the row setup window?
 * 
 * @param cropFace
 * @text Crop Face?
 * @type boolean
 * @desc Crop the Face Image to the size of the rectangle?
 * @default false
 * 
 * @help
 * 
 * //=============================================================================
 * //Background
 * //=============================================================================
 * 
 * The YEP_RowFormation.js plugin adds a window which allows the player to
 * set up the row formation of their party. By default, this window uses the
 * actor's walking sprite.
 * 
 * In some cases, developers may have plugins that change the default spritesheet
 * for walking characters, causing undesirable effects in this row formation window.
 * 
 * This extension allows the actor's face to be drawn in the row formation window
 * rather than the actor's walking sprite.
 * 
 * //=============================================================================
 * //Terms of Use
 * //=============================================================================
 * 
 * Free for use for commercial or non-commercial games.
 * See credits section for more information.
 * 
 * //=============================================================================
 * //Credits
 * //=============================================================================
 * 
 * None required.
 * This code is made available under the MIT License.
 * 
 * Please refer to the MIT License description.
 * https://opensource.org/licenses/MIT
 * 
 * //=============================================================================
 * //End of Help File
 * //=============================================================================
 */
//=============================================================================

(function() {
    var params = PluginManager.parameters("ALOE_YEP_RowFormation_ActorFace");
    var showFace = params["showFace"] === "true";
    var cropFace = params["cropFace"] === "true";

    var alias_Window_RowFormation_getImage = Window_RowFormation.prototype.getImage;
    Window_RowFormation.prototype.getImage = function(actor) {
        if (showFace) {
            return ImageManager.loadFace(actor.faceName());
        } else {
            return alias_Window_RowFormation_getImage.call(this, actor);
        }
    };

    var alias_Window_RowFormation_drawActorRowPosition = Window_RowFormation.prototype.drawActorRowPosition;

    Window_RowFormation.prototype.drawActorRowPosition = function(actor, index) {
        if (showFace) {
            var img = this.getImage(actor);
            var rect = this.rowRect(index, actor.row());
            var wx = Math.floor(rect.x);
            var wy = Math.floor(rect.y);
            if (cropFace) {
                this.drawActorFace(actor, wx, wy, rect.width, rect.height);
            } else {
                this.drawActorFace(actor, wx, wy);
            }
        } else {
            alias_Window_RowFormation_drawActorRowPosition.call(this, actor, index);
        }
    };

})();