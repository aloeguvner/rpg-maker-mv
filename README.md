## Table of Contents

[Instructions](https://github.com/aloeguvner/rpg-maker-mv#instructions)\
[Aloe Guvner Original Plugins](https://github.com/aloeguvner/rpg-maker-mv#aloe-guvner-original-plugins)\
[YEP Extensions](https://github.com/aloeguvner/rpg-maker-mv#yep-extensions)

## Instructions

### How to download

On the page of each plugin, locate the button labeled "Raw" in the upper-right. Right-click this button and choose "Save File As" to download.

### Repository Organization

Two folder are included in this repository: "plugins" and "source_code".\
The **source_code** folder are the plugins that I directly worked on, which use ES6+ features and are not compatible with RPG Maker MV versions prior to 1.6.0. If you would like to study how I implemented any features, this would be the version to look at.\
The **plugins** folder is for the versions to install into your game, which do not use ES6+ features, meaning that these are compatible with RPG Maker MV 1.5.0+ and all browsers. These versions are transpiled using Babel.js.

### Contributions

If you would like to contribute to any plugins, feel free to send a Pull Request!

### Bugs/Issues

For any issues or feature requests for these plugins, I encourage you to open an Issue on the repository. Please ensure to include detailed information containing:
* Which plugin has the issue
* Steps to recreate the issue
* Screenshots
* Log of the console (press F8 during playtest)

## Aloe Guvner Original Plugins

### Terms of Use

The following original plugins are free for use in both commercial and non-commercial games.
Credit is required either in the game, or in a text file which is included along with the game.
Credit: Aloe Guvner

### Aloe Guvner Plugin Links

**Title**: Mobile User Interface\
**Description**:\
This plugin focuses on improving the user interface for mobile games created in RPG Maker MV, by allowing the developer to have virtual buttons on the screen that interact with touch input. 

This plugin allows maximum flexibility for the developer, you can add as many or as few buttons as you want to the screen, and you can add these buttons on whichever screens you would like (i.e. map, menu, credits, title, etc.).\
**Install Instructions**: No specific instructions. As with any plugin, if incompatibilities are found, try rearranging it.\
[Mobile User Interface](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_MobileUI.js)

___

**Title**: Player Notepad\
**Description**:\
This plugin creates a new scene where the player can create, modify, and delete notes. The player uses their keyboard to type the notes, and all notes are saved along with the game's save file.\
This opens up uses in:
* Quest notes
* Educational games
* Crime/mystery games (player detective writes notes about suspects)
* Crafting/recipes
* and many more!

**Install Instructions**: No specific instructions. As with any plugin, if incompatibilities are found, try rearranging it.\
[Player Notepad (In-Game Text Editor)](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_PlayerNotepad.js)

___

**Title**: Conditional "Show Choices"\
**Description**:\
This plugin allows developers to set conditions directly in the "Show Choices" event command. These conditions can determine whether the choice is hidden or disabled.

No scripting knowledge or plugin commands are required!\
Everything is done directly in the "Show Choices" event command, providing an intuitive and efficient way to increase the depth of your story-telling through more interesting choices.

**Install Instructions**: If using the HIME Large Choices plugin, install this plugin *above* the HIME plugin. Besides that, no specific instructions. As with any plugin, if incompatibilities are found, try rearranging it.\
[Conditional "Show Choices"](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_ConditionalChoices.js)

___

**Title**: Syncronize Variables with Items\
**Description**:\
Some menu plugins require data to be stored as variables, which also has to be represented as item counts, or vice-versa.\
If multiple currency systems (ex. using gold and gems) require the additional currencies to be represented as variables, it would be very useful to represent it as items in the inventory as well.

This plugin will synchronize the value of a variable with the inventory count of a certain item/weapon/armor, making sure that they are always the same.

**Install Instructions**: No specific instructions. As with any plugin, if incompatibilities are found, try rearranging it.\
[Syncronize Variables with Items](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_Sync_Variables_Items.js)

___

**Title**: Item and Skill Sort Priority\
**Description**:\
By default, the items/weapons/armors/skills are sorted by database ID number in menu windows, and there is no way to change this order from the editor.

This simple plugin allows the developer to use a notetag in the database in order to define a custom order for the items/weapons/armors/skills to appear.

**Install Instructions**: No specific instructions. As with any plugin, if incompatibilities are found, try rearranging it.\
[Item and Skill Sort Priority](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_ItemSkillSortPriority.js)

___

**Title**: Events as Ladders and Counters\
**Description**:\
This plugin allows events to have the "ladder" functionality as seen in the tileset.\
Any event with a graphic set to a tileset tile that is marked with the "ladder" property or has a notetag of `<ladder>` is treated as a ladder.
When on a "ladder", the player, followers, and NPCs are always facing upwards regardless of the direction of movement.

This plugin also allows events to have the properties of a "counter".\
Any event with a graphic set to a tileset tile that is marked with the "counter" property or has a notetag of `<counter>` is treated as a counter.

"Counter" allows interaction with other events from 1 space away. (Example: Speak to a shop owner standing behind a table)\
**Install Instructions**: No specific instructions. As with any plugin, if incompatibilities are found, try rearranging it.\
[Events as Counters and Ladders](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_Event_Ladder_Counter.js)


## YEP Extensions

### Terms of Use

The following YEP extensions are released under the [MIT License](https://opensource.org/licenses/MIT). This means that no attribution/credits are required, these extension plugins are freely available for use.

### YEP Extension Plugin Links

**Title**: Menu Parameter Control\
**Extends**: Status Core, Skill Core, In-Battle Status Window, Class Change Core, Item Core, Shop Menu Core\
**Description**:\
Control which parameters show in any menu!\
Perfect for games that don't use the traditional parameters (ex. games without magic, so no Magic Atk or Magic Def). Additionally, control what order the parameters appear.\
**Install Instructions**: Place below all YEP plugins.\
[YEP Menu Parameter Control](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_YEP_MenuParameterControl.js)

___

**Title**: Plugin Order Checker\
**Extends**: N/A\
**Description**:\
Errors can occur if Yanfly plugins are added in the wrong order. The only way to check the order is manually against their website... Until now!\
This plugin will check the order of your Yanfly plugins and tell you if anything is wrong.\
**Install Instructions**: Install at the bottom of the Plugin Manager.\
[YEP Plugin Order Checker](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_YEP_PluginOrderChecker.js)

___

**Title**: Map Select Equip - Help Window\
**Extends**: YEP_MapSelectEquip\
**Description**:\
The Map Select Equip plugin allows the player to select an equipment, and the ID# is saved to a variable.
This extension creates a help window that displays the description of the equipment as the players are selecting it.\
**Install Instructions**: Install below YEP_MapSelectEquip\
[YEP Map Select Equip - Help Window](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_YEP_X_MapSelectEquip_Help.js)

___

**Title**: Map Select Skill - Help Window\
**Extends**: YEP_MapSelectSkill\
**Description**:\
The Map Select Skill plugin allows the player to select a skill, and the ID# is saved to a variable.\
This extension creates a help window that displays the description of the skill as the players are selecting it.\
**Install Instructions**: Install below YEP_MapSelectSkill\
[YEP Map Select Skill - Help Window](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_YEP_X_MapSelectSkill_Help.js)

___

**Title**: Row Formation Actor Face\
**Extends**: YEP_RowFormation\
**Description**:\
The RowFormation plugin comes with a screen that allows the player to arrange their party's formation in rows.\
It uses the actor battle sprites by default, which can have strange effects if non-standard sprites are used. This extension allows the developer to choose to use the actor's face instead.\
Install Instructions: Install below YEP_RowFormation\
[YEP Row Formation - Actor Face](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_YEP_RowFormation_ActorFace.js)
___

**Title**: Level Up Aftermath Sound Effect\
**Extends**: YEP_X_AftermathLevelUp\
**Description**:\
The Aftermath Level Up plugin shows a window describing the changes to an actor when they leveled up.\
This extension allows the developer to play a Sound Effect to celebrate the actor leveling up. Additionally, each actor may use their own sound effect.\
Install Instructions: Install below YEP_X_AftermathLevelUp\
[YEP Aftermath Level Up - Sound Effect](https://github.com/aloeguvner/rpg-maker-mv/blob/master/plugins/ALOE_YEP_AftermathLevelUp_SE.js)