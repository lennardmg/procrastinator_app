DROP TABLE IF EXISTS basictodos CASCADE;

CREATE TABLE basictodos (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER NOT NULL REFERENCES users(id),
    todo_name VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);