//=============================================================================
// Aloe Guvner - Player Notepad
// ALOE_PlayerNotepad.js
//=============================================================================

var Imported = Imported || {};
Imported.ALOE_PlayerNotepad = true;

var ALOE = ALOE || {};
ALOE.Alias = ALOE.Alias || {};
ALOE.PlayerNotepad = {};
ALOE.PlayerNotepad.version = '1.1.0';

//=============================================================================

 /*:
 * @plugindesc v1.2.0 Creates a new scene where players can record notes
 * in a notepad using their keyboard.
 * @author Aloe Guvner
 *
 * @param ---Input Configuration---
 * @default
 * 
 * @param testmode
 * @text Activate Test Mode?
 * @type boolean
 * @default false
 * @on YES
 * @off NO
 * @desc Displays the Key Code in the console every key press.
 * Press F8 to open the console in a playtest.
 * @parent ---Input Configuration---
 * 
 * 
 * @param inputcodes
 * @text Input Codes
 * @type struct<InputCodes>[]
 * @desc Configures the key codes that can be typed.
 * The Key Code is paired with character values.
 * @default ["{\"k\":\"65\",\"c\":\"a\",\"s\":\"A\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"66\",\"c\":\"b\",\"s\":\"B\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"67\",\"c\":\"c\",\"s\":\"C\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"68\",\"c\":\"d\",\"s\":\"D\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"69\",\"c\":\"e\",\"s\":\"E\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"70\",\"c\":\"f\",\"s\":\"F\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"71\",\"c\":\"g\",\"s\":\"G\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"72\",\"c\":\"h\",\"s\":\"H\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"73\",\"c\":\"i\",\"s\":\"I\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"74\",\"c\":\"j\",\"s\":\"J\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"75\",\"c\":\"k\",\"s\":\"K\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"76\",\"c\":\"l\",\"s\":\"L\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"77\",\"c\":\"m\",\"s\":\"M\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"78\",\"c\":\"n\",\"s\":\"N\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"79\",\"c\":\"o\",\"s\":\"O\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"80\",\"c\":\"p\",\"s\":\"P\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"81\",\"c\":\"q\",\"s\":\"Q\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"82\",\"c\":\"r\",\"s\":\"R\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"83\",\"c\":\"s\",\"s\":\"S\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"84\",\"c\":\"t\",\"s\":\"T\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"85\",\"c\":\"u\",\"s\":\"U\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"86\",\"c\":\"v\",\"s\":\"V\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"87\",\"c\":\"w\",\"s\":\"W\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"88\",\"c\":\"x\",\"s\":\"X\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"89\",\"c\":\"y\",\"s\":\"Y\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"90\",\"c\":\"z\",\"s\":\"Z\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"48\",\"c\":\"0\",\"s\":\")\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"49\",\"c\":\"1\",\"s\":\"!\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"50\",\"c\":\"2\",\"s\":\"\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"51\",\"c\":\"3\",\"s\":\"#\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"52\",\"c\":\"4\",\"s\":\"$\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"53\",\"c\":\"5\",\"s\":\"%\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"54\",\"c\":\"6\",\"s\":\"^\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"55\",\"c\":\"7\",\"s\":\"&\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"56\",\"c\":\"8\",\"s\":\"*\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"57\",\"c\":\"9\",\"s\":\"(\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"186\",\"c\":\";\",\"s\":\":\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"187\",\"c\":\"=\",\"s\":\"+\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"188\",\"c\":\",\",\"s\":\"<\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"189\",\"c\":\"-\",\"s\":\"_\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"190\",\"c\":\".\",\"s\":\">\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"191\",\"c\":\"/\",\"s\":\"?\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"192\",\"c\":\"`\",\"s\":\"~\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"219\",\"c\":\"[\",\"s\":\"{\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"220\",\"c\":\"\\\\\",\"s\":\"|\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"221\",\"c\":\"]\",\"s\":\"}\",\"a\":\"\",\"sa\":\"\"}","{\"k\":\"222\",\"c\":\"'\",\"s\":\"\\\"\",\"a\":\"\",\"sa\":\"\"}"]
 * 
 * @param ---Title Settings---
 * @default
 * 
 * @param maxTitleLength
 * @text Max Title Length
 * @type number
 * @parent ---Title Settings---
 * @desc Maximum number of characters for the title.
 * @default 35
 * 
 * @param ---Text Commands---
 * @default
 * 
 * @param newNote
 * @text New Note
 * @type text
 * @parent ---Text Commands---
 * @desc This command appears in the main command window for the player
 * to create a new note.
 * @default New Note
 * 
 * @param saveNote
 * @text Save Note
 * @type text
 * @parent ---Text Commands---
 * @desc This command appears in a window when the player finishes
 * modifying a note. This command will saves changes.
 * @default Save Note
 * 
 * @param discardChanges
 * @text Discard Changes
 * @type text
 * @parent ---Text Commands---
 * @desc This command appears in a window when the player finishes
 * modifying a note. This command discards changes.
 * @default Discard Changes
 * 
 * @param modifyNote
 * @text Modify Note
 * @type text
 * @parent ---Text Commands---
 * @desc This command appears in a window when the player selects a
 * note to modify.
 * @default Modify Note
 * 
 * @param deleteNote
 * @text Delete Note
 * @type text
 * @parent ---Text Commands---
 * @desc This command appears in a window when the player selects a
 * note to delete.
 * @default Delete Note
 * 
 * @param ---Color Settings---
 * @default
 * 
 * @param newNoteColor
 * @text New Note Color
 * @type number
 * @parent ---Color Settings---
 * @min 0
 * @max 31
 * @desc The color ID for the New Note command.
 * Range from 0 - 31 and corresponds to the windowskin color.
 * @default 0
 * 
 * @param saveNoteColor
 * @text Save Note Color
 * @type number
 * @parent ---Color Settings---
 * @min 0
 * @max 31
 * @desc The color ID for the Save Note command.
 * Range from 0 - 31 and corresponds to the windowskin color.
 * @default 0
 * 
 * @param discardChangesColor
 * @text Discard Changes Color
 * @type number
 * @parent ---Color Settings---
 * @min 0
 * @max 31
 * @desc The color ID for the Discard Changes command.
 * Range from 0 - 31 and corresponds to the windowskin color.
 * @default 0
 * 
 * @param modifyNoteColor
 * @text Modify Note Color
 * @type number
 * @parent ---Color Settings---
 * @min 0
 * @max 31
 * @desc The color ID for the Modify Note command.
 * Range from 0 - 31 and corresponds to the windowskin color.
 * @default 0
 * 
 * @param deleteNoteColor
 * @text Delete Note Color
 * @type number
 * @parent ---Color Settings---
 * @min 0
 * @max 31
 * @desc The color ID for the Delete Note command.
 * Range from 0 - 31 and corresponds to the windowskin color.
 * @default 0
 * 
 * @param ---Help Window Instructions---
 * @default 
 * 
 * @param titleInstructions
 * @text Title Instructions
 * @type text
 * @parent ---Help Window Instructions---
 * @desc These instructions appear in the help window when
 * modifying the note title. Use \n for a line break.
 * @default Press ENTER to continue.\nPress ESC to exit without saving.
 * 
 * @param detailsInstructions
 * @text Details Instructions
 * @type text
 * @parent ---Help Window Instructions---
 * @desc These instructions appear in the help window when
 * modifying the note details. Use \n for a line break.
 * @default Press ESC when finished.
 *
 * @param ---Main Menu Integration---
 * @default
 * 
 * @param addToMenu
 * @text Add to main menu?
 * @type boolean
 * @parent ---Main Menu Integration---
 * @desc Controls if the notepad command is added to the main
 * menu. The command is added before the options command.
 * @default true
 * 
 * @param menuCommandName
 * @text Menu Command Name
 * @type text
 * @parent ---Main Menu Integration---
 * @desc The name of the command that will show in the main menu.
 * @default Notepad
 *  
 * @param switchForVisible
 * @text Switch ID# visible
 * @type switch
 * @parent ---Main Menu Integration---
 * @desc Set to the ID# of a Game Switch to toggle if the notepad
 * command is visible in the menu. Leave zero to not use.
 * @default 0
 * 
 * @param switchForEnabled
 * @text Switch ID# enabled
 * @type switch
 * @parent ---Main Menu Integration---
 * @desc Set to the ID# of a Game Switch to toggle if the notepad
 * command is enabled in the menu. Leave zero to not use.
 * @default 0
 * 
 * @param ---Visual Parameters---
 * @default
 * 
 * @param showCursor
 * @text Show Cursor?
 * @type boolean
 * @parent ---Visual Parameters---
 * @desc True/False whether to show the text cursor.
 * @default true
 * 
 * @param cursorBlinkRate
 * @text Cursor Blink Rate
 * @type number
 * @parent ---Visual Parameters---
 * @desc The number of frames for each cursor blink.
 * @default 45
 * 
 * @param cursorOffset
 * @text Cursor Offset
 * @type number
 * @parent ---Visual Parameters---
 * @desc The number of pixels to offset the cursor.
 * Adjust depending on the game's font.
 * @default -5
 * @max 100
 * @min -100
 * 
 * @param fadeLockedText
 * @text Fade Locked Text?
 * @type boolean
 * @parent ---Visual Parameters---
 * @desc Fades the text of the title and/or details
 * if it is locked from modifying.
 * @default true
 * 
 * @param startingNotes
 * @text Starting Notes
 * @type struct<StartingNotes>[]
 * @desc Notes can be defined in this parameter that will be
 * automatically added in a new game.
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a new scene where the player can create, modify, and delete
 * notes.
 *
 * ============================================================================
 * Plugin Configuration
 * ============================================================================
 * 
 * This plugin is configured by default for a standard English QWERTY keyboard.
 * The parameter that controls the input contains:
 *  1. The unique Key Code of the key (for example, 'a' is 65)
 *  2. The character to type when the Key Code is pressed
 *  3. The character to type when the Key Code is pressed and Shift is pressed.
 *  4. The character to type when the Key Code is pressed and Alt is pressed.
 *  5. The character to type when the Key Code is pressed and Shift + Alt 
 *     is pressed.
 * 
 * 
 * If the English QWERTY keyboard is used, no changes are required except to
 * add the (at) symbol for the 'shifted' version of the number 2. The reason is
 * that the editor does not allow the (at) symbol to be in the default values of
 * parameters. In fact, the (at) symbol cannot even be used in the help section.
 * 
 * For keyboards that do not follow the English QWERTY format (such as 
 * AZERTY or QWERTZ keyboards), the plugin parameter can be changed to match
 * those keyboards.
 * A test mode is included to identify the proper Key Code for each key.
 * Enable the test mode through the plugin parameter and open the console
 * in a playtest by pressing F8. Each Key Code will be displayed there when
 * the key is pressed.
 * 
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * The notepad may be opened by plugin command, script call, or main menu. 
 * The script call can be used in another plugin or in an event, and the plugin
 * command can be used within an event.
 * 
 * The script call to open the notepad scene is:
 * SceneManager.push(Scene_Notepad);
 * 
 * The plugin call is described in its own section below.
 * 
 * This plugin includes native integration with the main menu to add a notepad
 * command to open the notepad scene. Plugin parameters exist to allow the 
 * developer to customize or disable this functionality.
 * 
 * To integrate this plugin with the Yanfly Main Menu Manager, be sure to disable
 * the included main menu integration from this plugin's parameters. In the 
 * Yanfly plugin use the following example parameters.
 * 
 * Menu X Name:
 * Notepad   (suggestion)
 *
 * Menu X Symbol:
 * notepad   (suggestion)
 *
 * Menu X Main Bind:
 * this.commandNotepad.bind(this)
 * 
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * The plugin commands available in this plugin are described below. The syntax
 * for the commands is preceded by the <> symbols. These symbols are only for
 * formatting purposes and are not actually part of the plugin commands.
 * Plugin commands are not case-sensitive.
 * 
 * =====Open Notepad Scene=====
 * 
 * The following plugin command will open the notepad scene:
 *    <>notepad open
 * 
 * =====Staging Note Data for Adding and Modifying=====
 * 
 * The following plugin commands can be used in combination to add or modify
 * notes. The staged data will be processed when the 'add' or 'modify' plugin
 * commands are used.
 * 
 * To stage the title for adding/modifying, use the following plugin command.
 * The title is a mandatory field for adding a new note.
 *    <>notepad stage title [title]
 * 
 * To stage the details for adding/modifying, use the following plugin command.
 * Line breaks can be added by using the \n character.
 *    <>notepad stage details [details]
 * 
 * To stage the key for adding/modifying, use the following plugin command.
 * The key is a mandatory field if you need to modify/delete the note later.
 *    <>notepad stage key [key]
 * 
 * To set the note to be locked (both title and details not modifiable), use
 * the following plugin command. The default value is false; it is not 
 * necessary to use this plugin command unless the desired value is true.
 *    <>notepad stage bothlocked [boolean]
 * 
 * To set the note title to be locked use the following plugin command. 
 * The default value is false; it is not necessary to use this plugin command
 * unless the desired value is true.
 *    <>notepad stage titlelocked [boolean]
 * 
 * To set the note details to be locked use the following plugin command. 
 * The default value is false; it is not necessary to use this plugin command
 * unless the desired value is true.
 *    <>notepad stage detailslocked [boolean]
 * 
 * To add/modify the note, use the following plugin command. If the key does
 * not already exist, or the key is left blank, then a new note is added.
 * If the key already exists, then the existing note that matches that key
 * is modified.
 * 
 *    <>notepad stage add
 * 
 * To modify the note by appending text to the title or details, use the
 * following plugin command. For this command, the key must exist otherwise
 * nothing will happen.
 * 
 *    <>notepad stage append
 * 
 * 
 * Example Add.
 * The following example plugin commands creates a new note with a key of "alchemy", title and
 * details as below, and with the title locked from modifying.
 * 
 *    <>notepad stage title Alchemy Recipes
 *    <>notepad stage details -Potion + Stimulant = Super Potion\nHerb + Poison Fang = Antidote
 *    <>notepad stage key alchemy
 *    <>notepad stage titlelocked true
 *    <>notepad stage add
 * 
 * Example Modify.
 * The following example plugin commands will locate an already existing note with a key of
 * "password", replace the details with "Blue Door: 33121", and lock the details from modifying.
 * 
 *    <>notepad stage details Blue Door: 33121
 *    <>notepad stage key password
 *    <>notepad stage detailslocked true
 *    <>notepad stage add
 * 
 * Example Append.
 * The following example plugin commands will locate an already existing note with a key of
 * "crime_clues", and append the details with "Fingerprint found on the handle"
 * 
 *    <>notepad stage details Fingerprint found on the handle
 *    <>notepad stage key crime_clues
 *    <>notepad stage append
 * 
 * =====Locking Individual Notes=====
 * 
 * The following plugin command will lock an existing note from modifying the
 * title of the given [key].
 * 
 *    <>notepad lock title [key]
 * 
 * The following plugin command will lock an existing note from modifying the 
 * details of the given [key].
 * 
 *    <>notepad lock details [key]
 * 
 * The following plugin command will lock an existing note from modifying both 
 * title and details of the given [key].
 * 
 *    <>notepad lock both [key]
 * 
 * The following plugin command will lock an existing note from being deleted.
 * 
 *    <>notepad lock delete [key]
 * 
 * Examples:
 *    <>notepad lock title alchemy
 *    <>notepad lock details crimenotes
 *    <>notepad lock both puzzlesolutions
 *    <>notepad lock delete instructions
 * 
 * =====Unlocking Individual Notes=====
 * 
 * The following plugin command will unlock an existing note for modifying 
 * the title of the given [key].
 * 
 *    <>notepad unlock title [key]
 * 
 * The following plugin command will unlock an existing note for modifying 
 * the details of the given [key].
 * 
 *    <>notepad unlock details [key]
 * 
 * The following plugin command will unlock an existing note for modifying
 * both title and details of the given [key].
 * 
 *    <>notepad unlock both [key]
 * 
 * The following plugin command will unlock an existing note for deleting.
 * 
 *    <>notepad unlock delete [key]
 * 
 * Examples:
 *    <>notepad unlock title alchemy
 *    <>notepad unlock details crimenotes
 *    <>notepad unlock both puzzlesolutions
 *    <>notepad unlock delete instructions
 * 
 * =====Deleting Notes (Individual and Collective)=====
 * 
 * The following plugin command will delete an existing note. The [key] to uniquely
 * identify the note must be specified:
 *    <>notepad delete key [key]
 * 
 * The following plugin command will delete all existing notes:
 *    <>notepad delete all
 * 
 * =====Disabling Features=====
 * 
 * The following plugin command will disable the player from adding new notes:
 *    <>notepad disable new
 * 
 * The following plugin command will disable the player from modifying notes:
 *    <>notepad disable modify
 * 
 * The following plugin command will disable the player from deleting notes:
 *    <>notepad disable delete
 * 
 * 
 * =====Enabling Features=====
 * 
 * The following plugin command will enable the player from adding new notes:
 *    <>notepad enable new
 * 
 * The following plugin command will enable the player from modifying notes:
 *    <>notepad enable modify
 * 
 * The following plugin command will enable the player from deleting notes:
 *    <>notepad enable delete
 * 
 * =====Hide / Show Notes=====
 * 
 * The following plugin command will hide a note from the player.
 * The note is not deleted, it is simply hidden from the player's view.
 * 
 *    <>notepad hide [key]
 * 
 * The following plugin command will show a note to the player.
 * This will reveal a note that was previously hidden.
 * 
 *    <>notepad show [key]
 * 
 * =====Searching in Notes=====
 * 
 * The following plugin commands allow the developer to search through
 * existing notes for a specific string. The search is not case sensitive,
 * so any result (upper or lower case) that matches is returned.
 * 
 *    <>notepad search [v] titles for [string]
 *    <>notepad search [v] key [key] for [string]
 *    <>notepad search [v] details for [string]
 * 
 * [v] --> Game Variable ID to store the string in, if found.
 * If not found, this will be set to an empty string. This can also be used for
 * a true/false test, because an empty string is a falsy value.
 * 
 * [string] --> What you would like to search for.
 * 
 * [key] --> Unique key of a note, if you want to search a specific note.
 * 
 * Examples:
 *    <>notepad search 19 titles for Once upon a time...
 *    <>notepad search 20 key recipes for Super Potion
 *    <>notepad search 18 details for Shaken, not Stirred.
 * 
 * $gameVariables.value(19) will contain the string "Once upon a time..." if found.
 * $gameVariables.value(20) will contain the string "Super Potion" if found.
 * $gameVariables.value(18) will contain the string "Shaken, not Stirred" if found.
 * 
 * If any of these strings are not found, the value in the game variable is set to 0.
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 * 
 * $gameNotepad.deleteNoteByKey(key)
 * -- Deletes a note with the given key.
 * --- key: unique key of the note
 * 
 * $gameNotepad.deleteAllNotes()
 * -- Deletes all notes
 * 
 * $gameNotepad.modifyNoteByKey(key, title, details, titleLocked, detailsLocked, deleteLocked, hidden)
 * -- Modifies a note with the given key
 * --- key: unique key of the note
 * --- title: title of the note
 * --- details: details of the note
 * --- titleLocked: whether the title is locked from being edited
 * --- detailsLocked: whether the details are locked from being edited
 * --- deleteLocked: whether the note is locked from being deleted
 * --- hidden: whether the note is hidden in the notepad
 * 
 * $gameNotepad.appendNoteByKey(key, title, details)
 * -- Appends to a note with the given key
 * --- key: unique key of the note
 * --- title: text to append to the existing title
 * --- details: details to append to the existing details
 * 
 * $gameNotepad.addNote(title, details, key, titleLocked, detailsLocked, deleteLocked, hidden)
 * -- Adds a new note to the notepad
 * --- title: title of the note
 * --- details: details of the note
 * --- key: unique key of the note
 * --- titleLocked: whether the title is locked from being edited
 * --- detailsLocked: whether the details are locked from being edited
 * --- deleteLocked: whether the note is locked from being deleted
 * --- hidden: whether the note is hidden in the notepad
 * 
 * $gameNotepad.lockTitle(key)
 * -- Locks the title of a note with the given key
 * --- key: unique key of the note
 * 
 * $gameNotepad.lockDetails(key)
 * -- Locks the details of a note with the given key
 * --- key: unique key of the note
 * 
 * $gameNotepad.lockDelete(key)
 * -- Locks a note with the given key from being deleted
 * --- key: unique key of the note
 * 
 * $gameNotepad.unlockTitle(key)
 * -- Unlocks the title of a note with the given key
 * --- key: unique key of the note
 * 
 * $gameNotepad.unlockDetails(key)
 * -- Unlocks the details of a note with the given key
 * --- key: unique key of the note
 * 
 * $gameNotepad.unlockDelete(key)
 * -- Unlocks a note with the given key from being deleted
 * --- key: unique key of the note
 * 
 * $gameNotepad.hide(key)
 * -- Hides a note with the given key
 * --- key: unique key of the note
 * 
 * $gameNotepad.show(key)
 * -- Unhides a note with the given key
 * ---key: unique key of the note
 * 
 * $gameNotepad.disableFeature(feature)
 * -- Disables the given feature of the notepad
 * --- feature: new, modify, or delete
 * 
 * $gameNotepad.enableFeature(feature)
 * -- Enables the given feature of the notepad
 * --- feature: new, modify, or delete
 * 
 * $gameNotepad.searchTitles(term, variableId)
 * -- Searches through the notes for a title containing the term
 * --- term: the term/words/characters to look for
 * --- variableId: the title is saved to this variable if found
 * 
 * $gameNotepad.searchDetails(term, variableId)
 * -- Searches through the notes for a details containing the term
 * --- term: the term/words/characters to look for
 * --- variableId: the title is saved to this variable if found
 * 
 * $gameNotepad.searchKey(key, term, variableId)
 * -- Searches through a specific note to see if it contains the term
 * --- key: the unique key of the note to search
 * --- term: the term/words/characters to look for
 * --- variableId: the title/details is saved to this variable if found
 * 
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * Version 1.2.0:
 * - Add plugin command and function to append to notes rather than replacing
 *   their contents.
 * - Fix the help section so all of it shows in the Plugin Manager.
 * Version 1.1.0:
 * - Change version schema to Semantic Versioning
 * - Add ability to configure "alt" characters for additional flexibility
 *   for non-English keyboards.
 * Version 1.02:
 * - Characters to type are now configurable in the plugin parameters and
 *   are no longer hard-coded to an English QWERTY keyboard.
 * Version 1.01:
 * - Fixed a bug where the cursor was not in the correct position for certain
 *   fonts.
 * - Added a parameter to offset the cursor, can be used to adjust the cursor
 *   to look good with any font.
 * - Added proper scrolling to the left/right keys at the beginning/end of the
 *   lines.
 * - Modulated/cleaned code in various methods.
 * Version 1.00:
 * - Initial release
 */

  /*~struct~StartingNotes:
 * @param title
 * @text Title
 * @type text
 * @desc Title of the note.
 * 
 * @param details
 * @text Details
 * @type note
 * @desc Details of the note.
 * 
 * @param key
 * @text Key
 * @type text
 * @desc Key of the note.
 * The key is a single word that uniquely identifies a note.
 * 
 * @param titleLocked
 * @text Title Locked?
 * @type boolean
 * @desc Determines whether the title of this note is locked by default.
 * Locked means that it cannot be modified.
 * @default false
 * 
 * @param detailsLocked
 * @text Details Locked?
 * @type boolean
 * @desc Determines whether the details of this note are locked by default.
 * Locked means that it cannot be modified.
 * @default false
 * 
 * @param deleteLocked
 * @text Delete Locked
 * @type boolean
 * @desc Determines whether the note is locked from being deleted.
 * Locked means that it cannot be deleted.
 * @default false
 * 
 * @param hidden
 * @text Hidden
 * @type boolean
 * @desc Determines whether the note is hidden at the start.
 * Hidden means it is not shown to the player.
 * @default false
 */

  /*~struct~InputCodes:
 * @param k
 * @text Key Code
 * @type text
 * @desc Unique code corresponding to the key press.
 * Sometimes known as the ASCII key code.
 * 
 * @param c
 * @text Character
 * @type text
 * @desc The text to draw if the Key Code is pressed.
 * 
 * @param s
 * @text Shifted character
 * @type text
 * @desc The text to draw if the Key Code is pressed while SHIFT
 * is pressed
 * 
 * @param a
 * @text Alted character
 * @type text
 * @desc The text to draw if the Key Code is pressed while
 * ALT is pressed
 * 
 * @param sa
 * @text Shifted Alted Character
 * @type text
 * @desc The text to draw if the Key Code is pressed while
 * SHIFT and ALT are pressed
 * 
 */

//=============================================================================

//=============================================================================
// Utility Functions
//
//=============================================================================
// recursiveParse:
// Due to the way that the editor stringifies object/array parameters, 
// JSON.parse must be called recursively on these parameters.
//=============================================================================

//Syntax & inspiration from DK Plugins & SRD
//The editor does not stringify complex parameters in JSON format.
//Instead, it stringifies it in layers. This means that we have to
//parse it recursively.

ALOE.recursiveParse = function(param) {
    try {
        return JSON.parse(param, function(key, value) {
            try {
                //if it can still be parsed, keep going
                return this.recursiveParse(value);
            } catch (e) {
                //when it can't be parsed anymore, return it
                return value;
            }
        }.bind(this));
    } catch (e) { //non bool/num strings error immediately so return
        return param;
    }
};

//=============================================================================
// Parameters
//=============================================================================
// Grab all parameters from the Plugin Manager and parse to automatically
// convert data types (i.e. "true" --> true ; "12" --> 12)
//=============================================================================

ALOE.PlayerNotepad.params = {};
(function() {
    var params = PluginManager.parameters("ALOE_PlayerNotepad");
    var keys = Object.keys(params);
    var length = keys.length;
    for (var i = 0; i < length; i++) {
        ALOE.PlayerNotepad.params[keys[i]] = ALOE.recursiveParse(params[keys[i]]);
    }
})();

if(ALOE.PlayerNotepad.params.startingNotes) {
    ALOE.PlayerNotepad.params.startingNotes.forEach(function(a){
        a.title = [a.title]; 
        a.details = a.details.split("\n");
    });
}

//=============================================================================
// Data Setup
//=============================================================================
// Define the global variable and alias the DataManager methods for creating,
// saving, and loading game objects.
//=============================================================================

let $gameNotepad = null;

ALOE.Alias.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    ALOE.Alias.DataManager_createGameObjects.call(this);
    $gameNotepad = new Game_Notepad();
    if(ALOE.PlayerNotepad.params.startingNotes) {
        ALOE.PlayerNotepad.params.startingNotes.forEach(function(a){
                a.id = $gameNotepad.nextId();
                $gameNotepad._data.push(a);
        });
    }
};

ALOE.Alias.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = ALOE.Alias.DataManager_makeSaveContents.call(this);
    contents.gameNotepad = $gameNotepad;
    return contents;
};

ALOE.Alias.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
    ALOE.Alias.DataManager_extractSaveContents.call(this, contents);
    if (contents.gameNotepad) {$gameNotepad = contents.gameNotepad;}
};

//=============================================================================
// Game_Notepad
//=============================================================================
// Define a new class for the notepad and the methods of the prototype.
//=============================================================================

function Game_Notepad() {
    this._data = [];
    this._stage = {title: [""], details: [""], key: "", 
            titleLocked: false, detailsLocked: false,
            deleteLocked: false, hidden: false};
    this._features = {new: true, modify: true, delete: true};
}

Game_Notepad.prototype.note = function(index) {
    return this._data[index];
};

Game_Notepad.prototype.titleById = function(id) {
    for(var i = 0; i < this.allNotes().length; i++) {
        if(this.allNotes()[i].id == id) {
            return this.allNotes()[i].title;
        }
    }
    return [""];
};

Game_Notepad.prototype.detailsById = function(id) {
    for(var i = 0; i < this.allNotes().length; i++) {
        if(this.allNotes()[i].id == id) {
            return this.allNotes()[i].details;
        }
    }
    return [""];
};

Game_Notepad.prototype.allNotes = function() {
    return this._data.filter(function(a) {return a;});
};

Game_Notepad.prototype.nextId = function() {
    if(this._data.length) {
        return this._data[this._data.length - 1].id + 1;
    }
    return 1;
};

Game_Notepad.prototype.keyExists = function(key) {
    return this.allNotes().map(function(a){return a.key;}).indexOf(key) >= 0;
};

Game_Notepad.prototype.getIdByKey = function(key) {
    var index =  this.allNotes().map(function(a){return a.key;}).indexOf(key);
    return this.note(index).id;
};

Game_Notepad.prototype.addNote = function(title, details, key, titleLocked,
     detailsLocked, deleteLocked, hidden) {
    title = title || [""];
    details = details || [""];
    key = key || "";
    titleLocked = titleLocked || false;
    detailsLocked = detailsLocked || false;
    deleteLocked = deleteLocked || false;
    hidden = hidden || false;
    this._data.push({id: this.nextId(), title: title, details: details, key: key, hidden: hidden,
        titleLocked: titleLocked, detailsLocked: detailsLocked, deleteLocked: deleteLocked});
};

Game_Notepad.prototype.modifyNoteById = function(id, title, details) {
    var index = this.allNotes().map(function(a){return a.id;}).indexOf(id);
    this._data[index].title = title || this.titleById(id);
    this._data[index].details = details || this.detailsById(id);
};

Game_Notepad.prototype.modifyNoteByKey = function(key, title, details, titleLocked,
     detailsLocked, deleteLocked, hidden) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    this._data[index].title = title || this.titleById(id);
    this._data[index].details = details !== undefined ? details : this.detailsById(id);
    this._data[index].titleLocked = titleLocked !== undefined ? titleLocked : this._data[index].titleLocked;
    this._data[index].detailsLocked = detailsLocked !== undefined ? detailsLocked : this._data[index].detailsLocked;
    this._data[index].deleteLocked = deleteLocked !== undefined ? deleteLocked : this._data[index].deleteLocked;
    this._data[index].hidden = hidden !== undefined ? hidden : this._data[index].hidden;
};

Game_Notepad.prototype.appendNoteByKey = function(key, title, details) {
    var index = this.allNotes().map(function(note){return note.key;}).indexOf(key);
    if (title) {this._data[index].title[0] += title;}
    if (details) {this._data[index].details = this._data[index].details.concat(details);}
};

Game_Notepad.prototype.deleteNoteById = function(id) {
    id = parseInt(id);
    var index = this.allNotes().map(function(a){return a.id;}).indexOf(id);
    this._data.splice(index, 1);
};

Game_Notepad.prototype.deleteNoteByKey = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this._data.splice(index, 1);
    }
};

Game_Notepad.prototype.deleteAllNotes = function() {
    this._data = [];
};

Game_Notepad.prototype.lockTitle = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).titleLocked = true;
    }
};

Game_Notepad.prototype.unlockTitle = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).titleLocked = false;
    }
};

Game_Notepad.prototype.lockDetails = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).detailsLocked = true;
    }
};

Game_Notepad.prototype.unlockDetails = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).detailsLocked = false;
    }
};

Game_Notepad.prototype.lockDelete = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).deleteLocked = true;
    }
};

Game_Notepad.prototype.unlockDelete = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).deleteLocked = false;
    }
};

Game_Notepad.prototype.enableFeature = function(feature) {
    this._features[feature] = true;
};

Game_Notepad.prototype.disableFeature = function(feature) {
    this._features[feature] = false;
};

Game_Notepad.prototype.setStage = function(type, value) {
    switch (type.toLowerCase()) {
        case "title":
            this._stage.title = value;
            break;
        case "details":
            this._stage.details = value;
            break;
        case "key":
            this._stage.key = value;
            break;
        case "titlelocked":
            this._stage.titleLocked = value;
            break;
        case "detailslocked":
            this._stage.detailsLocked = value;
            break;
        case "deletelocked":
            this._stage.deleteLocked = value;
            break;
        case "hidden":
            this._stage.hidden = value;
            break;
        default:
            break;
    }
};

Game_Notepad.prototype.getStage = function(type) {
    switch (type.toLowerCase()) {
        case "title":
            return this._stage.title;
        case "details":
            return this._stage.details;
        case "key":
            return this._stage.key;
        case "titlelocked":
            return this._stage.titleLocked;
        case "detailslocked":
            return this._stage.detailsLocked;
        case "deletelocked":
            return this._stage.deleteLocked;
        case "hidden":
            return this._stage.hidden;
        default:
            break;
    }
};

Game_Notepad.prototype.clearStage = function() {
    this._stage = {title: [""], details: [""], key: "", 
    titleLocked: false, detailsLocked: false, deleteLocked: false, hidden: false};
};

Game_Notepad.prototype.searchTitles = function(term, variableId) {
    var regExp = new RegExp(term, "i");
    var title = "";
    var match;
    for (var i = 0; i < $gameNotepad.allNotes().length; i++) {
        title = $gameNotepad.allNotes()[i].title[0];
        match = title.match(regExp);
        if(match) {
            break;
        }
    }
    if(match) {
        $gameVariables.setValue(variableId, match[0]);
    } else {
        $gameVariables.setValue(variableId, 0);
    }
};

Game_Notepad.prototype.searchKey = function(key, term, variableId) {
    var regExp = new RegExp(term, "i");
    var id = $gameNotepad.getIdByKey(key);
    var title = $gameNotepad.titleById(id)[0];
    var match = title.match(regExp);
    if(match) {
        $gameVariables.setValue(variableId, match[0]);
    } else {
        var details = $gameNotepad.detailsById(id).join("");
        match = details.match(regExp);
        if(match) {
            $gameVariables.setValue(variableId, match[0]);
        } else {
            $gameVariables.setValue(variableId, 0);
        }
    }
};

Game_Notepad.prototype.searchDetails = function(term, variableId) {
    var regExp = new RegExp(term, "i");
    var details = "";
    var match;
    for (var i = 0; i < $gameNotepad.allNotes().length; i++) {
        details = $gameNotepad.allNotes()[i].details.join("");
        match = details.match(regExp);
        if(match) {
            break;
        }
    }
    if(match) {
        $gameVariables.setValue(variableId, match[0]);
    } else {
        $gameVariables.setValue(variableId, 0);
    }
};

Game_Notepad.prototype.hide = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).hidden = true;
    }
};

Game_Notepad.prototype.show = function(key) {
    var index = this.allNotes().map(function(a){return a.key;}).indexOf(key);
    if (index >= 0) {
        this.note(index).hidden = false;
    }
};

Game_Notepad.prototype.newEnabled = function() {
    return this._features.new;
};

Game_Notepad.prototype.modifyEnabled = function() {
    return this._features.modify;
};

Game_Notepad.prototype.deleteEnabled = function() {
    return this._features.delete;
};

Game_Notepad.prototype.isNoteDeletable = function(id) {
    if(this.deleteEnabled()) {
        var index = this.allNotes().map(function(a){return a.id;}).indexOf(id);
        return !this.note(index).deleteLocked;
    }
    return false;
};

Game_Notepad.prototype.isNoteModifiable = function(id) {
    if(this.modifyEnabled()) {
        var index = this.allNotes().map(function(a){return a.id;}).indexOf(id);
        return !this.note(index).titleLocked || !this.note(index).detailsLocked;
    }
    return false;
};

Game_Notepad.prototype.isNoteTitleModifiable = function(id) {
    var index = this.allNotes().map(function(a){return a.id;}).indexOf(id);
    if (index >= 0) {return !this.note(index).titleLocked;}
};

Game_Notepad.prototype.isNoteDetailsModifiable = function(id) {
    var index = this.allNotes().map(function(a){return a.id;}).indexOf(id);
    if (index >= 0) {return !this.note(index).detailsLocked;}
};

//=============================================================================
// Scene_Notepad
//=============================================================================
// New class to run the notepad scene. Functions include:
// -Window creation
// -Window handlers
// -Input mapping
// -Input processing
//=============================================================================

function Scene_Notepad() {
    this.initialize.apply(this, arguments);
}

Scene_Notepad.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Notepad.prototype.constructor = Scene_Notepad;

Scene_Notepad.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this.storeOriginalInputMapper();
    this._isShifted = false;
    this._isAlted = false;
    this._frameCounter = 0;
    this._blinkRate = ALOE.PlayerNotepad.params.cursorBlinkRate;
    this._tempTitle = [];
    this._tempDetails = [];
};

Scene_Notepad.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createHelpWindow();
    this.createTitleWindow();
    this.createDetailsWindow();
    this._commandWindow.updateNotesWindows();
    this.createConfirmCommandWindow();
    this.createExistingNoteCommandWindow();
    this.setStandardHandlers();
    this.setNoteHandlers();
};

Scene_Notepad.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};

Scene_Notepad.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_NotepadCommand(0, 0);
    this.addWindow(this._commandWindow);
};

Scene_Notepad.prototype.setStandardHandlers = function() {
    this._commandWindow.setHandler('cancel',          this.popScene.bind(this));
    this._commandWindow.setHandler('newnote',         this.commandNewNote.bind(this));
    this._confirmCommandWindow.setHandler('save',     this.commandSaveNote.bind(this));
    this._confirmCommandWindow.setHandler('discard',  this.commandDiscardNote.bind(this));
    this._confirmCommandWindow.setHandler('cancel',   this.commandDiscardNote.bind(this));
    this._existingCommandWindow.setHandler('modify',    this.commandModifyNote.bind(this));
    this._existingCommandWindow.setHandler('delete',  this.commandDeleteNote.bind(this));
    this._existingCommandWindow.setHandler('cancel',  this.commandCancelExisting.bind(this));
};

Scene_Notepad.prototype.setNoteHandlers = function() {
    var allNotes = $gameNotepad.allNotes();
    for (var i = 0; i < allNotes.length; i++) {
        this._commandWindow.setHandler('id'+allNotes[i].id, this.commandExistingNote.bind(this));
    }
};

Scene_Notepad.prototype.createHelpWindow = function() {
    var x = this._commandWindow.width;
    var width = Graphics.width - this._commandWindow.width;
    this._helpWindow = new Window_NotepadHelp(x, width);
    this.addWindow(this._helpWindow);
};

Scene_Notepad.prototype.createTitleWindow = function() {
    var x = this._commandWindow.width;
    var y = 0;
    var width = Graphics.width - this._commandWindow.width;
    var height = Graphics.height / 8;
    this._titleWindow = new Window_NotepadTitle(x, y, width, height);
    this.addWindow(this._titleWindow);
    this._commandWindow._subTitleWindow = this._titleWindow;
};

Scene_Notepad.prototype.createDetailsWindow = function() {
    var x = this._commandWindow.width;
    var y = this._titleWindow.height;
    var width = Graphics.width - this._commandWindow.width;
    var height = Graphics.height - this._titleWindow.height - this._helpWindow.height;
    this._detailsWindow = new Window_NotepadDetails(x, y, width, height);
    this.addWindow(this._detailsWindow);
    this._commandWindow._subDetailsWindow = this._detailsWindow;
};

Scene_Notepad.prototype.createConfirmCommandWindow = function() {
    var x = 100; //hardcoded
    var y = 100; //hardcoded
    this._confirmCommandWindow = new Window_ConfirmChangesCommand(x, y);
    this._confirmCommandWindow.hide();
    this._confirmCommandWindow.deactivate();
    this.addWindow(this._confirmCommandWindow);
};

Scene_Notepad.prototype.createExistingNoteCommandWindow = function() {
    var x = 0;
    var y = 0;
    this._existingCommandWindow = new Window_ExistingNoteCommand(x, y);
    this._existingCommandWindow.hide();
    this._existingCommandWindow.deactivate();
    this.addWindow(this._existingCommandWindow);
};

Scene_Notepad.prototype.commandNewNote = function() {
    this.createMyInputMapper();
    this._commandWindow._lastCommandSymbol = this._commandWindow.currentSymbol();
    this._commandWindow.deselect();
    this._activeWindow = this._titleWindow;
    this._titleWindow.activate();
    this._titleWindow.refresh();
    this._helpWindow.setTitleText();
};

Scene_Notepad.prototype.commandExistingNote = function() {
    this._commandWindow._lastCommandSymbol = this._commandWindow.currentSymbol();
    this._commandWindow.deselect();
    this._existingCommandWindow.show();
    this._existingCommandWindow.activate();
    this._existingCommandWindow.refresh();
    this._existingCommandWindow.selectSymbol(this._existingCommandWindow._lastCommandSymbol);
};

Scene_Notepad.prototype.commandSaveNote = function() {
    var id = parseInt(this._commandWindow._lastCommandSymbol.slice(2));
    var index = $gameNotepad.allNotes().map(function(a){return a.id;}).indexOf(id);
    if (index < 0) {
        $gameNotepad.addNote(this._titleWindow.text, this._detailsWindow.text);
    }
    this._titleWindow.clear();
    this._detailsWindow.clear();
    this._confirmCommandWindow.deselect();
    this._confirmCommandWindow.hide();
    this._commandWindow.refresh();
    this._commandWindow.activate();
    this._commandWindow.selectLast();
    this._activeWindow = null;
    this.resetInputMapper();
    this.setNoteHandlers();
};

Scene_Notepad.prototype.commandDiscardNote = function() {
    //Reset the $gameNotepad data
    var id = parseInt(this._commandWindow._lastCommandSymbol.slice(2));
    if (id) {
        $gameNotepad.modifyNoteById(id, this._tempTitle, this._tempDetails);
    }
    //Show/activate the appropriate windows
    this._titleWindow.clear();
    this._detailsWindow.clear();
    this._confirmCommandWindow.deselect();
    this._confirmCommandWindow.hide();
    this._commandWindow.refresh();
    this._commandWindow.activate();
    this._commandWindow.selectLast();
    this._activeWindow = null;
    //Reset command window handlers
    this.setNoteHandlers();
};

Scene_Notepad.prototype.commandModifyNote = function() {
    this.createMyInputMapper();
    var id = parseInt(this._commandWindow._lastCommandSymbol.slice(2));
    this._tempTitle = $gameNotepad.titleById(id).slice();
    this._tempDetails = $gameNotepad.detailsById(id).slice();
    this._commandWindow.deselect();
    this._existingCommandWindow._lastCommandSymbol = this._existingCommandWindow.currentSymbol();
    this._existingCommandWindow.deselect();
    this._existingCommandWindow.hide();
    if ($gameNotepad.isNoteTitleModifiable(id)) {
        this._activeWindow = this._titleWindow;
        this._titleWindow.activate();
        this._titleWindow.refresh();
        this._helpWindow.setTitleText();
    } else {
        this._activeWindow = this._detailsWindow;
        this._detailsWindow.activate();
        this._detailsWindow.refresh();
        this._helpWindow.setDetailsText();
    }
};

Scene_Notepad.prototype.commandDeleteNote = function() {
    var id = parseInt(this._commandWindow._lastCommandSymbol.slice(2));
    $gameNotepad.deleteNoteById(id);
    this._commandWindow.removeCommand(this._commandWindow._lastCommandSymbol);
    this._existingCommandWindow.deselect();
    this._existingCommandWindow.hide();
    this._commandWindow.refresh();
    this._commandWindow.activate();
    this._commandWindow.select(0);
    this._titleWindow.clear();
    this._detailsWindow.clear();
};

Scene_Notepad.prototype.commandCancelExisting = function() {
    this._existingCommandWindow.deselect();
    this._existingCommandWindow.hide();
    this._commandWindow.activate();
    this._commandWindow.selectLast();
    SoundManager.playCancel();
};

Scene_Notepad.prototype.popScene = function() {
    this.resetInputMapper();
    Scene_Base.prototype.popScene.call(this);
};

Scene_Notepad.prototype.storeOriginalInputMapper = function() {
    this._originalInputKeyMapper = JSON.parse(JSON.stringify(Input.keyMapper));
};

Scene_Notepad.prototype.resetInputMapper = function() {
    Input.keyMapper = JSON.parse(JSON.stringify(this._originalInputKeyMapper));
};

Scene_Notepad.prototype.createMyInputMapper = function() {
    Input.keyMapper = {};
    Input.shiftedKeyMapper = {};
    ALOE.PlayerNotepad.params.inputcodes.forEach(function(a){
        if(typeof(a.c) === "string") {
            Input.keyMapper[a.k] = a.c;
        } else if (typeof(a.c) === "number") {
            Input.keyMapper[a.k] = '.' + a.c; 
            //Input class doesn't like pure numbers
        }
    });

    Input.keyMapper[8]  = 'backspace';
    Input.keyMapper[13] = 'enter';
    Input.keyMapper[16] = 'shift';
    Input.keyMapper[18] = 'alt';
    Input.keyMapper[27] = 'escape';
    Input.keyMapper[32] = 'space';
    Input.keyMapper[46] = 'delete';
    Input.keyMapper[37] = 'left';
    Input.keyMapper[38] = 'up';
    Input.keyMapper[39] = 'right';
    Input.keyMapper[40] = 'down';

};

Scene_Notepad.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if(this._titleWindow.active || this._detailsWindow.active) {
        this.processCursorBlink();
        this.checkTextInput();
    }
};

Scene_Notepad.prototype.processCursorBlink = function() {
    this._frameCounter++;
    this._frameCounter %= this._blinkRate;
    if(this._frameCounter === 0) {
        this._activeWindow.cursorToggle();
    }
};

Scene_Notepad.prototype.checkTextInput = function() {
    this.checkCharacters();
    this.checkSpecialKeys();
    this.checkArrowKeys();
    this.checkShiftKey();
    this.checkAltKey();
    this.checkEnterKey();
    this.checkEscapeKey();
};

Scene_Notepad.prototype.checkCharacters = function() {
    ALOE.PlayerNotepad.params.inputcodes.forEach(function(a){
        if(Input.isRepeated(a.c)){
            this.bounceCursor();
            if(this._isShifted && this._isAlted) {
                if (a.sa) {this._activeWindow.addChar(a.sa);}
                else if (a.s) {this._activeWindow.addChar(a.s);}
                else {this._activeWindow.addChar(a.c);}
            } else if (this._isShifted) {
                if (a.s) {this._activeWindow.addChar(a.s);}
                else {this._activeWindow.addChar(a.c);}
            } else if (this._isAlted) {
                if (a.a) {this._activeWindow.addChar(a.a);}
                else {this._activeWindow.addChar(a.c);}
            } else {
                this._activeWindow.addChar(a.c);
            }
        }
        if(Input.isRepeated("." + a.c)) { //Input class doesn't like pure numbers
            this.bounceCursor();
            if(this._isShifted) {
                this._activeWindow.addChar(a.s);
            } else {
                this._activeWindow.addChar(a.c);
            }
        }
    }, this);
};

Scene_Notepad.prototype.checkSpecialKeys = function() {
    if(Input.isRepeated("space")) {
        this.bounceCursor();
        this._activeWindow.addChar(" ");
    }
    if(Input.isRepeated("backspace")) {
        this.bounceCursor();
        this._activeWindow.backspace();
    }
    if(Input.isRepeated("delete")) {
        this.bounceCursor();
        this._activeWindow.deleteChar();
    }
};

Scene_Notepad.prototype.checkArrowKeys = function() {
    if(Input.isRepeated("left")) {
        this.processLeft();
        this.bounceCursor();
    }
    if(Input.isRepeated("right")) {
        this.processRight();
        this.bounceCursor();
    }
    if(Input.isRepeated("down")) {
        if(this._detailsWindow.active) {
            this.processDown();
            this.bounceCursor();
        }
    }
    if(Input.isRepeated("up")) {
        if(this._detailsWindow.active) {
            this.processUp();
            this.bounceCursor();
        }
    }
};

Scene_Notepad.prototype.checkShiftKey = function() {
    if(this._isShifted) {
        if(!Input.isPressed("shift")) {this._isShifted = false;}
    } else {
        if(Input.isPressed("shift")) {this._isShifted = true;}
    }
};

Scene_Notepad.prototype.checkAltKey = function() {
    if(this._isAlted) {
        if(!Input.isPressed("alt")) {this._isAlted = false;}
    } else {
        if(Input.isPressed("alt")) {this._isAlted = true;}
    }
}

Scene_Notepad.prototype.checkEnterKey = function() {
    if(Input.isRepeated("enter")) {
        if(this._titleWindow.active) {
            if(this._titleWindow.valid()) {
                this.processEnterFromTitle();
            } else {
                this.processInvalidTitle();
            }
        } else if(this._detailsWindow.active) {
            this.bounceCursor();
            this.processEnterFromDetails();
        }
    }
};

Scene_Notepad.prototype.checkEscapeKey = function() {
    if(Input.isTriggered("escape")) {
        if(this._titleWindow.active) {
            this.processEscapeFromTitle();
        } else if(this._detailsWindow.active) {
            this.processEscapeFromDetails();
        }
    }
};

Scene_Notepad.prototype.processEnterFromTitle = function() {
    var id = parseInt(this._commandWindow._lastCommandSymbol.slice(2));
    if (id) { //If the note already exists
        if ($gameNotepad.isNoteDetailsModifiable(id)) {
            this._titleWindow.deactivate();
            this._titleWindow.refresh();
            this._detailsWindow.activate();
            this._detailsWindow.refresh();
            this._helpWindow.setDetailsText();
            this._activeWindow = this._detailsWindow;
            SoundManager.playOk();
        } else {
            this._confirmCommandWindow.show();
            this._confirmCommandWindow.activate();
            this._titleWindow.deactivate();
            this._activeWindow = null;
            this._helpWindow.clear();
            SoundManager.playOk();
            this.resetInputMapper();
            this._confirmCommandWindow.select(0);
        }
    } else { //If it is a new note
        this._titleWindow.deactivate();
        this._titleWindow.refresh();
        this._detailsWindow.activate();
        this._detailsWindow.refresh();
        this._helpWindow.setDetailsText();
        this._activeWindow = this._detailsWindow;
        SoundManager.playOk();
    }
};

Scene_Notepad.prototype.processInvalidTitle = function() {
    SoundManager.playBuzzer();
    //this._helpWindow.setTitleInvalidText(); //not supported yet
};

Scene_Notepad.prototype.processEnterFromDetails = function() {
    this._activeWindow.newLine();
    SoundManager.playCursor();
};

Scene_Notepad.prototype.processEscapeFromTitle = function() {
    //Reset the $gameNotepad data
    var id = parseInt(this._commandWindow._lastCommandSymbol.slice(2));
    if (id) {
        $gameNotepad.modifyNoteById(id, this._tempTitle, this._tempDetails);
    }
    //Show/Activate windows
    this._titleWindow.deactivate();
    this._activeWindow = null;
    this._titleWindow.clear();
    this._helpWindow.clear();
    this._commandWindow.activate();
    this._commandWindow.selectLast();
    //Play Cancel sound
    SoundManager.playCancel();
    //Reset Input
    this.resetInputMapper();
    Input.clear();
};

Scene_Notepad.prototype.processEscapeFromDetails = function() {
    //Show/activate windows
    this._detailsWindow.deactivate();
    this._activeWindow = null;
    this._helpWindow.clear();
    this._confirmCommandWindow.show();
    this._confirmCommandWindow.activate();
    this._confirmCommandWindow.select(0);
    //Play OK sound
    SoundManager.playOk();
    //Reset Input
    this.resetInputMapper();
    Input.clear();
};

Scene_Notepad.prototype.processDown = function() {
    if(this._activeWindow._row < this._activeWindow.text.length - 1) {
        this._activeWindow._row++;
    }
    if(this._activeWindow._index > this._activeWindow.text[this._activeWindow._row].length) {
        this._activeWindow._index = this._activeWindow.text[this._activeWindow._row].length;
    }
};

Scene_Notepad.prototype.processLeft = function() {
    if(this._activeWindow._index !== 0) {
        this._activeWindow._index--;
    } else if (this._activeWindow._index === 0 && this._activeWindow._row !== 0) {
        this._activeWindow._row--;
        this._activeWindow._index = this._activeWindow.text[this._activeWindow._row].length;
    }
};

Scene_Notepad.prototype.processRight = function() {
    if(this._activeWindow.checkRight()) {
        this._activeWindow._index++;
    } else if (this._activeWindow._index === this._activeWindow.text[this._activeWindow._row].length &&
        this._activeWindow._row < this._activeWindow.text.length - 1) {
            this._activeWindow._row++;
            this._activeWindow._index = 0;
    }
};

Scene_Notepad.prototype.processUp = function() {
    if(this._activeWindow._row !== 0) {
        this._activeWindow._row--;
    }
    if(this._activeWindow._index > this._activeWindow.text[this._activeWindow._row].length) {
        this._activeWindow._index = this._activeWindow.text[this._activeWindow._row].length;
    }
};

Scene_Notepad.prototype.bounceCursor = function() {
    this._activeWindow.cursorOn();
    this.resetFrameCounter();
    this._activeWindow.refresh();
};

Scene_Notepad.prototype.resetFrameCounter = function() {
    this._frameCounter = 0;
};

//=============================================================================
// Window_NotepadCommand
//=============================================================================
// This window contains a command to add a new note and to modify/delete
// existing notes.
//=============================================================================

function Window_NotepadCommand() {
    this.initialize.apply(this, arguments);
}

Window_NotepadCommand.prototype = Object.create(Window_Command.prototype);
Window_NotepadCommand.prototype.constructor = Window_NotepadCommand;

Window_NotepadCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
};

Window_NotepadCommand._lastCommandSymbol = null;

Window_NotepadCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_NotepadCommand.prototype.windowWidth = function() {
    return Graphics.width / 3;
};

Window_NotepadCommand.prototype.windowHeight = function() {
    return Graphics.height;
};

Window_NotepadCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_NotepadCommand.prototype.makeCommandList = function() {
    this.addNewNoteCommand();
    this.addExistingNotesCommands();
};

Window_NotepadCommand.prototype.addNewNoteCommand = function() {
    this.addCommand(ALOE.PlayerNotepad.params.newNote, 'newnote', $gameNotepad.newEnabled());
};

Window_NotepadCommand.prototype.addExistingNotesCommands = function() {
    var allNotes = $gameNotepad.allNotes().filter(function(a){
        if(!a.hidden){return a;}});
    for (var i = 0; i < allNotes.length; i++) {
        var enabled = (!allNotes[i].titleLocked || !allNotes[i].detailsLocked || !allNotes[i].deleteLocked);
        this.addCommand(allNotes[i].title, 'id' + allNotes[i].id, enabled);
    }
};

Window_NotepadCommand.prototype.processOk = function() {
    Window_NotepadCommand._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_NotepadCommand.prototype.selectLast = function() {
    this.selectSymbol(Window_NotepadCommand._lastCommandSymbol);
};

Window_NotepadCommand.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    this.updateNotesWindows();
};

Window_NotepadCommand.prototype.updateNotesWindows = function() {
    if(this.currentSymbol()) {
        var id = parseInt(this.currentSymbol().slice(2));
        if(this._subTitleWindow) {
            if (ALOE.PlayerNotepad.params.fadeLockedText) {
                if (id && !$gameNotepad.isNoteTitleModifiable(id)) {
                    this._subTitleWindow.setFaded();
                } else {
                    this._subTitleWindow.setNotFaded();
                }
            }
            this._subTitleWindow.text = $gameNotepad.titleById(id);
            this._subTitleWindow.refresh();
        }
        if(this._subDetailsWindow) {
            if (ALOE.PlayerNotepad.params.fadeLockedText) {
                if (id && !$gameNotepad.isNoteDetailsModifiable(id)) {
                    this._subDetailsWindow.setFaded();
                } else {
                    this._subDetailsWindow.setNotFaded();
                }
            }
            this._subDetailsWindow.text = $gameNotepad.detailsById(id);
            this._subDetailsWindow.refresh();
        }
    }
};

Window_NotepadCommand.prototype.removeCommand = function(symbol) {
    var index = this._list.map(function(a){return a.symbol;}).indexOf(symbol);
    this._list.splice(index, 1);
};

Window_NotepadCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    if(ALOE.PlayerNotepad.params.newNoteColor !== 0 && index === 0) {
        this.changeTextColor(this.textColor(ALOE.PlayerNotepad.params.newNoteColor));
    }
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    this.resetTextColor();
};

//=============================================================================
// Window_NotepadBase
//=============================================================================
// Defines common methods to use in both the title and details windows.
//=============================================================================

function Window_NotepadBase() {
    this.initialize.apply(this, arguments);
}

Window_NotepadBase.prototype = Object.create(Window_Base.prototype);
Window_NotepadBase.prototype.constructor = Window_NotepadTitle;

Window_NotepadBase.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._index = 0;
    this._row = 0;
    this.text = [""];
    this._cursorActive = false;
    this._faded = false;
    this.deactivate();
};

Window_NotepadBase.prototype.addChar = function(ch) {
    var index = this._index;
    var maxLength = this._maxLength;
    var text = this.text[this._row];
    if (maxLength === 0 || text.length < maxLength) {
        this.text[this._row] = text.slice(0, index) + ch + text.slice(index);
        this._index++;
        this.refresh();
    }
};

Window_NotepadBase.prototype.backspace = function() {
    var index = this._index;
    var row = this._row;
    var text = this.text[row];
    if(index !== 0) {
        this.text[row] = text.slice(0, index - 1) + text.slice(index);
        this._index--;
        this.refresh();
    } else if (row !== 0) {
        this._index = this.text[this._row - 1].length;
        this._row--;
        this.text[row - 1] += this.text[row];
        for (var i = row; i < this.text.length - 1; i++) {
            this.text[i] = this.text[i + 1];
        }
        this.text.pop();
        this.refresh()
    }
};

Window_NotepadBase.prototype.deleteChar = function() {
    var index = this._index;
    var thisLine = this.text[this._row];
    var row = this._row;
    if(index < thisLine.length) {
        this.text[row] = thisLine.slice(0, index) + thisLine.slice(index + 1);
        this.refresh();
    } else if (index === thisLine.length && this.text.length > 1 && row !== this.text.length - 1) {
        this.text[row] += this.text[row + 1];
        for (var i = row + 1; i < this.text.length - 1; i++) {
            this.text[i] = this.text[i + 1];
        }
        this.text.pop();
        this.refresh();
    }
};

Window_NotepadBase.prototype.refresh = function() {
    this.contents.clear();
    var lineHeight = this.lineHeight();
    this.changePaintOpacity(!this._faded);
    for(var i = 0; i < this.text.length; i++) {
        this.drawText(this.text[i], 0, lineHeight * i);
    }
    this.changePaintOpacity(true);
    if(this._cursorActive) {
        this.drawTextCursor();
    }
};

Window_NotepadBase.prototype.clear = function() {
    this.text = [""];
    this._index = 0;
    this._row = 0;
    this.refresh();
};

Window_NotepadBase.prototype.drawTextCursor = function() {
    if(this.active) {
        var index = this._index;
        var row = this._row;
        var text = this.text[row];
        var textWidth = this.textWidth(text.slice(0,index));
        var offset = ALOE.PlayerNotepad.params.cursorOffset;
        var lineHeight = this.lineHeight();
        this.drawText("|", textWidth + offset, row * lineHeight);
    }
};

Window_NotepadBase.prototype.checkRight = function() {
    return ((this._maxLength === 0 || this._index < this._maxLength) && 
        this._index < this.text[this._row].length);
    //If (details window OR not at the max length) AND (cursor is not at the end)
};

Window_NotepadBase.prototype.cursorToggle = function() {
    this._cursorActive = !this._cursorActive;
    this.refresh();
};

Window_NotepadBase.prototype.cursorOn = function() {
    this._cursorActive = true;
};

Window_NotepadBase.prototype.setFaded = function() {
    this._faded = true;
};

Window_NotepadBase.prototype.setNotFaded = function() {
    this._faded = false;
};

//=============================================================================
// Window_NotepadTitle
//=============================================================================
// This window contains the title of the note.
//=============================================================================

function Window_NotepadTitle() {
    this.initialize.apply(this, arguments);
}

Window_NotepadTitle.prototype = Object.create(Window_NotepadBase.prototype);
Window_NotepadTitle.prototype.constructor = Window_NotepadTitle;

Window_NotepadTitle.prototype.initialize = function(x, y, width, height) {
    Window_NotepadBase.prototype.initialize.call(this, x, y, width, height);
    this._maxLength = ALOE.PlayerNotepad.params.maxTitleLength || 35;
    this.refresh();
};

Window_NotepadTitle.prototype.valid = function() {
    return this.text[this._row].length > 0;
};

//=============================================================================
// Window_NotepadDetails
//=============================================================================
// This window contains the details of the note.
//=============================================================================

function Window_NotepadDetails() {
    this.initialize.apply(this, arguments);
}

Window_NotepadDetails.prototype = Object.create(Window_NotepadBase.prototype);
Window_NotepadDetails.prototype.constructor = Window_NotepadDetails;

Window_NotepadDetails.prototype.initialize = function(x, y, width, height) {
    Window_NotepadBase.prototype.initialize.call(this, x, y, width, height);
    this._row = 0;
    this._maxLength = 0;
};

Window_NotepadDetails.prototype.newLine = function() {
    var nextLineString = this.text[this._row].slice(this._index);
    this.text[this._row] = this.text[this._row].substr(0, this._index);
    this.text.splice(this._row + 1, 0, nextLineString);
    this._row++;
    this._index = 0;
    this.refresh();
};

//=============================================================================
// Window_NotepadHelp
//=============================================================================
// This window shows directions to the player.
//=============================================================================

function Window_NotepadHelp() {
    this.initialize.apply(this, arguments);
}

Window_NotepadHelp.prototype = Object.create(Window_Help.prototype);
Window_NotepadHelp.prototype.constructor = Window_NotepadHelp;

Window_NotepadHelp.prototype.initialize = function(x, width) {
    var height = this.fittingHeight(2);
    var y = Graphics.height - height;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._text = '';
};

Window_NotepadHelp.prototype.setTitleText = function() {
    var text = ALOE.PlayerNotepad.params.titleInstructions;
    this.setText(text);
};

//Not used yet. 
Window_NotepadHelp.prototype.setTitleInvalidText = function() {
    var text = "Note title cannot be empty.";
    this.setText(text);
};

Window_NotepadHelp.prototype.setDetailsText = function() {
    var text = ALOE.PlayerNotepad.params.detailsInstructions;
    this.setText(text);
};

//=============================================================================
// Window_ExistingNoteChoices
//=============================================================================
// This window shows choice to modify or delete an existing note.
//=============================================================================

function Window_ExistingNoteCommand() {
    this.initialize.apply(this, arguments);
}

Window_ExistingNoteCommand.prototype = Object.create(Window_Command.prototype);
Window_ExistingNoteCommand.prototype.constructor = Window_ExistingNoteCommand;

Window_ExistingNoteCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
};

Window_ExistingNoteCommand.prototype.windowWidth = function() {
    return Graphics.width / 3;
};

Window_ExistingNoteCommand.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_ExistingNoteCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_ExistingNoteCommand.prototype.makeCommandList = function() {
    var modifyEnabled = true;
    var deleteEnabled = true;
    if(SceneManager._scene._commandWindow._lastCommandSymbol) {
        var id = parseInt(SceneManager._scene._commandWindow._lastCommandSymbol.slice(2));
        if (id) {
            modifyEnabled = $gameNotepad.isNoteModifiable(id);
            deleteEnabled = $gameNotepad.isNoteDeletable(id);
        }
    }
    this.addCommand(ALOE.PlayerNotepad.params.modifyNote, 'modify', modifyEnabled);
    this.addCommand(ALOE.PlayerNotepad.params.deleteNote, 'delete', deleteEnabled);
};

Window_ExistingNoteCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    if(ALOE.PlayerNotepad.params.modifyNoteColor !== 0 && index === 0) {
        this.changeTextColor(this.textColor(ALOE.PlayerNotepad.params.modifyNoteColor));
    } else if (ALOE.PlayerNotepad.params.deleteNoteColor !== 0 && index === 1) {
        this.changeTextColor(this.textColor(ALOE.PlayerNotepad.params.deleteNoteColor));
    }
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    this.resetTextColor();
};

//=============================================================================
// Window_ConfirmChangesCommand
//=============================================================================
// This window shows the choice to save or discard changes to the note.
//=============================================================================

function Window_ConfirmChangesCommand() {
    this.initialize.apply(this, arguments);
}

Window_ConfirmChangesCommand.prototype = Object.create(Window_Command.prototype);
Window_ConfirmChangesCommand.prototype.constructor = Window_ConfirmChangesCommand;

Window_ConfirmChangesCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
};

Window_ConfirmChangesCommand.prototype.windowWidth = function() {
    return Graphics.width / 3;
};

Window_ConfirmChangesCommand.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

Window_ConfirmChangesCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_ConfirmChangesCommand.prototype.makeCommandList = function() {
    this.addCommand(ALOE.PlayerNotepad.params.saveNote, 'save', true);
    this.addCommand(ALOE.PlayerNotepad.params.discardChanges, 'discard', true);
};

Window_ConfirmChangesCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    if(ALOE.PlayerNotepad.params.saveNoteColor !== 0 && index === 0) {
        this.changeTextColor(this.textColor(ALOE.PlayerNotepad.params.saveNoteColor));
    } else if (ALOE.PlayerNotepad.params.discardChangesColor !== 0 && index === 1) {
        this.changeTextColor(this.textColor(ALOE.PlayerNotepad.params.discardChangesColor));
    }
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    this.resetTextColor();
};

Window_ConfirmChangesCommand.prototype.playOkSound = function() {
    if(this.currentSymbol() === "save") {
        SoundManager.playSave();
    } else if (this.currentSymbol() === "discard") {
        SoundManager.playCancel();
    } else {
        SoundManager.playOk();
    }
};

//=============================================================================
// Main Menu Integration
//=============================================================================
// Alias of Scene_Menu and Window_MenuCommand to add the Notepad command to
// the main menu.
//=============================================================================

if(ALOE.PlayerNotepad.params.addToMenu) {

ALOE.Alias.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    ALOE.Alias.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('notepad',   this.commandNotepad.bind(this));
};

Scene_Menu.prototype.commandNotepad = function() {
    SceneManager.push(Scene_Notepad);
};

ALOE.Alias.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    ALOE.Alias.Window_MenuCommand_addOriginalCommands.call(this);
    var visible = true;
    var enabled = true;
    var switchForVisible = ALOE.PlayerNotepad.params.switchForVisible;
    var switchForEnabled = ALOE.PlayerNotepad.params.switchForEnabled;
    if (switchForVisible !== 0 && switchForVisible !== undefined) {
        visible = $gameSwitches.value(switchForVisible);
    }
    if (switchForEnabled !== 0 && switchForEnabled !== undefined) {
        enabled = $gameSwitches.value(switchForEnabled);
    }
    if (visible) {
        this.addCommand(ALOE.PlayerNotepad.params.menuCommandName, 'notepad', enabled);
    }
};

}

//=============================================================================
// Plugin Commands
//=============================================================================
// Define the functions that are executed for the plugin commands.
//=============================================================================

ALOE.Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    ALOE.Alias.Game_Interpreter_pluginCommand.call(this, command, args);
    if(command.toLowerCase() === "notepad") {
        switch (args[0].toLowerCase()) {
            case "open":
                SceneManager.push(Scene_Notepad);
                break;
            case "delete":
                switch (args[1].toLowerCase()) {
                    case "key":
                        $gameNotepad.deleteNoteByKey(args[2].toLowerCase());
                        break;
                    case "all":
                        $gameNotepad.deleteAllNotes();
                        break;
                    default:
                        break;    
                }
                break;
            case "stage":
                var prop = args[1].toLowerCase();
                switch (prop) {
                    case "title":
                        $gameNotepad.setStage(prop, [args.slice(2).join(" ")]);
                        break;
                    case "details":
                        $gameNotepad.setStage(prop, args.slice(2).join(" ").split("\\n"));
                        break;
                    case "key":
                        $gameNotepad.setStage(prop, args[2].toLowerCase()); 
                        break;
                    case "bothlocked":
                        var bothLocked = args[2].toLowerCase() === "true" ? true : false;
                        $gameNotepad.setStage("titleLocked", bothLocked);
                        $gameNotepad.setStage("detailsLocked", bothLocked);
                        break;
                    case "titlelocked":
                        var titleLocked = args[2].toLowerCase() === "true" ? true : false;
                        $gameNotepad.setStage(prop, titleLocked);
                        break;
                    case "detailslocked":
                        var detailsLocked = args[2].toLowerCase() === "true" ? true : false;
                        $gameNotepad.setStage(prop, detailsLocked);
                        break;
                    case "deletelocked":
                        var deleteLocked = args[2].toLowerCase() === "true" ? true : false;
                        $gameNotepad.setStage(prop, deleteLocked);
                        break;
                    case "hidden":
                        var hidden = args[2].toLowerCase() === "true" ? true : false;
                        $gameNotepad.setStage(prop, hidden);
                        break;
                    case "add":
                        var title         = $gameNotepad.getStage("title");
                        var details       = $gameNotepad.getStage("details");
                        var key           = $gameNotepad.getStage("key");
                        var titleLocked   = $gameNotepad.getStage("titleLocked");
                        var detailsLocked = $gameNotepad.getStage("detailsLocked");
                        var deleteLocked  = $gameNotepad.getStage("deleteLocked");
                        var hidden        = $gameNotepad.getStage("hidden");
                        if((title) && (key)) {
                            if($gameNotepad.keyExists(key)) {
                                $gameNotepad.modifyNoteByKey(key, title, details, titleLocked,
                                     detailsLocked, deleteLocked, hidden);
                            } else {
                                $gameNotepad.addNote(title, details, key, titleLocked,
                                     detailsLocked, deleteLocked, hidden);
                            }
                            $gameNotepad.clearStage();
                        }
                        break;
                    case "append":
                        var key          = $gameNotepad.getStage("key");
                        var title        = $gameNotepad.getStage("title");
                        var details      = $gameNotepad.getStage("details");
                        if (key) {
                            if ($gameNotepad.keyExists(key)) {
                                $gameNotepad.appendNoteByKey(key, title, details)
                            }
                            $gameNotepad.clearStage();
                        }
                    default:
                        break;
                }   
                break;
            case "lock":
                switch(args[1].toLowerCase()) {
                    case "title":
                        $gameNotepad.lockTitle(args[2].toLowerCase());
                        break;
                    case "details":
                        $gameNotepad.lockDetails(args[2].toLowerCase());
                        break;
                    case "both":
                        $gameNotepad.lockTitle(args[2].toLowerCase());
                        $gameNotepad.lockDetails(args[2].toLowerCase());
                        break;
                    case "delete":
                        $gameNotepad.lockDelete(args[2].toLowerCase());
                        break;
                    default:
                        break;
                }
                break;
            case "unlock":
                switch(args[1].toLowerCase()) {
                    case "title":
                        $gameNotepad.unlockTitle(args[2].toLowerCase());
                        break;
                    case "details":
                        $gameNotepad.unlockDetails(args[2].toLowerCase());
                        break;
                    case "both":
                        $gameNotepad.unlockTitle(args[2].toLowerCase());
                        $gameNotepad.unlockDetails(args[2].toLowerCase());
                        break;
                    case "delete":
                        $gameNotepad.unlockDelete(args[2].toLowerCase());
                        break;
                    default:
                        break;
                }
                break;
            case "hide":
                $gameNotepad.hide(args[1].toLowerCase());
                break;
            case "show":
                $gameNotepad.show(args[1].toLowerCase());
                break;
            case "disable":
                $gameNotepad.disableFeature(args[1].toLowerCase());
                break;
            case "enable":
                $gameNotepad.enableFeature(args[1].toLowerCase());
                break;
            case "search":
                var variableId = parseInt(args[1]);
                switch (args[2].toLowerCase()) {
                    case "titles":
                        if(args[3] === "for") {
                            var term = args.slice(4).join(" ");
                            $gameNotepad.searchTitles(term, variableId);
                        }
                        break;
                    case "details":
                        if(args[3] === "for") {
                            var term = args.slice(4).join(" ");
                            $gameNotepad.searchDetails(term, variableId);
                        }
                        break;
                    case "key":
                        var key = args[3];
                        if(args[4] === "for") {
                            var term = args.slice(5).join(" ");
                            $gameNotepad.searchKey(key, term, variableId);
                        }
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    }
};

(function() {
    if (ALOE.PlayerNotepad.params.testmode === true) {
        ALOE.Alias.Input_onKeyDown = Input._onKeyDown;
        Input._onKeyDown = function(event) {
            ALOE.Alias.Input_onKeyDown.call(this, event);
            console.log(event.keyCode);
        };
    }
})();