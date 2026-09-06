-- =========================================================================
-- LIBRARY MANAGEMENT SYSTEM - COMPLETE SEED DATA FOR ALL TABLES
-- =========================================================================

-- 1. USERS
insert into users (user_id, user_name, user_email, user_contact, user_address, user_role) values
(
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'Amit Sharma',
    'amit.sharma@example.com',
    '98765432101',
    '123 Main St, Nagpur',
    'Reader'
),
(
    'b55d0d16-1128-5ed4-c418-c522cd634f29',
    'Priya Singh',
    'priya.singh@example.com',
    '87654321012',
    '456 Tech Park, Pune',
    'Librarian'
),
(
    'c66e1e27-2239-6fe5-d529-d633de745f30',
    'Neha Gupta',
    'neha.gupta@example.com',
    '76543210987',
    '789 Market Rd, Mumbai',
    'Reader'
);


-- 2. BOOKS
insert into books (book_id, book_title, book_description, book_author, book_shelf, book_total_copies) values
(
    '067ca8ad-7dca-4218-8226-da60898dd593',
    'Karma',
    'Why you do what you do and how to act rightly',
    'Acharya Prashant',
    'Rack-A, Row-3',
    5
),
(
    '815b3852-5291-4402-8635-442761c8f9b5',
    'Truth Without Apology',
    'For those tired of sweet lies, here is the truth : unfiltered. undiluted. unafraid',
    'Acharya Prashant',
    'Rack-A, Row-3',
    3
),
(
    'c024e708-54c3-4d87-a307-53724607b664',
    'Fear',
    'Understanding psychological fears and finding inner strength',
    'Acharya Prashant',
    'Rack-A, Row-3',
    4
);


-- 3. ORDERS
insert into orders (
    order_id,
    order_user_id,
    order_book_id,
    order_due_at,
    order_fine_amount,
    order_has_fine,
    order_is_damaged
) values
(
    '4d9fa55b-613d-4778-aeee-6f01f39d8e37',
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    '067ca8ad-7dca-4218-8226-da60898dd593',
    now() + interval '7 days',
    50.0000,
    true,
    false
);


-- 4. PAYMENTS
insert into payments (
    payment_transaction_amount,
    payment_order_id,
    payment_user_id,
    payment_method,
    payment_status,
    payment_type,
    payment_reference_id,
    payment_notes
) values
(
    120.0000,
    '4d9fa55b-613d-4778-aeee-6f01f39d8e37',
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'upi',
    'success',
    'late_fee',
    'UPI/99887766',
    'Paid late return penalty'
),
(
    30.0000,
    '4d9fa55b-613d-4778-aeee-6f01f39d8e37',
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'cash',
    'success',
    'late_fee',
    'RCPT-2026-0843',
    'Collected cash at desk'
),
(
    200.0000,
    null,
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'card',
    'success',
    'membership_fee',
    'TXN_POS_1122334',
    '1-year standard membership renewal'
),
(
    150.0000,
    '4d9fa55b-613d-4778-aeee-6f01f39d8e37',
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'net_banking',
    'success',
    'damage_charge',
    'NB_77665544',
    'Covered damage charge'
),
(
    50.0000,
    '4d9fa55b-613d-4778-aeee-6f01f39d8e37',
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'upi',
    'success',
    'late_fee',
    'UPI/423309182736',
    'Paid 5 days late return penalty via GooglePay'
),
(
    150.0000,
    '4d9fa55b-613d-4778-aeee-6f01f39d8e37',
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'cash',
    'success',
    'damage_charge',
    'RCPT-2026-0842',
    'Collected cash at desk for water damage on pages 12-20'
),
(
    500.0000,
    null,
    'a44c9c05-0017-4dc3-b307-b41ebc523f18',
    'card',
    'success',
    'membership_fee',
    'TXN_POS_9928174',
    '1-year standard student membership renewal'
);