-- Clear existing reviews and products
TRUNCATE TABLE reviews CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE orders CASCADE;

-- Insert SHREE RAM PERFUME
INSERT INTO products (id, name, brand, category, scent_family, price, original_price, description, notes, size, image, images, rating, review_count, in_stock, featured, new_arrival, created_at)
VALUES (
  1,
  'Shree Ram Perfume',
  'BHAKT SUGA',
  'premium',
  'Sacred Woods & Lotus',
  '300.00',
  '450.00',
  'Inspired by devotion, purity, and Indian fragrance traditions, Shree Ram Perfume is a premium blend of natural, holy ingredients. This 100% alcohol-free premium fragrance offers an extraordinarily rich, long-lasting aroma. Crafted with pure essential oils, every drop evokes a positive aura, peace of mind, and divine energy, bringing the essence of temple serenity into your daily life.',
  '{"top":["Chandan (Sandalwood)","Kesar (Saffron)","Tulsi (Holy Basil)"],"middle":["Kamal (Lotus)","Rose","Cardamom"],"base":["Agarwood (Oudh)","Musk","Amber"]}',
  '20 ML',
  '/images/shree_ram_perfume.png',
  ARRAY['/images/shree_ram_perfume.png'],
  4.9,
  108,
  true,
  true,
  true,
  NOW()
);

-- Insert clearly marked sample reviews
INSERT INTO reviews (product_id, name, rating, title, body, verified, date) VALUES
(1, 'Aarav Sharma (Sample Review)', 5, 'Divine Fragrance of Absolute Peace', 'This is truly a spiritual journey in a bottle. The scent of Chandan and Saffron is incredibly pure, and the Kamal (Lotus) heart note is soothing. It is completely alcohol-free and lasts all day on clothes.', true, '2026-01-10'),
(1, 'Pooja Mishra (Sample Review)', 5, 'Authentic Spiritual Aura', 'Reminds me of a calm morning temple prayer. It is warm, sweet, and majestic. Perfect for daily meditation and special family gatherings. Highly recommended for fragrance lovers.', true, '2026-01-08'),
(1, 'Rakesh Kumar (Sample Review)', 5, 'Amazing Scent and Great Value', 'For just ₹300, the quality is exceptional. The pointed crown cap is gorgeous, and the box with the Shree Ram illustration is very premium. Since it is UPI-only, I paid via QR and the order was confirmed and shipped quickly.', true, '2026-01-05'),
(1, 'Divya Tewari (Sample Review)', 4, 'Very Long Lasting & Alcohol Free', 'Warm, deep oud and amber base notes. It is 100% alcohol-free, which I highly appreciate. It makes a beautiful gift for parents and elders.', true, '2026-01-02');
