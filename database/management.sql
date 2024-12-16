CREATE TABLE IF NOT EXISTS navigation_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    status ENUM('active', 'disabled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS navbar_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nav_bg_color VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    text_color VARCHAR(7) DEFAULT '#000000',
    font_size VARCHAR(20) DEFAULT '16px',
    font_family VARCHAR(100) DEFAULT 'Arial, sans-serif',
    border_color VARCHAR(7) DEFAULT '#cccccc',
    border_radius VARCHAR(20) DEFAULT '0px',
    hover_color VARCHAR(7) DEFAULT NULL,
    hover_text_color VARCHAR(7) DEFAULT NULL,
    shadow VARCHAR(50) DEFAULT NULL,
    alignment ENUM('left', 'center', 'right') DEFAULT 'left',
    visibility BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS body_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    font_family VARCHAR(255) DEFAULT 'Arial',
    font_size VARCHAR(10) DEFAULT '16px',
    font_color VARCHAR(7) DEFAULT '#000000',
    line_height VARCHAR(10) DEFAULT '1.5',
    text_align VARCHAR(20) DEFAULT 'left',
    text_color VARCHAR(7) DEFAULT '#000000',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


