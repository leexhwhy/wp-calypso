/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
  getTitle,
  getUnreadCount
} from '../selectors';

describe( 'selectors', () => {
	describe( '#getTitle()', () => {
		it( 'should return the currently set title', () => {
			const title = getTitle( {
				documentHead: {
					title: 'My Section Title'
				}
			} );

			expect( title ).to.equal( 'My Section Title' );
		} );
	} );

	describe( '#getUnreadCount()', () => {
		it( 'should return the unread posts counter', () => {
			const unreadCount = getUnreadCount( {
				documentHead: {
					unreadCount: 3
				}
			} );

			expect( unreadCount ).to.equal( 3 );
		} );
	} );
} );
