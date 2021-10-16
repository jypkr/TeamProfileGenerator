const manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let result = []

function renderTeamProfile() {
	inquirer.prompt([{
		message: "Team Name?",
		name: "teamname"
	}])
		.then(function (data) {
			const teamName = data.teamname
			result.push(teamName)
			addManager()
		})
}

function addManager() {
	inquirer.prompt([{
		message: "Manager's name?",
		name: "managername"
	},
	{
		message: "Manager's email?",
		name: "manageremail"
	},
	{
		message: "Manager's cabin number?",
		name: "managercabinnum"
	},
	{
		message: "Manager's mobile number?",
		name: "mangermobile"
	}])
		.then(function (data) {
			const manager_name = data.managername
			const manager_email = data.manageremail
			const manager_cabin = data.managercabinnum
			const manager_mobile = data.mangermobile
			const id = 1

			const newMember = new manager(manager_name, id, manager_email, manager_cabin, manager_mobile)

			result.push(newMember)
			addEmployee()
		})
}

function addEmployee() {
	inquirer.prompt([{
		type: "list",
		message: "Next action?",
		choices: ["Add Manager", "Add Engineer/Developer", "Add Intern", "Display team"],
		name: "action"
	}])
		.then(function (data) {
			switch (data.action) {
				case "Add Manager":
					addManager()
					break

				case "Add Intern":
					addIntern()
					break

				case "Add Engineer/Developer":
					addEngineer()
					break

				case "Display team":
					displayProfile()
					break
			}
		})
}

function addIntern() {
	inquirer.prompt([{
		message: "Intern's  name?",
		name: "name"
	},
	{
		message: "Intern's email?",
		name: "email"
	},
	{
		message: "Intern's school?",
		name: "school"
	},
	{
		message: "Intern's graduation year?",
		name: "year"
	}])
		.then(function (data) {
			const intern_name = data.name
			const intern_email = data.email
			const intern_school = data.school
			const intern_year = data.year
			const id = result.length + 1

			const newMember = new Intern(intern_name, id, intern_email, intern_school, intern_year)

			result.push(newMember)
			addEmployee()
		})
}

function addEngineer() {
	inquirer.prompt([{
		message: "Engineer's  name?",
		name: "name"
	},
	{
		message: "Engineer's skill?",
		name: "skill"
	},
	{
		message: "Engineer's email?",
		name: "email"
	},
	{
		message: "Engineer's github?",
		name: "github"
	}])
		.then(function (data) {
			const engineer_name = data.name
			const engineer_email = data.email
			const engineer_github = data.github
			const engineer_skill = data.skill
			const id = result.length + 1

			const newMember = new Engineer(engineer_name, id, engineer_email, engineer_github, engineer_skill)

			result.push(newMember)
			addEmployee()
		})
}

function displayProfile() {
	console.log(`You've successfully created your team profile using this generator.`);
	const htmlPage = [];
	const htmlStart = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Page Title -->
    <title>${result[0]}</title>
    <!-- Custom Font - Google Import -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Merienda:wght@700&display=swap" rel="stylesheet">
    <!-- link to font awesome icons -->
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <!-- Custom styling embedded using js constant assignment ( this could have been a mere style sheet reference as well like the above links but here's an experiment to show different ways of importing dynamically) -->
    <style>
    </style>
</head>
<body>
<!-- team name header up top -->
    <div class="banner-bar">
        <h1>${result[0]}
        <i class="fas fa-users"></i></h1>
    </div>
    <!--section for all the team member profile cards -->
    <div class="card-container">
    `
	htmlPage.push(htmlStart);
	for (let i = 1; i < result.length; i++) {
		let value = `
        <div class="card">
            <div class="card-header">
            <h2><i class="fas fa-user-tag"></i> ${result[i].name} \n (${result[i].title})</h2>
                
            </div>
            <div class="card-body">
                <p> <i class="fas fa-id-badge"></i> <u>Employee ID: </u> ${result[i].id}</p>
                <p> <i class="fas fa-envelope-square"></i> <u>Email: </u> <a href="mailto:${result[i].email}">${result[i].email}</a></p>
        `
		if (result[i].officeNumber) {
			value += `
            <p><i class="fas fa-search-location"></i> <u>Office Number: </u>${result[i].officeNumber}</p>
            `
		}
		if (result[i].mobileNumber) {
			value += `
            <p><i class="fas fa-phone-alt"></i> <u>Contact Number: </u>${result[i].mobileNumber} </p>
            `
		}
		if (result[i].skill) {
			value += `
            <p><i class="fas fa-cogs"></i> <u>Skill(s): </u>${result[i].skill}</p>
            `
		}
		if (result[i].github) {
			value += `
            <p><i class="fab fa-github"></i> <u>GitHub: </u> <a href="https://github.com/${result[i].github}">${result[i].github}</a></p>
            `
		}
		if (result[i].school) {
			value += `
            <p><i class="fas fa-graduation-cap"></i> <u>University: </u> <a href="https://www.google.com/search?q=${result[i].school}">${result[i].school}</a></p>
            `
		}
		if (result[i].year) {
			value += `
            <p><i class="fas fa-calendar-day"></i> <u>Graduation Year: </u>${result[i].year}</p>
            `
		}
		value += `
        </div>
        </div>
        `
		htmlPage.push(value)
	}

	const htmlEnd = `
    </div>
    </body>
    </html>
    `
	htmlPage.push(htmlEnd);

	fs.writeFile(`./${result[0]}.html`, htmlPage.join(""), function (err) { })
}

renderTeamProfile()