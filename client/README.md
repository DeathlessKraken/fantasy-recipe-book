# Notes
- scroll to top when click on recipe card
- webkit line clamp leaves a comma before ellipsis
- no need for close button in drawer if you keep menu icon
- when people post a recipe, if they don't link to source content,
    they must check a box saying that they're posting a custom recipe with their own twist.
- add tags/category sort for recipes
- top rated discover sort
- sort by type of media, eg books, tv, movie, etc
- currently, if server backend is down, frontend loads blank page. update to error page.
- should be able to sort by fandom as well.
- drafts get deleted after 30 days.
- //May need to revisit. Supposed to scroll to top on 'Home' button click.
- It appears you can use regex on routes. Useful for mistyped urls?
- random recipe button does NOT work when posting recipe
- transition custom recipe checkbox original recipe link smoothly
- check for PROFANITY
- users cant post unless they make an account.
- when users click on a card, change url to recipe/recipe_id. change back to normal url on back button click.
	I'm worried that a full redirect is slow and painful, when I already have the data loaded in...

.pattern(new RegExp('(?!_)\w{3,}[!?]*'))

SOLUTION TO VARIABLE HEIGHT CARDS:
WHEN TITLE/DESCRIPTION OF CARDS OVERFLOW/WHITESPACE WRAP, 
CHANGE HEIGHT OF THAT ENTIRE PARTICULAR GRID ROW TOO.

Recipe Item:
---Public---
Title
Fandom
Description
instructions (maybe object format for DB)
ingredients (obj format, in particular need to know name and quantity)
allergens
likes
comments (linked to sub comments)
users [oof, whole nother mountain (public likes, private saves)]
Date Posted
Author/User
Source
isPersonalRecipe (false: always public/shareable, true: author can choose)

---Private---
FULL TIMESTAMP of post date/time.

Dates stored in database as ISO string.
Browsers will convert ISO to local time with their Date() function.

I went to Universal Studios Hollywood last year and I was recently reminded of their Butter Beer. I don't fancy
a trip all of the way back there just for a delicious drink, so I found a fantastic recipe that I absolutely need to share. 



# Monetization
Sponsored Posts, Premium Recipes

# Saved Colors
Original BG Color: #3a3a3a

## SQL Creation

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	author_id TEXT NOT NULL,
	name VARCHAR(50) NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	pfp_source TEXT,
	bio TEXT,
	role VARCHAR(30),
	post_count INTEGER,
	comment_count INTEGER,
	like_count INTEGER,
	save_count INTEGER,
	date_registered TIMESTAMP,
	last_edited TIMESTAMP
    is_deleted BOOLEAN
	self_id TEXT NOT NULL,
);

CREATE TABLE posts (
	id BIGSERIAL PRIMARY KEY,
	author_ip INET NOT NULL, //grab from server
	title VARCHAR(21) NOT NULL,
	fandom VARCHAR(50),
	is_personal BOOLEAN NOT NULL,
	original_post TEXT,
	like_count INTEGER,
	comment_count INTEGER,
	date_published TIMESTAMP,
	date_edited TIMESTAMP NOT NULL, //must submit edit timestamp, will be used for draft creation
	allergens TEXT,
	description TEXT,
	instructions JSON NOT NULL,
	ingredients JSON NOT NULL,
	images JSON,
	is_published BOOLEAN,
	is_deleted BOOLEAN,
	self_id TEXT NOT NULL,
	author_id TEXT NOT NULL, //
);

CREATE TABLE comments (
	id BIGSERIAL PRIMARY KEY,
	author_id BIGINT NOT NULL,
	author_ip INET NOT NULL,
	reply_id BIGINT NOT NULL,
	is_post_reply BOOLEAN NOT NULL,
	content VARCHAR(501) NOT NULL,
	like_count INTEGER,
	reply_count INTEGER,
	date_created TIMESTAMP NOT NULL,
	date_edited TIMESTAMP,
	is_deleted BOOLEAN
	self_id TEXT NOT NULL,
);

CREATE TABLE likes (
	id BIGSERIAL PRIMARY KEY,
	author_id BIGINT NOT NULL,
	reply_id BIGINT NOT NULL,
	is_post_reply BOOLEAN NOT NULL,
	date_created TIMESTAMP NOT NULL,
	is_deleted BOOLEAN
	self_id TEXT NOT NULL,
);