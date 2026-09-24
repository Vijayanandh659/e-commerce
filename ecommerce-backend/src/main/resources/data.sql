
INSERT INTO categories (id, name)
SELECT 1, 'Electronics'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE id = 1
);

INSERT INTO categories (id, name)
SELECT 2, 'Clothing'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE id = 2
);

INSERT INTO categories (id, name)
SELECT 3, 'Books'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE id = 3
);

INSERT INTO categories (id, name)
SELECT 4, 'Sports'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE id = 4
);

INSERT INTO categories (id, name)
SELECT 5, 'Stationery'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE id = 5
);

INSERT INTO categories (id, name)
SELECT 6, 'Toys'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE id = 6
);


-- Sample products

INSERT INTO products
(id, name, description, price, stock, image_url, category_id)
SELECT
1,
'Wireless Headphones',
'Noise-cancelling over-ear headphones with 30hr battery life',
79.99,
50,
'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
1
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE id = 1
);


INSERT INTO products
(id, name, description, price, stock, image_url, category_id)
SELECT
2,
'Smart Watch',
'Fitness tracking smartwatch with heart-rate monitor',
129.99,
30,
'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
1
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE id = 2
);


INSERT INTO products
(id, name, description, price, stock, image_url, category_id)
SELECT
3,
'Cotton T-Shirt',
'Comfortable 100% cotton crew-neck t-shirt',
19.99,
100,
'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
2
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE id = 3
);


INSERT INTO products
(id, name, description, price, stock, image_url, category_id)
SELECT
4,
'Denim Jacket',
'Classic blue denim jacket, unisex fit',
59.99,
40,
'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
2
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE id = 4
);


INSERT INTO products
(id, name, description, price, stock, image_url, category_id)
SELECT
5,
'The Pragmatic Programmer',
'A classic book on software craftsmanship',
34.99,
25,
'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
3
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE id = 5
);


INSERT INTO products
(id, name, description, price, stock, image_url, category_id)
SELECT
6,
'Atomic Habits',
'Best-seller on building good habits',
16.99,
60,
'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
3
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE id = 6
);

INSERT INTO products (id, name, description, price, stock, image_url, category_id)
SELECT 7, 'Premium Ballpoint Pen', 'Smooth-writing blue ink ballpoint pen for daily notes and work', 3.99, 150,
'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400', 5
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = 7);

INSERT INTO products (id, name, description, price, stock, image_url, category_id)
SELECT 8, 'Everyday Running Shoes', 'Lightweight, cushioned running shoes with breathable mesh upper', 49.99, 45,
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 2
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = 8);

INSERT INTO products (id, name, description, price, stock, image_url, category_id)
SELECT 9, 'Cricket Bat', 'Durable full-size cricket bat with a comfortable grip', 39.99, 28,
'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', 4
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = 9);

INSERT INTO products (id, name, description, price, stock, image_url, category_id)
SELECT 10, 'Classic Football', 'Size 5 stitched football for training and weekend matches', 24.99, 60,
'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400', 4
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = 10);

INSERT INTO products (id, name, description, price, stock, image_url, category_id)
SELECT 11, 'City Commuter Cycle', 'Comfortable single-speed cycle built for everyday rides', 219.99, 12,
'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400', 4
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = 11);

INSERT INTO products (id, name, description, price, stock, image_url, category_id)
SELECT 12, 'Building Block Set', 'Colorful creative building blocks for imaginative play', 18.99, 75,
'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400', 6
WHERE NOT EXISTS (SELECT 1 FROM products WHERE id = 12);

