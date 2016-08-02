/**
 * External Dependencies
 */
 import { some, get } from 'lodash';
/**
 * Internal Dependencies
 */
 import config from 'config';

export function isDailyPrompt( post ) {
	// @TODO see if post.type === 'dp_prompt' will work for daily's and challenges

	return post.site_ID === config( 'daily_post_blog_id' ) && some( post.tags, tag => tag.slug.match( /daily-prompts/ ) );
}
