DROP DATABASE IF EXISTS handy_dev;
CREATE DATABASE handy_dev;

\c handy_dev;
CREATE EXTENSION postgis;


-- Create ENUM types for status (optional)
CREATE TYPE job_status AS ENUM ('open', 'in_progress', 'closed');
CREATE TYPE bid_status AS ENUM ('pending', 'accepted', 'rejected');

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    postcode VARCHAR(10),
    location GEOMETRY(POINT, 4326),
    profile_img TEXT,
    about_me TEXT,
    is_provider BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    skills TEXT[],
    identity_doc_url TEXT
);
CREATE INDEX users_email_idx ON users (email);
CREATE INDEX users_location_idx ON users USING GIST (location);

-- Jobs table
CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    summary VARCHAR(255) NOT NULL,
    job_detail TEXT,
    category VARCHAR(50),
    created_by INTEGER NOT NULL REFERENCES users(user_id),
    status job_status DEFAULT 'open',
    accepted_bid INTEGER,
    date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    target_date DATE,
    completion_date TIMESTAMP,
    photo_url TEXT,
    location GEOMETRY(POINT, 4326)
);
CREATE INDEX jobs_location_idx ON jobs USING GIST (location);
CREATE INDEX jobs_created_by_idx ON jobs (created_by);
CREATE INDEX jobs_status_idx ON jobs (status);

-- Bids table
CREATE TABLE bids (
    bid_id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(job_id),
    amount DECIMAL(10, 2) NOT NULL,
    provider_id INTEGER NOT NULL REFERENCES users(user_id),
    status bid_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX bids_job_id_idx ON bids (job_id);
CREATE INDEX bids_provider_id_idx ON bids (provider_id);

-- Chats table
CREATE TABLE chats (
    chat_id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(job_id),
    user1_id INTEGER NOT NULL REFERENCES users(user_id),
    user2_id INTEGER NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX chats_job_id_idx ON chats (job_id);

-- Messages table
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL REFERENCES chats(chat_id),
    sender_id INTEGER NOT NULL REFERENCES users(user_id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX messages_chat_id_idx ON messages (chat_id);
CREATE INDEX messages_created_at_idx ON messages (created_at);