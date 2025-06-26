CREATE TABLE IF NOT EXISTS public.user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(20) NOT NULL,

    CONSTRAINT user_email_unique UNIQUE (email)
);