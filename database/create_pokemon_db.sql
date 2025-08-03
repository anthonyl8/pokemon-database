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
        pokemon_level INTEGER NOT NULL
    );

CREATE TABLE
    Item_2 (
        price INTEGER PRIMARY KEY,
        rarity VARCHAR(10) NOT NULL
    );

CREATE TABLE
    Gym_Leader_2 (
        difficulty VARCHAR(10) PRIMARY KEY,
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
        attack_IV INTEGER NOT NULL,
        defense_IV INTEGER NOT NULL,
        speed_IV INTEGER NOT NULL,
        ability_id INTEGER NOT NULL,
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
        difficulty VARCHAR(10) NOT NULL,
        specialty_type_name VARCHAR(9) NOT NULL,
        badge_index INTEGER UNIQUE NOT NULL,
        FOREIGN KEY (trainer_id) REFERENCES Trainer (trainer_id),
        FOREIGN KEY (difficulty) REFERENCES Gym_Leader_2 (difficulty),
        FOREIGN KEY (specialty_type_name) REFERENCES Type (name),
        FOREIGN KEY (badge_index) REFERENCES Badge (badge_index)
    );

CREATE TABLE
    Player (
        trainer_id INTEGER PRIMARY KEY,
        money INTEGER NOT NULL,
        FOREIGN KEY (trainer_id) REFERENCES Trainer (trainer_id)
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
        FOREIGN KEY (pokedex, pokemon_id) REFERENCES Pokemon_1 (pokedex, pokemon_id),
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
        FOREIGN KEY (trainer_id) REFERENCES Player (trainer_id),
        FOREIGN KEY (badge_index) REFERENCES Badge (badge_index)
    );