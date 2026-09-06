------------------------ Foundation ------------------------------

create table users(
	user_id uuid primary key default gen_random_uuid(),
	user_is_deleted boolean default false,
	user_created_at timestamp default now(),
	user_contact varchar(15) constraint contact_check check (length(user_contact) > 10),
	user_address varchar(100),
	user_email varchar(255) constraint email_check check(user_email LIKE '%@%.%'),
	user_name varchar(255),
	user_role varchar(255) default 'Reader' check (user_role in ('Reader','Librarian', 'admin' ))
);

-- Read --
select * from users;

-- Create --
insert into users (
  user_name,
  user_email,
  user_contact,
  user_address,
  user_role
) values
( 'Amit Sharma', 'amit.sharma@example.com', '98765432101', '123 Main St, Nagpur', 'Reader' ),
( 'Priya Singh', 'priya.singh@example.com', '87654321012', '456 Tech Park, Pune', 'Librarian' ),
( 'Neha Gupta', 'neha.gupta@example.com', '76543210987', '789 Market Rd, Mumbai', 'Reader' );

create table books(
book_id uuid primary key default gen_random_uuid(),
book_title varchar(1024),
book_description varchar(2048),
book_author varchar(512),
book_shelf varchar(255),
book_total_copies int default 1,
book_created_at timestamp default now(),
book_is_deleted boolean default false
);


insert into books(
book_title,
book_description,
book_author,
book_shelf,
book_total_copies
) values(
'Karma',
'Why you do what you do and how to act rightly',
'Acharya Prashant',
'Rack-A, Row-3',
5
),(
'Truth Witout Aplogy',
'for those tired of sweet lies, here is the truth : unfiltered. undiluted. unafraid',
'Acharya Prashant',
'Rack-A, Row-3',
3
),
(
'Fear',
'fUnderstanding psychological fears and finding inner strength',
'Acharya Prashant',
'Rack-A, Row-3',
4
);

select * from books;

create table orders(
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

insert into payments (
  payment_transaction_amount,
  payment_order_id,
  payment_user_id,
  payment_method,
  payment_status,
  payment_type,
  payment_reference_id
) values
( 120.0000, '4d9fa55b-613d-4778-aeee-6f01f39d8e37', 'a44c9c05-0017-4dc3-b307-b41ebc523f18', 'upi', 'success', 'late_fee', 'UPI/99887766'),
( 30.0000, '4d9fa55b-613d-4778-aeee-6f01f39d8e37', 'a44c9c05-0017-4dc3-b307-b41ebc523f18', 'cash', 'success', 'late_fee', 'RCPT-2026-0843'),
( 200.0000, null, 'a44c9c05-0017-4dc3-b307-b41ebc523f18', 'card', 'success', 'membership_fee', 'TXN_POS_1122334'),
( 150.0000, '4d9fa55b-613d-4778-aeee-6f01f39d8e37', 'a44c9c05-0017-4dc3-b307-b41ebc523f18', 'net_banking', 'success', 'damage_charge', 'NB_77665544');

select * from orders;


create table payments(
  payment_id uuid primary key default gen_random_uuid(),
  payment_created_at timestamp default now(),
  payment_transaction_amount numeric (10,4),
  payment_order_id uuid references orders(order_id),
  payment_user_id uuid references users(user_id),
  payment_method varchar(255) check(payment_method in ('cash', 'upi', 'card', 'net_banking')),
  payment_status varchar(255) check(payment_status in ('success', 'pending', 'failed', 'refunded')),
  payment_type varchar(255) check(payment_type in ('late_fee', 'damage_charge', 'lost_book_fee', 'membership_fee')),
  payment_reference_id varchar(255),
  payment_notes varchar(512)
);

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

select * from payments;

------------------------ Level 1 ------------------------------
select * from payments where payment_status = 'success' order by payment_created_at asc;
--
update users set user_is_delted = true where user_email = 'hrushikesh.surkar@gmail.com';
select * from users;
--
select users.user_name, orders.order_due_at
from users
inner join orders
on orders.order_user_id = users.user_id;
--
select payment_method, sum(payment_transaction_amount) from payments group by payment_method;
--

begin;
insert into orders (order_user_id, order_book_id)
values ('a44c9c05-0017-4dc3-b307-b41ebc523f18', '067ca8ad-7dca-4218-8226-da60898dd593');

update books set book_total_copies = book_total_copies - 1
where book_id = '067ca8ad-7dca-4218-8226-da60898dd593';
commit;


-- indexes
create index idx_book_title on books(book_title);
create index idx_user_email on users(user_email);

select user_email from users where user_email in ('hrushikesh.surkar@gmail.com','amit.sharma@example.com');


------------------------ Level 2 ------------------------------
-- left join
select users.user_name, orders.order_due_at from users
left join orders on users.user_id = orders.order_user_id;

-- sub querys
select * from books;

update books set book_total_copies = 5 where book_title = 'Karma'; -- as we dont have any book that has more than 4 so i make karma one as 5


select book_title
from books
where book_total_copies > (
select book_total_copies from books where book_title = 'Fear'
);


-- having Clause

select payment_method, sum(payment_transaction_amount)
from payments
group by payment_method
having sum(payment_transaction_amount) > 100;

--
select book_shelf, sum(book_total_copies) from books
group by book_shelf
having sum(book_total_copies) > 4;

-- view
create view pending_orders as
select * from orders where order_returned_at IS NULL;


select * from pending_orders;


-- functions
create function calculate_fine(days_late int)
returns int as $$
select days_late * 2
$$ language sql;

select  calculate_fine(3) from orders;

-- ||

select user_id, user_role || ' ' || user_name as user_profile from users;

-- group by

select * from orders;

select users.user_id, count(orders.order_id)
from users
inner join orders on orders.order_user_id = users.user_id
group by users.user_id
order by count(orders.order_id) desc;

-- Show me the total fine amount for each user.
select users.user_name, sum(order_fine_amount) from users
inner join orders on users.user_id = orders.order_user_id
group by users.user_name;


-- Show me the total fine amount for each user,
-- but only look at the orders where the book was actually marked as damaged.
select users.user_name, sum(order_fine_amount) from users
inner join orders on users.user_id = orders.order_user_id
where orders.order_is_damaged = true
group by users.user_name, orders.order_is_damaged;


-- Show me the total fine amount for each user,
-- but only show the users who have a total fine of more than 50.

select users.user_name, sum(orders.order_fine_amount) from users
inner join orders on users.user_id = orders.order_user_id
group by users.user_name
having sum(orders.order_fine_amount) > 50;

-- Show me the titles of all the books that are kept on the shelf 'A1',
-- AND the book title has the word 'Data' anywhere inside it.
-- Also, make sure we only look at books that are NOT deleted.

select books.book_title from books
where book_shelf = 'Rack-A, Row-3';



-- Show me the total number of payments made for each payment method
-- (like 'upi', 'cash', etc.), but only count the payments where the status is 'success'.
-- Put the payment method with the highest count at the very top.

-- cash, card upi net_banking

select * from payments;

select payment_method, count(payment_id) from payments
where payment_status = 'success'
group by payment_method
order by count(payment_method) desc;



