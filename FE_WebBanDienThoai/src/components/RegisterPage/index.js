import React, { Component } from 'react';

class RegisterPage extends Component {
	render() {
		return (
			<div className="register-page">
				<div class="container">
					<div class="register-content m-auto">
						<div className="row w-100 center-page">
							<div className="col-12">
								<div className="card">
									<form action="index.html">
										<h2 class="title">Create an Account</h2>
										<div className="row">
											<div class="col input-div one">
												<div class="i">
													<i class="fas fa-user-edit" />
												</div>
												<div class="div">
													<input type="text" class="input" placeholder="Full name" />
												</div>
											</div>
										</div>
										<div className="row">
											<div class="col-12 col-sm-6 input-div one">
												<div class="i">
													<i class="fas fa-mobile-alt" />
												</div>
												<div class="div">
													<input type="tel" class="input" placeholder="Phone number" />
												</div>
											</div>
											<div class="col-12 col-sm-6 input-div one">
												<div class="i">
													<i class="fas fa-birthday-cake" />
												</div>
												<div class="div">
													<input type="date" class="input" placeholder="Birth date" />
												</div>
											</div>
										</div>
										<div className="row">
                    <div class="col input-div one">
											<div class="i">
												<i class="fas fa-home" />
											</div>
											<div class="div">
												<input type="text" class="input" placeholder="Address" />
											</div>
										</div>
                    </div>
										<div className="row">
                    <div class="col input-div one">
											<div class="i">
												<i class="fas fa-user" />
											</div>
											<div class="div">
												<input type="text" class="input" placeholder="Username" />
											</div>
										</div>
                    </div>
										<div className="row">
                    <div class="col-12 col-sm-6 input-div pass">
											<div class="i">
												<i class="fas fa-lock" />
											</div>
											<div class="div">
												<input type="password" class="input" placeholder="Password" />
											</div>
										</div>
                    <div class="col-12 col-sm-6 input-div pass">
											<div class="i">
												<i class="fas fa-check-circle" />
											</div>
											<div class="div">
												<input type="password" class="input" placeholder="Confirm Password" />
											</div>
										</div>
                    </div>
										<div className="row">
											<div className="col-12">
												<input type="submit" class="btn" value="Register" />
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
