-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "words" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word" varchar(5) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "words_word_unique" UNIQUE("word")
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"solution" varchar(5) NOT NULL,
	"chosen_by" text,
	CONSTRAINT "games_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "plays" (
	"player_id" uuid,
	"game_id" integer NOT NULL,
	"guess_count" integer NOT NULL,
	"solved" boolean DEFAULT false NOT NULL,
	"first_guess_at" timestamp DEFAULT now() NOT NULL,
	"last_guess_at" timestamp DEFAULT now() NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT "plays_playerId_gameId_unique" UNIQUE("player_id","game_id")
);
--> statement-breakpoint
ALTER TABLE "plays" ADD CONSTRAINT "plays_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
*/