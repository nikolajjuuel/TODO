-- Drop and recreate Tasks table (Example)

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  category VARCHAR (255) NOT NULL,
  task_img_url VARCHAR (65535) NOT NULL,
  task_text_info VARCHAR (65535) NOT NULL,
  important BOOLEAN NOT NULL DEFAULT FALSE
  );
