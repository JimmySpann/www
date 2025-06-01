//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Core.js        (will be embedded in all of my plugins)
//=============================================================================
/* DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!     *
 * Copyright(c) 2020, Marko Paakkunainen // mmp_81 (at) hotmail.com         */
"use strict"; var ShaderTilemap = ShaderTilemap || false; var Imported = Imported || {}; var Yanfly = Yanfly || {}; // In case there's no Yanfly plugins in use
if (!Imported.OcRam_Core) { // OcRam_Core has only the functionality which are used widely in all OcRam plugins...
    Game_Interpreter.prototype.event = function () { /* Get Game_Event in event editor like: this.event(); */ return ($gameMap) ? $gameMap.event(this._eventId) : null; };
    Game_Map.prototype.getEventsByName = function (event_name) { /* Get Game_Map events by name */ return this._events.filter(function (ev) { return ev.event().name == event_name; }); };
    Game_Event.prototype.getComments = function () { /* Returns all comments + commandIndex from Game_Event as Array */ if (this._erased || this._pageIndex < 0) return []; var comments = []; var i = 0; this.list().forEach(function (p) { if (p.code == 108) { p.commandIndex = i; comments.push(p); } i++; }); return comments; };
    Game_Event.prototype.getStringComments = function () { /* Returns all comments from Game_Event as String Array */ if (this._erased || this._pageIndex < 0) return []; var comments = []; this.list().filter(function (c) { return c.code == 108; }).forEach(function (p) { p.parameters.forEach(function (s) { comments.push(s); }); }); return comments; };
    ImageManager.loadOcRamBitmap = function (filename, hue) {  /* Load bitmap from ./img/ocram folder */ return this.loadBitmap('img/ocram/', filename, hue, false); };
    Imported.OcRam_Core = true; var OcRam_Core = OcRam_Core || function () { /* OcRam core class */ this.initialize.apply(this, arguments); };
    OcRam_Core.prototype.initialize = function () { /* Initialize OcRam core */ this.name = "OcRam_Core"; this.version = "1.05"; this.twh = [48, 48]; this.twh50 = [24, 24]; this.radian = Math.PI / 180; this._isIndoors = false; this._screenTWidth = Graphics.width / 48; this._screenTHeight = Graphics.height / 48; this.plugins = []; this._menuCalled = false; this.Scene_Map_callMenu = Scene_Map.prototype.callMenu; this.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded; };
    OcRam_Core.prototype.debug = function () { /* Debug core? console.log("OcRam_Core", arguments); */ };
    OcRam_Core.prototype.getBoolean = function (s) { /* Get 'safe' boolean */ if (!s) return false; s = s.toString().toLowerCase(); return (s == "true" && s != "0") ? true : false; };
    OcRam_Core.prototype.getArray = function (a, b) { /* Get plugin param array */ return a ? eval(a) : b || []; };
    OcRam_Core.prototype.getFloat = function (n) { /* Get float */ return isNaN(n - parseFloat(n)) ? 0 : parseFloat(n); };
    OcRam_Core.prototype.regulateRGBG = function (obj) { /* Regulate RGBG value (used in tints) */ obj.Red = parseInt(obj.Red).clamp(-255, 255); obj.Green = parseInt(obj.Green).clamp(-255, 255); obj.Blue = parseInt(obj.Blue).clamp(-255, 255); obj.Gray = parseInt(obj.Gray).clamp(-255, 255); return obj; };
    OcRam_Core.prototype.regulateHexRGBA = function (p) { /* Regulate HEX RGBA value */ if (p.substr(0, 1) !== "#") p = "#" + p; if (p.length == 7) p = p + "ff"; return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p)[0] || "#ffffffff"; }
    OcRam_Core.prototype.getJSON = function (s) { /* Get 'safe' JSON */ try { return JSON.parse(s); } catch (ex) { return null; } };
    OcRam_Core.prototype.getJSONArray = function (a) { /* Get 'safe' JSON Array */ var tmp = []; if (a) { OcRam.getArray(a, []).forEach(function (s) { tmp.push(OcRam.getJSON(s)); }); } return tmp; };
    OcRam_Core.prototype.followers = function () { /* Only a shortcut to $gamePlayer._followers.visibleFollowers(); */ return $gamePlayer ? $gamePlayer._followers.visibleFollowers() : []; };
    OcRam_Core.prototype.setIndoorsFlag = function () { /* Set indoors flag - Each plugin will call this when needed */ if (DataManager.isEventTest()) return; if ($dataMap.meta["indoors"] !== undefined) { this.debug("Indoors meta tag found in MAP note field!", $dataMap.meta); this._isIndoors = true; } else { if ($dataTilesets[$dataMap.tilesetId].meta["indoors"] !== undefined) { this.debug("Indoors meta tag found in TILESET note field!", $dataTilesets[$dataMap.tilesetId].meta); this._isIndoors = true; } else { this.debug("Indoors meta tag was NOT found!", undefined); this._isIndoors = false; } } };
    OcRam_Core.prototype.isIndoors = function () { /* Get indoors flag */ return this._isIndoors; };
    OcRam_Core.prototype.runCE = function (pCE_Id) { /* Run common event */ if ($gameTemp.isCommonEventReserved()) { var tmpId = pCE_Id; var tc = this; setTimeout(function () { tc.runCE(tmpId); }, 17); } else { $gameTemp.reserveCommonEvent(pCE_Id); } };
    OcRam_Core.prototype.extendMethod = function (c, b, cb) { /* Extend/override any method */ c[b] = function () { return cb.apply(this, arguments); }; };
    OcRam_Core.prototype.extendProto = function (c, b, cb) { /* Extend/override any proto */ c.prototype[b] = function () { return cb.apply(this, arguments); }; };
    OcRam_Core.prototype.addPlugin = function (name, version) { /* Initialize new OcRam plugin */ this[name] = {}; var new_plugin = this[name]; Imported["OcRam_" + name] = true; this.plugins.push(name); this[name]._menuCalled = false; new_plugin.name = name; new_plugin.version = version; new_plugin.parameters = PluginManager.parameters("OcRam_" + new_plugin.name); if (this.getBoolean(new_plugin.parameters["Debug mode"])) { new_plugin.debug = function () { var args = [].slice.call(arguments); args.unshift("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", ":"); console.log.apply(console, args); }; console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Debug mode:", "Enabled"); console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Parameters:", new_plugin.parameters); } else { new_plugin.debug = function () { }; } var oc = this; new_plugin.extend = function (c, b, cb) { var cb_name = c.name + "_" + b; if (c[b]) { this[cb_name] = c[b]; oc.extendMethod(c, b, cb); } else { this[cb_name] = c.prototype[b]; oc.extendProto(c, b, cb); } }; }; var OcRam = new OcRam_Core(); // Create new OcRam_Core! (Below aliases)
    Scene_Map.prototype.callMenu = function () { /* Menu called? */ OcRam.Scene_Map_callMenu.call(this); OcRam.debug("Menu called:", true); OcRam._menuCalled = true; OcRam.plugins.forEach(function (p) { OcRam[p]._menuCalled = true; }); };
    Scene_Map.prototype.onMapLoaded = function () { /* Set and get tile dimensions and indoors flag */ OcRam.Scene_Map_onMapLoaded.call(this); if (!OcRam._menuCalled) { OcRam.twh = [$gameMap.tileWidth(), $gameMap.tileHeight()]; OcRam.twh50 = [OcRam.twh[0] * 0.5, OcRam.twh[1] * 0.5]; OcRam._screenTWidth = Graphics.width / OcRam.twh[0]; OcRam._screenTHeight = Graphics.height / OcRam.twh[1]; OcRam.debug("Tile w/h:", OcRam.twh); OcRam.setIndoorsFlag(); OcRam.menuCalled = false; } };
    CanvasRenderingContext2D.prototype.line = function (x1, y1, x2, y2) { /* Draw line to canvas context */ this.beginPath(); this.moveTo(x1, y1); this.lineTo(x2, y2); this.stroke(); };
    Game_Map.prototype.adjustX_OC = function (x) { /* Optimized core adjustX */ if (this.isLoopHorizontal()) { if (x < this._displayX - (this.width() - this.screenTileX()) * 0.5) { return x - this._displayX + $dataMap.width; } else { return x - this._displayX; } } else { return x - this._displayX; } };
    Game_Map.prototype.adjustY_OC = function (y) { /* Optimized core adjustY */ if (this.isLoopVertical()) { if (y < this._displayY - (this.height() - this.screenTileY()) * 0.5) { return y - this._displayY + $dataMap.height; } else { return y - this._displayY; } } else { return y - this._displayY; } };
    Game_CharacterBase.prototype.screenX_OC = function () { /* Optimized core screenX */ return Math.round($gameMap.adjustX_OC(this._realX) * OcRam.twh[0] + OcRam.twh50[0]); };
    Game_CharacterBase.prototype.screenY_OC = function () { /* Optimized core screenY */ return Math.round($gameMap.adjustY_OC(this._realY) * OcRam.twh[1] + OcRam.twh50[0] - this.shiftY() - this.jumpHeight()); };
} if (parseFloat(OcRam.version) < 1.05) alert("OcRam core v1.05 is required!");

//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Parallels_EX.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); OcRam.addPlugin("Parallels_EX", "1.02");

/*:
 * @plugindesc v1.02 Parallel extensions (Run once or on var/switch changes). 
 * PLUGIN NAME MUST BE OcRam_Parallels_EX.js
 * @author OcRam
 * 
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 * 
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                                      (Embedded OcRam_Core v1.5)
 * ============================================================================
 * Sometimes autorun event is not enough to do the job. Usually these events
 * are erased and will not be called again after menu nor battle scene. 
 * And then parallel events are executed in EVERY frame! That is not very
 * efficient way if task needs to be done only once...
 *
 * If some events needs to be called (refreshed) on scene start (after other
 * scenes like menu/battle) OR...
 * when variable/switch has been changed - This plugin is Your answer.
 *
 * ----------------------------------------------------------------------------
 * Usage
 * ============================================================================
 * Put <run_once> COMMENT to desired parallel events to run them only once at
 * scene start (transfer, after menu, battle etc...)
 *
 * <trigger_var:1:2:5:> run parallel if one of the variables has been changed.
 * <trigger_sw:1:4:76:> run parallel if one of the switches has been changed.
 * 
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your project by ANY MEANS (including: donations,
 * crypto-mining, micro-transactions, advertisements, merchandises etc..)
 * it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard licenses requires credits.
 * ALL of my plugins for 1 project = 40 EUR (standard licenses).
 *
 * License for lifetime is 3x base price of any license / bundle. Permission
 * to use this type of license only in projects where you own most of it.
 * Else project license OR project owner lifetime license is required.
 *
 * https://forums.rpgmakerweb.com/index.php?threads/ocram-parallels.93934
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2018/04/14 v1.00 - Initial release
 * 2020/06/12 v1.01 - Changed project title to OcRam_Parallels_EX
 *                    OcRam_Core v1.5
 * 2020/06/15 v1.02 - Fixed bug on single var/switch parallel notation
 *                    (Credits to PresaDePrata)
 *                    
 */
/*
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     - None -
 */

(function () {

    var _this = this;

    // ------------------------------------------------------------------------------
    // RMMV core - Aliases
    // ==============================================================================

    this.extend(Scene_Map, "start", function () {
        _this["Scene_Map_start"].apply(this, arguments);
        var ev = null; var cmt = ""; var arr = "";
        for (var i = 0; i < $gameMap.events().length; i++) {
            ev = $gameMap.events()[i];
            if (ev._trigger === 4) { // Get parallel events
                ev._run_once = false;
                for (var j = 0; j < ev.list().length; j++) {
                    if (ev.list()[j].code == 108) { // Get tagged parallels
                        cmt = (ev.list()[j].parameters[0]).toLowerCase();
                        if (cmt == "<run_once>") {
                            ev.setupParallel_OC();
                        } else if (cmt.substring(0, 13) == "<trigger_var:") {
                            if (ev.parallel_variables == undefined) {
                                arr = cmt.replace(cmt.substring(0, 13), "");
                                arr = arr.replace(":>", "");
                                if (arr.indexOf(":") > -1) {
                                    ev.parallel_variables = arr.split(":");
                                    ev.setupParallel_OC();
                                } else {
                                    ev.parallel_variables = [Number(arr)];
                                    ev.setupParallel_OC();
                                }
                            }
                        } else if (cmt.substring(0, 12) == "<trigger_sw:") {
                            if (ev.parallel_variables == undefined) {
                                arr = cmt.replace(cmt.substring(0, 12), "");
                                arr = arr.replace(":>", "");
                                if (arr.indexOf(":") > -1) {
                                    ev.parallel_switches = arr.split(":");
                                    ev.setupParallel_OC();
                                } else {
                                    ev.parallel_switches = [Number(arr)];
                                    ev.setupParallel_OC();
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    this.extend(Game_Event, "updateParallel", function () {
        if (this.variablesChanged_OC()) this.setupParallel_OC();
        if (this.switchesChanged_OC()) this.setupParallel_OC();
        if (this._interpreter) {
            if (this._run_once) { // Run only once per scene start (including after menu / battle etc...)
                _this["Game_Event_updateParallel"].apply(this, arguments);
                this._interpreter = null;
            } else { // Run normally
                _this["Game_Event_updateParallel"].apply(this, arguments);
            }
        }
    });

    // ------------------------------------------------------------------------------
    // RMMV core - New methods
    // ==============================================================================

    Game_Event.prototype.variablesChanged_OC = function () {
        if (this.parallel_variables != undefined) {
            if (this.parallel_variables.length < 1) return false;
            for (var i = 0; i < this.parallel_variables.length; i++) {
                if ($gameVariables.value(parseInt(this.parallel_variables[i])) != this.parallel_variable_values[i]) {
                    this.parallel_variable_values[i] = $gameVariables.value(parseInt(this.parallel_variables[i]));
                    return true;
                }
            }
        } else {
            return false;
        }
    };

    Game_Event.prototype.switchesChanged_OC = function () {
        if (this.parallel_switches != undefined) {
            if (this.parallel_switches.length < 1) return false;
            for (var i = 0; i < this.parallel_switches.length; i++) {
                if ($gameSwitches.value(parseInt(this.parallel_switches[i])) != this.parallel_switch_values[i]) {
                    this.parallel_switch_values[i] = $gameSwitches.value(parseInt(this.parallel_switches[i]));
                    return true;
                }
            }
        } else {
            return false;
        }
    };

    Game_Event.prototype.setupParallel_OC = function () {
        this._run_once = true; // Setup parallel once again...
        if (this.parallel_variables != undefined) {
            this.parallel_variable_values = [];
            for (var i = 0; i < this.parallel_variables.length; i++) {
                this.parallel_variable_values.push($gameVariables.value(parseInt(this.parallel_variables[i])));
            }
        }
        if (this.parallel_switches != undefined) {
            this.parallel_switch_values = [];
            for (var i = 0; i < this.parallel_switches.length; i++) {
                this.parallel_switch_values.push($gameSwitches.value(parseInt(this.parallel_switches[i])));
            }
        }
        this._interpreter = new Game_Interpreter();
        if (!this._interpreter.isRunning()) {
            this._interpreter.setup(this.list(), this._eventId);
        }
    };

}.bind(OcRam.Parallels_EX)());