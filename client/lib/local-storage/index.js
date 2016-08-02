/**
 * External dependencies
 */
import debug from 'debug';

/**
 * Module variables
 */
const log = debug( 'calypso:local-storage' );

if ( ! global.localStorage ) {
	log( 'localStorage is missing, setting to polyfill' );
	global.localStorage = {};
}

// test in case we are in safari private mode which fails on any storage
try {
	localStorage.setItem( 'localStorageTest', '' );
	localStorage.removeItem( 'localStorageTest' );
	log( 'localStorage tested and working correctly' );
} catch ( error ) {
	log( 'localStorage not working correctly, setting to polyfill' );
	let _data = {};
	Object.setPrototypeOf( localStorage, {
		setItem: ( id, val ) => Object.assign( _data, { [ id ]: String( val ) } ),
		getItem: ( id ) => _data.hasOwnProperty( id ) ? _data[ id ] : null,
		removeItem: ( id ) => delete _data[ id ],
		clear: () => _data = {},
		get length() {
			return Object.keys( _data ).length;
		}
	} );
}
