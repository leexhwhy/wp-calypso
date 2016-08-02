/**
 * External Dependencies
 */
 import { assert } from 'chai';

/**
 * Internal Dependencies
 */

import * as posts from './fixtures';
import * as helper from '../helper';

describe( 'daily post helper', () => {
	describe( 'isDailyPrompt', () => {
		it( 'returns false if the post is not from daily post', () => {
			assert.isFalse( helper.isDailyPrompt( posts.basicPost ) );
		} );

		it( 'returns false if the post is from daily post but not a daily prompt', () => {
			assert.isFalse( helper.isDailyPrompt( posts.dailyPostSitePost ) );
		} );

		it( 'returns true if the post is a daily prompt', () => {
			assert.isTrue( helper.isDailyPrompt( posts.dailyPromptPost ) );
		} );
	} );

	describe( 'getPingbackAttributes', () => {
		it( 'returns the url and title of the prompt', () => {
			const prompt = posts.dailyPromptPost;
			const pingbackAttributes = helper.getPingbackAttributes( prompt );
			assert.deepEqual( pingbackAttributes, { url: prompt.URL, title: prompt.title } );
		} );
	} );
} );
