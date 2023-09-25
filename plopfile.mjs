/* eslint-disable import/no-anonymous-default-export */

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "path",
        message: "Select folder",
      },
      {
        type: "input",
        name: "name",
        message: "Define component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/app/_components/elements/{{path}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.tsx.hbs",
      },
    ],
  });
}
