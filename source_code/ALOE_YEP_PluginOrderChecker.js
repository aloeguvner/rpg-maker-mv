// ============================================
// Yanfly Plugin Order Checker
// ALOE_YEP_PluginOrderChecker.js
// ============================================

//=============================================================================
/*:
 * @plugindesc v1.0.1 Reads YEP (Yanfly) plugins activated in the 
 * project and outputs the correct plugin order.
 * @author Aloe Guvner
 * 
 * @param writeFile
 * @text Write File?
 * @type boolean
 * @desc If TRUE, writes .json file to the /js/plugins
 * folder that contains the correct order of YEP plugins.
 * @default true
 * 
 * @param logConsole
 * @text Log to the Console?
 * @type boolean
 * @desc If TRUE, logs the correct order of YEP plugins to
 * the developer console, opened with F8 during a playtest.
 * @default true
 * 
 * @help
 * 
 * //=============================================================================
 * //Background
 * //=============================================================================
 * 
 * In many cases, YEP (Yanfly) plugins must be added in the particular order
 * listed on the yanfly.moe website, or compatibility issues may occur. This plugin
 * aims to assist in re-ordering these plugins to the correct order.
 * 
 * //=============================================================================
 * //Description
 * //=============================================================================
 * 
 * This plugin will read the YEP (Yanfly) plugins activated in this project
 * and output the correct plugin order.
 * The output is displayed in two ways, controllable within the Plugin Parameters.
 * 1). Write File
 * --A file named "_YEP_PluginOrder.json" is written to your project's /js/plugins
 * --folder which contains the correct order of the plugins.
 * 2). Log Console
 * --The correct order of the plugins is written to the developer console.
 * --The developer console can be accessed by pressing F8 during a testplay.
 * 
 * Placement: Place this plugin at the bottom of the Plugin Manager.
 * 
 * Note: This plugin will NOT modify or alter the order of your plugins.
 * This should only be done through the RPG Maker MV editor. 
 * 
 * This plugin will output the correct order of YEP plugins so that it
 * can be fixed manually in the RPG Maker MV editor.
 * 
 * //=============================================================================
 * //How to use
 * //=============================================================================
 * 
 * Place this plugin at the bottom of the Plugin Manager. Set the parameters as
 * follows:
 * 
 * --Write File?--
 * 
 * If set to TRUE, will create a file in your /js/plugins folder called
 * "_YEP_PluginOrder.json". Open this file in any text editor to see the
 * correct order of the plugins.
 * 
 * --Log to the Console?--
 * 
 * If set to TRUE, will log the correct order of the plugins to the console.
 * To open the console, during a playtest, press F8.
 * 
 * //=============================================================================
 * //Output
 * //=============================================================================
 * 
 * This plugin will ouput 3 things to either a file or the console (see above):
 * 1.) The first plugin that is out of order.
 * 
 * 2.) The correct order of the plugins.
 * 
 * 3.) A list of plugins that were unable to be identified as official YEP plugins.
 * This is common for community-written extensions.
 * 
 * //=============================================================================
 * //Deployment
 * //=============================================================================
 * 
 * It is advised to delete the "_YEP_PluginOrder.json" and remove this plugin
 * before deploying the game.
 * There is no need to include this plugin in a deployed game, it is only to help
 * the development process.
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
 * //Version History
 * //=============================================================================
 * 
 * Version 1.0.1 (June 15 2018):
 * -Updated to add a message if nothing wrong is found
 * 
 * Version 1.0.0 (May 11 2018):
 * -Initial release
 * 
 * //=============================================================================
 * //End of Help File
 * //=============================================================================
*/
//=============================================================================

(function() {

    var param = {};
    var Parameters = PluginManager.parameters("ALOE_YEP_PluginOrderChecker");
    param.writeFile = Parameters["writeFile"] === "true";
    param.logConsole = Parameters["logConsole"] === "true";

    var checkPluginOrder = function() {
		//Grab the list of active YEP plugins and the key to compare to
        var list = activeYepPlugins($plugins);
		var key = orderedKey();

		//Perform calculations to identify the correct order, unknown plugins, and
		//the first plugin which is in the wrong order.
		var orderedResult = computeCorrectOrder(list, key);
		var unknownPlugins = identifyUnknownPlugins(list, key);
		var firstWrongPlugin = findFirstWrongPlugin(list, orderedResult, unknownPlugins);

		//Write the results to a json file, if enabled in the parameters
        if (param.writeFile) {
            writeFile(firstWrongPlugin, orderedResult, unknownPlugins);
		}
		
		//Write the results to the console, if enabled in the parameters
        if (param.logConsole) {
            logConsole(firstWrongPlugin, orderedResult, unknownPlugins);
        }
    };

    var activeYepPlugins = function(plugins) {
		//Return a list of active plugins with YEP in the name (return the name only)
        return yepPlugins(activePlugins(plugins)).map(function(plugin) {return plugin.name});
    };

    var activePlugins = function(plugins) {
		//Return a list of the plugins that are active
        return plugins.filter(function(plugin) {return plugin.status === true;});
    };

    var yepPlugins = function(plugins) {
		//Return a list of the plugins that have YEP in the name
        return plugins.filter(function(plugin) {return plugin.name.indexOf("YEP") !== -1;});
    };
    
    var computeCorrectOrder = function(list, key) {
		var orderedResult = [];
		//Loop through the key and if the plugin is in the list then
		//push it in the correct order to the result
		//Include the found variable to avoid multiples
        key.forEach(function(element) {
            var found = false;
            list = list.filter(function(plugin) {
                if (!found && plugin === element) {
                    orderedResult.push(plugin);
                    found = true;
                    return false;
                } else {
                    return true;
                };
            });
        });
        return orderedResult;
	};

    var identifyUnknownPlugins = function(list, key) {
		//Remove known plugins from the list, and what is left is the
		//unknown plugins. Return result
        return list.filter(function(plugin) {
            return key.indexOf(plugin) === -1;
        });
    };
	
	var findFirstWrongPlugin = function(list, orderedResult, unknownPlugins) {
		//Take list and clean it for only known plugins
		var knownList = list.filter(function(el) {
			return unknownPlugins.indexOf(el) === -1;
		});
		//Compare list against the ordered results, stopping at the first
		//wrongly ordered plugin
		var result = [];
		for (var i = 0; i < knownList.length; i++) {
			if (knownList[i] !== orderedResult[i]) {
				result.push(knownList[i]);
				break;
			}
		}

		//Return result
		return result;
	};

//=============================================================================
// Output Functions
// Functions to output the results of the program processing.
// --Write a JSON file of the computed results.
// --Log the results to the console.
//=============================================================================

    var writeFile = function(firstWrongPlugin, orderedResult, unknownPlugins) {
        var fs = require("fs");
        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        var filePath = path.join(base, 'js/plugins/');
        var data = createWrapperObject(firstWrongPlugin, orderedResult, unknownPlugins);
        fs.writeFileSync(filePath + '_YEP_PluginOrder.json', data);
    };

    var createWrapperObject = function(firstWrongPlugin, orderedResult, unknownPlugins) {
		return JSON.stringify({"First Wrong Plugin" : firstWrongPlugin}) +
			"\r" +
			JSON.stringify({"Correct Plugin Order" : orderedResult}) +
            "\r" +
            JSON.stringify({"Plugins without Identified Order" : unknownPlugins});
    };

    var logConsole = function(firstWrongPlugin, orderedList, unorderedList) {
		logFirstWrong(firstWrongPlugin)
        logConsoleOrdered(orderedList);
        logConsoleUnordered(unorderedList);
	};
	
	var logFirstWrong = function(firstWrongPlugin) {
		if (firstWrongPlugin.length > 0) {
			console.log("Below is the first wrongly ordered plugin.\n" + 
						"--------------------------------------------");
			console.log(firstWrongPlugin[0]);
		} else {
			console.log("No issues were found with the plugin order.\n" + 
						"Please be sure to check any that require manual review.")
		}
	}

    var logConsoleOrdered = function(orderedList) {
        if (orderedList.length > 0) {
            console.log("Below is the proper order of the YEP plugins\n" +
                        "that have been installed.\n" +
                        "--------------------------------------------");
            orderedList.forEach(function(name) {console.log(name);});
        }
    };

    var logConsoleUnordered = function(unorderedList) {
        if (unorderedList.length > 0) {
            console.log("The following YEP plugins were not found.\n" +
                    "The proper order must be determined manually.\n" +
                    "--------------------------------------------");
            unorderedList.forEach(function(name) {console.log(name);});
        }
    };

//=============================================================================
// Generate the list of all YEP Plugins in the correct order, known as the 'key'.
//
// Otherwise, the ordered 'key' was manually determined from the Yanfly website
// on December 4, 2018.
//=============================================================================

    var orderedKey = function() {
        return manualKey();
    };

	var manualKey = function() {
        return [
	//===Core Plugins===
		"YEP_CoreEngine",
		"YEP_X_CoreUpdatesOpt",
		"YEP_AdvancedSwVar",
		"YEP_BaseParamControl",
		"YEP_X_ClassBaseParam",
		"YEP_ClassChangeCore",
		"YEP_X_Subclass",
		"YEP_ExtraParamFormula",
		"YEP_LoadCustomFonts",
		"YEP_MainMenuManager",
		"YEP_MessageCore",
		"YEP_X_ExtMesPack1",
		"YEP_X_ExtMesPack2",
		"YEP_X_MessageMacros1",
		"YEP_X_MessageMacros2",
		"YEP_X_MessageMacros3",
		"YEP_X_MessageMacros4",
		"YEP_X_MessageMacros5",
		"YEP_SaveCore",
		"YEP_X_NewGamePlus",
		"YEP_SelfSwVar",
		"YEP_SpecialParamFormula",
		//===Battle Plugins===
		"YEP_BattleEngineCore",
		"YEP_X_ActSeqPack1",
		"YEP_X_ActSeqPack2",
		"YEP_X_ActSeqPack3",
		"YEP_X_AnimatedSVEnemies",
		"YEP_X_BattleSysATB",
		"YEP_X_VisualATBGauge",
		"YEP_X_BattleSysCTB",
		"YEP_X_BattleSysSTB",
		"YEP_X_CounterControl",
		"YEP_X_InBattleStatus",
		"YEP_X_TurnOrderDisplay",
		"YEP_X_VisualHpGauge",
		"YEP_X_WeakEnemyPoses",
		"YEP_Z_ActionBeginEnd",
		"YEP_AbsorptionBarrier",
		"YEP_BattleAICore",
		"YEP_BattleBgmControl",
		"YEP_BattleSelectCursor",
		"YEP_BattleStatusWindow",
		"YEP_BuffsStatesCore",
		"YEP_X_ExtDoT",
		"YEP_X_StateCategories",
		"YEP_X_TickBasedRegen",
		"YEP_X_VisualStateFX",
		"YEP_Z_StateProtection",
		"YEP_DamageCore",
		"YEP_X_ArmorScaling",
		"YEP_X_CriticalControl",
		"YEP_Z_CriticalSway",
		"YEP_ElementCore",
		"YEP_ExtraEnemyDrops",
		"YEP_ForceAdvantage",
		"YEP_HitAccuracy",
		"YEP_HitDamageSounds",
		"YEP_ImprovedBattlebacks",
		"YEP_LifeSteal",
		"YEP_OverkillBonus",
		"YEP_TargetCore",
		"YEP_X_AreaOfEffect",
		"YEP_X_SelectionControl",
		"YEP_Taunt",
		"YEP_VictoryAftermath",
		"YEP_X_AftermathLevelUp",
		//===Item Plugins===
		"YEP_ItemCore",
		"YEP_X_AttachAugments",
		"YEP_X_ItemDisassemble",
		"YEP_X_ItemDiscard",
		"YEP_X_ItemDurability",
		"YEP_X_ItemCategories",
		"YEP_X_ItemPictureImg",
		"YEP_X_ItemRename",
		"YEP_X_ItemRequirements",
		"YEP_X_ItemUpgradeSlots",
		"YEP_ItemSynthesis",
		"YEP_ShopMenuCore",
		"YEP_X_MoreCurrencies",
		//===Skill Plugins
		"YEP_SkillCore",
		"YEP_X_LimitedSkillUses",
		"YEP_MultiTypeSkills",
		"YEP_X_PartyLimitGauge",
		"YEP_X_SkillCooldowns",
		"YEP_X_SkillCostItems",
		"YEP_Z_SkillRewards",
		"YEP_InstantCast",
		"YEP_SkillLearnSystem",
		//===Equip Plugins===
		"YEP_EquipCore",
		"YEP_X_ChangeBattleEquip",
		"YEP_X_EquipCustomize",
		"YEP_X_EquipRequirements",
		"YEP_WeaponAnimation",
		"YEP_WeaponUnleash",
		//===Status Menu Plugins
		"YEP_StatusMenuCore",
		"YEP_X_ActorVariables",
		"YEP_X_BattleStatistics",
		"YEP_X_MoreStatusPages",
		"YEP_X_ProfileStatusPage",
		//===Gameplay Plugins===
		"YEP_AutoPassiveStates",
		"YEP_X_PassiveAuras",
		"YEP_Z_PassiveCases",
		"YEP_EnemyLevels",
		"YEP_X_DifficultySlider",
		"YEP_X_EnemyBaseParam",
		"YEP_EnhancedTP",
		"YEP_X_MoreTPModes1",
		"YEP_X_MoreTPModes2",
		"YEP_X_MoreTPModes3",
		"YEP_X_MoreTPModes4",
		"YEP_EquipBattleSkills",
		"YEP_X_EBSAllowedTypes",
		"YEP_X_EquipSkillTiers",
		"YEP_JobPoints",
		"YEP_PartySystem",
		"YEP_X_ActorPartySwitch",
		"YEP_RowFormation",
		"YEP_StatAllocation",
		"YEP_StealSnatch",
		//===Movement Plugins===
		"YEP_MoveRouteCore",
		"YEP_X_ExtMovePack1",
		//===Quest Plugins===
		"YEP_QuestJournal",
		"YEP_X_MapQuestWindow",
		"YEP_X_MoreQuests1",
		"YEP_X_MoreQuests2",
		"YEP_X_MoreQuests3",
		"YEP_X_MoreQuests4",
		"YEP_X_MoreQuests5",
		"YEP_X_MoreQuests6",
		"YEP_X_MoreQuests7",
		"YEP_X_MoreQuests8",
		"YEP_X_MoreQuests9",
		"YEP_X_MoreQuests10",
		//===Utility Plugins===
		"YEP_AnimateTilesOption",
		"YEP_AutoSwitches",
		"YEP_BaseTroopEvents",
		"YEP_BattleAniSpeedOpt",
		"YEP_ButtonCommonEvents",
		"YEP_CallEvent",
		"YEP_CommonEventMenu",
		"YEP_X_CEMSetupPack1",
		"YEP_X_CEMSetupPack2",
		"YEP_CreditsPage",
		"YEP_DashToggle",
		"YEP_EventEncounterAid",
		"YEP_EventChasePlayer",
		"YEP_X_EventChaseStealth",
		"YEP_EventMiniLabel",
		"YEP_EventSpriteOffset",
		"YEP_EventTimerControl",
		"YEP_ExternalLinks",
		"YEP_FloorDamage",
		"YEP_FootstepSounds",
		"YEP_FpsSynchOption",
		"YEP_GabWindow",         
		"YEP_GridFreeDoodads",
		"YEP_X_ExtDoodadPack1",
		"YEP_HelpFileAccess",
		"YEP_IconBalloons",
		"YEP_KeyboardConfig",
		"YEP_MainMenuVar",
		"YEP_MapGoldWindow",
		"YEP_MapSelectEquip",
		"YEP_MapSelectSkill",
		"YEP_MapStatusWindow",
		"YEP_MusicMenu",
		"YEP_PictureCommonEvents",
		"YEP_RegionBattlebacks",
		"YEP_RegionEvents",
		"YEP_RegionRestrictions",
		"YEP_X_VehicleRestrict",
		"YEP_RepelLureEncounters",
		"YEP_SaveEventLocations",
		"YEP_ScaleSprites",
		"YEP_SectionedGauges",
		"YEP_SegmentedGauges",
		"YEP_SlipperyTiles",
		"YEP_SmartJump",
		"YEP_StopMapMovement",
		"YEP_SwapEnemies",
		"YEP_UtilityCommonEvents",
		//===Dragonbones===
        "KELYEP_DragonBones",
        //===Misc Plugins===
        "ALOE_YEP_PluginOrderChecker"
	//"YEP_ElementAbsorb" no order found on yanfly.moe
	//"YEP_ElementReflect" no order found on yanfly.moe
	//"YEP_KeyNameEntry" no order found on yanfly.moe
	//"YEP_PictureAnimations" no order found on yanfly.moe
        ];
    };


    checkPluginOrder();
})();