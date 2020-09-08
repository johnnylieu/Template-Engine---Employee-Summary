const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// const util = require('util');
// const thenableWriteFile = util.promisify(fs.writeFile);

// questions to ask
function mainMenu () {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'listOfOccupations',
            choices: ['Intern', 'Engineer', 'Manager'],
            message: 'What employee would you like to create?'
        },
    ])
    .then(function (answers) {
        if (answers.listOfOccupations === 'Intern') {
            internQues();
        } else if (answers.listOfOccupations === 'Engineer') {
            engineerQues();
        } else if (answers.listOfOccupations === 'Manager') {
            managerQues();
        } else {
            buildTeam();
        };
    })
};

function internQues() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email?"
        },
        {
            type: 'input',
            name: 'school',
            message: 'Where did they intern attend school?'
        },
    ])
    .then(function (answers) {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);
        buildTeam();
    });
};

function engineerQues() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?"
        }
    ])
    .then(function (answers) {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);
        buildTeam();
    });
};

function managerQues() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?"
        }
    ])
    .then(function (answers) {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);
        buildTeam();
    });
};

function buildTeam() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'buildTeam',
            choices: ['Build my team', 'Add another employee'],
            message: 'Would you like to build your build or add another employee?'
        },
    ])
    .then(function (answers) {
        if (answers.buildTeam === 'Build my team') {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR);
            }
            fs.writeFileSync(outputPath, render(employees));
        } else {
            mainMenu();
        };
    });
};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
