const Ref = require( "./Ref" );
const ObjectRef = require( "./ObjectRef" );

class Database {
	constructor() {
		this.root = new ObjectRef( undefined );
	}
	
	ref( path ) {
		if( path === undefined ) {
			return this.root;
		}
		else {
			return Ref.resolve( this.root, path );
		}
	}
}

module.exports = Database;