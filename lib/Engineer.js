// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")


class Engineer extends Employee {
	constructor(name, id, email, github, skill) {
		super(name, id, email)
		this.github = github
		this.title = "Engineer"
		this.skill = skill
	}

	getGithub() {
		return this.github
	}

	getRole() {
		return this.title
	}

	getSkill() {
		return this.skill
	}
}