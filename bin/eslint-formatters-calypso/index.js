#!/usr/bin/env node

const fs = require( 'fs' );
const cli = require( './src/cli' );
const optionator = require( 'optionator' )({
	options: [{
		option: 'processor',
		alias: 'p',
	        type: 'String',
	        description: 'choose processor ("eslines" by default)'
	},{
		option: 'format',
		alias: 'f',
	        type: 'String',
	        description: 'choose end ESLint format ("stylish" by default)'
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
