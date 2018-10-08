const Database = require( "./Database" );

class App {
	constructor() {
		this.db = new Database();
	}
	
	database() {
		return this.db;
	}
}

module.exports = App;