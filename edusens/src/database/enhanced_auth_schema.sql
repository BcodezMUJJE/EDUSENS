-- Enhanced Database schema for EduSens Africa Authentication System
-- Includes all required fields for multi-provider authentication

-- Users table with enhanced fields
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) UNIQUE NOT NULL, -- Made mandatory as per requirements
    password_hash VARCHAR(255), -- Nullable for social-only accounts
    avatar_url VARCHAR(500), -- For profile pictures
    provider VARCHAR(20) DEFAULT 'local', -- 'local', 'google', 'microsoft', 'apple'
    provider_id VARCHAR(255), -- ID from social provider
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    
    -- Ensure username follows validation rules
    CONSTRAINT username_length CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 30),
    CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$'), -- Alphanumeric and underscore only
    CONSTRAINT password_or_provider CHECK (password_hash IS NOT NULL OR provider != 'local')
);

-- Enhanced indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_provider ON users(provider);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Sessions table for JWT token management
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    jwt_token_id VARCHAR(255) NOT NULL UNIQUE, -- JWT jti claim
    refresh_token VARCHAR(255) UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    refresh_expires_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_jwt_token ON user_sessions(jwt_token_id);
CREATE INDEX idx_sessions_refresh_token ON user_sessions(refresh_token);
CREATE INDEX idx_sessions_active ON user_sessions(is_active);

-- Password reset tokens table
CREATE TABLE password_resets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_password_resets_token ON password_resets(token);
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX idx_password_resets_expires ON password_resets(expires_at);

-- Social auth connections table (for linking multiple providers to one account)
CREATE TABLE social_connections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'google', 'apple', 'microsoft'
    provider_user_id VARCHAR(255) NOT NULL,
    provider_email VARCHAR(255),
    provider_data JSONB, -- Store additional provider data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_social_connections_user_id ON social_connections(user_id);
CREATE INDEX idx_social_connections_provider ON social_connections(provider);
CREATE INDEX idx_social_connections_provider_user_id ON social_connections(provider_user_id);

-- Username validation attempts table (for handling duplicates)
CREATE TABLE username_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    attempted_username VARCHAR(50) NOT NULL,
    success BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_username_attempts_user_id ON username_attempts(user_id);
CREATE INDEX idx_username_attempts_username ON username_attempts(attempted_username);

-- Audit log for security tracking
CREATE TABLE auth_audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL, -- 'login', 'logout', 'register', 'password_reset', etc.
    provider VARCHAR(20),
    ip_address VARCHAR(45),
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    failure_reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_audit_user_id ON auth_audit_log(user_id);
CREATE INDEX idx_auth_audit_action ON auth_audit_log(action);
CREATE INDEX idx_auth_audit_created_at ON auth_audit_log(created_at);
CREATE INDEX idx_auth_audit_success ON auth_audit_log(success);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique usernames when duplicates occur
CREATE OR REPLACE FUNCTION generate_unique_username(base_username VARCHAR(50))
RETURNS VARCHAR(50) AS $$
DECLARE
    final_username VARCHAR(50);
    counter INTEGER := 1;
BEGIN
    final_username := LOWER(TRIM(base_username));
    
    -- Clean the username (remove invalid characters)
    final_username := REGEXP_REPLACE(final_username, '[^a-zA-Z0-9_]', '_', 'g');
    
    -- Ensure it starts with a letter or underscore
    IF final_username !~ '^[a-zA-Z_]' THEN
        final_username := 'user_' || final_username;
    END IF;
    
    -- Truncate if too long (leaving room for suffix)
    IF LENGTH(final_username) > 25 THEN
        final_username := LEFT(final_username, 25);
    END IF;
    
    -- Check if username exists and append counter if needed
    WHILE EXISTS (SELECT 1 FROM users WHERE username = final_username) LOOP
        final_username := LEFT(base_username, 25) || '_' || counter;
        counter := counter + 1;
    END LOOP;
    
    RETURN final_username;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update the updated_at column
CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_sessions_modtime
    BEFORE UPDATE ON user_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_social_connections_modtime
    BEFORE UPDATE ON social_connections
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Insert some validation data
INSERT INTO auth_audit_log (action, success, created_at) 
VALUES ('system_init', true, CURRENT_TIMESTAMP);

-- Comments for documentation
COMMENT ON TABLE users IS 'Main users table with support for local and social authentication';
COMMENT ON COLUMN users.provider IS 'Authentication provider: local, google, microsoft, apple';
COMMENT ON COLUMN users.username IS 'Unique username required for all users, auto-generated if needed';
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password, nullable for social-only accounts';
COMMENT ON TABLE user_sessions IS 'JWT token management and session tracking';
COMMENT ON TABLE social_connections IS 'Links users to their social provider accounts';
COMMENT ON TABLE username_attempts IS 'Tracks username selection attempts for analytics';
COMMENT ON TABLE auth_audit_log IS 'Security audit trail for all authentication events';