import { createStore, createLogger } from "vuex";
import kanban from "./modules/kanban.js";
import notes from "./modules/notes.js";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
	modules: {
		kanban,
		notes,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
});
