INSERT ALL
    INTO Location (name, climate, terrain_type) VALUES ('Pallet Town', 'Temperate', 'Grassland')
    INTO Location (name, climate, terrain_type) VALUES ('Viridian City', 'Temperate', 'Urban')
    INTO Location (name, climate, terrain_type) VALUES ('Pewter City', 'Mountainous', 'Rocky')
    INTO Location (name, climate, terrain_type) VALUES ('Cerulean City', 'Coastal', 'Beach')
    INTO Location (name, climate, terrain_type) VALUES ('Vermilion City', 'Coastal', 'Port')
    INTO Location (name, climate, terrain_type) VALUES ('Celadon City', 'Temperate', 'Urban')
    INTO Location (name, climate, terrain_type) VALUES ('Fuchsia City', 'Tropical', 'Swamp')
    INTO Location (name, climate, terrain_type) VALUES ('Saffron City', 'Temperate', 'Urban')
    INTO Location (name, climate, terrain_type) VALUES ('Route 1', 'Temperate', 'Grassland')
SELECT * FROM dual;

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

INSERT ALL
    INTO Badge (badge_index, name) VALUES (1, 'Boulder Badge')
    INTO Badge (badge_index, name) VALUES (2, 'Cascade Badge')
    INTO Badge (badge_index, name) VALUES (3, 'Thunder Badge')
    INTO Badge (badge_index, name) VALUES (4, 'Rainbow Badge')
    INTO Badge (badge_index, name) VALUES (5, 'Soul Badge')
    INTO Badge (badge_index, name) VALUES (6, 'Marsh Badge')
SELECT * FROM dual;

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

INSERT ALL
    INTO Item_2 (price, rarity) VALUES (0, 'Quest')
    INTO Item_2 (price, rarity) VALUES (100, 'Common')
    INTO Item_2 (price, rarity) VALUES (200, 'Common')
    INTO Item_2 (price, rarity) VALUES (600, 'Uncommon')
    INTO Item_2 (price, rarity) VALUES (1000, 'Rare')
    INTO Item_2 (price, rarity) VALUES (2500, 'Very Rare')
SELECT * FROM dual;

INSERT ALL
    INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (1, 1000)
    INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (2, 2000)
    INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (3, 3000)
    INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (4, 5000)
    INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (5, 10000)
SELECT * FROM dual;

INSERT ALL
    INTO Trainer (trainer_id, name, location_name) VALUES (1, 'Ash', 'Pallet Town')
    INTO Trainer (trainer_id, name, location_name) VALUES (2, 'Gary', NULL)
    INTO Trainer (trainer_id, name, location_name) VALUES (3, 'Brock', 'Pewter City')
    INTO Trainer (trainer_id, name, location_name) VALUES (4, 'Misty', 'Cerulean City')
    INTO Trainer (trainer_id, name, location_name) VALUES (5, 'Lt. Surge', 'Vermilion City')
    INTO Trainer (trainer_id, name, location_name) VALUES (6, 'Erika', 'Celadon City')
    INTO Trainer (trainer_id, name, location_name) VALUES (7, 'Koga', 'Fuchsia City')
    INTO Trainer (trainer_id, name, location_name) VALUES (8, 'Sabrina', 'Saffron City')
    INTO Trainer (trainer_id, name, location_name) VALUES (9, 'Blaine', 'Route 1')
    INTO Trainer (trainer_id, name, location_name) VALUES (10, 'Giovanni', NULL)
    INTO Trainer (trainer_id, name, location_name) VALUES (11, 'John', 'Pallet Town')
    INTO Trainer (trainer_id, name, location_name) VALUES (12, 'Joe', NULL)
    INTO Trainer (trainer_id, name, location_name) VALUES (12, 'Amanda', NULL)
SELECT * FROM dual;

INSERT ALL
    INTO Item_1 (name, description, price, location_name) VALUES ('Poké Ball', 'A ball thrown to catch a wild Pokémon. It has a 1x catch rate.', 100, 'Viridian City')
    INTO Item_1 (name, description, price, location_name) VALUES ('Potion', 'A spray-type medicine for treating wounds. It restores the HP of one Pokémon by 20 points.', 200, 'Viridian City')
    INTO Item_1 (name, description, price, location_name) VALUES ('Super Potion', 'A spray-type medicine for treating wounds. It restores the HP of one Pokémon by 50 points.', 600, 'Cerulean City')
    INTO Item_1 (name, description, price, location_name) VALUES ('TM28 - Dig', 'A TM that teaches the move Dig to a compatible Pokémon.', 1000, 'Vermilion City')
    INTO Item_1 (name, description, price, location_name) VALUES ('Rare Candy', 'A candy that is packed with energy. When consumed, it will instantly raise the level of a single Pokémon by one.', 2500, NULL)
    INTO Item_1 (name, description, price, location_name) VALUES ('Bicycle', 'A folding Bicycle that enables a rider to get around much faster than with Running Shoes.', 0, 'Cerulean City')
SELECT * FROM dual;

INSERT ALL
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (1, 1, 'Bulbasaur', 1000, 'Modest', 25, 15, 20, 18, 4, 1)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (2, 1, 'Ivysaur', 3000, 'Calm', 28, 18, 25, 20, 4, 1)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (3, 1, 'Venusaur', 6000, 'Bold', 31, 20, 31, 22, 4, 2)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (4, 1, 'Charmander', 1000, 'Jolly', 22, 25, 18, 28, 5, 3)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (5, 1, 'Charmeleon', 3000, 'Adamant', 26, 30, 20, 25, 5, 4)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (6, 1, 'Charizard', 6000, 'Adamant', 31, 31, 22, 28, 5, 5)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (7, 1, 'Squirtle', 1000, 'Bold', 24, 18, 28, 20, 6, 5)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (8, 1, 'Wartortle', 3000, 'Relaxed', 28, 20, 30, 18, 6, 6)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (9, 1, 'Blastoise', 6000, 'Modest', 31, 15, 31, 25, 6, 7)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (25, 1, 'Pikachu', 3000, 'Timid', 20, 18, 15, 31, 2, 8)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (25, 2, 'Pikachu', 1000, 'Relaxed', 1, 31, 9, 6, 11, 8)
    INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (26, 1, 'Raichu', 6000, 'Jolly', 25, 25, 20, 31, 2, 9)
SELECT * FROM dual;

-- error
INSERT ALL
    INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (3, 1, 'Rock', 1)
    INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (4, 2, 'Water', 2)
    INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (5, 3, 'Electric', 3)
    INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (6, 4, 'Grass', 4)
    INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (7, 5, 'Poison', 5)
    INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (8, 5, 'Psychic', 6)
SELECT * FROM dual;

INSERT ALL
    INTO Player (trainer_id, money) VALUES (1, 5000)
    INTO Player (trainer_id, money) VALUES (2, 3000)
    INTO Player (trainer_id, money) VALUES (11, 5000)
    INTO Player (trainer_id, money) VALUES (12, 3000)
    INTO Player (trainer_id, money) VALUES (13, 5000)
SELECT * FROM dual;

INSERT ALL
    INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (1, 2, 16)
    INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (2, 3, 32)
    INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (4, 5, 16)
    INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (5, 6, 36)
    INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (7, 8, 16)
    INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (8, 9, 36)
    INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (25, 26, NULL)
SELECT * FROM dual;

INSERT ALL
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (1, 1, 1)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (1, 1, 2)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (1, 1, 3)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (4, 1, 1)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (4, 1, 2)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (4, 1, 4)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (7, 1, 1)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (7, 1, 2)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (7, 1, 6)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (25, 1, 1)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (25, 1, 8)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (25, 2, 9)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (26, 1, 8)
    INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (26, 1, 9)
SELECT * FROM dual;

INSERT ALL
    INTO Species_Has_Type (pokedex, type_name) VALUES (1, 'Grass')
    INTO Species_Has_Type (pokedex, type_name) VALUES (1, 'Poison')
    INTO Species_Has_Type (pokedex, type_name) VALUES (2, 'Grass')
    INTO Species_Has_Type (pokedex, type_name) VALUES (2, 'Poison')
    INTO Species_Has_Type (pokedex, type_name) VALUES (3, 'Grass')
    INTO Species_Has_Type (pokedex, type_name) VALUES (3, 'Poison')
    INTO Species_Has_Type (pokedex, type_name) VALUES (4, 'Fire')
    INTO Species_Has_Type (pokedex, type_name) VALUES (5, 'Fire')
    INTO Species_Has_Type (pokedex, type_name) VALUES (6, 'Fire')
    INTO Species_Has_Type (pokedex, type_name) VALUES (6, 'Flying')
    INTO Species_Has_Type (pokedex, type_name) VALUES (7, 'Water')
    INTO Species_Has_Type (pokedex, type_name) VALUES (8, 'Water')
    INTO Species_Has_Type (pokedex, type_name) VALUES (9, 'Water')
    INTO Species_Has_Type (pokedex, type_name) VALUES (25, 'Electric')
    INTO Species_Has_Type (pokedex, type_name) VALUES (26, 'Electric')
SELECT * FROM dual;

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

INSERT ALL
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (1, 4)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (1, 8)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (2, 4)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (2, 8)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (3, 4)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (3, 8)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (4, 5)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (4, 9)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (5, 5)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (5, 9)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (6, 5)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (6, 9)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (7, 6)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (7, 10)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (8, 6)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (8, 10)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (9, 6)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (9, 10)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (25, 2)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (25, 11)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (26, 2)
    INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (26, 11)
SELECT * FROM dual;

INSERT ALL
    INTO Species_Located_In (pokedex, location_name) VALUES (1, 'Pallet Town')
    INTO Species_Located_In (pokedex, location_name) VALUES (4, 'Pallet Town')
    INTO Species_Located_In (pokedex, location_name) VALUES (7, 'Pallet Town')
    INTO Species_Located_In (pokedex, location_name) VALUES (25, 'Viridian City')
    INTO Species_Located_In (pokedex, location_name) VALUES (25, 'Vermilion City')
    INTO Species_Located_In (pokedex, location_name) VALUES (26, 'Vermilion City')
SELECT * FROM dual;

INSERT ALL
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (1, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (1, 3)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (2, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (2, 3)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (3, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (3, 3)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (4, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (4, 8)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (5, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (5, 8)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (6, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (6, 8)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (7, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (7, 6)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (8, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (8, 6)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (9, 13)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (9, 6)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (25, 10)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (25, 12)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (26, 10)
    INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (26, 12)
SELECT * FROM dual;

INSERT ALL
    INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 1)
    INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 2)
    INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 3)
    INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 4)
    INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (2, 1)
    INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (2, 2)
SELECT * FROM dual;