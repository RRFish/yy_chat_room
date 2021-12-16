CREATE TABLE `user` (
    user_id int not null AUTO_INCREMENT,
    account varchar(255) not null,
    password varchar(255) not null,
    nickname varchar(20) not null,
    PRIMARY KEY(user_id)
);


