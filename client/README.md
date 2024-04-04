# Notes
- need to pull likes from db. getting close to need cookies. remember. launch first. maybe doing inets instead.
- webkit line clamp leaves a comma before ellipsis
- add tags/category sort for recipes
- top rated discover sort
- sort by type of media, eg books, tv, movie, etc
- currently, if server backend is down, frontend loads blank page. update to error page.
- should be able to sort by fandom as well.
- drafts get deleted after 30 days.
- It appears you can use regex on routes. Useful for mistyped urls?
- random recipe button does NOT work when posting recipe
- transition custom recipe checkbox original recipe link smoothly
- check for PROFANITY
- users cant post unless they make an account.
- when users click on a card, change url to recipe/recipe_id. change back to normal url on back button click.
	I'm worried that a full redirect is slow and painful, when I already have the data loaded in...
- update validation schema so original post is a uri
- put apidata GET operation inside of discover component, so skeleton will load before apidata.
- limit image upload object to length 4 both client and server side before storage.
- if user edits post, use patch route. server needs post_id and changes. 
- interesting behaviour when liking and unliking posts visually.

3c37011ae543ee66562a

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

CREATE TABLE media (
	id SERIAL PRIMARY KEY,
	media_type VARCHAR(30) NOT NULL,
	media_ref TEXT NOT NULL 
);

CREATE TABLE user_profile (
	id SERIAL PRIMARY KEY,
	given_name VARCHAR(75) NOT NULL,
	surname VARCHAR(75) NOT NULL,
	username VARCHAR(21) NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(75) NOT NULL,
	is_admin BOOLEAN NOT NULL,
	date_registered TIMESTAMP NOT NULL,
	date_edited TIMESTAMP,
	pfp_id INT,
	FOREIGN KEY (pfp_id)
	REFERENCES media (id)
);

CREATE TABLE post (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	title VARCHAR(50) NOT NULL,
	fandom VARCHAR(30),
	fandom_media_type VARCHAR(20),
	date_posted TIMESTAMP NOT NULL,
	date_edited TIMESTAMP,
	prep_time_mins INT NOT NULL,
	cook_time_mins INT NOT NULL,
	total_time_mins INT NOT NULL,
	servings INT NOT NULL,
	instructions TEXT NOT NULL,
	ingredients JSON NOT NULL,
	FOREIGN KEY (user_id)
	REFERENCES user_profile(id)
);

ALTER TABLE post 
	ADD COLUMN is_personal BOOLEAN NOT NULL,
	ADD COLUMN original_post_ref TEXT NOT NULL;

CREATE TABLE post_like (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	post_id INT NOT NULL,
	date_created TIMESTAMP NOT NULL,
	FOREIGN KEY (post_id)
	REFERENCES post (id),
	FOREIGN KEY (user_id)
	REFERENCES user_profile(id)
);

CREATE TABLE post_media (
	id SERIAL PRIMARY KEY,
	post_id INT NOT NULL,
	media_id INT NOT NULL,
	media_position INT NOT NULL,
	FOREIGN KEY (post_id)
	REFERENCES post (id),
	FOREIGN KEY (media_id)
	REFERENCES media (id)
);

select po.id
from post po
	left join post_media me on po.id = me.post_id
where me.post_id is null;


Interfacing with the API:

IN SPIRIT OF EARLY LAUNCH, ONLY GET REQUESTS ARE PUBLIC. 
POSTING ANYTHING BUT A LIKE REQUIRES ADMIN API KEY.
UNLIKING WILL REQUIRE MORE FIDDLING SO UNLIKES CAN'T BE SPAMMED. PERMANENT LIKES ONLY FOR NOW.

## Retrieving recipe data
Get Requests to api.[site].com or [site].com/api/
are responded with full data on all recipes in JSON format.

Refer to common api practices on requesting limited or truncated data...


## Publishing recipe data
Post requests to api.[site].com or [site].com/api/
are expected in JSON format.

You'll need an action along with some content to publish.
Valid actions are 'post', 'like', 'unlike', 'editpost', 'editcomment', 'delete'

{
	"action": post,
	"content": {
        "title": "Example Title",
        "fandom": "Harry Potter",
        "fandom_media_type": "Movie",
        "date_posted": "2024-04-04T17:52:01.441Z",
        "date_edited": null,
        "prep_time_mins": 15,
        "cook_time_mins": 30,
        "servings": 3,
        "instructions": "Instructions for a recipe.",
        "ingredients": {
            "ingredient1": "Herbs",
            "ingredient2": "Spices"
        },
        "is_personal": false,
        "original_post_ref": "http://reddit.com"
    }
}

Title is required.
If you enter a fandom, you must enter a fandom media type.
is_personal is a required boolean; If it's not your recipe, you must provide a valid URI to the original content.
prep_time_mins is a required integer field.
cook_time_mins is a required integer field.
servings is a required integer field.
instructions is a required string field.
ingredients is a required field in JSON format. Keys are not to exceed 13 characters.

Editing recipe data:

Deleting recipe data: