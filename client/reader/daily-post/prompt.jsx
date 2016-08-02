/**
 * External Dependencies
 */
import React from 'react';
import classnames from 'classnames';
import page from 'page';
import qs from 'qs';

/**
 * Internal Dependencies
 */
import { translate } from 'i18n-calypso';
import SitesPopover from 'components/sites-popover';
import getSitesList from 'lib/sites-list';

const sitesList = getSitesList();

function getPingbackAttributes( post ) {
	return {
		title: post.title,
		url: post.URL
	};
}

class DailyPostPrompt extends React.Component {
	constructor() {
		super();
		this.state = {
			showingMenu: false
		};
		this.pickSiteToPostTo = this.pickSiteToPostTo.bind( this );
	}
	static propTypes = {
		post: React.PropTypes.object,
		position: React.PropTypes.string,
		tagName: React.PropTypes.string
	}
	static defaultProps = {
		position: 'top',
		tagName: 'li'
	}

	pickSiteToPostTo( siteSlug ) {
		const pingbackAttributes = getPingbackAttributes( this.props.post );
		page( `post/${ siteSlug }?${ qs.stringify( pingbackAttributes ) }` );
		return true;
	}

	closeMenu() {
		this.setState( { showingMenu: false } );
	}

	render() {
		const canParticipate = !! sitesList.getPrimary();
		const buttonClasses = classnames( {
			'reader-daily_prompt_button': true,
			'ignore-click': true,
			'is-active': this.state.showingMenu
		} );
		if ( ! canParticipate ) {
			return null;
		}
		return React.createElement( this.props.tagName, {}, [
			( <span key="button" ref="dailyPostButton" className={ buttonClasses } >
				{ translate( 'Start your post' ) }
				</span>
			),
			( this.state.showingMenu
				? <SitesPopover
					key="menu"
					header={ <div> { translate( 'Post on' ) } </div> }
					sites={ sitesList }
					context={ this.refs && this.refs.dailyPostButton }
					visible={ this.state.showingMenu }
					groups={ true }
					onSiteSelect={ this.pickSiteToPostTo }
					onClose={ this.closeMenu }
					position={ this.props.position }
					className="is-reader"/>
				: null )
		] );
	}
}

export default DailyPostPrompt;
