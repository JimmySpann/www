/*:
 * @plugindesc (v0.2b) Advanced event interaction system.
 * @author Moghunter
 *
 * @param Tool Map ID
 * @desc Definition of the tool map ID.
 * @default 1
 *
 * @param Battle Mode
 * @desc Defines the type of battle system.
 * 0 - Chrono Mode      1 - ABS Mode
 * @default 0
 *
 * @param Battle Sensor Range
 * @desc Definition of the sensor range to start the battle.
 * @default 3
 *   
 * @param Max Battle Members
 * @desc Definition of the maximum number of characters in battle.
 * (1..4)
 * @default 3
 *   
 * @param ATB Mode
 * @desc Definition of the ATB type
 * 0 - Wait    1 - Semi Active    2 - Full Active
 * @default 2
 *   
 * @param ATB Max
 * @desc Definition of the maximum ATB value.
 * @default 1600
 *   
 * @param States Duration
 * @desc Definition of the duration of a turn for states.
 * @default 240
 *   
 * @param Diagonal Movement
 * @desc Enable diagonal movement.
 * @default true
 *  
 * @param Touch Input Mode
 * @desc Enable selection via mouse/touch.
 * @default true
 *   
 * @param Attack Command
 * @desc Enable the attack command in ABS mode.
 * @default true
 *   
 * @param Shield Command
 * @desc Enable the shield command in ABS mode.
 * @default true
 *   
 * @param Skill Command
 * @desc Enable the skill command in ABS mode.
 * @default true
 *   
 * @param Item Command
 * @desc Enable the item command in ABS mode.
 * @default true
 *   
 * @param Skill Menu Command
 * @desc Enable the skill menu command in ABS mode.
 * @default true
 * 
 * @param Item Menu Command
 * @desc Enable the item menu command in ABS mode.
 * @default true
 * 
 * @param Attack Button
 * @desc Definition of the attack button.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default ok
 * 
 * @param Shield Button
 * @desc Definition of the shield button.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default d
 * 
 * @param Skill Button
 * @desc Definition of the skill button.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default s
 * 
 * @param Item Button
 * @desc Definition of the item button.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default a
 * 
 * @param Dash Button
 * @desc Definition of the dash button.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default shift
 * 
 * @param Skill Menu Button
 * @desc Definition of the skill menu button.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default pagedown
 * 
 * @param Item Menu Button
 * @desc Definition of the item menu button.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default pageup
 * 
 * @param Escape Button
 * @desc Definition of the escape button in Chrono mode.
 * ( x , c , a , s , d , ok , pagedown , pageup , shift )
 * @default shift
 * 
 * @param Shield Animation ID
 * @desc Definition of the animation ID for the shield effect.
 * @default 142
 * 
 * @param Cast Animation ID
 * @desc Definition of the animation ID for the cast effect.
 * @default 138
 * 
 * @param Level UP Animation ID
 * @desc Definition of the animation ID for level-up.
 * @default 143
 *  
 * @param Treasure SE
 * @desc Definition of the sound when picking up an item from the enemy.
 * @default Item3
 * 
 * @param Turn SE
 * @desc Definition of the sound when selecting commands.
 * @default Ice1
 * 
 * @param Charging SE
 * @desc Definition of the sound in charge mode.
 * @default Up1
 * 
 * @param Charged SE
 * @desc Definition of the sound when charge is at maximum.
 * @default Saint3
 * 
 * @param Action Cost SE
 * @desc Definition of the sound when it is not possible to activate the action.
 * @default Cancel1
 * 
 * @param Hookshot X-Axis Offset
 * @desc Definition of the X-Axis Offset of the chain relative to the character in the hookshot function.
 * @default 12
 * 
 * @param Hookshot Y-Axis Offset
 * @desc Definition of the Y-Axis Offset of the chain relative to the character in the hookshot function.
 * @default 0
 * 
 * @param Cursor Actor X-Axis
 * @desc Definition of the X-Axis Offset of the actor cursor.
 * @default 0
 * 
 * @param Cursor Actor Y-Axis
 * @desc Definition of the Y-Axis Offset of the actor cursor.
 * @default -20
 * 
 * @param Cursor Actor Rotation
 * @desc Definition of the image rotation speed.
 * @default 0.02
 * 
 * @param Cursor Actor Blend Mode
 * @desc Definition of the blend type.
 * @default 1
 * 
 * @param Cursor Actor Opacity
 * @desc Definition of the image opacity value.
 * @default 150
 * 
 * @param Cursor X-Axis
 * @desc Definition of the X-Axis Offset of the selection cursor.
 * @default 0
 * 
 * @param Cursor Y-Axis
 * @desc Definition of the Y-Axis Offset of the selection cursor.
 * @default 0
 * 
 * @param Cursor Float Mode
 * @desc Enables the floating animation of the selection cursor.
 * @default true
 * 
 * @param Cursor FontSize
 * @desc Definition of the font size of the selection cursor text.
 * @default 18
 * 
 * @param Cursor Text X-Axis
 * @desc Definition of the X-Axis of the selection cursor text.
 * @default 0
 * 
 * @param Cursor Text Y-Axis
 * @desc Definition of the Y-Axis of the selection cursor text.
 * @default 3
 * 
 * @param Cursor HP X-Axis
 * @desc Definition of the X-Axis of the HP gauge layout.
 * @default 0
 * 
 * @param Cursor HP Y-Axis
 * @desc Definition of the Y-Axis of the HP gauge layout.
 * @default 32
 * 
 * @param Cursor HP Gauge X-Axis
 * @desc Definition of the X-Axis of the HP gauge.
 * @default 0
 * 
 * @param Cursor HP Gauge Y-Axis
 * @desc Definition of the Y-Axis of the HP gauge.
 * @default 1
 * 
 * @param Command X-Axis
 * @desc Definition of the X-Axis of the selection command.
 * @default 0
 * 
 * @param Command Y-Axis
 * @desc Definition of the Y-Axis of the selection command.
 * @default 0
 * 
 * @param Command Name X-Axis
 * @desc Definition of the X-Axis of the selection command name.
 * @default 0
 * 
 * @param Command Name Y-Axis
 * @desc Definition of the Y-Axis of the selection command name.
 * @default -7
 * 
 * @param Command Arrow X-Axis
 * @desc Definition of the X-Axis of the command arrow.
 * @default 0
 * 
 * @param Command Arrow Y-Axis
 * @desc Definition of the Y-Axis of the command arrow.
 * @default 0
 *  
 * @param Phase X-axis
 * @desc Definition of the X-Axis of the battle phase image.
 * @default 130
 * 
 * @param Phase Y-axis
 * @desc Definition of the Y-Axis of the battle phase image.
 * @default 300
 * 
 * @param Result X-axis
 * @desc Definition of the X-Axis of the battle result layout.
 * @default 200
 * 
 * @param Result Y-axis
 * @desc Definition of the Y-Axis of the battle result layout.
 * @default 200
 * 
 * @param Result FontSize
 * @desc Definition of the font size of the battle result.
 * @default 24
 * 
 * @param Result Exp X-axis
 * @desc Definition of the X-Axis of the experience result number.
 * @default 110
 * 
 * @param Result Exp Y-axis
 * @desc Definition of the Y-Axis of the experience result number.
 * @default 80
 *
 * @param Result Gold X-axis
 * @desc Definition of the X-Axis of the gold result number.
 * @default 110
 * 
 * @param Result Gold Y-axis
 * @desc Definition of the Y-Axis of the gold result number.
 * @default 185
 * 
 * @param Escape X-axis
 * @desc Definition of the X-Axis of the escape layout.
 * @default 60
 * 
 * @param Escape Y-axis
 * @desc Definition of the Y-Axis of the escape layout.
 * @default 170
 *
 * @param Escape Gauge X-axis
 * @desc Definition of the X-Axis of the escape gauge.
 * @default 6
 * 
 * @param Escape Gauge Y-axis
 * @desc Definition of the Y-Axis of the escape gauge.
 * @default 23
 *
 * @help  
 * =============================================================================
 * +++ MOG - Chrono Engine (v0.2b) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * This plugin allows you to create advanced systems using events, such as
 * real-time battle systems on the map or complex event interaction puzzles.
 *
 * =============================================================================
 * *** CHANGELOG ***
 * =============================================================================
 * (v0.2) - Improved system performance.
 *        - Added Input Combo/Command Combo system. (ABS Mode)
 *        - Added Charge system (ABS Mode)
 *        - Added Touch system (Chrono Mode)
 *        - Added "ignoreKnockback" function, which allows hitting the target
 *          even when it is in a stunned/knocked down state (knockback)
 *        - Fixed bug where action items or skills (ABS) could be used
 *          in the normal menu, now it is necessary to add the TAG "abs mode" to
 *          appear in the ABS menu. 
 *
 * =============================================================================
 * *** GRAPHICS ASSETS ***
 * =============================================================================
 * The system images must be saved in the folder:
 *
 * /img/chrono/
 *
 * =============================================================================
 * *** SKILL / ITEM / WEAPON (NOTETAGS) ***
 * =============================================================================
 *
 * Tool Id : X
 *    Defines the event ID of the action. This action will be activated when
 *    using the skill through the menu.
 *
 * Cooperation Skill : X : X : X : ...
 *    Defines the IDs of the characters required to activate the action.
 *
 * Abs Mode
 *    Add this Tag to make the item/skill appear in the ABS menu.
 *
 * =============================================================================
 * *** SHIELD (NOTETAGS) ***
 * =============================================================================
 * Add this comment to activate the shield action.
 *
 * Shield Pose Suffix : NAME
 *
 * =============================================================================
 * *** ACTORS & ENEMIES (NOTETAGS) ***
 * =============================================================================
 *
 * Body Size : X
 *   - Defines the size of the character's collision area.
 *
 * Dead Switch Id : X
 *   - Activates a switch after the enemy dies.
 * 
 * Dead Variable Id : X
 *   - Adds +1 to variable X after the enemy dies.
 *  
 * Dead Selfswitch Id : X
 *   - Activates the selfswitch after the enemy dies. (A,B,C,D)
 *   
 * Disable Knockback
 *   - Disables the character's Knockback.
 *    
 * Invulnerable Actions : X,X,X,X...
 *   - Makes the enemy invulnerable to certain actions.
 *    
 * State Icon Y-Axis : Y
 *   - Defines a fixed position for the icon height.
 *
 * =============================================================================
 * *** ENEMY EVENTS (COMMENTS) ***
 * =============================================================================
 *
 * enemy_id : X
 *   - Defines the enemy ID for the event.
 *
 * walk_nearby : X
 *   - Defines a maximum area limit for random walking mode.
 *
 * =============================================================================
 * *** TOOL SYSTEM ***
 * =============================================================================
 * Tool System is the event interaction system, these events are called
 * Tool Events which are events activated during the game.
 * These Tool Events must be created on a predetermined map separate from the
 * others, by default the map ID is 1, but it can be changed.
 *
 * =============================================================================
 * *** TOOL EVENTS COMMENTS ***
 * =============================================================================
 * To define the action parameters of the events, use the comments below.
 *
 * tool_item_id : ITEM_ID
 * - Defines the damage based on the Item ID.
 *
 * tool_skill_id : SKILL_ID
 * - Defines the damage based on the Skill ID. 
 *
 * tool_item_cost : ITEM_ID
 * - Activates an item cost for the action. (*Bow and arrow)
 *
 * tool_duration : X
 * - Definition of the action duration.
 *
 * tool_pose_suffix : NAME
 * - Definition of the character image suffix when using the action.
 * 
 * tool_pose_duration : X
 * - Definition of the action pose duration.
 * 
 * tool_area : MODE
 * - Definition of the type of action impact area.
 *   - square             (Square)
 *   - front_square       (Half square)
 *   - rhombus            (Rhombus)
 *   - front_rhombus      (Half rhombus)
 *   - line               (Front Line)
 *   - wall               (Side Line)
 *   - cross              (Cross)
 * 
 * tool_range : X
 * - Definition of the action collision area size.
 * 
 * tool_disable_collision
 * - Disables the event collision.
 * 
 * tool_wait_collision : X
 * - Sets a time to activate the action collision.
 * 
 * tool_disable_piercing
 * - Disables the piercing mode.
 *
 * tool_damage_all
 * - Deals damage to all targets, enemies and allies.
 * 
 * tool_position : MODE
 * - Defines the initial position of the action.
 *       target             - Target selection via cursor.
 *       user               - Position on the user. 
 *       move_to_target     - Makes the character go to the target in Chrono mode.
 *
 * tool_multihit : LAG_TIME
 * - Activates multi-hit mode, value X is the
 *   collision time between hits.
 * 
 * tool_action_times : TIMES : LAG_TIME
 * - Triggers the action X times.
 * 
 * tool_chain_action : ACTION_ID
 * - Activates an action after the character finishes the first action.
 * 
 * tool_chain_action_hit : ACTION_ID
 * - Activates an action when the first action hits the target.
 * 
 * tool_three_directions
 * - The action is activated in three directions.
 * 
 * tool_four_directions
 * - The action is activated in four directions.
 * 
 * tool_all_directions
 * - The action is activated in all directions.
 * 
 * tool_knockback_duration : X
 * - Time the target is paralyzed after being hit.
 * 
 * tool_ignore_shield
 * - The collision ignores if the target is using a shield.
 * 
 * tool_shield_reflect
 * - The action is reflected when the user is using a shield.
 * 
 * tool_unique
 * - The action is activated only once.
 * 
 * tool_diagonal
 * - Allows the action to be activated diagonally.
 * 
 * tool_diagonal_angle
 * - The sprite angle will be based on the event direction.
 *  
 * tool_user_animation_id : X
 * - Sets an animation on the user when activating the action.
 * 
 * tool_cast_animation_id : X
 * - Sets an animation on the user during the action invocation phase.
 * 
 * tool_shake
 * - Makes the screen shake when hitting the target.
 * 
 * tool_boomerang : X
 * - Activates boomerang mode, X is the action distance.
 * 
 * tool_hookshot : X
 * - Activates hookshot mode, X is the action distance.
 *
 * tool_user_zoom_effect
 * - Activates the zoom animation when using the action. (Requires MOG_Character_Motion plugin)
 *
 * tool_ignore_knockback
 * - Allows the action to hit the target regardless of knockback state.
 *
 * tool_combo : ACTION_ID : COMMAND_TYPE
 * - Activates the combo system for this action, a different action will be
 *   activated each time the player presses the required button.
 *
 *           COMMAND TYPE - Type of command.
 *           - 0 Weapon Command/Button 
 *           - 1 Skill Command/Button 
 *           - 2 Item Command/Button 
 *
 * tool_charge_attack : ACTION_ID : CHARGE_TIME
 * - Activates the charge system for this action, the action will be activated when
 *   the player holds down the normal attack button (Weapon Command)
 * 
 * =============================================================================
 * *** PUZZLE EVENTS (COMMENTS) ***
 * =============================================================================
 *
 * collision_id : X
 *    - Defines the collision event ID of the action.
 *      When event X collides with this event, the event page will be triggered.
 * 
 * collision_hookshot
 *    - Determines that this event will be a hookshot collision event.
 *
 * =============================================================================
 * *** ENEMY EVENTS (COMMENTS)  ***
 * =============================================================================
 *
 * enemy_id : X
 *    - Defines the enemy ID for this event.
 *
 * walk_nearby : X
 *    - Makes the event walk within the defined perimeter, this function is useful for creating
 *      groups of enemies in Chrono mode.
 * 
 * event sensor : X
 *    - Defines the sensor range to activate the action page.
 *      This function requires the Event Sensor plugin.
 *
 * battle_sensor : X
 *    - Defines the sensor range to activate the battle in Chrono mode.
 *
 * 
 * =============================================================================
 * *** PLUGIN COMMANDS ***
 * =============================================================================
 * 
 * chrono_mode : true
 * - Enables or disables turn-based battle mode (Chrono), leave "false"
 *   if you want to enable ABS mode.
 *
 * atb_mode : 0
 * - Definition of the Active Time mode in Chrono mode.
 *   0 - WAIT   ATB is not active during command selection. 
 *   1 - SEMI ACTIVE   ATB is not active during action and enemy selection.
 *   2 - FULL ACTIVE   ATB is always active.
 *
 * can_escape : true
 * - Enables or disables the escape command in Chrono mode.
 *
 * set_battler_position : ACTOR_ID : X : Y
 * - Sets the X and Y position of the character in Chrono mode.
 *
 * set_battler_direction : ACTOR_ID : X : Y
 * - Sets the direction of the character in Chrono mode.
 * 
 * set_actor_skill : ACTOR_ID : TOOL_ID
 * - Forces equipping a skill to the character.
 *
 * set_actor_item : ACTOR_ID : TOOL_ID
 * - Forces equipping an item to the character.
 *
 * action_commands : true
 * - Enables or disables all action commands in ABS mode.
 *
 * command_attack : true
 * - Enables or disables the attack command in ABS mode.
 *
 * command_shield : true
 * - Enables or disables the shield command in ABS mode.
 *
 * command_skill : true
 * - Enables or disables the skill command in ABS mode.
 *
 * command_item : true
 * - Enables or disables the item command in ABS mode.
 *
 * command_skill_window : true
 * - Enables or disables the skill menu.
 *
 * command_item_window : true
 * - Enables or disables the item menu.
 *
 * tool_item_visible : true
 * - Enables or disables the item HUD.
 *
 * tool_skill_visible : true
 * - Enables or disables the skill HUD.
 *
 * tool_weapon_visible : true
 * - Enables or disables the weapon HUD.
 *
 * tool_shield_visible : true
 * - Enables or disables the shield HUD.
 *
 * tool_shield_visible : true
 * - Enables or disables the shield HUD.
 *
 * tool_collision : true
 * - Enables or disables the action event collision.  
 *
 * force_damage : Mode
 * - Forces the action event to deal damage in Chrono mode.
 *   - target   Damage only to the chosen target.
 *   - area     Damage to targets within the action range.
 *   - all      Damage to all targets.
 *
 * tool_turn_end
 * - Forces the turn to end in Chrono mode.   
 * 
 * =============================================================================
 * *** CHARACTER SCRIPT COMMANDS ***
 * =============================================================================
 * The commands should be used to create complex action movements.
 * Use the commands below through the call script command.
 *
 * -----------------------------------------------------------------------------
 * SUBJECT (BASIC)
 * -----------------------------------------------------------------------------
 * These are the basic commands to define the characters to be used.
 *
 * this.user()
 * - Defines the user of the action
 * 
 * this.target()
 * - Defines the target event.
 *
 * this.actor(ID)
 * - Defines the actor based on the ID, use this command when creating
 *   movements in cooperation skills.
 *
 * this.toolEvent()
 * - Is the Action event.
 *
 * -----------------------------------------------------------------------------
 * ACTION 
 * -----------------------------------------------------------------------------
 *
 * SUBJECT.setCharacterName("NAME")
 * - Sets an image for the character.
 *
 * SUBJECT.setDirection(X)
 * - Sets a direction for the character. (2,4,6,8)
 *
 * SUBJECT.setDirectionFix(true)
 * - Enables or disables fixed direction.
 * 
 * SUBJECT.setWalkAnime(true)
 * - Enables or disables walking animation.
 *
 * SUBJECT.setStepAnime(true)
 * - Enables or disables step animation.
 *
 * SUBJECT.setPriorityType(X)
 * - Sets the character image priority. (0,1,2)
 * 
 * SUBJECT.requestAnimation(X)
 * - Activates an animation on the character.
 * 
 * SUBJECT.moveForward()
 * - Move one step forward.
 *
 * SUBJECT.moveBackward()
 * - Move one step back.
 *
 * SUBJECT.moveRandom()
 * - Move randomly.
 *
 * SUBJECT.jump(X,Y);
 * - Makes the character jump.
 *
 * SUBJECT.moveToTarget(X,Y,H,S,T)
 * - Makes the character move to the target quickly, ignoring passability.
 *     X  - X offset
 *     Y  - Y offset
 *     H  - Height (Jump Effect)
 *     S  - Subject
 *     T  - Through - Ignores passability of enemies and allies.
 *
 * SUBJECT.teleportToTarget(X,Y,S)
 * - Makes the character teleport to the target.
 *     X  - X offset
 *     Y  - Y offset
 *     S  - Subject
 *
 * SUBJECT.teleportRandom(A)
 * - Makes the character teleport randomly.
 *     A  - Area
 *
 * SUBJECT.teleportRandomX(A)
 * - Makes the character teleport randomly only horizontally.
 *     A  - Area
 *
 * SUBJECT.teleportRandomY(A)
 * - Makes the character teleport randomly only vertically.
 *     A  - Area
 *
 * SUBJECT.jumpBack(S,H)
 * - Makes the character take a step back.
 *     S  - Number of steps.
 *     H  - Height.
 *
 * SUBJECT.collision(false)
 * - Enables or disables character collision.
 *
 * SUBJECT.shieldMode(false)
 * - Enables or disables character shield mode.
 *
 * SUBJECT.setAngle(X)
 * - Sets the sprite image angle of the character.
 * 
 * this.randomSwitches([X,X,X,X…])
 * - Activates random Switches in the array. Switches not selected will be
 *   deactivated (OFF), this function is useful for creating 
 *   random action patterns for enemies in ABS mode. 
 * 
 * this.act(X)
 * - Activates an action in ABS mode. 
 *
 * =============================================================================
 * *** ATB ***
 * =============================================================================
 * The speed of the ATB is based on the battler's agility and there are 3 ATB modes.
 * 
 * WAIT - The ATB is not active during command selection.
 * SEMI ACTIVE - The ATB is not active during action and target selection.
 * FULL ACTIVE - The ATB is always active.
 *
 * =============================================================================
 * *** CASTING TIME ***
 * =============================================================================
 * To set the casting time for an action, just set a value in SPEED greater than zero.
 *  
 */
