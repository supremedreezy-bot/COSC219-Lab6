import { TRAIL_DATA } from "./data.js";
import { TrailRegistry } from "./registry.js";

const registry = TrailRegistry.fromData(TRAIL_DATA);
registry.find("Bear Creek").close();

const list = document.querySelector("#trails");
registry.describeAll().forEach(description => {
  const item = document.createElement("li");
  item.textContent = description;
  list.append(item);
});

document.querySelector("#summary").textContent =
  `${registry.size} trails, ${registry.openTrails.length} open, ` +
  `${registry.totalDistance} km total. Steepest: ${registry.steepest.name}.`;
