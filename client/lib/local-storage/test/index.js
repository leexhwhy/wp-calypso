/**
 * External dependencies
 */
import { assert } from 'chai';

describe( 'localStorage', function() {
	let _originalLocalStorage;
	before( () => _originalLocalStorage = global.localStorage );
	after( () => global.localStorage = _originalLocalStorage );

	describe( 'when window.localStorage does not exist', function() {
		delete global.localStorage;

		before( () => {
			require( '..' );
		} );

		it( 'should create a window.localStorage instance', function() {
			assert( global.localStorage );
		} );

		it( 'should correctly store and retrieve data', function() {
			global.localStorage.setItem( 'foo', 'bar' );
			assert.equal( global.localStorage.getItem( 'foo' ), 'bar' );
			assert.equal( global.localStorage.length, 1 );
		} );
	} );

	describe( 'when window.localStorage is not working correctly', function() {
		global.localStorage = {};

		before( () => {
			require( '..' );
		} );

		it( 'should overwrite broken or missing methods', function() {
			assert( global.localStorage.setItem );
			assert( global.localStorage.getItem );
			assert( global.localStorage.removeItem );
			assert( global.localStorage.clear );
		} );

		it( 'should correctly store and retrieve data', function() {
			global.localStorage.setItem( 'foo', 'bar' );
			assert.equal( global.localStorage.getItem( 'foo' ), 'bar' );
			assert.equal( global.localStorage.length, 1 );
		} );
	} );
} );
