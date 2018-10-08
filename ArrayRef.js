const Ref = require( "./Ref" );

class ArrayRef extends Ref {
	constructor( key ) {
		super( key );
		this.children = [];
	}

	_getChild( index ) {
		return this.children[ index ];
	}

	_getValue() {
		return this.children.map( child => child._getValue() );
	}

	_setValue( array ) {
		for( const [ index, value ] of array.entries() ) {
			let child = this.children[ index ];
			
			if( child === undefined ) {
				child = Ref.fromKeyAndValue( index, value );
				this.children[ index ] = child;
			}
			else {
				child._setValue( value );
			}
		}
		
		super._setValue( array );
	}
}

module.exports = ArrayRef;