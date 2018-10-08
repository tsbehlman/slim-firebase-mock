const Ref = require( "./Ref" );

class ObjectRef extends Ref {
	constructor( key ) {
		super( key );
		this.children = new Map();
	}
	
	_getChild( key ) {
		return this.children.get( key );
	}
	
	_getValue() {
		const object = Object.create( null );
		for( const [ key, child ] of this.children ) {
			object[ key ] = child._getValue();
		}
		return object;
	}
	
	_setValue( object ) {
		for( const [ key, value ] of Object.entries( object ) ) {
			let child = this.children.get( key );
			
			if( child === undefined ) {
				child = Ref.fromKeyAndValue( String( key ), value );
				this.children.set( child.key, child );
			}
			else {
				child._setValue( value );
			}
		}
		
		super._setValue( object );
	}
}

module.exports = ObjectRef;