const App = require( "./App" );

function initializeApp( options, name ) {
	return new App();
}

module.exports = { initializeApp };