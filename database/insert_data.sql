-- Insert Location data
INSERT ALL
  INTO Location (name, climate, terrain_type) VALUES ('Pallet Town', 'Temperate', 'Grassland')
  INTO Location (name, climate, terrain_type) VALUES ('Viridian City', 'Temperate', 'Urban')
  INTO Location (name, climate, terrain_type) VALUES ('Pewter City', 'Mountainous', 'Rocky')
  INTO Location (name, climate, terrain_type) VALUES ('Cerulean City', 'Coastal', 'Beach')
  INTO Location (name, climate, terrain_type) VALUES ('Vermilion City', 'Coastal', 'Port')
SELECT * FROM dual;

-- Insert Type data
INSERT ALL
  INTO Type (name, colour) VALUES ('Normal', 'Tan')
  INTO Type (name, colour) VALUES ('Fire', 'Red')
  INTO Type (name, colour) VALUES ('Water', 'Blue')
  INTO Type (name, colour) VALUES ('Electric', 'Yellow')
  INTO Type (name, colour) VALUES ('Grass', 'Green')
  INTO Type (name, colour) VALUES ('Ice', 'Light Blue')
  INTO Type (name, colour) VALUES ('Fighting', 'Brown')
  INTO Type (name, colour) VALUES ('Poison', 'Purple')
  INTO Type (name, colour) VALUES ('Ground', 'Earth')
  INTO Type (name, colour) VALUES ('Flying', 'Sky Blue')
  INTO Type (name, colour) VALUES ('Psychic', 'Pink')
  INTO Type (name, colour) VALUES ('Bug', 'Olive')
  INTO Type (name, colour) VALUES ('Rock', 'Gray')
  INTO Type (name, colour) VALUES ('Ghost', 'Indigo')
  INTO Type (name, colour) VALUES ('Dragon', 'Dark Blue')
  INTO Type (name, colour) VALUES ('Dark', 'Black')
  INTO Type (name, colour) VALUES ('Steel', 'Silver')
  INTO Type (name, colour) VALUES ('Fairy', 'Light Pink')
SELECT * FROM dual;

-- Insert Ability data
INSERT ALL
  INTO Ability (ability_id, name, description) VALUES (2, 'Static', 'Contact with the Pokémon may cause paralysis.')
  INTO Ability (ability_id, name, description) VALUES (4, 'Overgrow', 'Powers up Grass-type moves when the Pokémon''s HP is low.')
  INTO Ability (ability_id, name, description) VALUES (5, 'Blaze', 'Powers up Fire-type moves when the Pokémon''s HP is low.')
  INTO Ability (ability_id, name, description) VALUES (6, 'Torrent', 'Powers up Water-type moves when the Pokémon''s HP is low.')
  INTO Ability (ability_id, name, description) VALUES (8, 'Chlorophyll', 'Boosts the Pokémon''s Speed stat in harsh sunlight.')
  INTO Ability (ability_id, name, description) VALUES (9, 'Solar Power', 'Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn.')
  INTO Ability (ability_id, name, description) VALUES (10, 'Rain Dish', 'The Pokémon gradually regains HP in rain.')
  INTO Ability (ability_id, name, description) VALUES (11, 'Lightning Rod', 'Draws in all Electric-type moves to boost its Sp. Atk stat.')
SELECT * FROM dual;

-- Insert Species data
INSERT ALL
  INTO Species (pokedex, name, description) VALUES (1, 'Bulbasaur', 'It carries a seed on its back right from birth. As its body grows larger, the seed does too.')
  INTO Species (pokedex, name, description) VALUES (2, 'Ivysaur', 'The bulb on its back grows as it absorbs nutrients. The bulb gives off a pleasant aroma when it blooms.')
  INTO Species (pokedex, name, description) VALUES (3, 'Venusaur', 'By spreading the broad petals of its flower and catching the sun''s rays, it fills its body with power.')
  INTO Species (pokedex, name, description) VALUES (4, 'Charmander', 'The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly.')
  INTO Species (pokedex, name, description) VALUES (5, 'Charmeleon', 'It is very hotheaded by nature, so it constantly seeks opponents to battle against. Its aggression will not be quelled if it doesn''t win.')
  INTO Species (pokedex, name, description) VALUES (6, 'Charizard', 'The flame inside its body burns hotter than 3,600 degrees Fahrenheit. When Charizard roars, that temperature climbs even higher.')
  INTO Species (pokedex, name, description) VALUES (7, 'Squirtle', 'Its shell is soft immediately after it is born. In no time at all, the shell becomes so resilient that a prodding finger will bounce right off it.')
  INTO Species (pokedex, name, description) VALUES (8, 'Wartortle', 'It often hides in water to stalk unwary prey. While swimming quickly, it moves its ears to maintain balance.')
  INTO Species (pokedex, name, description) VALUES (9, 'Blastoise', 'It has jet nozzles on its shell. This impressive Pokémon uses these jets to charge toward foes with all the force of a rocket.')
  INTO Species (pokedex, name, description) VALUES (25, 'Pikachu', 'When several of these Pokémon gather, their electricity can build and cause lightning storms.')
  INTO Species (pokedex, name, description) VALUES (26, 'Raichu', 'Its tail discharges electricity into the ground, protecting it from getting shocked.')
SELECT * FROM dual;

-- Insert Egg_Group data
INSERT ALL
  INTO Egg_Group (egg_group_id, name, description) VALUES (1, 'Mineral', 'Pokemon in this group are inorganic in nature')
  INTO Egg_Group (egg_group_id, name, description) VALUES (2, 'Amorphous', 'Pokemon in this group are amorphous, having no definite form')
  INTO Egg_Group (egg_group_id, name, description) VALUES (3, 'Grass', 'Pokemon in this group are plantlike in appearance')
  INTO Egg_Group (egg_group_id, name, description) VALUES (4, 'Water 3', 'Pokemon in this group resemble aquatic invertebrates')
  INTO Egg_Group (egg_group_id, name, description) VALUES (5, 'Water 2', 'Pokemon in this group are piscine (fishlike) in appearance')
  INTO Egg_Group (egg_group_id, name, description) VALUES (6, 'Water 1', 'Pokemon in this group are amphibious in nature')
  INTO Egg_Group (egg_group_id, name, description) VALUES (7, 'Bug', 'Pokemon in this group are insectoid (bug-like) in appearance')
  INTO Egg_Group (egg_group_id, name, description) VALUES (8, 'Dragon', 'Pokemon in this group are reptilian or draconic in appearance')
  INTO Egg_Group (egg_group_id, name, description) VALUES (9, 'Flying', 'Pokemon in this group are avian (birdlike) in appearance')
  INTO Egg_Group (egg_group_id, name, description) VALUES (10, 'Field', 'The largest group, Pokemon here are terrestrial in nature')
  INTO Egg_Group (egg_group_id, name, description) VALUES (11, 'Human-Like', 'Pokemon in this group are fully bipedal humanoids')
  INTO Egg_Group (egg_group_id, name, description) VALUES (12, 'Fairy', 'Pokemon in this group are petite and considered very cute')
  INTO Egg_Group (egg_group_id, name, description) VALUES (13, 'Monster', 'Pokemon in this group are saurian/kaiju-like in appearance and nature')
  INTO Egg_Group (egg_group_id, name, description) VALUES (14, 'Ditto', 'Ditto is the only Pokemon in this group, capable of breeding with most others')
  INTO Egg_Group (egg_group_id, name, description) VALUES (15, 'No Eggs Discovered', 'Pokemon in this group are unable to breed')
SELECT * FROM dual;

-- Insert Move data
INSERT ALL
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (1, 'Tackle', 40, 35, 100, 'A physical attack in which the user charges and slams into the target with its whole body.', 'Normal')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (2, 'Growl', 0, 40, 100, 'The user growls in an endearing way, making opposing Pokémon less wary and lowering their Attack stats.', 'Normal')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (3, 'Vine Whip', 45, 25, 100, 'The target is struck with slender, whip-like vines.', 'Grass')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (4, 'Ember', 40, 25, 100, 'The target is attacked with small flames. May also leave the target with a burn.', 'Fire')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (5, 'Flamethrower', 90, 15, 100, 'The target is scorched with an intense blast of fire. May also leave the target with a burn.', 'Fire')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (6, 'Water Gun', 40, 25, 100, 'The target is blasted with a forceful jet of water.', 'Water')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (7, 'Hydro Pump', 110, 5, 80, 'The target is blasted by a huge volume of water launched under great pressure.', 'Water')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (8, 'Thunder Shock', 40, 30, 100, 'A jolt of electricity is hurled at the target to inflict damage. May also paralyze the target.', 'Electric')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (9, 'Quick Attack', 40, 30, 100, 'The user lunges at the target at a speed that makes it almost invisible.', 'Normal')
  INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (10, 'Double Team', 0, 15, 0, 'By moving rapidly, the user makes illusory copies of itself to raise its evasion.', 'Normal')
SELECT * FROM dual;

-- Insert Pokemon_2 data
INSERT ALL
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Adamant', 'Attack', 'Sp. Atk')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Modest', 'Sp. Atk', 'Attack')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Jolly', 'Speed', 'Sp. Atk')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Calm', 'Sp. Def', 'Attack')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Bold', 'Defense', 'Attack')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Timid', 'Speed', 'Attack')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Relaxed', 'Defense', 'Speed')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Hasty', 'Speed', 'Defense')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Impish', 'Defense', 'Sp. Atk')
  INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Lonely', 'Attack', 'Defense')
SELECT * FROM dual;

-- Insert Pokemon_3 data
INSERT ALL
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (1000, 5)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (3000, 10)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (6000, 15)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (10000, 20)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (15000, 25)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (21000, 30)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (28000, 35)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (36000, 40)
  INTO Pokemon_3 (total_XP, pokemon_level) VALUES (45000, 45)
SELECT * FROM dual;

-- Insert Species_Can_Learn_Move data
INSERT ALL
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (1, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (1, 3)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (1, 2)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (2, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (2, 3)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (2, 2)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (3, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (3, 3)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (3, 2)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (4, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (4, 4)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (5, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (5, 5)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (6, 5)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (6, 9)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (7, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (7, 6)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (8, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (8, 6)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (9, 1)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (9, 7)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (25, 8)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (25, 9)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (25, 10)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (26, 8)
  INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (26, 9)
SELECT * FROM dual;