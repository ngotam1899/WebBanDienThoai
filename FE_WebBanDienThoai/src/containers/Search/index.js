import React, { Component } from 'react';
import './styles.css';
import { withTranslation } from 'react-i18next'

class Search extends Component {
	render() {
		const {t} = this.props;
		return (
			<div className="col">
				<div className="single-sidebar">
					<h2 className="sidebar-title">{t('search.label')}</h2>
					<form>
						<input type="text" placeholder={t('search.placeholder.input')} />
					</form>
				</div>
			</div>
		);
	}
}

export default withTranslation() (Search);
