// library.js
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import * as icons from "./icons";

library.add(icons);

// Create Node Element for a FontAwesome Icon we imported into our Library using their API
const getIconElement = (iconName) => {
	return icon(icons[iconName]).node.item(0);
};



export { getIconElement };
