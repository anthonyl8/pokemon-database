-- Insert into the tables
INSERT INTO
    Location (name, climate, terrain_type)
VALUES
    ('Pallet Town', 'Temperate', 'Grassland'),
    ('Viridian City', 'Temperate', 'Urban'),
    ('Pewter City', 'Mountainous', 'Rocky'),
    ('Cerulean City', 'Coastal', 'Beach'),
    ('Vermilion City', 'Coastal', 'Port');

INSERT INTO
    Type (name, colour)
VALUES
    ('Normal', 'Tan'),
    ('Fire', 'Red'),
    ('Water', 'Blue'),
    ('Electric', 'Yellow'),
    ('Grass', 'Green'),
    ('Ice', 'Light Blue'),
    ('Fighting', 'Brown'),
    ('Poison', 'Purple'),
    ('Ground', 'Earth'),
    ('Flying', 'Sky Blue'),
    ('Psychic', 'Pink'),
    ('Bug', 'Olive'),
    ('Rock', 'Gray'),
    ('Ghost', 'Indigo'),
    ('Dragon', 'Dark Blue'),
    ('Dark', 'Black'),
    ('Steel', 'Silver'),
    ('Fairy', 'Light Pink');

INSERT INTO
    Ability (ability_id, name, description)
VALUES
    (
        2,
        'Static',
        'Contact with the Pokémon may cause paralysis.'
    ),
    (
        4,
        'Overgrow',
        'Powers up Grass-type moves when the Pokémon''s HP is low.'
    ),
    (
        5,
        'Blaze',
        'Powers up Fire-type moves when the Pokémon''s HP is low.'
    ),
    (
        6,
        'Torrent',
        'Powers up Water-type moves when the Pokémon''s HP is low.'
    ),
    (
        8,
        'Chlorophyll',
        'Boosts the Pokémon''s Speed stat in harsh sunlight.'
    ),
    (
        9,
        'Solar Power',
        'Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn.'
    ),
    (
        10,
        'Rain Dish',
        'The Pokémon gradually regains HP in rain.'
    ),
    (
        11,
        'Lightning Rod',
        'Draws in all Electric-type moves to boost its Sp. Atk stat.'
    );

INSERT INTO
    Species (pokedex, name, description)
VALUES
    (
        1,
        'Bulbasaur',
        'It carries a seed on its back right from birth. As its body grows larger, the seed does too.'
    ),
    (
        2,
        'Ivysaur',
        'The bulb on its back grows as it absorbs nutrients. The bulb gives off a pleasant aroma when it blooms.'
    ),
    (
        3,
        'Venusaur',
        'By spreading the broad petals of its flower and catching the sun''s rays, it fills its body with power.'
    ),
    (
        4,
        'Charmander',
        'The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly.'
    ),
    (
        5,
        'Charmeleon',
        'It is very hotheaded by nature, so it constantly seeks opponents to battle against. Its aggression will not be quelled if it doesn''t win.'
    ),
    (
        6,
        'Charizard',
        'The flame inside its body burns hotter than 3,600 degrees Fahrenheit. When Charizard roars, that temperature climbs even higher.'
    ),
    (
        7,
        'Squirtle',
        'Its shell is soft immediately after it is born. In no time at all, the shell becomes so resilient that a prodding finger will bounce right off it.'
    ),
    (
        8,
        'Wartortle',
        'It often hides in water to stalk unwary prey. While swimming quickly, it moves its ears to maintain balance.'
    ),
    (
        9,
        'Blastoise',
        'It has jet nozzles on its shell. This impressive Pokémon uses these jets to charge toward foes with all the force of a rocket.'
    ),
    (
        25,
        'Pikachu',
        'When several of these Pokémon gather, their electricity can build and cause lightning storms.'
    ),
    (
        26,
        'Raichu',
        'Its tail discharges electricity into the ground, protecting it from getting shocked.'
    );

INSERT INTO
    Egg_Group (egg_group_id, name, description)
VALUES
    (
        1,
        'Mineral',
        'Pokemon in this group are inorganic in nature'
    ),
    (
        2,
        'Amorphous',
        'Pokemon in this group are amorphous, having no definite form'
    ),
    (
        3,
        'Grass',
        'Pokemon in this group are plantlike in appearance'
    ),
    (
        4,
        'Water 3',
        'Pokemon in this group resemble aquatic invertebrates'
    ),
    (
        5,
        'Water 2',
        'Pokemon in this group are piscine (fishlike) in appearance'
    ),
    (
        6,
        'Water 1',
        'Pokemon in this group are amphibious in nature'
    ),
    (
        7,
        'Bug',
        'Pokemon in this group are insectoid (bug-like) in appearance'
    ),
    (
        8,
        'Dragon',
        'Pokemon in this group are reptilian or draconic in appearance'
    ),
    (
        9,
        'Flying',
        'Pokemon in this group are avian (birdlike) in appearance'
    ),
    (
        10,
        'Field',
        'The largest group, Pokemon here are terrestrial in nature'
    ),
    (
        11,
        'Human-Like',
        'Pokemon in this group are fully bipedal humanoids'
    ),
    (
        12,
        'Fairy',
        'Pokemon in this group are petite and considered very cute'
    ),
    (
        13,
        'Monster',
        'Pokemon in this group are saurian/kaiju-like in appearance and nature'
    ),
    (
        14,
        'Ditto',
        'Ditto is the only Pokemon in this group, capable of breeding with most others'
    ),
    (
        15,
        'No Eggs Discovered',
        'Pokemon in this group are unable to breed'
    );

INSERT INTO
    Move (
        move_id,
        name,
        power,
        pp,
        accuracy,
        description,
        type_name
    )
VALUES
    (
        1,
        'Tackle',
        40,
        35,
        100,
        'A physical attack in which the user charges and slams into the target with its whole body.',
        'Normal'
    ),
    (
        2,
        'Growl',
        0,
        40,
        100,
        'The user growls in an endearing way, making opposing Pokémon less wary and lowering their Attack stats.',
        'Normal'
    ),
    (
        3,
        'Vine Whip',
        45,
        25,
        100,
        'The target is struck with slender, whip-like vines.',
        'Grass'
    ),
    (
        4,
        'Ember',
        40,
        25,
        100,
        'The target is attacked with small flames. May also leave the target with a burn.',
        'Fire'
    ),
    (
        5,
        'Flamethrower',
        90,
        15,
        100,
        'The target is scorched with an intense blast of fire. May also leave the target with a burn.',
        'Fire'
    ),
    (
        6,
        'Water Gun',
        40,
        25,
        100,
        'The target is blasted with a forceful jet of water.',
        'Water'
    ),
    (
        7,
        'Hydro Pump',
        110,
        5,
        80,
        'The target is blasted by a huge volume of water launched under great pressure.',
        'Water'
    ),
    (
        8,
        'Thunder Shock',
        40,
        30,
        100,
        'A jolt of electricity is hurled at the target to inflict damage. May also paralyze the target.',
        'Electric'
    ),
    (
        9,
        'Quick Attack',
        40,
        30,
        100,
        'The user lunges at the target at a speed that makes it almost invisible.',
        'Normal'
    ),
    (
        10,
        'Double Team',
        0,
        15,
        0,
        'By moving rapidly, the user makes illusory copies of itself to raise its evasion.',
        'Normal'
    );

INSERT INTO
    Pokemon_2 (nature, stat_increased, stat_decreased)
VALUES
    ('Adamant', 'Attack', 'Sp. Atk'),
    ('Modest', 'Sp. Atk', 'Attack'),
    ('Jolly', 'Speed', 'Sp. Atk'),
    ('Calm', 'Sp. Def', 'Attack'),
    ('Bold', 'Defense', 'Attack'),
    ('Timid', 'Speed', 'Attack'),
    ('Relaxed', 'Defense', 'Speed'),
    ('Hasty', 'Speed', 'Defense'),
    ('Impish', 'Defense', 'Sp. Atk'),
    ('Lonely', 'Attack', 'Defense');

-- Fixed: Changed 'level' to 'pokemon_level'
INSERT INTO
    Pokemon_3 (total_XP, pokemon_level)
VALUES
    (1000, 5),
    (3000, 10),
    (6000, 15),
    (10000, 20),
    (15000, 25),
    (21000, 30),
    (28000, 35),
    (36000, 40),
    (45000, 45);

INSERT INTO
    Species_Can_Learn_Move (pokedex, move_id)
VALUES
    (1, 1),
    (1, 3),
    (1, 2),
    (2, 1),
    (2, 3),
    (2, 2),
    (3, 1),
    (3, 3),
    (3, 2),
    (4, 1),
    (4, 4),
    (5, 1),
    (5, 5),
    (6, 5),
    (6, 9),
    (7, 1),
    (7, 6),
    (8, 1),
    (8, 6),
    (9, 1),
    (9, 7),
    (25, 8),
    (25, 9),
    (25, 10),
    (26, 8),
    (26, 9);