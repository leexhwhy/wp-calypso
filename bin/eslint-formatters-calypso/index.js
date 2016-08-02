#!/usr/bin/env node

const fs = require( 'fs' );
const cli = require( './src/cli' );
const optionator = require( 'optionator' )({
	options: [{
		option: 'format',
		alias: 'f',
	        type: 'String',
	        description: 'choose format ("stylish" by default)'
	    }]
});

/* eslint no-process-exit: "off" */

if ( ! process.stdin.isTTY ) {
	process.stdin.setEncoding( 'utf-8' );
	process.stdin.on( 'data', function( data ) {
		const opts = optionator.parseArgv( process.argv );
		process.exit( cli( JSON.parse( data ), opts ) );
	} );
}
