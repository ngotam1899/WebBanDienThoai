import React, { Component } from 'react';
import './styles.css';
import { withTranslation } from 'react-i18next'

class Search extends Component {
	render() {
		const {t} = this.props;
		return (
			<div className="col">
				<div className="single-sidebar mb-0">
					<h2 className="sidebar-title">{t('search.label')}</h2>
					<form>
						<input className="mb-0" type="text" placeholder={t('search.placeholder.input')} />
					</form>
				</div>
				<div className="card">
					<div className="row">
						<div className="col-3">
							<img className="w-100" src="https://upload.wikimedia.org/wikipedia/commons/7/75/Flag_of_None_%28square%29.svg"></img>
						</div>
						<div className="col-6">
							<p className="mb-0">dfsdxf</p>
							<p className="mb-0">4545641 vnd</p>
						</div>
						<div className="col-3">
							<button className="btn btn-success">test</button>
						</div>
					</div>
					<div class="border-bottom"></div>
					<div className="row">
						<div className="col-3">
							<img className="w-100" src="https://upload.wikimedia.org/wikipedia/commons/7/75/Flag_of_None_%28square%29.svg"></img>
						</div>
						<div className="col-6">
							<p className="mb-0">dfsdxf</p>
							<p className="mb-0">4545641 vnd</p>
						</div>
						<div className="col-3">
							<button className="btn btn-success">test</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation() (Search);
