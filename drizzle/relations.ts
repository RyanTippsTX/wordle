import { relations } from "drizzle-orm/relations";
import { games, plays } from "./schema";

export const playsRelations = relations(plays, ({one}) => ({
	game: one(games, {
		fields: [plays.gameId],
		references: [games.id]
	}),
}));

export const gamesRelations = relations(games, ({many}) => ({
	plays: many(plays),
}));