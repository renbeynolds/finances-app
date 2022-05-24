module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
      {
        type: 'input',
        name: 'subdirectory',
        message: 'What subdirectory should it live in (client/src/<VALUE>)?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'client/src/{{subdirectory}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'client/src/{{subdirectory}}/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/Component/index.ts.hbs',
      },
    ],
  });
};
