-- ============================================================================
-- Seed realistic services and initial demo user for development (INR)
-- ============================================================================

USE serveease;

INSERT INTO services (name, slug, category, description, base_price, duration_minutes, image_url, is_active)
VALUES
('Deep Cleaning', 'deep-cleaning', 'cleaning', 'Complete top-to-bottom scrubbing, floor sanitization, and detailed disinfection for every room and bathroom in your home.', 1499.00, 180, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', TRUE),
('Kitchen Cleaning', 'kitchen-cleaning', 'cleaning', 'Thorough removal of tough oil, grease, stains, and food residue from countertops, tiles, sink, and cabinets.', 799.00, 90, 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', TRUE),
('Plumbing Repair', 'plumbing-repair', 'plumbing', 'Certified plumber for water tap leaks, pipe fittings, flush tank repair, valve changes, and bathroom fixtures.', 399.00, 60, 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80', TRUE),
('Chimney Cleaning', 'chimney-cleaning', 'cleaning', 'Deep chemical degreasing of chimney baffle/mesh filters, hood scrubbing, duct inspection, and oil collector tray cleanup.', 599.00, 60, 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80', TRUE),
('Bathroom Cleaning', 'bathroom-cleaning', 'cleaning', 'Intensive hard water stain descaling, tile scrubbing, toilet bowl disinfection, and mirror polishing.', 499.00, 60, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', TRUE),
('Sofa & Carpet Cleaning', 'sofa-carpet-cleaning', 'cleaning', 'High-suction extraction shampooing to remove dirt, allergens, odors, and food stains from sofas and rugs.', 699.00, 90, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80', TRUE),
('Water Tank Cleaning', 'water-tank-cleaning', 'plumbing', '6-stage mechanized cleaning and disinfection for overhead or underground home water storage tanks.', 899.00, 120, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', TRUE),
('Drain Cleaning', 'drain-cleaning', 'plumbing', 'Fast mechanical unclogging of slow-draining or completely blocked kitchen sinks, bathroom drains, and waste pipes.', 349.00, 45, 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80', TRUE),
('Geyser Repair', 'geyser-repair', 'plumbing', 'Doorstep repair for no heating, water leakage, electric tripping, thermostat failures, and heating coil replacement.', 499.00, 60, 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80', TRUE),
('Electrician', 'electrician', 'electrical', 'Certified electrician for fixing tripped MCBs, burnt wiring, short circuits, faulty sockets, and voltage fluctuations.', 349.00, 60, 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', TRUE),
('Fan & Light Fitting', 'fan-light-fitting', 'electrical', 'Quick mounting, wiring, and balancing for ceiling fans, exhaust fans, chandeliers, track lights, and wall sconces.', 249.00, 45, 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80', TRUE),
('Switchboard & Wiring', 'switchboard-wiring', 'electrical', 'Modern modular switchboard installation, burnt socket replacement, inverter wiring, and MCB upgrades.', 399.00, 60, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', TRUE),
('Carpenter', 'carpenter', 'carpentry', 'Skilled carpenter for fixing jammed doors, loose hinges, broken drawer channels, cabinet handles, and custom woodwork.', 349.00, 60, 'https://images.unsplash.com/photo-1502005229762-ee1b2da97306?auto=format&fit=crop&w=800&q=80', TRUE),
('Furniture Assembly', 'furniture-assembly', 'carpentry', 'Hassle-free assembly for flat-pack beds, wardrobes, study tables, TV units, shoe racks, and modular furniture.', 499.00, 90, 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80', TRUE),
('Door & Lock Repair', 'door-lock-repair', 'carpentry', 'Repairs and installations for main door locks, mortise handles, deadbolts, latch cylinders, and peepholes.', 399.00, 45, 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80', TRUE),
('Painting Touch-ups', 'painting-touch-ups', 'painting', 'Experienced painter for room touch-ups, accent walls, ceiling painting, water damage plastering, and color consultation.', 999.00, 180, 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80', TRUE),
('Full Home Painting', 'full-home-painting', 'painting', 'End-to-end interior and exterior painting including wall putty, primer, two coats of luxury emulsion, and clean post-service inspection.', 4999.00, 480, 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80', TRUE),
('Waterproofing', 'waterproofing', 'painting', 'Professional moisture treatment, anti-efflorescence chemical sealing, and polymer coating for leaking ceilings and damp walls.', 1799.00, 180, 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', TRUE),
('AC Service', 'ac-service', 'ac_heating', 'High-pressure jet pump wash, indoor cooling coil foam clean, blower wheel degreasing, and refrigerant gas pressure check.', 699.00, 60, 'https://images.unsplash.com/photo-1631545806609-b4b92b67f18b?auto=format&fit=crop&w=800&q=80', TRUE),
('AC Repair', 'ac-repair', 'ac_heating', 'Comprehensive diagnostic for no-cooling issues, copper pipe gas leak fix, capacitor replacement, PCB repair, and gas recharge.', 1199.00, 90, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80', TRUE),
('Washing Machine Repair', 'washing-machine-repair', 'appliances', 'Fast doorstep troubleshooting for drum spin failure, loud noise, water draining blocks, door lock error, or vibration.', 449.00, 60, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80', TRUE),
('Refrigerator Repair', 'refrigerator-repair', 'appliances', 'Expert troubleshooting for insufficient cooling, freezer frost build-up, compressor humming, gas leaks, and door gasket wear.', 499.00, 60, 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80', TRUE),
('Microwave Repair', 'microwave-repair', 'appliances', 'Repair for heating failure, sparking inside cavity, faulty touch panel, turntable glass not rotating, or blown fuse.', 399.00, 45, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80', TRUE),
('Pest Control', 'pest-control', 'cleaning', 'Safe, odorless gel baiting and herbal spray treatment against cockroaches, ants, termites, silverfish, and spiders.', 899.00, 90, 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=800&q=80', TRUE)
ON DUPLICATE KEY UPDATE name=VALUES(name), base_price=VALUES(base_price);

-- Seed initial test user with BCrypt hashed demo password: 'Password123!'
-- Hash generated via BCrypt standard: $2a$10$7Zq4vP61Xb0QG06b8u8jC.uV0g2r5qD5vP8cM0sQ6xL8uF4bV2rGe
INSERT INTO users (id, full_name, email, password_hash, phone, status)
VALUES
(1, 'Rahul Sharma', 'rahul.sharma@example.com', '$2a$10$7Zq4vP61Xb0QG06b8u8jC.uV0g2r5qD5vP8cM0sQ6xL8uF4bV2rGe', '+91 98765 43210', 'active')
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- Seed initial address
INSERT INTO addresses (id, user_id, label, line1, line2, city, state, postal_code, country, is_default)
VALUES
(1, 1, 'Home', 'Flat 402, Green Glen Layout, Bellandur', 'Near Outer Ring Road', 'Bengaluru', 'Karnataka', '560103', 'India', TRUE)
ON DUPLICATE KEY UPDATE label=VALUES(label);
