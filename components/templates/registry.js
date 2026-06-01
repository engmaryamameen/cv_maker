import ClassicTemplate from "./classic/ClassicTemplate";
import MinimalTemplate from "./minimal/MinimalTemplate";
import ModernTemplate from "./modern/ModernTemplate";

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
  modern: {
    name: "Modern",
    description: "Colored header with skill tags",
    component: ModernTemplate,
  },
};

const DEFAULT_TEMPLATE = "classic";

export { templates, DEFAULT_TEMPLATE };
