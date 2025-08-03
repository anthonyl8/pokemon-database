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
    ('Psychic', 'Pink');

INSERT INTO
    Badge (badge_index, name)
VALUES
    (1, 'Boulder Badge'),
    (2, 'Cascade Badge'),
    (3, 'Thunder Badge'),
    (4, 'Rainbow Badge'),
    (5, 'Soul Badge'),
    (6, 'Marsh Badge'),
    (7, 'Volcano Badge'),
    (8, 'Earth Badge');

INSERT INTO
    Ability (ability_id, name, description)
VALUES
    (1, 'Intimidate', 'Lowers the foe''s Attack stat.'),
    (
        2,
        'Static',
        'Contact with the Pokémon may cause paralysis.'
    ),
    (
        3,
        'Levitate',
        'Gives full immunity to all Ground-type moves.'
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
        7,
        'Guts',
        'Boosts the Attack stat if the Pokémon has a status condition.'
    );

INSERT INTO
    Species (pokedex, name, description)
VALUES
    (
        1,
        'Bulbasaur',
        'It is known to be extremely loyal, even after long-term
abandonment. Bulbasaur can survive for days without eating. Its vines are long
and strong enough to allow it to grab tree branches and pull itself up to reach
berries.'
    ),
    (
        4,
        'Charmander',
        'A fire burns at the tip of this Pokémons slender tail, which has
blazed there since birth. The flame can indicate its health and mood, burning
brightly when strong, weakly when exhausted, and blazing when enraged.'
    ),
    (
        7,
        'Squirtle',
        'Its shell is a useful tool that it can withdraw into for protection or
sleep. The grooved, rounded shape helps reduce water resistance, allowing it to
swim at high speeds and spray foamy water with great accuracy.'
    ),
    (
        25,
        'Pikachu',
        'Each cheek is a red circle that contains a pouch for electricity
storage. It can use electricity to receive and send messages with other
Electric-type Pokémon and has two horizontal brown stripes on its back.'
    ),
    (
        63,
        'Abra',
        'Abra can sense danger through a telepathic radar and teleports to
safety when it does. It sleeps 18 hours each day due to the strain of its telepathic
powers and can teleport even while sleeping by hypnotizing itself.'
    ),
    (
        92,
        'Gastly',
        'Its gaseous form makes it one of the lightest Pokémon in existence.
It can phase through solid objects and form tangible hands from its gasses, but
its body will dwindle away when exposed to strong winds.'
    ),
    (
        147,
        'Dratini',
        'Its life energy is constantly building so it is always growing and
can reach lengths of over six feet. It sheds its skin regularly, hiding behind rapid
waterfalls during the process since the new skin is soft.'
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
        'Pokemon in this group are amorphous, having no definite
form'
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
        'Pokemon in this group are saurian/kaiju-like in appearance and
nature'
    ),
    (
        14,
        'Ditto',
        'Ditto is the only Pokemon in this group, capable of breeding with
most others'
    ),
    (
        15,
        'No Eggs Discovered',
        'Pokemon in this group are unable to breed'
    );


INSERT INTO Move(move_id, name, power, pp, accuracy, description, type_name)
VALUES
(1, 'Tackle', 40, 35, 100, 'A physical attack in which the user charges and slams
into the target with its whole body.', 'Normal'),
(2, 'Ember', 40, 25, 100, 'The target is attacked with small flames. May also leave
the target with a burn.', 'Fire'),
(3, 'Water Gun', 40, 25, 100, 'The target is blasted with a forceful jet of water.',
'Water'),
(4, 'Vine Whip', 45, 25, 100, 'The target is struck with slender, whip-like vines.',
'Grass'),
(5, 'Thunder Shock', 40, 30, 100, 'A jolt of electricity is hurled at the target to
inflict damage. May also paralyze the target.', 'Electric'),
(6, 'Confusion', 50, 25, 100, 'The target is hit by a weak telekinetic force. May
also leave the target confused.', 'Psychic'),
(7, 'Rock Throw', 50, 15, 90, 'The user picks up and throws a small rock at the
target to attack.', 'Rock');


INSERT INTO Pokemon_2 (nature, stat_increased, stat_decreased) VALUES
('Adamant', 'attack', 'sp_attack'),
('Modest', 'sp_attack', 'attack'),
('Jolly', 'speed', 'sp_attack'),
('Timid', 'speed', 'attack'),
('Bold', 'defense', 'attack'),
('Impish', 'defense', 'sp_attack'),
('Calm', 'sp_defense', 'attack'),
('Careful', 'sp_defense', 'sp_attack'),
('Naive', 'speed', 'sp_defense'),
('Hasty', 'speed', 'defense'),
('Brave', 'attack', 'speed'),
('Quiet', 'sp_attack', 'speed'),
('Rash', 'sp_attack', 'sp_defense'),
('Lonely', 'attack', 'defense'),
('Mild', 'sp_attack', 'defense');
INSERT INTO Pokemon_3 (total_XP, level) VALUES
(0, 1),
(500, 10),
(1000, 15),
(1500, 18),
(2000, 20),
(2500, 22),
(3000, 25),
(3500, 28),
(4000, 30),
(4500, 33),
(5000, 36),
(5500, 39),
(6000, 42),
(6500, 45),
(7000, 50);
INSERT INTO Item_2 (price, rarity)
VALUES
(0, 'Quest'),
(200, 'Common'),
(600, 'Uncommon'),
(1000, 'Rare'),
(2500, 'Very Rare');