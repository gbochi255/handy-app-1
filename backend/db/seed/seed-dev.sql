\c handy_dev
INSERT INTO users (email, password, firstname, lastname, address, city, postcode, location, profile_img, about_me, is_provider, avatar_url, skills, identity_doc_url)
VALUES
('nina@ukmail.com', 'hashedpw11', 'Nina', 'Adams', '14 Oak Street', 'Edinburgh', 'EH1 1AB', ST_PointFromText('POINT(-3.1883 55.9533)', 4326), NULL, 'Need help with basic repairs.', FALSE, NULL, NULL, NULL),
('owen@ukmail.com', 'hashedpw12', 'Owen', 'Shaw', '22 York Place', 'Cardiff', 'CF10 1AA', ST_PointFromText('POINT(-3.1791 51.4816)', 4326), NULL, NULL, FALSE, NULL, NULL, NULL),
('penny@ukmail.com', 'hashedpw13', 'Penny', 'Grant', '2 Union Street', 'Liverpool', 'L1 4AU', ST_PointFromText('POINT(-2.9840 53.4084)', 4326), NULL, 'Need help painting nursery.', FALSE, NULL, NULL, NULL),
('quentin@ukmail.com', 'hashedpw14', 'Quentin', 'Lee', '11 West End', 'Sheffield', 'S1 2GZ', ST_PointFromText('POINT(-1.4701 53.3811)', 4326), NULL, NULL, FALSE, NULL, NULL, NULL),
('rachel@ukmail.com', 'hashedpw15', 'Rachel', 'Bryant', '66 Meadow Road', 'Nottingham', 'NG1 5FS', ST_PointFromText('POINT(-1.1505 52.9548)', 4326), NULL, NULL, FALSE, NULL, NULL, NULL),
('sam@ukmail.com', 'hashedpw16', 'Sam', 'Douglas', '17 Church Lane', 'Edinburgh', 'EH3 6EQ', ST_PointFromText('POINT(-3.2025 55.9500)', 4326), NULL, 'Skilled in plumbing and electrics.', TRUE, NULL, ARRAY['plumbing', 'electrical'], 'https://example.com/id/sam.pdf'),
('tina@ukmail.com', 'hashedpw17', 'Tina', 'Morris', '55 Hilltop Road', 'Cardiff', 'CF11 6NS', ST_PointFromText('POINT(-3.2070 51.4837)', 4326), NULL, 'Painting and wallpapering expert.', TRUE, NULL, ARRAY['painting', 'decorating'], 'https://example.com/id/tina.pdf'),
('ugo@ukmail.com', 'hashedpw18', 'Ugo', 'Patel', '21 Main Street', 'Liverpool', 'L8 0RQ', ST_PointFromText('POINT(-2.9700 53.4020)', 4326), NULL, 'All-round handyman.', TRUE, NULL, ARRAY['repairs', 'assembly'], 'https://example.com/id/ugo.pdf'),
('violet@ukmail.com', 'hashedpw19', 'Violet', 'Wright', '3 Mill Lane', 'Sheffield', 'S2 4HJ', ST_PointFromText('POINT(-1.4620 53.3740)', 4326), NULL, 'Quick and affordable moving services.', TRUE, NULL, ARRAY['moving', 'lifting'], 'https://example.com/id/violet.pdf'),
('will@ukmail.com', 'hashedpw20', 'Will', 'Nash', '10 High Street', 'Nottingham', 'NG7 2RD', ST_PointFromText('POINT(-1.1660 52.9510)', 4326), NULL, 'Can fix anything, really.', TRUE, NULL, ARRAY['fixing', 'handyman'], 'https://example.com/id/will.pdf');

-- JOBS (IDs 1–5)
INSERT INTO jobs (summary, job_detail, category, created_by, status, photo_url, target_date, location)
VALUES
('Replace light fixtures', 'New LED lights for kitchen and hallway.', 'Electrical', 1, 'open', 'https://example.com/photos/lights.jpg', '2025-04-25', ST_PointFromText('POINT(-3.1883 55.9533)', 4326)),
('Wallpaper bedroom', 'One feature wall, floral wallpaper.', 'Decorating', 2, 'open', 'https://example.com/photos/wallpaper.jpg', '2025-04-27', ST_PointFromText('POINT(-3.1791 51.4816)', 4326)),
('Hang shelves', '2 floating shelves in living room.', 'Assembly', 3, 'in_progress', 'https://example.com/photos/shelves.jpg', '2025-04-28', ST_PointFromText('POINT(-2.9840 53.4084)', 4326)),
('Garden cleanup', 'Weeds, hedges, general tidy up.', 'Gardening', 4, 'open', 'https://example.com/photos/garden.jpg', '2025-04-29', ST_PointFromText('POINT(-1.4701 53.3811)', 4326)),
('Repair fence', 'Storm damage to back fence.', 'Repairs', 5, 'open', 'https://example.com/photos/fence.jpg', '2025-05-01', ST_PointFromText('POINT(-1.1505 52.9548)', 4326));

-- BIDS (IDs 1–13)
INSERT INTO bids (job_id, amount, provider_id, status)
VALUES
(1, 65.00, 6, 'accepted'),
(1, 70.00, 8, 'pending'),
(2, 100.00, 7, 'accepted'),
(2, 105.00, 10, 'rejected'),
(3, 45.00, 8, 'accepted'),
(3, 50.00, 9, 'pending'),
(3, 55.00, 10, 'pending'),
(4, 80.00, 6, 'pending'),
(4, 85.00, 9, 'accepted'),
(5, 90.00, 10, 'accepted'),
(5, 88.00, 7, 'rejected');

-- CHATS (IDs 1–5)
INSERT INTO chats (job_id, user1_id, user2_id)
VALUES
(1, 1, 6),
(2, 2, 7),
(3, 3, 8),
(4, 4, 9),
(5, 5, 10);

-- MESSAGES (IDs 1–10, all matching chat_id 1–5)
INSERT INTO messages (chat_id, sender_id, content)
VALUES
(1, 1, 'Hi Sam, thanks for accepting. Are you free Monday?'),
(1, 6, 'Yes, I can come by after 2 PM.'),
(2, 2, 'Hey Tina, just confirming the wallpaper design.'),
(2, 7, 'Great! I’ve got the floral pattern ready.'),
(3, 3, 'Thanks for helping out with the shelves.'),
(3, 8, 'No problem, I’ll bring my drill.'),
(4, 4, 'Hi Violet, do you have a hedge trimmer?'),
(4, 9, 'Absolutely, and a strimmer too!'),
(5, 5, 'Fence is in bad shape—need it fixed before the weekend.'),
(5, 10, 'I’ll be there Saturday morning to sort it out.');