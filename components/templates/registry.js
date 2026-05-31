import ClassicTemplate from "./classic/ClassicTemplate";
import MinimalTemplate from "./minimal/MinimalTemplate";

const templates = {
  classic: {
    name: "Classic",
    description: "Two-column layout with sidebar",
    component: ClassicTemplate,
  },
  minimal: {
    name: "Minimal",
    description: "Clean single-column layout",
    component: MinimalTemplate,
  },
};

const DEFAULT_TEMPLATE = "classic";

export { templates, DEFAULT_TEMPLATE };
