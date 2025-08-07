SET PAGESIZE 0
SET LINESIZE 1000
SET FEEDBACK OFF
SET HEADING ON
SET COLSEP ','
SET NUMWIDTH 15

SPOOL location.csv
SELECT '"NAME"','"CLIMATE"','"TERRAIN_TYPE"' FROM dual;
SELECT '"'||name||'"','"'||climate||'"','"'||terrain_type||'"' FROM Location ORDER BY name;
SPOOL OFF

SPOOL type.csv
SELECT '"NAME"','"COLOUR"' FROM dual;
SELECT '"'||name||'"','"'||colour||'"' FROM Type ORDER BY name;
SPOOL OFF

SPOOL badge.csv
SELECT '"BADGE_INDEX"','"NAME"' FROM dual;
SELECT badge_index,'"'||name||'"' FROM Badge ORDER BY badge_index;
SPOOL OFF

SPOOL ability.csv
SELECT '"ABILITY_ID"','"NAME"','"DESCRIPTION"' FROM dual;
SELECT ability_id,'"'||name||'"','"'||description||'"' FROM Ability ORDER BY ability_id;
SPOOL OFF

SPOOL species.csv
SELECT '"POKEDEX"','"NAME"','"DESCRIPTION"' FROM dual;
SELECT pokedex,'"'||name||'"','"'||description||'"' FROM Species ORDER BY pokedex;
SPOOL OFF

SPOOL egg_group.csv
SELECT '"EGG_GROUP_ID"','"NAME"','"DESCRIPTION"' FROM dual;
SELECT egg_group_id,'"'||name||'"','"'||description||'"' FROM Egg_Group ORDER BY egg_group_id;
SPOOL OFF

SPOOL move.csv
SELECT '"MOVE_ID"','"NAME"','"POWER"','"PP"','"ACCURACY"','"DESCRIPTION"','"TYPE_NAME"' FROM dual;
SELECT move_id,'"'||name||'"',power,pp,accuracy,'"'||description||'"','"'||type_name||'"' FROM Move ORDER BY move_id;
SPOOL OFF

SPOOL pokemon_2.csv
SELECT '"NATURE"','"STAT_INCREASED"','"STAT_DECREASED"' FROM dual;
SELECT '"'||nature||'"','"'||stat_increased||'"','"'||stat_decreased||'"' FROM Pokemon_2 ORDER BY nature;
SPOOL OFF

SPOOL pokemon_3.csv
SELECT '"TOTAL_XP"','"POKEMON_LEVEL"' FROM dual;
SELECT total_XP,pokemon_level FROM Pokemon_3 ORDER BY pokemon_level;
SPOOL OFF

SPOOL item_2.csv
SELECT '"PRICE"','"RARITY"' FROM dual;
SELECT price,'"'||rarity||'"' FROM Item_2 ORDER BY price;
SPOOL OFF

SPOOL gym_leader_2.csv
SELECT '"DIFFICULTY"','"CASH_REWARD"' FROM dual;
SELECT difficulty,cash_reward FROM Gym_Leader_2 ORDER BY difficulty;
SPOOL OFF

SPOOL trainer.csv
SELECT '"TRAINER_ID"','"NAME"','"LOCATION_NAME"' FROM dual;
SELECT trainer_id,'"'||name||'"','"'||NVL(location_name,'NULL')||'"' FROM Trainer ORDER BY trainer_id;
SPOOL OFF

SPOOL item_1.csv
SELECT '"NAME"','"DESCRIPTION"','"PRICE"','"LOCATION_NAME"' FROM dual;
SELECT '"'||name||'"','"'||description||'"',price,'"'||NVL(location_name,'NULL')||'"' FROM Item_1 ORDER BY name;
SPOOL OFF

SPOOL pokemon_1.csv
SELECT '"POKEDEX"','"POKEMON_ID"','"NAME"','"TOTAL_XP"','"NATURE"','"HP_IV"','"ATTACK_IV"','"DEFENSE_IV"','"SPEED_IV"','"ABILITY_ID"','"TRAINER_ID"' FROM dual;
SELECT pokedex,pokemon_id,'"'||name||'"',total_XP,'"'||nature||'"',HP_IV,attack_IV,defense_IV,speed_IV,ability_id,NVL(trainer_id,0) FROM Pokemon_1 ORDER BY pokedex, pokemon_id;
SPOOL OFF

SPOOL gym_leader_1.csv
SELECT '"TRAINER_ID"','"DIFFICULTY"','"SPECIALTY_TYPE_NAME"','"BADGE_INDEX"' FROM dual;
SELECT trainer_id,difficulty,'"'||specialty_type_name||'"',badge_index FROM Gym_Leader_1 ORDER BY trainer_id;
SPOOL OFF

SPOOL player.csv
SELECT '"TRAINER_ID"','"MONEY"' FROM dual;
SELECT trainer_id,money FROM Player ORDER BY trainer_id;
SPOOL OFF

SPOOL species_evolves_into.csv
SELECT '"OLD_POKEDEX"','"NEW_POKEDEX"','"EVOLUTION_LEVEL"' FROM dual;
SELECT old_pokedex,new_pokedex,NVL(evolution_level,0) FROM Species_Evolves_Into ORDER BY old_pokedex;
SPOOL OFF

SPOOL pokemon_has_learned_move.csv
SELECT '"POKEDEX"','"POKEMON_ID"','"MOVE_ID"' FROM dual;
SELECT pokedex,pokemon_id,move_id FROM Pokemon_Has_Learned_Move ORDER BY pokedex, pokemon_id, move_id;
SPOOL OFF

SPOOL species_has_type.csv
SELECT '"POKEDEX"','"TYPE_NAME"' FROM dual;
SELECT pokedex,'"'||type_name||'"' FROM Species_Has_Type ORDER BY pokedex, type_name;
SPOOL OFF

SPOOL species_can_learn_move.csv
SELECT '"POKEDEX"','"MOVE_ID"' FROM dual;
SELECT pokedex,move_id FROM Species_Can_Learn_Move ORDER BY pokedex, move_id;
SPOOL OFF

SPOOL species_can_have_ability.csv
SELECT '"POKEDEX"','"ABILITY_ID"' FROM dual;
SELECT pokedex,ability_id FROM Species_Can_Have_Ability ORDER BY pokedex, ability_id;
SPOOL OFF

SPOOL species_located_in.csv
SELECT '"POKEDEX"','"LOCATION_NAME"' FROM dual;
SELECT pokedex,'"'||location_name||'"' FROM Species_Located_In ORDER BY pokedex, location_name;
SPOOL OFF

SPOOL species_belongs_to_egg_group.csv
SELECT '"POKEDEX"','"EGG_GROUP_ID"' FROM dual;
SELECT pokedex,egg_group_id FROM Species_Belongs_To_Egg_Group ORDER BY pokedex, egg_group_id;
SPOOL OFF

SPOOL player_owns_badge.csv
SELECT '"TRAINER_ID"','"BADGE_INDEX"' FROM dual;
SELECT trainer_id,badge_index FROM Player_Owns_Badge ORDER BY trainer_id, badge_index;
SPOOL OFF

SET PAGESIZE 14
SET FEEDBACK ON
SET HEADING ON

PROMPT All tables exported to CSV files!
