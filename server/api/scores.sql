DROP TABLE IF EXISTS count CASCADE;

CREATE TABLE count (
    id   SERIAL PRIMARY KEY NOT NULL,
    score1      INTEGER NOT NULL DEFAULT 0,
    score2      INTEGER NOT NULL DEFAULT 0
);

INSERT INTO count(score1, score2)
VALUES           (0,    0   );