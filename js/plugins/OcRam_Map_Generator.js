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
// OcRam plugins - OcRam_Map_Generator.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); OcRam.addPlugin("Map_Generator", "1.01");

/*:
 * @plugindesc v1.00 Generate maps procedurally!
 * PLUGIN NAME MUST BE OcRam_Map_Generator.js
 * @author OcRam
 *
 * @param Boss slayed Switch Id
 * @type switch
 * @desc To determinate if dungeon boss is slayed!
 * @default 0
 *
 * @param Debug mode
 * @parent Other parameters
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 * 
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                                      (Embedded OcRam_Core v1.5)
 * ============================================================================
 * This plugin will generate maps for you! Use only A3 floor/wall/roof tiles!
 * PARAMS: Boss_Switch
 *
 * ----------------------------------------------------------------------------
 * Usage
 * ============================================================================
 * 1. Create map with size 27 x 18
 *   2. Paint 1st row with wall tiles and draw debris rnd pattern
 *   3. Paint 2nd + 3rd row with wall tile and draw debris
 *   4. Paint 4th row with floor tile and draw PASSABLE debris
 *   5. Paint 5th row with IMPASSABLE debris
 *   6. Paint 6th + 7th row with 2 tiles height debris (lower part impassable)
 * 7. Create events with META tags (and pathtiles, if mines is in use)
 *
 * Possible generator presets:
 *      0 = Dungeon (passages and rooms)
 *      1 = Sewers  (passages only)
 *      2 = Castle  (hallways and rooms x or y is symmetric)
 *      3 = Indoors (hallways + lot of rooms)
 *      4 = Caves   (undefined paths)
 *      5 = Forest  (undefined paths + larger spaces)
 *      6 = Maze    (dense set of rooms with 1 - 3 walls removed)
 *      7 = Mine1   (passages, rooms and path)
 *      8 = Mine2   (passages and path)
 *      * = RANDOM!
 *
 * ----------------------------------------------------------------------------
 * Usage - Meta tags
 * ============================================================================
 * Use map meta to define generator default parameters!
 *      <generate-map>  (tell plugin that this map should be randomized!)
 *      <preset:0>      (which preset should be used as default)
 *      <floor:3:1>     (floor tile in format: row:col)
 *      <wall:7:1>      (wall tile in format: row:col)
 *      <roof:8:1>      (roof tile in format: row:col)
 *      <width:3-6>     (map width in blocks / in tiles it's value = x9)
 *      <height:2-3>    (map height in blocks / in tiles it's value = x9)
 *      <debris:100>    (if debris is randomized 100% chance to draw it)
 *      <levels:4>      (how many levels there are?)
 *
 * Use event meta tags to define in which levels and with what are chance for
 * these events appear! And which event is 'boss' and what treasures it gives!
 *      <boss>          (this is boss doh?)
 *      <levels:1,3>    (appears on levels 1 and 3)
 *      <chance:20>     (appears with 20% chance)
 *
 * ----------------------------------------------------------------------------
 * Usage - Plugin commands
 * ============================================================================
 *
 * init_generator set:0 floor:3:1 wall:7:1 roof:8:1 w:3-6 h:2-3 levels:4
 *     Shorter version of above: init_generator 0 3:1 7:1 8:1 3-6 2-3 4
 *     Ommit level param for NO RESET: init_generator 0 3:1 7:1 8:1 3-6 2-3
 *
 * reset_generator (will delete map set cache + params)
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
 * COMMERCIAL USE: (Standard license: 20 EUR, No-credits license: 60 EUR)
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
 * https://forums.rpgmakerweb.com/index.php?threads/ocram-map-generator.123456
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2???/??/?? v1.00 - Initial release
 */
/*
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     Game_Map.prototype.data
 */

(function () {

    var _params = PluginManager.parameters('OcRam_Map_Generator');

    var _debugMode = getBoolean(_params['Debug mode']); if (_debugMode) oc_debug("Debug mode: Enabled, Plugin parameters:", _params);

    var _roofs = []; // Roof tiles here
    var _walls = []; // Wall tiles here
    var _floorTileId = 0;
    var _triesToConnect = 0;

    var _roofDeco = []; var _wallDeco = []; var _floorDeco = []; // Decorations
    var _baseData = null; var _savedFlags = null; var _blockMatrix = null;

    var _usePassages = (OcRam.Passages) ? true : false;

    if (_usePassages) {
        if (parseFloat(OcRam.Passages.version) >= 3) {
            oc_debug("Loading OcRam_Passages...", "Done!");
        } else {
            oc_debug("Loading OcRam_Passages...", "Please update OcRam_Passages!");
            _usePassages = false;
        }
    }

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    var OC_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        switch (command) {
            case "init_generator": oc_debug("init_generator", args);
                break;
            case "reset_generator": oc_debug("reset_generator", args);
                break;
            default:
                OC_Game_Interpreter_pluginCommand.call(this, command, args);
        }
    };

    // ------------------------------------------------------------------------------
    // Block_Data - Randomized blocks
    // ==============================================================================
    var _lr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var _tb = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _lt = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [2, 2, 2, 2, 1, 1, 2, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var _rt = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 2, 2],
        [0, 0, 0, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var _rb = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 2, 1, 1, 2, 2, 2],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _lb = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [2, 2, 2, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _lrtb = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [2, 2, 2, 2, 1, 1, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 1, 1, 2, 2, 2],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _lrt = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [2, 2, 2, 2, 1, 1, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var _lrb = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 1, 1, 2, 2, 2],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _rtb = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 2, 2],
        [0, 0, 0, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 2, 1, 1, 1, 1, 1],
        [0, 0, 0, 2, 1, 1, 2, 2, 2],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _ltb = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [2, 2, 2, 2, 1, 1, 2, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [2, 2, 2, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _l = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [1, 1, 1, 1, 1, 1, 2, 0, 0],
        [2, 2, 2, 1, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var _r = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2],
        [0, 0, 2, 1, 1, 1, 1, 1, 1],
        [0, 0, 2, 1, 1, 1, 1, 1, 1],
        [0, 0, 2, 1, 1, 1, 2, 2, 2],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var _t = [
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 2, 1, 1, 1, 1, 2, 0],
        [0, 0, 2, 1, 1, 1, 1, 2, 0],
        [0, 0, 2, 1, 1, 1, 1, 2, 0],
        [0, 0, 0, 2, 2, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var _b = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 0, 0],
        [0, 0, 2, 1, 1, 1, 1, 2, 0],
        [0, 0, 2, 1, 1, 1, 1, 2, 0],
        [0, 0, 2, 1, 1, 1, 1, 2, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0],
        [0, 0, 0, 2, 1, 1, 2, 0, 0]
    ];

    var _ = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    function Block_Data() {
        this.initialize.apply(this, arguments);
    }

    Block_Data.prototype.initialize = function (parent, x, y) {

        // Consists of tiles 9 x 9

        this._bx = x; this._by = y;
        this._parent = parent;

        this._leftJoins = 16; // max: 511
        this._rightJoins = 16;
        this._topJoins = 16;
        this._bottomJoins = 16;

        this._bcd = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        //oc_debug("New Block_Data", this);

    };

    Block_Data.prototype.connectToStart = function () {

        if (this._connectedToStart) return;
        var tnc = this._connectedToStart;

        var at = this._parent._tiles_OC[this._by][this._bx + 1];
        if (at !== undefined) {
            if ((at._leftJoins != 0 || this._rightJoins != 0) && cc(at._connectedToStart, tnc)) {
                at._sb_str = joinStr(at._sb_str, "l"); at._leftJoins = 16; at.createDungeonBlock();
                this._sb_str = joinStr(this._sb_str, "r"); this._rightJoins = 16; this.createDungeonBlock();
                if (tnc) { at._connectedToStart = true; } else { this._connectedToStart = true; }
            }
        }

        at = this._parent._tiles_OC[this._by][this._bx - 1];
        if (at !== undefined) {
            if ((at._rightJoins != 0 || this._leftJoins != 0) && cc(at._connectedToStart, tnc)) {
                at._sb_str = joinStr(at._sb_str, "r"); at._rightJoins = 16; at.createDungeonBlock();
                this._sb_str = joinStr(this._sb_str, "l"); this._leftJoins = 16; this.createDungeonBlock();
                if (tnc) { at._connectedToStart = true; } else { this._connectedToStart = true; }
            }
        }

        at = this._parent._tiles_OC[this._by + 1];
        if (at !== undefined) at = at[this._bx];
        if (at !== undefined) {
            if ((at._topJoins != 0 || this._bottomJoins) != 0 && cc(at._connectedToStart, tnc)) {
                at._sb_str = joinStr(at._sb_str, "t"); at._topJoins = 16; at.createDungeonBlock();
                this._sb_str = joinStr(this._sb_str, "b"); this._bottomJoins = 16; this.createDungeonBlock();
                if (tnc) { at._connectedToStart = true; } else { this._connectedToStart = true; }
            }
        }

        at = this._parent._tiles_OC[this._by - 1];
        if (at !== undefined) at = at[this._bx];
        if (at !== undefined) {
            if ((at._bottomJoins != 0 || this._topJoins != 0) && cc(at._connectedToStart, tnc)) {
                at._sb_str = joinStr(at._sb_str, "b"); at._bottomJoins = 16; at.createDungeonBlock();
                this._sb_str = joinStr(this._sb_str, "t"); this._topJoins = 16; this.createDungeonBlock();
                if (tnc) { at._connectedToStart = true; } else { this._connectedToStart = true; }
            }
        }

    };

    Block_Data.prototype.refreshConnections = function () {

        if (!this._connectedToStart) return;

        var at = this._parent._tiles_OC[this._by][this._bx + 1];
        if (at !== undefined) {
            if (at._leftJoins != 0 && this._rightJoins != 0 && !at._connectedToStart) {
                at._connectedToStart = true; at.refreshConnections();
            }
        }

        at = this._parent._tiles_OC[this._by][this._bx - 1];
        if (at !== undefined) {
            if (at._rightJoins != 0 && this._leftJoins != 0 && !at._connectedToStart) {
                at._connectedToStart = true; at.refreshConnections();
            }
        }

        at = this._parent._tiles_OC[this._by + 1];
        if (at !== undefined) at = at[this._bx];
        if (at !== undefined) {
            if (at._topJoins != 0 && this._bottomJoins != 0 && !at._connectedToStart) {
                at._connectedToStart = true; at.refreshConnections();
            }
        }

        at = this._parent._tiles_OC[this._by - 1];
        if (at !== undefined) at = at[this._bx];
        if (at !== undefined) {
            if (at._bottomJoins != 0 && this._topJoins != 0 && !at._connectedToStart) {
                at._connectedToStart = true; at.refreshConnections();
            }
        }

    };

    Block_Data.prototype.disabledCount = function () {
        var c = 0;
        if (this._leftJoins == 0) c++;
        if (this._rightJoins == 0) c++;
        if (this._topJoins == 0) c++;
        if (this._bottomJoins == 0) c++;
        return c;
    };

    Block_Data.prototype.disableOne = function () {
        switch (Math.randomInt(3)) {
            case 0:
                if (this._leftJoins != 0) { this._leftJoins = 0; break; }
                if (this._rightJoins != 0) { this._rightJoins = 0; break; }
                if (this._topJoins != 0) { this._topJoins = 0; break; }
                if (this._bottomJoins != 0) { this._bottomJoins = 0; break; }
            case 1:

                if (this._rightJoins != 0) { this._rightJoins = 0; break; }
                if (this._topJoins != 0) { this._topJoins = 0; break; }
                if (this._bottomJoins != 0) { this._bottomJoins = 0; break; }
                if (this._leftJoins != 0) { this._leftJoins = 0; break; }
            case 2:

                if (this._topJoins != 0) { this._topJoins = 0; break; }
                if (this._bottomJoins != 0) { this._bottomJoins = 0; break; }
                if (this._leftJoins != 0) { this._leftJoins = 0; break; }
                if (this._rightJoins != 0) { this._rightJoins = 0; break; }
            case 3:
                if (this._bottomJoins != 0) { this._bottomJoins = 0; break; }
                if (this._leftJoins != 0) { this._leftJoins = 0; break; }
                if (this._rightJoins != 0) { this._rightJoins = 0; break; }
                if (this._topJoins != 0) { this._topJoins = 0; break; }
        }
    };

    Block_Data.prototype.randomize = function () {

        switch (this._parent._preset) {
            case 'dungeon': this.rndDungeon(); break; // Dungeon (rnd passages and some rooms)
            case 1: break; // Sewers (sharp passages and rooms)
            case 2: break; // Castle (hallways and rooms + x or y is symmetric)
            case 3: break; // Indoors (hallways + lot of rooms)
            case 4: break; // Caves (undefined paths)
            case 5: break; // Forest (undefined paths + larger spaces)
            case 6: break; // Maze (dense set of rooms with 1 - 3 walls removed)
            case 7: break; // Mine1 (passages, rooms and path)
            case 8: break; // Mine2 (passages and path)
            default:
        }

    };

    Block_Data.prototype.setPlayerToStartPos = function () {
        if (this._parent._playerStart == "l") setPlayerToPos_OC(0, ((this._by + 1) * 9) - 4, 6);
    };

    function setPlayerToPos_OC(x, y, d) {
        $gamePlayer._transferring = true;
        $gamePlayer._newMapId = 20;
        $gamePlayer._newX = x;
        $gamePlayer._newY = y;
        $gamePlayer._newDirection = d;
        $gamePlayer._fadeType = 0;
    }

    Block_Data.prototype.rndDungeon = function () {

        // EDGE CHECK
        if (this._bx <= 0) this._leftJoins = 0;
        if (this._bx >= this._parent._width - 1) this._rightJoins = 0;
        if (this._by <= 0) this._topJoins = 0;
        if (this._by >= this._parent._height - 1) this._bottomJoins = 0;

        this._connectedToStart = false; // By default nothing is connected to start pos...

        if (this._parent._playerStartPos[0] == this._bx && this._parent._playerStartPos[1] == this._by) {
            if (this._leftJoins == 0 && this._parent._playerStart == "l") this._leftJoins = 16;
            if (this._rightJoins == 0 && this._parent._playerStart == "r") this._rightJoins = 16;
            if (this._topJoins == 0 && this._parent._playerStart == "t") this._topJoins = 16;
            if (this._bottomJoins == 0 && this._parent._playerStart == "b") this._bottomJoins = 16;
            this.setPlayerToStartPos();
            this._connectedToStart = true;
        } else {
            if (this.disabledCount() < 3) {
                this.disableOne();
            }
        }

        // _lrtb constructing
        var sb = "_"; if (this._leftJoins != 0) sb += "l";
        if (this._rightJoins != 0) sb += "r";
        if (this._topJoins != 0) sb += "t";
        if (this._bottomJoins != 0) sb += "b";

        // Create initial block
        this._sb_str = sb; this.createDungeonBlock();

        if (this._by >= this._parent._height - 1 && this._bx >= this._parent._width - 1) {

            //console.log("PLAYER START POS?", this._parent._playerStartPos[0], this._parent._playerStartPos[1]);
            this._parent._tiles_OC[this._parent._playerStartPos[1]][this._parent._playerStartPos[0]].refreshConnections();
            this._parent._tiles_OC[this._parent._playerStartPos[1]][this._parent._playerStartPos[0]].connectToStart();

            // Last block was randomized now connect some stuff...
            var ab = this._parent._tiles_OC; var tb = null;
            var has_unconnected_blocks = true;
            var limiter = ab.length * ab[0].length;
            while (has_unconnected_blocks && _triesToConnect < limiter) {
                has_unconnected_blocks = false;
                for (var y2 = 0; y2 < ab.length; y2++) {
                    for (var x2 = 0; x2 < ab[y2].length; x2++) {
                        tb = ab[y2][x2];
                        if (!tb._connectedToStart) {
                            _triesToConnect++;
                            tb.connectToStart(); tb.refreshConnections();
                            has_unconnected_blocks = true;
                        }
                    }
                }
            } oc_debug("Tries until all paths were connected:", _triesToConnect);

            // Connections failed... try again
            if (_triesToConnect >= limiter) {
                oc_debug("Connections failed... try again - Tries:", _triesToConnect);
                this._parent.initMap(); //rndDungeon();
            }

        }
        
    };

    Block_Data.prototype.createDungeonBlock = function () {

        var tb = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        var t2 = eval(this._sb_str);

        for (var y = 0; y < tb.length; y++) {
            for (var x = 0; x < tb[y].length; x++) {
                tb[y][x] = 0;
                if (t2[y][x] == 1) tb[y][x] = _floorTileId;
                if (t2[y][x] == 2) {
                    //if (this.neighbours(tb, x, y, _floor) > 0) {
                    tb[y][x] = (1 * Math.random() > 0.6) ? _floorTileId : 0;
                    //} else {
                    //    tb[y][x] = 0;
                    //}
                    
                }
            }
        }

        // Fill 'empty' holes
        var t = null;
        for (y = 0; y < tb.length; y++) {
            for (x = 0; x < tb[y].length; x++) {
                if (tb[y][x] == 0) {
                    if (this.neighbours(tb, x, y, _floorTileId) > 3) tb[y][x] = _floorTileId;
                }
            }
        }

        // Clear seperate 'islands'
        for (y = 0; y < tb.length; y++) {
            for (x = 0; x < tb[y].length; x++) {
                if (tb[y][x] == _floorTileId) {
                    if (this.neighbours(tb, x, y, 0) > 3) tb[y][x] = 0;
                }
            }
        }

        this._bcd = tb;

    };

    Block_Data.prototype.neighbours = function (bcd, x, y, tile_id) {
        var count = 0;
        var tester = bcd[y][x + 1];
        if (tester !== undefined) {
            if (tester == tile_id) count++;
        } tester = bcd[y][x - 1];
        if (tester !== undefined) {
            if (tester == tile_id) count++;
        } tester = bcd[y - 1];
        if (tester !== undefined) tester = tester[x];
        if (tester !== undefined) {
            if (tester == tile_id) count++;
        } tester = bcd[y + 1];
        if (tester !== undefined) tester = tester[x];
        if (tester !== undefined) {
            if (tester == tile_id) count++;
        } return count;
    };

    Block_Data.prototype.rndSewers = function () {

        for (var y = 0; y < this._bcd.length; y++) {
            for (var x = 0; x < this._bcd[y].length; x++) {
                this._bcd[y][x] = (1 * Math.random() > 0.5) ? _floorTileId : 0;
            }
        }

    };

    Block_Data.prototype.rndCastle = function () {

        for (var y = 0; y < this._bcd.length; y++) {
            for (var x = 0; x < this._bcd[y].length; x++) {
                this._bcd[y][x] = (1 * Math.random() > 0.5) ? _floorTileId : 0;
            }
        }

    };

    // ------------------------------------------------------------------------------
    // Block_Matrix - Matrix which consists of several Block_Data objects
    // ==============================================================================
    function Block_Matrix() {
        this.initialize.apply(this, arguments);
    }

    Block_Matrix.prototype.initialize = function (preset, w, h, debris, levels, game_map) {

        this._preset = preset || 'dungeon';
        this._width = w;
        this._height = h;
        this._debris = debris;
        this._levels = levels;
        this._parent = game_map;

        /*switch (Math.randomInt(4)) {
            case 0: this._playerStart = "l"; break;
            case 1: this._playerStart = "r"; break;
            case 2: this._playerStart = "t"; break;
            case 3: this._playerStart = "b"; break;
            default: this._playerStart = "m"; break;
        }*/
        
        this._playerStart = "l";

        //oc_debug("New Block_Matrix", this);

        _roofDeco = []; _wallDeco = []; _floorDeco = [];
        $gameMap.readDecorations_OC();

        $dataMap.width = this._width * 9; $dataMap.height = this._height * 9;

        this.initMap();

    };

    Block_Matrix.prototype.initMap = function () {

        _triesToConnect = 0;

        // Clear old tiles
        this.saveDebrisAndClear();

        this._tiles_OC = [];
        this._playerStartPos = [0, 0];
        this._endPos = [0, 0];
        var w = this._width; var h = this._height;

        // Player start-up (lrtbm)
        if (this._playerStart == "l") {
            this._playerStartPos = [0, Math.randomInt(this._height)];
        } else if (this._playerStart == "r") {
            this._playerStartPos = [this._width - 1, Math.randomInt(this._height)];
        } else if (this._playerStart == "t") {
            this._playerStartPos = [Math.randomInt(this._width), 0];
        } else if (this._playerStart == "b") {
            this._playerStartPos = [Math.randomInt(this._width), this._height - 1];
        } else {
            this._playerStartPos = [Math.randomInt(this._width), Math.randomInt(this._height)];
        }

        //$gamePlayer.locate((this._playerStartPos[0] * 9 + 5), (this._playerStartPos[1] * 9 + 5));

        // Randomize BLOCKS
        for (var y = 0; y < h; y++) {
            this._tiles_OC.push(y); this._tiles_OC[y] = [];
            for (var x = 0; x < w; x++) {
                this._tiles_OC[y].push(new Block_Data(this, x, y));
                this._tiles_OC[y][x].randomize();
            }
        }

    };

    Block_Matrix.prototype.saveDebrisAndClear = function () {
        
        for (var i = 0; i < this._parent._data.length; i++) {
            this._parent._data[i] = 0;
        }
    };
    
    Block_Matrix.prototype.getTileId = function (x, y) {
        var t = this._tiles_OC[Math.floor(y / 9)][Math.floor(x / 9)];
        if (t === undefined) {
            return 0;
        } else {
            return t._bcd[y % 9][x % 9];
        }
    };

    Block_Matrix.prototype.setTileId = function (x, y, val) {
        var t = this._tiles_OC[Math.floor(y / 9)][Math.floor(x / 9)];
        if (t !== undefined) t._bcd[y % 9][x % 9] = val;
    };

    Game_Map.prototype.furnishBlockMatrix_OC = function () {

        //var upper_tile = 0; var lower_tile = 0;
        var tileId = 0; var y = 0; var x = 0;

        // DRAW WALLS
        var blnDrawWallOnNextEmpty = false;
        for (x = $gameMap.width() - 1; x > -1; x--) {
            for (y = $gameMap.height() - 1; y > -1; y--) {
                tileId = _blockMatrix.getTileId(x, y);
                if (blnDrawWallOnNextEmpty) {
                    if (tileId == 0) { // DRAW WALL!
                        _blockMatrix.setTileId(x, y - 1, 6274); // upper part 6275, 6274, 6278
                        _blockMatrix.setTileId(x, y, 6274); // lower part 6281, 6280, 6284
                        blnDrawWallOnNextEmpty = false;
                    }
                } else {
                    if (tileId == _floorTileId) blnDrawWallOnNextEmpty = true;
                }
            }
        }

        var wc = 0; // Remove 'concurrent' vertical walls
        for (x = 0; x < $gameMap.width(); x++) {
            for (y = 0; y < $gameMap.height(); y++) {
                tileId = _blockMatrix.getTileId(x, y);
                if (tileId == 6274) { wc++; } else { wc = 0; }
                if (wc > 2) {
                    _blockMatrix.setTileId(x, y, _floorTileId);
                    _blockMatrix.setTileId(x, y, _floorTileId);
                }
            }
        }

        // Remove 'blocking' walls
        for (x = 0; x < $gameMap.width(); x++) {
            for (y = 0; y < $gameMap.height() - 3; y++) {
                tileId = _blockMatrix.getTileId(x, y);
                if (tileId == 6274) {
                    tileId = _blockMatrix.getTileId(x, y + 2);
                    if (tileId == 6274) {
                        _blockMatrix.setTileId(x, y + 2, _floorTileId);
                        _blockMatrix.setTileId(x, y + 3, _floorTileId);
                    }
                    tileId = _blockMatrix.getTileId(x - 1, y + 2);
                    if (tileId == 6274) {
                        tileId = _blockMatrix.getTileId(x - 1, y + 1);
                        if (tileId == _floorTileId) {
                            _blockMatrix.setTileId(x - 1, y + 2, _floorTileId);
                            _blockMatrix.setTileId(x - 1, y + 3, _floorTileId);
                        }
                    }
                    tileId = _blockMatrix.getTileId(x + 1, y + 2);
                    if (tileId == 6274) {
                        tileId = _blockMatrix.getTileId(x + 1, y + 1);
                        if (tileId == _floorTileId) {
                            _blockMatrix.setTileId(x + 1, y + 2, _floorTileId);
                            _blockMatrix.setTileId(x + 1, y + 3, _floorTileId);
                        }
                    }
                }
                
            }
        }

        // Draw roof-tops
        var chkTile = 0;
        for (x = $gameMap.width() - 2; x > -1; x--) {
            for (y = $gameMap.height() - 2; y > -1; y--) {
                tileId = _blockMatrix.getTileId(x, y);
                if (y > 0) {
                    chkTile = _blockMatrix.getTileId(x, y - 1);
                    if (chkTile == _floorTileId && tileId == 0) _blockMatrix.setTileId(x, y, 5934);
                } chkTile = _blockMatrix.getTileId(x, y + 1);
                if (chkTile == 6274 && (tileId == 0 || tileId == _floorTileId)) _blockMatrix.setTileId(x, y, 5934);
            }
        }

        for (x = $gameMap.width() - 2; x > -1; x--) {
            for (y = $gameMap.height() - 2; y > -1; y--) {
                tileId = _blockMatrix.getTileId(x, y);
                chkTile = _blockMatrix.getTileId(x + 1, y);
                if (chkTile != 0 && chkTile != 5934 && tileId == 0)  _blockMatrix.setTileId(x, y, 5934);
                chkTile = _blockMatrix.getTileId(x - 1, y);
                if (chkTile != 0 && chkTile != 5934 && tileId == 0) _blockMatrix.setTileId(x, y, 5934);
                if (y > 2 && x > 0) {
                    tileId = _blockMatrix.getTileId(x, y);
                    if (tileId == 5934) {
                        tileId = _blockMatrix.getTileId(x, y - 1);
                        if (tileId == _floorTileId) {
                            tileId = _blockMatrix.getTileId(x - 1, y - 1);
                            chkTile = _blockMatrix.getTileId(x + 1, y - 1);
                            if (tileId == 6274 || chkTile == 6274) {
                                _blockMatrix.setTileId(x, y - 1, 5934);
                            }
                        }
                    }
                }
                
            }
        }

        // Swipe edges
        y = $gameMap.height() - 2;
        for (x = 0; x < $gameMap.width() - 1; x++) {
            chkTile = _blockMatrix.getTileId(x, y);
            if (chkTile == _floorTileId) _blockMatrix.setTileId(x, y, 5934);
        } x = $gameMap.width() - 2;
        for (y = 0; y < $gameMap.height() - 1; y++) {
            chkTile = _blockMatrix.getTileId(x, y);
            if (chkTile != 0) _blockMatrix.setTileId(x, y, 5934);
        }

        // Fill roof corners
        for (x = 0; x < $gameMap.width() - 1; x++) {
            for (y = 0; y < $gameMap.height() - 1; y++) {
                if (_blockMatrix.getTileId(x, y) == 0) {

                    if (x < $gameMap.width() - 2) {
                        tileId = _blockMatrix.getTileId(x + 1, y);
                        if (y < $gameMap.height() - 2) {
                            chkTile = _blockMatrix.getTileId(x, y + 1);
                            if (tileId == 5934 && chkTile == tileId) { // rb
                                chkTile = _blockMatrix.getTileId(x + 1, y + 1);
                                if (chkTile == _floorTileId || chkTile == 6274) _blockMatrix.setTileId(x, y, 5934);
                            }
                        }
                        if (y > 0) {
                            chkTile = _blockMatrix.getTileId(x, y - 1);
                            if (tileId == 5934 && chkTile == tileId) { // rt
                                chkTile = _blockMatrix.getTileId(x + 1, y - 1);
                                if (chkTile == _floorTileId || chkTile == 6274) _blockMatrix.setTileId(x, y, 5934);
                            }
                        }
                    }

                    if (x > 0) {
                        tileId = _blockMatrix.getTileId(x - 1, y);
                        if (y < $gameMap.height() - 2) {
                            chkTile = _blockMatrix.getTileId(x, y + 1);
                            if (tileId == 5934 && chkTile == tileId) { // lb
                                chkTile = _blockMatrix.getTileId(x - 1, y + 1);
                                if (chkTile == _floorTileId || chkTile == 6274) _blockMatrix.setTileId(x, y, 5934);
                            }
                        }
                        if (y > 0) {
                            chkTile = _blockMatrix.getTileId(x, y - 1);
                            if (tileId == 5934 && chkTile == tileId) { // lt
                                chkTile = _blockMatrix.getTileId(x - 1, y - 1);
                                if (chkTile == _floorTileId || chkTile == 6274) _blockMatrix.setTileId(x, y, 5934);
                            }
                        }
                    }
                    

                }
            }
        }


        var cbits = 0; // 1 = top, 2 = bottom, 4 = left, 8 = right
        var wall_row = 1; var wall_col = 1; var is_right_wall = false; var is_left_wall = false;

        // Connect roof and wall autotiles
        for (x = 0; x < $gameMap.width() - 1; x++) {
            for (y = 0; y < $gameMap.height() - 1; y++) {

                tileId = _blockMatrix.getTileId(x, y); cbits = 0;

                if (tileId > 6273) { // WALL

                    if (x < $gameMap.width() - 2) {
                        wall_row = (isWall(_blockMatrix.getTileId(x, y + 1))) ? 0 : 1;
                    }

                    if (wall_row == 0) { // Top
                        is_right_wall = (!isWall(_blockMatrix.getTileId(x + 1, y + 1)) || !isWall(_blockMatrix.getTileId(x + 1, y))) && !isRoof(_blockMatrix.getTileId(x + 1, y));
                        is_left_wall = !isWall(_blockMatrix.getTileId(x - 1, y + 1)) || !isWall(_blockMatrix.getTileId(x - 1, y));
                    }

                    if (is_left_wall) wall_col = 0;
                    if (is_right_wall) wall_col = 2;
                    if (!is_left_wall && !is_right_wall) wall_col = 1;
                    _blockMatrix.setTileId(x, y, _walls[wall_row][wall_col]);

                } else if (tileId > 5887) { // ROOF
                    // none, all, bot-top, left-right
                    // bot-right, left-bot, top-left, top-right
                    // bot, right, top, left
                    if (y > 0) if (isRoof(_blockMatrix.getTileId(x, y - 1))) cbits += 1; // top
                    if (y < $gameMap.height() - 2) if (isRoof(_blockMatrix.getTileId(x, y + 1))) cbits += 2; // bottom
                    if (x > 0) if (isRoof(_blockMatrix.getTileId(x - 1, y))) cbits += 4; // left
                    if (x < $gameMap.width() - 2) if (isRoof(_blockMatrix.getTileId(x + 1, y))) cbits += 8; // right
                    _blockMatrix.setTileId(x, y, _roofs[cbits]);
                }
            }
        }

        console.log("Furnished: ", _blockMatrix);

        this.renderBlockMatrix_OC();

        // Finally draw debris (when we know final result of the map)
        for (y = 0; y < $gameMap.height(); y++) {
            for (x = 0; x < $gameMap.width(); x++) {
                tileId = _blockMatrix.getTileId(x, y);
                if (isRoof(tileId)) rndDeco(this, _roofDeco, x, y, 1, 2);
                if (tileId == _floorTileId) rndDeco(this, _floorDeco, x, y, 1, 0);
                if (isBottomWall(tileId)) rndDeco(this, _wallDeco, x, y, 0, 1);
            }
        }

        // ...and re-pos events!
        if (_eventsHasBeenDone) {
            this.randomizeEvents();
        } else {
            var cr = this;
            setTimeout(function () {
                _eventsHasBeenDone = true;
                cr.randomizeEvents();
            }, 170);
        }

        //$gamePlayer.randomizePosition();

    };

    var _eventsHasBeenDone = false;

    Game_Map.prototype.randomizeEvents = function () {
        this.events().forEach(function (ev) {
            ev.randomizePosition();
        });
    };

    Game_CharacterBase.prototype.randomizePosition = function () {

        var x = Math.randomInt($dataMap.width); var y = Math.randomInt($dataMap.height);

        var is_passable = false;

        var event_counter = 0;

        while (!is_passable && (event_counter < 1024)) {

            event_counter++;

            x = Math.randomInt($dataMap.width); y = Math.randomInt($dataMap.height);

            is_passable = ($gameMap._readMapData_OC(x, y, 0) == _floorTileId);

            //is_passable = isEventPosOK($gameMap, this, x, y);

            if ($gameMap.eventsXy(x, y).length > 0) is_passable = false;
            if (isRoof($gameMap._readMapData_OC(x, y, 0))) is_passable = false;

            if ($gameMap._readMapData_OC(x, y, 2) != 0 || $gameMap._readMapData_OC(x, y, 3) != 0) is_passable = false;
            if (is_passable) {
                if (isWall($gameMap._readMapData_OC(x, y - 1, 0)) || isRoof($gameMap._readMapData_OC(x, y + 1, 0))) {
                    is_passable = true;
                } else {
                    is_passable = false;
                }
            }
            if (is_passable) {
                if (isWall($gameMap._readMapData_OC(x + 1, y, 0)) || isRoof($gameMap._readMapData_OC(x + 1, y, 0)) || isWall($gameMap._readMapData_OC(x - 1, y, 0)) || isRoof($gameMap._readMapData_OC(x - 1, y, 0))) {
                } else { is_passable = false; }
            }
            
        }

        oc_debug("Event re-pos tries:", event_counter);

        this._x = x; this._y = y;
        this._realX = x; this._realY = y;
        
    };

    Game_Map.prototype.renderBlockMatrix_OC = function () {
        var tileId = 0; // Draw ALL
        for (var y = 0; y < $gameMap.height(); y++) {
            for (var x = 0; x < $gameMap.width(); x++) {
                tileId = _blockMatrix.getTileId(x, y);
                this._setMapData_OC(x, y, 0, tileId);
            }
        } console.log("RENDER: ", _blockMatrix);
    };

    var OC_Game_Map_isPassable = Game_Map.prototype.isPassable;
    Game_Map.prototype.isPassable = function (x, y, d, hl) {
        if (!this._isGeneratedMap_OC) return OC_Game_Map_isPassable.call(this, x, y, d, hl);
        if (isRoof(_blockMatrix.getTileId(x, y, 0))) {
            return false;
        } else {
            return OC_Game_Map_isPassable.call(this, x, y, d, hl);
        }
    };

    

    // ------------------------------------------------------------------------------
    // RMMV core - Overrides
    // ==============================================================================
    Game_Map.prototype.data = function () {
        if (this._data == undefined) this._data = $dataMap.data;
        return this._data;
    };

    // ------------------------------------------------------------------------------
    // RMMV core - Aliases
    // ==============================================================================
    var OC_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        //console.log("DATA:", $gameMap.data());
        $gameMap.generateMap_OC();
        OC_Scene_Map_onMapLoaded.call(this);
    };
    

    // ------------------------------------------------------------------------------
    // RMMV core - New methods
    // ==============================================================================

    Game_Map.prototype._setMapData_OC = function (x, y, z, v) {
        var width = this.width(); var height = this.height();
        this._data[[(z * height + y) * width + x]] = v;
    };

    Game_Map.prototype.checkPassage_NE_OC = function (tiles, bit, def_ret) {
        var flags = _savedFlags; var ret = def_ret;
        //var tiles = this.layeredTiles(x, y); // not ALL >> (no events are wanted)
        for (var i = 0; i < tiles.length; i++) {
            var flag = flags[tiles[i]];
            if (!def_ret) { if (isRoof(tiles[i])) return false; }
            if ((flag & 0x10) !== 0)  // [*] No effect on passage
                continue;
            if ((flag & bit) === 0)   // [o] Passable
                if (def_ret) {
                    continue;
                } else {
                    return true;
                }
            if ((flag & bit) === bit) // [x] Impassable
                return false;
        } return ret;
    };

    Game_Map.prototype._readMapData_OC = function (x, y, z) {
        if (this._data) {
            var width = $dataMap.width;
            var height = $dataMap.height;
            if (x >= 0 && x < width && y >= 0 && y < height) {
                return this._data[(z * height + y) * width + x] || 0;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    Game_Map.prototype._readDataMapData_OC = function (x, y, z) {
        if ($dataMap.data) {
            var width = $dataMap.width;
            var height = $dataMap.height;
            if (x >= 0 && x < width && y >= 0 && y < height) {
                return $dataMap.data[(z * height + y) * width + x] || 0;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    Game_Map.prototype.readDecorations_OC = function () {

        var x = 0; var y = 0; var tile_id = [0, 0]; var tile_id2 = [0, 0];

        y = 0;

        // Roof deco
        for (x = 0; x < this.width() - 1; x++) {
            tile_id[0] = this._readDataMapData_OC(x, y, 2);
            tile_id[1] = this._readDataMapData_OC(x, y, 3);
            tile_id2[0] = this._readDataMapData_OC(x, y + 1, 2);
            tile_id2[1] = this._readDataMapData_OC(x, y + 1, 3);
            pushDeco(_roofDeco, tile_id, tile_id2, false);
        } y += 2; oc_debug("Roof decorations", _roofDeco);

        // Wall deco
        for (x = 0; x < this.width() - 1; x++) {
            tile_id[0] = this._readDataMapData_OC(x, y, 2);
            tile_id[1] = this._readDataMapData_OC(x, y, 3);
            tile_id2[0] = this._readDataMapData_OC(x, y + 1, 2);
            tile_id2[1] = this._readDataMapData_OC(x, y + 1, 3);
            pushDeco(_wallDeco, tile_id, tile_id2, false);
        } y += 2; oc_debug("Wall decorations", _roofDeco);

        // Floor deco
        for (x = 0; x < this.width() - 1; x++) {
            tile_id[0] = this._readDataMapData_OC(x, y, 2);
            tile_id[1] = this._readDataMapData_OC(x, y, 3);
            tile_id2[0] = this._readDataMapData_OC(x, y + 1, 2);
            tile_id2[1] = this._readDataMapData_OC(x, y + 1, 3);
            pushDeco(_floorDeco, tile_id, tile_id2, (this.checkPassage_NE_OC(tile_id, 0x0f, false) || this.checkPassage_NE_OC(tile_id2, 0x0f, false)));
        } oc_debug("Floor decorations", _floorDeco);

    };

    Game_Map.prototype.generateMap_OC = function () {

        var tm = $dataMap.meta;

        if (tm["generate"] !== undefined) {

            var w = tm["width"];
            var h = tm["height"];

            this._isGeneratedMap_OC = true;

            if (_baseData !== null) {
                this._data = _baseData;
                this.renderBlockMatrix_OC(); return;
            }

            _savedFlags = $dataTilesets[$dataMap.tilesetId].flags;

            var p = String(tm["generate"]); var floor = tm["floor"];
            var wall = tm["wall"]; var roof = tm["roof"];
            var d = parseInt(tm["debris"]); var l = parseInt(tm["levels"]);

            /*// RANDOM (for videos)
            roof = Math.randomInt(4) + 1;
            if (roof == 5) roof = 8;
            if (roof == 4) roof = 5;
            wall = roof; floor = roof + 16;
            //if (floor > 18) floor = 18;*/

            /*

            roofs+48 (*A3 BR 4364*) 5934

            none:		    5934 / 5982
            all-connected:	5888 / 5936
            bottom-top:	    5920
            left-right:	    5921

            bottom-right:	5922 / 5970
            left-bottom:	5924 / 5972
            top-left:	    5926
            top-right:	    5928

            bottom:		    5930
            right:		    5931
            top:		    5932
            left:		    5933

            left-bot-top:   5915
            right-bot-top:  5907
            right-left-top:   5919
            right-left-bottom:  5911

            Walls+48:
	                left mid  right (*A3 BR: 4748*) 6284
            top	    6275 6274 6278
            bottom	6281 6280 6284
            top	    6323 6322 6326
            bottom	6329 6328 6332

            */

            _roofs = [];

            if (roof === undefined) roof = 1;
            roof = (parseInt(roof) < 1) ? 1 : parseInt(roof);
            if (isNaN(roof)) roof = 1;
            if (roof > 16) { roof += 16; } else if (roof > 8) { roof += 8; } // need to add wall rows between
            roof = ((roof - 1) * 48) + 5934; // Roof end point as we need it...
            
            _roofs.push(roof); // none
            _roofs.push(roof - 2); // top
            _roofs.push(roof - 4); // bottom
            _roofs.push(roof - 14); // top-bottom
            _roofs.push(roof - 1); // left
            _roofs.push(roof - 8); // left-top
            _roofs.push(roof - 10); // left-bottom
            _roofs.push(roof - 19); // left-bottom-top ???
            _roofs.push(roof - 3); // right
            _roofs.push(roof - 6); // right-top
            _roofs.push(roof - 12); // right-bottom
            _roofs.push(roof - 27); // right-top-bottom ???
            _roofs.push(roof - 13); // right-left
            _roofs.push(roof - 15); // right-left-top ???
            _roofs.push(roof - 23); // right-left-bottom ???
            _roofs.push(roof - 46); // all

            if (wall === undefined) wall = 1;
            wall = (parseInt(wall) < 1) ? 1 : parseInt(wall);
            if (isNaN(wall)) wall = 1;
            if (wall > 16) { wall += 16; } else if (wall > 8) { wall += 8; } // need to add roof rows between
            wall = ((wall - 1) * 48) + 6284; // Wall end point as we need it...
            _walls = [null, null]; 
            _walls[0] = [wall - 9, wall - 10, wall - 6]; // top: left/mid/right
            _walls[1] = [wall - 3, wall - 4, wall];      // bot: left/mid/right

            _baseData = ($dataMap.data);
            this._data = _baseData; // We got new dungeon!

            if (floor === undefined) floor = 1;
            floor = (parseInt(floor) < 1) ? 1 : parseInt(floor);
            if (isNaN(floor)) floor = 1;
            floor += 1535; _floorTileId = floor;

            _blockMatrix = new Block_Matrix(p, w, h, d, l, this);

            this.furnishBlockMatrix_OC(); //this.renderBlockMatrix_OC();

            oc_debug("generateMap_OC()", _blockMatrix);

        } else {
            this._data = undefined;
            oc_debug("Normal map / Meta data:", tm);
            this._isGeneratedMap_OC = false;
        }
    };


    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    function oc_debug(inp_txt, obj) {
        if (_debugMode) console.log("OcRam_Map_Generator", " : ", inp_txt, obj);
    }

    function getBoolean(input) {
        if (input === undefined) return false;
        return (input.toString().toLowerCase() == "true") ? true : false;
    }

    function cc(a, b) { // Is only one connected?
        if (!a && b) return true;
        if (a && !b) return true;
        return false;
    }

    function pushDeco(arr, tile_id, tile_id2, is_passable) {
        // tile_id z = 2, tile_id2 z = 3
        var dh = (tile_id2[0] != 0 || tile_id2[1] != 0);
        var empty_tile = (tile_id[0] == 0 && tile_id[1] == 0 && !dh);
        var _dec = {
            tileId: [parseInt(tile_id[0]), parseInt(tile_id[1])],
            tileId2: [parseInt(tile_id2[0]), parseInt(tile_id2[1])],
            doubleHeight: dh,
            isEmpty: empty_tile,
            canPass: is_passable
        }; arr.push(_dec);
    }

    function isRoof(p) {
        return p > 5887 && p < 6274;
    }
    function isWall(p) {
        return p > 6273;
    }

    function isBottomWall(p) {
        var wm = p % 48;
        return wm == 40 || wm == 41 || wm == 44;
    }

    function joinStr(org_str, str_to_join) {
        var sb = org_str.replace("_", "");
        if (str_to_join == "l" && sb.indexOf("l") < 0) sb = str_to_join + sb;
        if (str_to_join == "b" && sb.indexOf("b") < 0) sb = sb + str_to_join;
        if (str_to_join == "r" && sb.indexOf("r") < 0) {
            sb = (sb.substr(0, 1) == "l") ? sb.replace("l", "lr") : str_to_join + sb;
        } if (str_to_join == "t" && sb.indexOf("t") < 0) {
            sb = (sb.substr(sb.length - 1, 1) == "b") ? sb.replace("b", "tb") : sb + str_to_join;
        } return "_" + sb;
    }

    function shiftTilePos(tc, x, y, rnd_deco) {

        var shift_x = 0; var shift_y = 0;

        // Blocking debris likes to lurk in corners :)
        if (tc._readMapData_OC(x, y - 1, 0) == _floorTileId && isWall(tc._readMapData_OC(x, y - 2, 0))) {
            if (isWall(tc._readMapData_OC(x + 1, y - 1, 0)) || isWall(tc._readMapData_OC(x - 1, y - 1, 0))) shift_y = -1;
            if (isRoof(tc._readMapData_OC(x + 1, y - 1, 0)) || isRoof(tc._readMapData_OC(x - 1, y - 1, 0))) shift_y = -1;
        }

        if (shift_y == 0) {
            if (tc._readMapData_OC(x, y + 1, 0) == _floorTileId && isRoof(tc._readMapData_OC(x, y + 2, 0))) {
                if (isRoof(tc._readMapData_OC(x + 1, y + 1, 0)) || isRoof(tc._readMapData_OC(x - 1, y + 1, 0))) shift_y = 1;
            }
        }

        if (shift_y == 0) {
            if (tc._readMapData_OC(x - 1, y, 0) == _floorTileId && isRoof(tc._readMapData_OC(x - 2, y, 0))) {
                if (tc._readMapData_OC(x - 1, y + 1, 2) == 0 && tc._readMapData_OC(x - 1, y + 1, 3) == 0) {
                    if (isRoof(tc._readMapData_OC(x - 1, y + 1, 0)) || isWall(tc._readMapData_OC(x - 1, y - 1, 0))) shift_x = -1;
                }
            }
            if (shift_x == 0) {
                if (tc._readMapData_OC(x + 1, y, 0) == _floorTileId && isRoof(tc._readMapData_OC(x + 2, y, 0))) {
                    if (tc._readMapData_OC(x + 1, y + 1, 2) == 0 && tc._readMapData_OC(x + 1, y + 1, 3) == 0) {
                        if (isRoof(tc._readMapData_OC(x + 1, y + 1, 0)) || isWall(tc._readMapData_OC(x + 1, y - 1, 0))) shift_x = 1;
                    }
                }
            }
        }

        // Some of 2 tile height tiles like to play hide and seek >> Just draw 'top' of it...
        if (rnd_deco.doubleHeight) {
            if (isRoof(tc._readMapData_OC(x + shift_x, y + 1 + shift_y, 0))) {
                if (Math.randomInt(100) > 50) {
                    tc._setMapData_OC(x + shift_x, y + shift_y, 2, rnd_deco.tileId[0]);
                    tc._setMapData_OC(x + shift_x, y + shift_y, 3, rnd_deco.tileId[1]);
                    return true;
                }
            }
        }

        var was_shifted = (shift_x != 0 || shift_y != 0);

        if (was_shifted) {
            tc._setMapData_OC(x + shift_x, y + shift_y, 2, rnd_deco.tileId2[0]);
            tc._setMapData_OC(x + shift_x, y + shift_y, 3, rnd_deco.tileId2[1]);
            if (y > 0) {
                tc._setMapData_OC(x + shift_x, y - 1 + shift_y, 2, rnd_deco.tileId[0]);
                tc._setMapData_OC(x + shift_x, y - 1 + shift_y, 3, rnd_deco.tileId[1]);
            }
        }

        return was_shifted; // Was shifted?!

    }

    function isPassageOK(tc, x, y) {

        var at_ids = [];
        at_ids.push(tc._readMapData_OC(x - 1, y, 0)); // left
        at_ids.push(tc._readMapData_OC(x - 1, y + 1, 0)); // left
        at_ids.push(tc._readMapData_OC(x - 1, y - 1, 0)); // left
        at_ids.push(tc._readMapData_OC(x + 1, y, 0)); // right
        at_ids.push(tc._readMapData_OC(x + 1, y + 1, 0)); // right
        at_ids.push(tc._readMapData_OC(x + 1, y - 1, 0)); // right
        if (!tc.checkPassage_NE_OC(at_ids, 0x0f, false)) return false;

        at_ids = [];
        at_ids.push(tc._readMapData_OC(x, y - 1, 0)); // top
        at_ids.push(tc._readMapData_OC(x - 1, y - 1, 0)); // top
        at_ids.push(tc._readMapData_OC(x + 1, y - 1, 0)); // top
        at_ids.push(tc._readMapData_OC(x, y + 1, 0)); // bottom
        at_ids.push(tc._readMapData_OC(x - 1, y + 1, 0)); // bottom
        at_ids.push(tc._readMapData_OC(x + 1, y + 1, 0)); // bottom
        if (!tc.checkPassage_NE_OC(at_ids, 0x0f, false)) return false;

        var tile_ids = [];

        tile_ids.push(tc._readMapData_OC(x - 1, y, 2)); // left
        tile_ids.push(tc._readMapData_OC(x - 1, y - 1, 2)); // left-top
        tile_ids.push(tc._readMapData_OC(x, y - 1, 2)); // top
        tile_ids.push(tc._readMapData_OC(x + 1, y - 1, 2)); // top-right
        tile_ids.push(tc._readMapData_OC(x + 1, y, 2)); // right
        tile_ids.push(tc._readMapData_OC(x + 1, y + 1, 2)); // right-bottom
        tile_ids.push(tc._readMapData_OC(x, y + 1, 2)); // bottom
        tile_ids.push(tc._readMapData_OC(x - 1, y + 1, 2)); // bottom-left

        tile_ids.push(tc._readMapData_OC(x - 1, y, 3));
        tile_ids.push(tc._readMapData_OC(x - 1, y - 1, 3));
        tile_ids.push(tc._readMapData_OC(x, y - 1, 3));
        tile_ids.push(tc._readMapData_OC(x + 1, y - 1, 3));
        tile_ids.push(tc._readMapData_OC(x + 1, y, 3));
        tile_ids.push(tc._readMapData_OC(x + 1, y + 1, 3));
        tile_ids.push(tc._readMapData_OC(x, y + 1, 3));
        tile_ids.push(tc._readMapData_OC(x - 1, y + 1, 3));

        return tc.checkPassage_NE_OC(tile_ids, 0x0f, true);

    }

    function isEventPosOK(tc, ev, x, y) {
        //if (!tc.checkPassage_NE_OC([tc._readMapData_OC(x, y, 2)], 0x0f, true)) return false;
        if (tc._readMapData_OC(x, y, 2) != 0 || tc._readMapData_OC(x, y, 3) != 0) return false;
        if (ev.through) return true;
        return isPassageOK(tc, x, y);
    }

    function isDebrisOK(tc, deco_obj, x, y) {

        //if (!tc.checkPassage_NE_OC([tc._readMapData_OC(x, y, 2)], 0x0f, true)) return false;
        if (tc._readMapData_OC(x, y, 2) != 0 || tc._readMapData_OC(x, y, 3) != 0) return false;
        if (deco_obj.canPass) return true;

        return isPassageOK(tc, x, y);

    }

    function rndDeco(tc, arr, x, y, rnd_base, type) {

        if (Math.randomInt(100) > rnd_base) {
            var rnd_deco = arr[Math.randomInt(arr.length - 1)];
            if (!rnd_deco.isEmpty) {
                if (rnd_deco.doubleHeight) { // 2 tiles high tile
                    if (type == 0) {
                        if (isDebrisOK(tc, rnd_deco, x, y)) {
                            if (!shiftTilePos(tc, x, y, rnd_deco)) { // Better place for debris
                                tc._setMapData_OC(x, y, 2, rnd_deco.tileId2[0]);
                                tc._setMapData_OC(x, y, 3, rnd_deco.tileId2[1]);
                                if (y > 0) {
                                    tc._setMapData_OC(x, y - 1, 2, rnd_deco.tileId[0]);
                                    tc._setMapData_OC(x, y - 1, 3, rnd_deco.tileId[1]);
                                }
                            }
                        }
                    } else {
                        tc._setMapData_OC(x, y, 2, rnd_deco.tileId2[0]);
                        tc._setMapData_OC(x, y, 3, rnd_deco.tileId2[1]);
                        if (y > 0) {
                            tc._setMapData_OC(x, y - 1, 2, rnd_deco.tileId[0]);
                            tc._setMapData_OC(x, y - 1, 3, rnd_deco.tileId[1]);
                        }
                    }
                } else {
                    switch (type) {
                        case 0: // Floor debris
                            if (isDebrisOK(tc, rnd_deco, x, y)) {
                                tc._setMapData_OC(x, y, 2, rnd_deco.tileId[0]);
                                tc._setMapData_OC(x, y, 3, rnd_deco.tileId[1]);
                            } break;
                        case 1: // Wall debris
                            if (rnd_deco.tileId2[0] != 0 || rnd_deco.tileId2[1] != 0) {
                                tc._setMapData_OC(x, y - 1, 2, rnd_deco.tileId[0]);
                                tc._setMapData_OC(x, y - 1, 3, rnd_deco.tileId[1]);
                            } else {
                                tc._setMapData_OC(x, y - 1, 2, rnd_deco.tileId[0]);
                                tc._setMapData_OC(x, y - 1, 3, rnd_deco.tileId[1]);
                            } break;
                        case 2: // Roof debris
                            tc._setMapData_OC(x, y, 2, rnd_deco.tileId[0]);
                            tc._setMapData_OC(x, y, 3, rnd_deco.tileId[1]);
                            break;
                    }
                }
            }
        }
    }

}.bind(OcRam.Map_Generator)());