CREATE TABLE diets (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    cal_limit INTEGER,
    cal_eaten INTEGER
);

-- user_id INTEGER REFERENCES users(id) NOT NULL 