module.exports = plop => {
    plop.setGenerator('component', {
        description: 'Create a reusable component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?'
            },
            {
                type: 'input',
                name: 'subdirectory',
                message: 'What component subdirectory should it live in?'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/Components/{{subdirectory}}/{{pascalCase name}}/{{pascalCase name}}.js',
                templateFile:
                    'plop-templates/Component/Component.js.hbs',
            },
            {
                type: 'add',
                path: 'src/Components/{{subdirectory}}/{{pascalCase name}}/index.js',
                templateFile: 'plop-templates/Component/index.js.hbs',
            }
        ],
    })
}