CREATE TABLE `chat_message` (
    chat_id int not null AUTO_INCREMENT,
    user_id int not null,
    message varchar(1024) not null default "",
    type int not null default "0" comment "0 文字 1 圖片 2 影片",
    PRIMARY KEY (chat_id)
);


