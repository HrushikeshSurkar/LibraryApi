-- Drop views and functions first
drop view if exists pending_orders;
drop function if exists calculate_fine(int);

-- Drop tables in reverse order of dependencies (using CASCADE)
drop table if exists payments cascade;
drop table if exists orders cascade;
drop table if exists books cascade;
drop table if exists users cascade;