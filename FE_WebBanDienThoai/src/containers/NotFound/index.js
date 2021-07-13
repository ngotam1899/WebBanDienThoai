import React, { Component } from 'react';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next'
import './styles.css';

class NotFound extends Component {
    render() {
		const { t } = this.props;
        return (
	<div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			<p>{t('notfound.p')}</p>
			<a href="/">{t('active.account.button')}</a>
		</div>
	</div>
        );
    }
}

export default compose(
  withTranslation()
)(NotFound);