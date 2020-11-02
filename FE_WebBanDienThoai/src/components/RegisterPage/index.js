import React, { Component } from 'react';
import '../LoginPage/loginStyles.css'

class RegisterPage extends Component {
	render() {
		return (
			<div className="register-page">
				<div className="container">
					<div className="register-content m-auto">
						<div className="row w-100 center-page">
							<div className="col-12">
								<div className="card">
									<form action="index.html">
										<h2 className="title">Create an Account</h2>
										<div className="row">
											<div className="col-12 col-sm-6 input-div one">
												<div className="i">
													<i className="fas fa-user-edit" />
												</div>
												<div className="div">
													<input type="text" className="input" placeholder="First name" />
												</div>
											</div>
											<div className="col-12 col-sm-6 input-div one">
												<div className="i">
													<i className="fas fa-user-edit" />
												</div>
												<div className="div">
													<input type="text" className="input" placeholder="Last name" />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col input-div one ">
												<div className="i">
													<i className="fas fa-mobile-alt" />
												</div>
												<div className="div">
													<input type="tel" className="input" placeholder="Phone number" />
												</div>
											</div>
										</div>
										<div className="row">
                    <div className="col input-div one">
											<div className="i">
												<i className="fas fa-home" />
											</div>
											<div className="div">
												<input type="text" className="input" placeholder="Address" />
											</div>
										</div>
                    </div>
										<div className="row">
                    <div className="col input-div one">
											<div className="i">
												<i className="fas fa-user" />
											</div>
											<div className="div">
												<input type="text" className="input" placeholder="Email" />
											</div>
										</div>
                    </div>
										<div className="row">
                    <div className="col-12 col-sm-6 input-div pass">
											<div className="i">
												<i className="fas fa-lock" />
											</div>
											<div className="div">
												<input type="password" className="input" placeholder="Password" />
											</div>
										</div>
                    <div className="col-12 col-sm-6 input-div pass">
											<div className="i">
												<i className="fas fa-check-circle" />
											</div>
											<div className="div">
												<input type="password" className="input" placeholder="Confirm Password" />
											</div>
										</div>
                    </div>
										<div className="row">
											<div className="col-12">
												<input type="submit" className="btn" value="Register" />
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterPage;
