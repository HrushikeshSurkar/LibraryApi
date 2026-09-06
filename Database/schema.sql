-- =========================================================================
-- LIBRARY MANAGEMENT SYSTEM - DATABASE SCHEMA
-- =========================================================================
CREATE DATABASE library_db;

-- 1. USERS TABLE
create table users (
    user_id uuid primary key default gen_random_uuid(),
    user_is_deleted boolean default false,
    user_created_at timestamp default now(),
    user_contact varchar(15) constraint contact_check check (length(user_contact) > 10),
    user_address varchar(100),
    user_email varchar(255) constraint email_check check (user_email LIKE '%@%.%'),
    user_name varchar(255),
    user_role varchar(255) default 'Reader' check (user_role in ('Reader', 'Librarian', 'admin'))
);

-- 2. BOOKS TABLE
create table books (
    book_id uuid primary key default gen_random_uuid(),
    book_title varchar(1024),
    book_description varchar(2048),
    book_author varchar(512),
    book_shelf varchar(255),
    book_total_copies int default 1,
    book_created_at timestamp default now(),
    book_is_deleted boolean default false
);

-- 3. ORDERS TABLE (Borrowings)
create table orders (
    order_id uuid primary key default gen_random_uuid(),
    order_user_id uuid references users(user_id),
    order_book_id uuid references books(book_id),
    order_borrowed_at timestamp default now(),
    order_due_at timestamp,
    order_returned_at timestamp,
    order_renewal_count int default 0,
    order_is_damaged boolean default false,
    order_fine_amount numeric(10, 4) default 0.0000,
    order_has_fine boolean default false,
    order_is_deleted boolean default false
);

-- 4. PAYMENTS TABLE
create table payments (
    payment_id uuid primary key default gen_random_uuid(),
    payment_created_at timestamp default now(),
    payment_transaction_amount numeric(10, 4),
    payment_order_id uuid references orders(order_id),
    payment_user_id uuid references users(user_id),
    payment_method varchar(255) check (payment_method in ('cash', 'upi', 'card', 'net_banking')),
    payment_status varchar(255) check (payment_status in ('success', 'pending', 'failed', 'refunded')),
    payment_type varchar(255) check (payment_type in ('late_fee', 'damage_charge', 'lost_book_fee', 'membership_fee')),
    payment_reference_id varchar(255),
    payment_notes varchar(512)
);

-- =========================================================================
-- INDEXES FOR PERFORMANCE
-- =========================================================================
create index idx_book_title on books(book_title);
create index idx_user_email on users(user_email);

-- =========================================================================
-- VIEWS
-- =========================================================================
create view pending_orders as
select * from orders where order_returned_at IS NULL;

-- =========================================================================
-- FUNCTIONS
-- =========================================================================
create function calculate_fine(days_late int)
returns int as $$
    select days_late * 2;
$$ language sql;