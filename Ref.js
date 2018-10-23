const EventEmitter = require( "events" );
const Snapshot = require( "./Snapshot" );

class Ref extends EventEmitter {
	constructor( key ) {
		super();
		this.key = key;
	}
	
	_getChild( key ) {
		return undefined;
	}
	
	_getValue() {
		return undefined;
	}
	
	_setValue( value ) {
		this.emit( "value", new Snapshot( this.key, value, this ) );
	}
	
	child( path ) {
		return Ref.resolve( this, path );
	}
	
	on( eventName, listener ) {
		super.on( eventName, listener );
		
		if( eventName === "value" ) {
			this.emit( eventName, new Snapshot( this.key, this._getValue(), this ) );
		}
	}
	
	once( eventName, listener ) {
		let promise = undefined;
		if( listener === undefined ) {
			promise = new Promise( ( resolve, reject ) => {
				super.once( eventName, resolve );
			} );
		}
		else {
			super.once( eventName, listener );
		}
		
		if( eventName === "value" ) {
			this.emit( eventName, new Snapshot( this.key, this._getValue(), this ) );
		}
		
		return promise;
	}
	
	static resolve( parentRef, path ) {
		const parts = String( path ).split( "/" ).filter( str => str.length > 0 );
		let currentRef = parentRef;
		
		for( const part of parts ) {
			currentRef = currentRef._getChild( part );
			if( currentRef === undefined ) {
				throw Error( "invalid database reference" );
			}
		}
		
		return currentRef;
	}
}

module.exports = Ref;

const ArrayRef = require( "./ArrayRef" );
const ObjectRef = require( "./ObjectRef" );
const ValueRef = require( "./ValueRef" );

Ref.fromKeyAndValue = function( key, value ) {
	let ref;
	
	if( Array.isArray( value ) ) {
		ref = new ArrayRef( key );
	}
	else if( typeof value === "object" ) {
		ref = new ObjectRef( key );
	}
	else {
		ref = new ValueRef( key );
	}
	
	ref._setValue( value );
	
	return ref;
}