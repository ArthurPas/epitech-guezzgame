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

create table party
(
    leaderRank  int    null,
    nbPoints    int    null,
    userId      bigint null,
    id          bigint auto_increment
        primary key,
    nb_points   int    null,
    party_code  bigint not null,
    user_id     bigint null,
    leader_rank int    null
);

create table game_party
(
    game_id  bigint not null,
    party_id bigint not null,
    constraint FK7gu8lt4b4qwdulpvlcoe2h3rl
        foreign key (party_id) references party (id),
    constraint FKafs9vxyj9n9n0dv2qdcagp4yx
        foreign key (game_id) references game (id)
);

create table games_parties
(
    id       bigint not null
        primary key,
    game_id  bigint null,
    party_id bigint null,
    constraint FK2lndowqrsek7fwk7af009uvnx
        foreign key (game_id) references game (id),
    constraint FKel8hu3d7nkawtyw31oj88nkpq
        foreign key (party_id) references party (id)
);

create index party_user_FK
    on party (userId);

create table user
(
    id         bigint auto_increment
        primary key,
    mail       varchar(255) not null,
    login      varchar(255) not null,
    password   varchar(255) not null,
    picture    varchar(255) null,
    nbCoin     int          null,
    isVip      tinyint(1)   null,
    xpPoint    int          null,
    is_vip     bit          null,
    nb_coin    int          null,
    xp_point   int          null,
    parties_id bigint       null,
    constraint FKd35cwogxc1bu9lkkooyw39ttt
        foreign key (parties_id) references party (id)
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

alter table party
    add constraint FKtcag4fsdqkmo7owjkk1p25h41
        foreign key (user_id) references user (id);

create table user_parties
(
    user_id    bigint not null,
    parties_id bigint not null,
    primary key (user_id, parties_id),
    constraint UK1a4q73yy141fikvl0d8mnd2bo
        unique (parties_id),
    constraint FKjn5yo153nxx669hxkkt04vegn
        foreign key (parties_id) references party (id),
    constraint FKl5yuwc6wwwefn8nguysb69omu
        foreign key (user_id) references user (id)
);


