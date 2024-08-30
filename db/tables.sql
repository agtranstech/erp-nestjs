CREATE TABLE tenant (
    id SERIAL PRIMARY KEY, -- Auto-incrementing ID as primary key
    code VARCHAR(5) NOT NULL, -- String code, cannot be null
    status BOOLEAN DEFAULT FALSE, -- Boolean status with default value FALSE
    phone_number VARCHAR(20) UNIQUE, -- Unique phone number string, max length 20
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

-- Animal Retaled Tables
CREATE TABLE animal (
    id SERIAL PRIMARY KEY, 
    gender VARCHAR(6) NOT NULL, -- Assuming a limited set of gender options
    status VARCHAR(20) NOT NULL, -- Assuming different status states for animals
    purchase_date DATE, 
    birth_date DATE, 
    image VARCHAR(255), -- Assuming a file path or URL to the image
    ring_number VARCHAR(10), 
    tenant_id INTEGER REFERENCES tenant(id), -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

CREATE TABLE animal_details (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animal(id),  -- Foreign key referencing the 'animal' table
    breed VARCHAR(100) DEFAULT 'Murrah',
    avg_milk_yield INTEGER,
    avg_fat INTEGER,
    avg_snf INTEGER,
    nth_lactation INTEGER NOT NULL,
    tenant_id INTEGER REFERENCES tenant(id), -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);



CREATE TABLE animal_breeding_details (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animal(id),  -- Foreign key referencing the 'animal' table
    heat_date TIMESTAMP NOT NULL,
    crossing_date TIMESTAMP NOT NULL,
    confirmation_date TIMESTAMP NOT NULL,
    crossing_type VARCHAR(50) DEFAULT 'bull',
    tenant_id INTEGER REFERENCES tenant(id), -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

CREATE TABLE animal_insurance_details (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animal(id),  -- Foreign key referencing the 'animal' table
    tag_no INTEGER UNIQUE NOT NULL,
    sum_assured INTEGER NOT NULL,
    policy_number INTEGER UNIQUE NOT NULL,
    start_date	DATE,
    end_date	DATE,
    document_url VARCHAR(100) NOT NULL,
    tenant_id INTEGER REFERENCES tenant(id), -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

CREATE TABLE animal_health_details (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animal(id),  -- Foreign key referencing the 'animal' table
    visit_date	TIMESTAMP NOT NULL,
    doctor_name VARCHAR(50) NOT NULL,
    observation VARCHAR(255),
    medication VARCHAR(100) NULL,
    tenant_id INTEGER REFERENCES tenant(id), -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY, -- Unique identifier for each role
    role_name VARCHAR(50) UNIQUE NOT NULL, -- Name of the role (e.g., 'admin', 'manager')
    description VARCHAR(255) NULL, -- Optional description of the role
    type VARCHAR (20) NOT NULL DEFAULT 'USER', -- 
    tenant_id INTEGER REFERENCES tenant(id) NULL, -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

-- Emp
CREATE TABLE emp (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(10) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Hashed and salted password for security
    designation VARCHAR(50) NULL,
    role_id INTEGER, -- Foreign key referencing the role table 
    is_active BOOLEAN DEFAULT FALSE, -- Indicates if the user account is active
    tenant_id INTEGER REFERENCES tenant(id) null, -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

-- CREATE TABLE emp_details();


-- Resource table to store information about system resources
CREATE TABLE resource (
    id SERIAL PRIMARY KEY, -- Unique identifier for each resource
    resource_name VARCHAR(100) UNIQUE NOT NULL, -- Name of the resource (e.g., 'animal', 'milk_collection')
    description VARCHAR(255), -- Optional description of the resource
    tenant_id INTEGER REFERENCES tenant(id), -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

-- Policy table to define policies
CREATE TABLE policy (
    id SERIAL PRIMARY KEY ,
    policy_name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255), -- Optional description of the policy
    tenant_id INTEGER REFERENCES tenant(id), -- Foreign key referencing the 'tenant' table
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

-- Policy-Permission table to map permissions to policy for each resource
CREATE TABLE policy_permission (
    id SERIAL PRIMARY KEY, -- Unique identifier for each policy-permission mapping
    policy_id INTEGER REFERENCES policy(id) NOT NULL, -- Reference to the policy
    resource_id INTEGER REFERENCES resource(id) NOT NULL, -- Reference to the resource
    can_view BOOLEAN DEFAULT FALSE, -- Permission to view the resource
    can_edit BOOLEAN DEFAULT FALSE, -- Permission to edit the resource
    can_delete BOOLEAN DEFAULT FALSE, -- Permission to delete the resource
    can_add BOOLEAN DEFAULT FALSE,
    created_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    updated_on TIMESTAMP default CURRENT_TIMESTAMP not null,
    created_by INTEGER NULL,
    updated_by INTEGER NULL
);

-- Adding index

CREATE INDEX idx_tenant_phone_number ON tenant (phone_number);
CREATE INDEX idx_tenant_code ON tenant (code);
CREATE INDEX idx_animal_gender ON animal (gender);
CREATE INDEX idx_animal_details_breed ON animal_details (breed);
CREATE INDEX idx_role_name ON role (role_name);
CREATE INDEX idx_role_type ON role (type);
CREATE INDEX idx_emp_fname ON  emp (first_name);
CREATE INDEX idx_emp_email ON  emp (email);
CREATE INDEX idx_emp_phonenumber ON  emp (phone_number);
CREATE INDEX idx_resource_name ON  resource (resource_name);

-- Inserting seed data 
INSERT INTO tenant (code, status, phone_number)
VALUES ('ND', TRUE, '9977881234');


INSERT INTO role (role_name, description, type, tenant_id)
VALUES ('Owner', 'Owner will have access to entier site', 'SYSTEM', 1);


INSERT INTO emp (first_name, last_name, email, phone_number, password_hash, designation, role_id, is_active)
VALUES ('Gopi Krishna', 'M', 'gopi.muktevi@gmail.com', '9977881234', md5('HelloGopi'), 'Owner', 1, TRUE);