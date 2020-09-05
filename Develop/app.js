const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');
const thenableWriteFile = util.promisify(fs.writeFile);

// global function to call later
function getReadMeOutput(answers) {
    const title = answers.title;
    const description = answers.description;
    const installation = answers.installation;
    const usage = answers.usage;
    const contribution = answers.contribution;
    const testInstructions = answers.testInstructions;
    const listOfLicense = answers.listOfLicense;
    const githubUserName = answers.githubUserName;
    const email = answers.email;
    const name = answers.name;

    var listBadge;

    if (listOfLicense === 'Apache License 2.0') {
        listBadge = 'https://img.shields.io/badge/Apache%20License%202.0-license-black'
    } else if (listOfLicense === 'GNU General Public License v3.0'){
        listBadge = 'https://img.shields.io/badge/GNU%20General%20Public%20License%20v3.0-license-black'
    } else if (listOfLicense === 'BSD 3-Clause "New" or "Revised" License') {
        listBadge = 'https://img.shields.io/license/BSD%203--Clause%60-badge-black'
    } else if (listOfLicense === 'MIT License') {
        listBadge = 'https://img.shields.io/license/MIT-badge-black'
    };

    return `# ${title}
    
# Description
${description}

# Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#Contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${installation}

## 🚀 Usage
${usage}

## 📝 License
${listOfLicense}
![GitHub badge](${listBadge})

## 🤝 Contributing
👤 ${name}
${contribution}
GitHub.com/${githubUserName}

## Tests Instructions
${testInstructions}

## Questions
If you have any questions, please send an email to ${email}.
`
};

// questions to ask
inquirer
    .prompt([
        {
            type: 'list',
            name: 'listOfOccupations',
            choices: ['Manager', 'Engineer', 'Intern'],
            message: 'What is your occupation?'
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'What is the description of your project?'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Installation instructions?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Usage information?'
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'Contribution guidelines?'
        },
        {
            type: 'input',
            name: 'testInstructions',
            message: 'What are the test instructions?'
        },
        {
            type: 'input',
            name: 'githubUserName',
            message: 'What is your GitHub username?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?'
        }
    ])
    .then(function (answers) {
        return getReadMeOutput(answers);
    })
    .then(function (readMeOutput) {
        return thenableWriteFile('./README.md', readMeOutput);
    })
    .then(function () {
        console.log('All done!');
    })
    .catch(function (error) {
        console.log('Oh noes! An error!', error);
    });

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
