\c handy_test

-- Insert Users
INSERT INTO users (email, password, firstname, lastname, address, city, postcode, location, profile_img, about_me, is_provider, avatar_url, skills, identity_doc_url)
VALUES
-- Regular Users
('alice@ukmail.com', 'hashedpw1', 'Alice', 'Smith', '12 Rose Lane', 'London', 'E1 6AN', ST_PointFromText('POINT(-0.0754 51.5202)', 4326), NULL, 'Looking for help with house repairs.', FALSE, NULL, NULL, NULL),
('ben@ukmail.com', 'hashedpw2', 'Ben', 'Taylor', '88 King Street', 'Manchester', 'M1 4AH', ST_PointFromText('POINT(-2.2416 53.4794)', 4326), NULL, NULL, FALSE, NULL, NULL, NULL),
('carol@ukmail.com', 'hashedpw3', 'Carol', 'Lewis', '23 Elm Grove', 'Birmingham', 'B15 2TT', ST_PointFromText('POINT(-1.8998 52.4862)', 4326), NULL, 'Student needing some moving help.', FALSE, NULL, NULL, NULL),
('dan@ukmail.com', 'hashedpw4', 'Dan', 'Khan', '45 Maple Drive', 'London', 'E2 7QL', ST_PointFromText('POINT(-0.0631 51.5270)', 4326), NULL, NULL, FALSE, NULL, NULL, NULL),
('ella@ukmail.com', 'hashedpw5', 'Ella', 'Ward', '5 The Crescent', 'Leeds', 'LS6 3DS', ST_PointFromText('POINT(-1.5605 53.8098)', 4326), NULL, NULL, FALSE, NULL, NULL, NULL),

-- Providers
('finn@ukmail.com', 'hashedpw6', 'Finn', 'Evans', '9 Oak Road', 'Glasgow', 'G12 8QQ', ST_PointFromText('POINT(-4.2891 55.8721)', 4326), NULL, 'Gardening and landscaping expert.', TRUE, NULL, ARRAY['gardening', 'landscaping'], 'https://example.com/id/finn.pdf'),
('grace@ukmail.com', 'hashedpw7', 'Grace', 'Morgan', '77 Birch Avenue', 'Manchester', 'M3 5BW', ST_PointFromText('POINT(-2.2500 53.4839)', 4326), NULL, 'Certified electrician and painter.', TRUE, NULL, ARRAY['electrical', 'painting'], 'https://example.com/id/grace.pdf'),
('harry@ukmail.com', 'hashedpw8', 'Harry', 'Wells', '34 Pine Close', 'Bristol', 'BS1 5EH', ST_PointFromText('POINT(-2.5950 51.4545)', 4326), NULL, 'Handyman with 5+ years of experience.', TRUE, NULL, ARRAY['plumbing', 'carpentry'], 'https://example.com/id/harry.pdf'),
('isla@ukmail.com', 'hashedpw9', 'Isla', 'Reid', '13 Park Row', 'Leeds', 'LS1 5HD', ST_PointFromText('POINT(-1.5486 53.7965)', 4326), NULL, 'Furniture assembly and removals.', TRUE, NULL, ARRAY['moving', 'assembly'], 'https://example.com/id/isla.pdf'),
('jack@ukmail.com', 'hashedpw10', 'Jack', 'Foster', '51 Abbey Road', 'Bristol', 'BS2 0JA', ST_PointFromText('POINT(-2.5811 51.4640)', 4326), NULL, 'General repair specialist.', TRUE, NULL, ARRAY['repairs', 'painting'], 'https://example.com/id/jack.pdf');

-- Insert Jobs
INSERT INTO jobs (summary, job_detail, category, created_by, status, photo_url, target_date, location)
VALUES
('Fix leaky tap', 'Bathroom tap is leaking and needs a washer replaced.', 'Plumbing', 1, 'open', 'https://example.com/photos/tap.jpg', '2025-04-18', ST_PointFromText('POINT(-0.0754 51.5202)', 4326)),
('Lawn mowing service', 'Front and back garden need mowing.', 'Gardening', 2, 'open', 'https://example.com/photos/lawn.jpg', '2025-04-19', ST_PointFromText('POINT(-2.2416 53.4794)', 4326)),
('Assemble IKEA furniture', 'Need help assembling wardrobe and desk.', 'Assembly', 3, 'in_progress', 'https://example.com/photos/furniture.jpg', '2025-04-21', ST_PointFromText('POINT(-1.8998 52.4862)', 4326)),
('Paint living room', 'One coat of paint for walls and ceiling.', 'Painting', 4, 'open', 'https://example.com/photos/paint.jpg', '2025-04-22', ST_PointFromText('POINT(-0.0631 51.5270)', 4326)),
('Electric socket repair', 'Faulty socket needs fixing in kitchen.', 'Electrical', 5, 'open', 'https://example.com/photos/socket.jpg', '2025-04-24', ST_PointFromText('POINT(-1.5605 53.8098)', 4326));

-- Insert Bids
INSERT INTO bids (job_id, amount, provider_id, status)
VALUES
-- Job 1
(1, 45.00, 7, 'pending'),
(1, 40.00, 8, 'accepted'),

-- Job 2
(2, 60.00, 6, 'pending'),
(2, 55.00, 9, 'rejected'),
(2, 50.00, 10, 'accepted'),

-- Job 3
(3, 70.00, 9, 'accepted'),
(3, 75.00, 6, 'pending'),

-- Job 4
(4, 120.00, 7, 'pending'),
(4, 110.00, 10, 'accepted'),

-- Job 5
(5, 90.00, 7, 'accepted'),
(5, 85.00, 8, 'rejected'),
(5, 95.00, 6, 'pending');

-- Insert Chats
INSERT INTO chats (job_id, user1_id, user2_id)
VALUES
(1, 1, 8),
(3, 3, 9),
(5, 5, 7);

-- Insert Messages
INSERT INTO messages (chat_id, sender_id, content)
VALUES
(1, 1, 'Hi Harry, could you do the tap fix this week?'),
(1, 8, 'Sure, I’m available Wednesday.'),
(2, 3, 'Hey Isla, thanks for assembling everything so quickly.'),
(2, 9, 'No problem! Let me know if you need anything else.'),
(3, 5, 'Hi Grace, the socket is sparking again.'),
(3, 7, 'I’ll be there first thing tomorrow!');