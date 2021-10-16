// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class manager extends Employee {
	constructor(name, id, email, officeNumber, mobileNumber) {
		super(name, id, email)
		this.officeNumber = officeNumber
		this.mobileNumber = mobileNumber
		this.title = "manager"
	}


	getRole() {
		return this.title
	}

	getOfficeNumber() {
		return this.officeNumber
	}

	getMobileNumber() {
		return this.mobileNumber
	}

}

module.exports = manager