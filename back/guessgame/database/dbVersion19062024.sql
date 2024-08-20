create table game
(
    id                   bigint auto_increment
        primary key,
    name                 varchar(255) null,
    nbPlayerMax          int          null,
    nbPlayerMin          int          null,
    rules                varchar(255) null,
    isRemoteCompatible   tinyint(1)   null,
    is_remote_compatible bit          null,
    nb_player_max        int          null,
    nb_player_min        int          null
);

create table item
(
    id          bigint auto_increment
        primary key,
    name        varchar(255) null,
    description varchar(255) null,
    price       int          null,
    rarity      float        null,
    picture     varchar(255) null
);

create table user
(
    id       bigint auto_increment
        primary key,
    mail     varchar(255) not null,
    login    varchar(255) not null,
    password varchar(255) not null,
    picture  varchar(255) null,
    nbCoin   int          null,
    isVip    tinyint(1)   null,
    xpPoint  int          null,
    is_vip   bit          null,
    nb_coin  int          null,
    xp_point int          null
);

create table friendship
(
    user_id        bigint null,
    user_id_friend bigint null,
    id             bigint auto_increment
        primary key,
    constraint friendship_user_FK
        foreign key (user_id) references user (id),
    constraint friendship_user_FK_1
        foreign key (user_id_friend) references user (id)
);

create table inventory
(
    user_id       bigint      not null,
    item_id       bigint      not null,
    acquired_date datetime(6) null,
    id            bigint auto_increment
        primary key,
    constraint inventory_item_FK
        foreign key (item_id) references item (id),
    constraint inventory_user_FK
        foreign key (user_id) references user (id)
);

create table party
(
    id        bigint not null
        primary key,
    `rank`    int    null,
    nbPoints  int    null,
    user_id   bigint null,
    nb_points int    null,
    constraint party_user_FK
        foreign key (user_id) references user (id)
);

create table games_parties
(
    id       bigint auto_increment
        primary key,
    party_id bigint null,
    game_id  bigint null,
    constraint games_parties_game_id_fk
        foreign key (game_id) references game (id),
    constraint games_parties_party_id_fk
        foreign key (party_id) references party (id)
);


