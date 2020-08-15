CREATE KEYSPACE users WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};
USE users
CREATE TABLE users(user_id int PRIMARY KEY, name text);
CREATE TABLE chat(id uuid PRIMARY KEY, uid_src int, uid_dest int, message text, created_at timestamp);
INSERT INTO users.users (user_id, name) VALUES (1, 'Nico');
INSERT INTO users.users (user_id, name) VALUES (2, 'Fanny');
INSERT INTO users.chat (id, uid_src, uid_dest, message) VALUES (f42eb271-082d-44e2-861c-78338f9fa155, 1, 2, 'Les choses se passent');
