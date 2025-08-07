-- -- Reset the database
-- @reset.sql

-- -- Create all tables
-- @create_pokemon_db.sql

-- -- Insert sample data  
-- @insert_data.sql

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Player_Owns_Badge CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Species_Belongs_To_Egg_Group CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Species_Located_In CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Species_Can_Have_Ability CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Species_Can_Learn_Move CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Species_Has_Type CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Pokemon_Has_Learned_Move CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Species_Evolves_Into CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Player CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Gym_Leader_1 CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Pokemon_1 CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Item_1 CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Trainer CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Gym_Leader_2 CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Item_2 CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Pokemon_3 CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Pokemon_2 CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Move CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Egg_Group CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Species CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Ability CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Badge CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Type CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Location CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

PURGE RECYCLEBIN;

-- Tables with no Foreign Keys
CREATE TABLE
    Location (
        name VARCHAR(40) PRIMARY KEY,
        climate VARCHAR(255) NOT NULL,
        terrain_type VARCHAR(255) NOT NULL
    );

CREATE TABLE
    Type (
        name VARCHAR(9) PRIMARY KEY,
        colour VARCHAR(50) UNIQUE NOT NULL
    );

CREATE TABLE
    Badge (
        badge_index INTEGER PRIMARY KEY,
        name VARCHAR(15) UNIQUE NOT NULL
    );

CREATE TABLE
    Ability (
        ability_id INTEGER PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(1000) NOT NULL
    );

CREATE TABLE
    Species (
        pokedex INTEGER PRIMARY KEY,
        name VARCHAR(12) UNIQUE NOT NULL,
        description VARCHAR(1000) NOT NULL
    );

CREATE TABLE
    Egg_Group (
        egg_group_id INTEGER PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL,
        description VARCHAR(1000) NOT NULL
    );

CREATE TABLE
    Move (
        move_id INTEGER PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        power INTEGER NOT NULL,
        pp INTEGER NOT NULL,
        accuracy INTEGER NOT NULL,
        description VARCHAR(1000) NOT NULL,
        type_name VARCHAR(9) NOT NULL,
        FOREIGN KEY (type_name) REFERENCES Type (name)
    );

-- Normalized Tables
CREATE TABLE
    Pokemon_2 (
        nature VARCHAR(12) PRIMARY KEY,
        stat_increased VARCHAR(12) NOT NULL,
        stat_decreased VARCHAR(12) NOT NULL
    );

CREATE TABLE
    Pokemon_3 (
        total_XP INTEGER PRIMARY KEY,
        pokemon_level INTEGER UNIQUE NOT NULL
    );

CREATE TABLE
    Item_2 (
        price INTEGER PRIMARY KEY,
        rarity VARCHAR(10) NOT NULL
    );

CREATE TABLE
    Gym_Leader_2 (
        difficulty INTEGER PRIMARY KEY,
        cash_reward INTEGER NOT NULL
    );

-- Tables with Foreign Keys
CREATE TABLE
    Trainer (
        trainer_id INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location_name VARCHAR(40),
        FOREIGN KEY (location_name) REFERENCES Location (name)
    );

CREATE TABLE
    Item_1 (
        name VARCHAR(255) PRIMARY KEY,
        description VARCHAR(1000) NOT NULL,
        price INTEGER,
        location_name VARCHAR(40),
        FOREIGN KEY (price) REFERENCES Item_2 (price),
        FOREIGN KEY (location_name) REFERENCES Location (name)
    );

CREATE TABLE
    Pokemon_1 (
        pokedex INTEGER NOT NULL,
        pokemon_id INTEGER NOT NULL,
        name VARCHAR(20) NOT NULL,
        total_XP INTEGER NOT NULL,
        nature VARCHAR(12) NOT NULL,
        HP_IV INTEGER NOT NULL,
        attack_IV INTEGER DEFAULT 0 NOT NULL,
        defense_IV INTEGER DEFAULT 0 NOT NULL,
        speed_IV INTEGER DEFAULT 0 NOT NULL,
        ability_id INTEGER DEFAULT 0 NOT NULL,
        trainer_id INTEGER,
        PRIMARY KEY (pokedex, pokemon_id),
        FOREIGN KEY (pokedex) REFERENCES Species (pokedex),
        FOREIGN KEY (total_XP) REFERENCES Pokemon_3 (total_XP),
        FOREIGN KEY (nature) REFERENCES Pokemon_2 (nature),
        FOREIGN KEY (ability_id) REFERENCES Ability (ability_id),
        FOREIGN KEY (trainer_id) REFERENCES Trainer (trainer_id)
    );

CREATE TABLE
    Gym_Leader_1 (
        trainer_id INTEGER PRIMARY KEY,
        difficulty INTEGER NOT NULL,
        specialty_type_name VARCHAR(9) NOT NULL,
        badge_index INTEGER UNIQUE NOT NULL,
        FOREIGN KEY (trainer_id) REFERENCES Trainer (trainer_id)
            ON DELETE CASCADE,
        FOREIGN KEY (difficulty) REFERENCES Gym_Leader_2 (difficulty),
        FOREIGN KEY (specialty_type_name) REFERENCES Type (name),
        FOREIGN KEY (badge_index) REFERENCES Badge (badge_index)
    );

CREATE TABLE
    Player (
        trainer_id INTEGER PRIMARY KEY,
        money INTEGER NOT NULL,
        FOREIGN KEY (trainer_id) REFERENCES Trainer (trainer_id)
            ON DELETE CASCADE
    );

-- Many-to-Many Relationships:
CREATE TABLE
    Species_Evolves_Into (
        old_pokedex INTEGER,
        new_pokedex INTEGER,
        evolution_level INTEGER,
        PRIMARY KEY (old_pokedex, new_pokedex),
        FOREIGN KEY (old_pokedex) REFERENCES Species (pokedex),
        FOREIGN KEY (new_pokedex) REFERENCES Species (pokedex)
    );

CREATE TABLE
    Pokemon_Has_Learned_Move (
        pokedex INTEGER,
        pokemon_id INTEGER,
        move_id INTEGER,
        PRIMARY KEY (pokedex, pokemon_id, move_id),
        FOREIGN KEY (pokedex, pokemon_id) REFERENCES Pokemon_1 (pokedex, pokemon_id)
            ON DELETE CASCADE,
        FOREIGN KEY (move_id) REFERENCES Move (move_id)
    );

CREATE TABLE
    Species_Has_Type (
        pokedex INTEGER,
        type_name VARCHAR(9),
        PRIMARY KEY (pokedex, type_name),
        FOREIGN KEY (pokedex) REFERENCES Species (pokedex),
        FOREIGN KEY (type_name) REFERENCES Type (name)
    );

CREATE TABLE
    Species_Can_Learn_Move (
        pokedex INTEGER,
        move_id INTEGER,
        PRIMARY KEY (pokedex, move_id),
        FOREIGN KEY (pokedex) REFERENCES Species (pokedex),
        FOREIGN KEY (move_id) REFERENCES Move (move_id)
    );

CREATE TABLE
    Species_Can_Have_Ability (
        pokedex INTEGER,
        ability_id INTEGER,
        PRIMARY KEY (pokedex, ability_id),
        FOREIGN KEY (pokedex) REFERENCES Species (pokedex),
        FOREIGN KEY (ability_id) REFERENCES Ability (ability_id)
    );

CREATE TABLE
    Species_Located_In (
        pokedex INTEGER,
        location_name VARCHAR(40),
        PRIMARY KEY (pokedex, location_name),
        FOREIGN KEY (pokedex) REFERENCES Species (pokedex),
        FOREIGN KEY (location_name) REFERENCES Location (name)
    );

CREATE TABLE
    Species_Belongs_To_Egg_Group (
        pokedex INTEGER,
        egg_group_id INTEGER,
        PRIMARY KEY (pokedex, egg_group_id),
        FOREIGN KEY (pokedex) REFERENCES Species (pokedex),
        FOREIGN KEY (egg_group_id) REFERENCES Egg_Group (egg_group_id)
    );

CREATE TABLE
    Player_Owns_Badge (
        trainer_id INTEGER,
        badge_index INTEGER,
        PRIMARY KEY (trainer_id, badge_index),
        FOREIGN KEY (trainer_id) REFERENCES Player (trainer_id)
            ON DELETE CASCADE,
        FOREIGN KEY (badge_index) REFERENCES Badge (badge_index)
    );


INSERT INTO Location (name, climate, terrain_type) VALUES ('Pallet Town', 'Temperate', 'Grassland');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Viridian City', 'Temperate', 'Urban');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Pewter City', 'Mountainous', 'Rocky');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Cerulean City', 'Coastal', 'Beach');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Vermilion City', 'Coastal', 'Port');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Celadon City', 'Temperate', 'Urban');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Fuchsia City', 'Tropical', 'Swamp');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Saffron City', 'Temperate', 'Urban');
INSERT INTO Location (name, climate, terrain_type) VALUES ('Route 1', 'Temperate', 'Grassland');

INSERT INTO Type (name, colour) VALUES ('Normal', 'Tan');
INSERT INTO Type (name, colour) VALUES ('Fire', 'Red');
INSERT INTO Type (name, colour) VALUES ('Water', 'Blue');
INSERT INTO Type (name, colour) VALUES ('Electric', 'Yellow');
INSERT INTO Type (name, colour) VALUES ('Grass', 'Green');
INSERT INTO Type (name, colour) VALUES ('Ice', 'Light Blue');
INSERT INTO Type (name, colour) VALUES ('Fighting', 'Brown');
INSERT INTO Type (name, colour) VALUES ('Poison', 'Purple');
INSERT INTO Type (name, colour) VALUES ('Ground', 'Earth');
INSERT INTO Type (name, colour) VALUES ('Flying', 'Sky Blue');
INSERT INTO Type (name, colour) VALUES ('Psychic', 'Pink');
INSERT INTO Type (name, colour) VALUES ('Bug', 'Olive');
INSERT INTO Type (name, colour) VALUES ('Rock', 'Gray');
INSERT INTO Type (name, colour) VALUES ('Ghost', 'Indigo');
INSERT INTO Type (name, colour) VALUES ('Dragon', 'Dark Blue');
INSERT INTO Type (name, colour) VALUES ('Dark', 'Black');
INSERT INTO Type (name, colour) VALUES ('Steel', 'Silver');
INSERT INTO Type (name, colour) VALUES ('Fairy', 'Light Pink');

INSERT INTO Badge (badge_index, name) VALUES (1, 'Boulder Badge');
INSERT INTO Badge (badge_index, name) VALUES (2, 'Cascade Badge');
INSERT INTO Badge (badge_index, name) VALUES (3, 'Thunder Badge');
INSERT INTO Badge (badge_index, name) VALUES (4, 'Rainbow Badge');
INSERT INTO Badge (badge_index, name) VALUES (5, 'Soul Badge');
INSERT INTO Badge (badge_index, name) VALUES (6, 'Marsh Badge');

INSERT INTO Ability (ability_id, name, description) VALUES (2, 'Static', 'Contact with the Pokémon may cause paralysis.');
INSERT INTO Ability (ability_id, name, description) VALUES (4, 'Overgrow', 'Powers up Grass-type moves when the Pokémon''s HP is low.');
INSERT INTO Ability (ability_id, name, description) VALUES (5, 'Blaze', 'Powers up Fire-type moves when the Pokémon''s HP is low.');
INSERT INTO Ability (ability_id, name, description) VALUES (6, 'Torrent', 'Powers up Water-type moves when the Pokémon''s HP is low.');
INSERT INTO Ability (ability_id, name, description) VALUES (8, 'Chlorophyll', 'Boosts the Pokémon''s Speed stat in harsh sunlight.');
INSERT INTO Ability (ability_id, name, description) VALUES (9, 'Solar Power', 'Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn.');
INSERT INTO Ability (ability_id, name, description) VALUES (10, 'Rain Dish', 'The Pokémon gradually regains HP in rain.');
INSERT INTO Ability (ability_id, name, description) VALUES (11, 'Lightning Rod', 'Draws in all Electric-type moves to boost its Sp. Atk stat.');

INSERT INTO Species (pokedex, name, description) VALUES (1, 'Bulbasaur', 'It carries a seed on its back right from birth. As its body grows larger, the seed does too.');
INSERT INTO Species (pokedex, name, description) VALUES (2, 'Ivysaur', 'The bulb on its back grows as it absorbs nutrients. The bulb gives off a pleasant aroma when it blooms.');
INSERT INTO Species (pokedex, name, description) VALUES (3, 'Venusaur', 'By spreading the broad petals of its flower and catching the sun''s rays, it fills its body with power.');
INSERT INTO Species (pokedex, name, description) VALUES (4, 'Charmander', 'The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly.');
INSERT INTO Species (pokedex, name, description) VALUES (5, 'Charmeleon', 'It is very hotheaded by nature, so it constantly seeks opponents to battle against. Its aggression will not be quelled if it doesn''t win.');
INSERT INTO Species (pokedex, name, description) VALUES (6, 'Charizard', 'The flame inside its body burns hotter than 3,600 degrees Fahrenheit. When Charizard roars, that temperature climbs even higher.');
INSERT INTO Species (pokedex, name, description) VALUES (7, 'Squirtle', 'Its shell is soft immediately after it is born. In no time at all, the shell becomes so resilient that a prodding finger will bounce right off it.');
INSERT INTO Species (pokedex, name, description) VALUES (8, 'Wartortle', 'It often hides in water to stalk unwary prey. While swimming quickly, it moves its ears to maintain balance.');
INSERT INTO Species (pokedex, name, description) VALUES (9, 'Blastoise', 'It has jet nozzles on its shell. This impressive Pokémon uses these jets to charge toward foes with all the force of a rocket.');
INSERT INTO Species (pokedex, name, description) VALUES (25, 'Pikachu', 'When several of these Pokémon gather, their electricity can build and cause lightning storms.');
INSERT INTO Species (pokedex, name, description) VALUES (26, 'Raichu', 'Its tail discharges electricity into the ground, protecting it from getting shocked.');

INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (1, 'Mineral', 'Pokemon in this group are inorganic in nature');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (2, 'Amorphous', 'Pokemon in this group are amorphous, having no definite form');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (3, 'Grass', 'Pokemon in this group are plantlike in appearance');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (4, 'Water 3', 'Pokemon in this group resemble aquatic invertebrates');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (5, 'Water 2', 'Pokemon in this group are piscine (fishlike) in appearance');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (6, 'Water 1', 'Pokemon in this group are amphibious in nature');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (7, 'Bug', 'Pokemon in this group are insectoid (bug-like) in appearance');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (8, 'Dragon', 'Pokemon in this group are reptilian or draconic in appearance');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (9, 'Flying', 'Pokemon in this group are avian (birdlike) in appearance');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (10, 'Field', 'The largest group, Pokemon here are terrestrial in nature');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (11, 'Human-Like', 'Pokemon in this group are fully bipedal humanoids');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (12, 'Fairy', 'Pokemon in this group are petite and considered very cute');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (13, 'Monster', 'Pokemon in this group are saurian/kaiju-like in appearance and nature');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (14, 'Ditto', 'Ditto is the only Pokemon in this group, capable of breeding with most others');
INSERT INTO Egg_Group (egg_group_id, name, description) VALUES (15, 'No Eggs Discovered', 'Pokemon in this group are unable to breed');

INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (1, 'Tackle', 40, 35, 100, 'A physical attack in which the user charges and slams INSERT INTO the target with its whole body.', 'Normal');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (2, 'Growl', 0, 40, 100, 'The user growls in an endearing way, making opposing Pokémon less wary and lowering their Attack stats.', 'Normal');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (3, 'Vine Whip', 45, 25, 100, 'The target is struck with slender, whip-like vines.', 'Grass');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (4, 'Ember', 40, 25, 100, 'The target is attacked with small flames. May also leave the target with a burn.', 'Fire');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (5, 'Flamethrower', 90, 15, 100, 'The target is scorched with an intense blast of fire. May also leave the target with a burn.', 'Fire');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (6, 'Water Gun', 40, 25, 100, 'The target is blasted with a forceful jet of water.', 'Water');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (7, 'Hydro Pump', 110, 5, 80, 'The target is blasted by a huge volume of water launched under great pressure.', 'Water');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (8, 'Thunder Shock', 40, 30, 100, 'A jolt of electricity is hurled at the target to inflict damage. May also paralyze the target.', 'Electric');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (9, 'Quick Attack', 40, 30, 100, 'The user lunges at the target at a speed that makes it almost invisible.', 'Normal');
INSERT INTO Move (move_id, name, power, pp, accuracy, description, type_name) VALUES (10, 'Double Team', 0, 15, 0, 'By moving rapidly, the user makes illusory copies of itself to raise its evasion.', 'Normal');

INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Adamant', 'Attack', 'Sp. Atk');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Modest', 'Sp. Atk', 'Attack');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Jolly', 'Speed', 'Sp. Atk');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Timid', 'Speed', 'Attack');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Bold', 'Defense', 'Attack');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Impish', 'Defense', 'Sp. Atk');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Calm', 'Sp. Def', 'Attack');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Careful', 'Sp. Def', 'Sp. Atk');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Naive', 'Speed', 'Sp. Def');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Hasty', 'Speed', 'Defense');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Brave', 'Attack', 'Speed');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Quiet', 'Sp. Atk', 'Speed');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Rash', 'Sp. Atk', 'Sp. Def');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Lonely', 'Attack', 'Defense');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Mild', 'Sp. Atk', 'Defense');
INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES ('Relaxed', 'Defense', 'Speed');

INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (1, 0);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (2, 250);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (3, 500);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (4, 750);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (5, 1000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (6, 1400);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (7, 1800);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (8, 2200);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (9, 2600);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (10, 3000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (11, 3600);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (12, 4200);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (13, 4800);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (14, 5400);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (15, 6000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (16, 6800);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (17, 7600);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (18, 8400);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (19, 9200);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (20, 10000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (21, 11000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (22, 12000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (23, 13000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (24, 14000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (25, 15000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (26, 16200);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (27, 17400);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (28, 18600);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (29, 19800);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (30, 21000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (31, 22400);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (32, 23800);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (33, 25200);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (34, 26600);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (35, 28000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (36, 29600);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (37, 31200);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (38, 32800);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (39, 34400);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (40, 36000);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (41, 37800);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (42, 39600);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (43, 41400);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (44, 43200);
INSERT INTO Pokemon_3 (pokemon_level, total_XP) VALUES (45, 45000);

INSERT INTO Item_2 (price, rarity) VALUES (0, 'Quest');
INSERT INTO Item_2 (price, rarity) VALUES (100, 'Common');
INSERT INTO Item_2 (price, rarity) VALUES (200, 'Common');
INSERT INTO Item_2 (price, rarity) VALUES (600, 'Uncommon');
INSERT INTO Item_2 (price, rarity) VALUES (1000, 'Rare');
INSERT INTO Item_2 (price, rarity) VALUES (2500, 'Very Rare');

INSERT INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (1, 1000);
INSERT INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (2, 2000);
INSERT INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (3, 3000);
INSERT INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (4, 5000);
INSERT INTO Gym_Leader_2 (difficulty, cash_reward) VALUES (5, 10000);

INSERT INTO Trainer (trainer_id, name, location_name) VALUES (1, 'Ash', 'Pallet Town');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (2, 'Gary', NULL);
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (3, 'Brock', 'Pewter City');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (4, 'Misty', 'Cerulean City');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (5, 'Lt. Surge', 'Vermilion City');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (6, 'Erika', 'Celadon City');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (7, 'Koga', 'Fuchsia City');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (8, 'Sabrina', 'Saffron City');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (9, 'Blaine', 'Route 1');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (10, 'Giovanni', NULL);
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (11, 'John', 'Pallet Town');
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (12, 'Joe', NULL);
INSERT INTO Trainer (trainer_id, name, location_name) VALUES (13, 'Amanda', NULL);

INSERT INTO Item_1 (name, description, price, location_name) VALUES ('Poké Ball', 'A ball thrown to catch a wild Pokémon. It has a 1x catch rate.', 100, 'Viridian City');
INSERT INTO Item_1 (name, description, price, location_name) VALUES ('Potion', 'A spray-type medicine for treating wounds. It restores the HP of one Pokémon by 20 points.', 200, 'Viridian City');
INSERT INTO Item_1 (name, description, price, location_name) VALUES ('Super Potion', 'A spray-type medicine for treating wounds. It restores the HP of one Pokémon by 50 points.', 600, 'Cerulean City');
INSERT INTO Item_1 (name, description, price, location_name) VALUES ('TM28 - Dig', 'A TM that teaches the move Dig to a compatible Pokémon.', 1000, 'Vermilion City');
INSERT INTO Item_1 (name, description, price, location_name) VALUES ('Rare Candy', 'A candy that is packed with energy. When consumed, it will instantly raise the level of a single Pokémon by one.', 2500, NULL);
INSERT INTO Item_1 (name, description, price, location_name) VALUES ('Bicycle', 'A folding Bicycle that enables a rider to get around much faster than with Running Shoes.', 0, 'Cerulean City');

INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (1, 1, 'Bulbasaur', 1000, 'Modest', 25, 15, 20, 18, 4, 1);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (2, 1, 'Ivysaur', 3000, 'Calm', 28, 18, 25, 20, 4, 1);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (3, 1, 'Venusaur', 6000, 'Bold', 31, 20, 31, 22, 4, 2);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (4, 1, 'Charmander', 1000, 'Jolly', 22, 25, 18, 28, 5, 3);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (5, 1, 'Charmeleon', 3000, 'Adamant', 26, 30, 20, 25, 5, 4);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (6, 1, 'Charizard', 6000, 'Adamant', 31, 31, 22, 28, 5, 5);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (7, 1, 'Squirtle', 1000, 'Bold', 24, 18, 28, 20, 6, 5);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (8, 1, 'Wartortle', 3000, 'Relaxed', 28, 20, 30, 18, 6, 6);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (9, 1, 'Blastoise', 6000, 'Modest', 31, 15, 31, 25, 6, 7);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (25, 1, 'Pikachu', 3000, 'Timid', 20, 18, 15, 31, 2, 8);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (25, 2, 'Pikachu', 1000, 'Relaxed', 1, 31, 9, 6, 11, 8);
INSERT INTO Pokemon_1 (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) VALUES (26, 1, 'Raichu', 6000, 'Jolly', 25, 25, 20, 31, 2, 9);

INSERT INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (3, 1, 'Rock', 1);
INSERT INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (4, 2, 'Water', 2);
INSERT INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (5, 3, 'Electric', 3);
INSERT INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (6, 4, 'Grass', 4);
INSERT INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (7, 5, 'Poison', 5);
INSERT INTO Gym_Leader_1 (trainer_id, difficulty, specialty_type_name, badge_index) VALUES (8, 5, 'Psychic', 6);

INSERT INTO Player (trainer_id, money) VALUES (1, 5000);
INSERT INTO Player (trainer_id, money) VALUES (2, 3000);
INSERT INTO Player (trainer_id, money) VALUES (11, 5000);
INSERT INTO Player (trainer_id, money) VALUES (12, 3000);
INSERT INTO Player (trainer_id, money) VALUES (13, 5000);

INSERT INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (1, 2, 16);
INSERT INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (2, 3, 32);
INSERT INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (4, 5, 16);
INSERT INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (5, 6, 36);
INSERT INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (7, 8, 16);
INSERT INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (8, 9, 36);
INSERT INTO Species_Evolves_Into (old_pokedex, new_pokedex, evolution_level) VALUES (25, 26, NULL);

INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (1, 1, 1);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (1, 1, 2);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (1, 1, 3);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (4, 1, 1);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (4, 1, 2);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (4, 1, 4);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (7, 1, 1);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (7, 1, 2);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (7, 1, 6);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (25, 1, 1);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (25, 1, 8);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (25, 2, 9);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (26, 1, 8);
INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (26, 1, 9);

INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (1, 'Grass');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (1, 'Poison');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (2, 'Grass');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (2, 'Poison');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (3, 'Grass');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (3, 'Poison');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (4, 'Fire');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (5, 'Fire');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (6, 'Fire');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (6, 'Flying');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (7, 'Water');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (8, 'Water');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (9, 'Water');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (25, 'Electric');
INSERT INTO Species_Has_Type (pokedex, type_name) VALUES (26, 'Electric');

INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (1, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (1, 3);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (1, 2);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (2, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (2, 3);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (2, 2);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (3, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (3, 3);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (3, 2);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (4, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (4, 4);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (5, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (5, 5);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (6, 5);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (6, 9);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (7, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (7, 6);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (8, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (8, 6);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (9, 1);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (9, 7);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (25, 8);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (25, 9);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (25, 10);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (26, 8);
INSERT INTO Species_Can_Learn_Move (pokedex, move_id) VALUES (26, 9);

INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (1, 4);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (1, 8);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (2, 4);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (2, 8);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (3, 4);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (3, 8);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (4, 5);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (4, 9);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (5, 5);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (5, 9);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (6, 5);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (6, 9);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (7, 6);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (7, 10);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (8, 6);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (8, 10);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (9, 6);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (9, 10);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (25, 2);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (25, 11);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (26, 2);
INSERT INTO Species_Can_Have_Ability (pokedex, ability_id) VALUES (26, 11);

INSERT INTO Species_Located_In (pokedex, location_name) VALUES (1, 'Pallet Town');
INSERT INTO Species_Located_In (pokedex, location_name) VALUES (4, 'Pallet Town');
INSERT INTO Species_Located_In (pokedex, location_name) VALUES (7, 'Pallet Town');
INSERT INTO Species_Located_In (pokedex, location_name) VALUES (25, 'Viridian City');
INSERT INTO Species_Located_In (pokedex, location_name) VALUES (25, 'Vermilion City');
INSERT INTO Species_Located_In (pokedex, location_name) VALUES (26, 'Vermilion City');

INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (1, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (1, 3);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (2, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (2, 3);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (3, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (3, 3);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (4, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (4, 8);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (5, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (5, 8);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (6, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (6, 8);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (7, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (7, 6);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (8, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (8, 6);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (9, 13);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (9, 6);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (25, 10);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (25, 12);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (26, 10);
INSERT INTO Species_Belongs_To_Egg_Group (pokedex, egg_group_id) VALUES (26, 12);

INSERT INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 1);
INSERT INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 2);
INSERT INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 3);
INSERT INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (1, 4);
INSERT INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (2, 1);
INSERT INTO Player_Owns_Badge (trainer_id, badge_index) VALUES (2, 2);
