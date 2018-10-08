const Ref = require( "./Ref" );

class ValueRef extends Ref {
	constructor( key ) {
		super( key );
		this.value = undefined;
	}

	_getValue() {
		return this.value;
	}

	_setValue( value ) {
		this.value = value;
		super._setValue( value );
	}
}

module.exports = ValueRef;