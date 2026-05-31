import ClassicTemplate from "./classic/ClassicTemplate";

const templates = {
  classic: {
    name: "Classic",
    component: ClassicTemplate,
  },
};

const DEFAULT_TEMPLATE = "classic";

export { templates, DEFAULT_TEMPLATE };
