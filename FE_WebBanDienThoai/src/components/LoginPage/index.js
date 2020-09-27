
import React, { Component } from 'react';

class LoginPage extends Component {
	render() {
		return (
			<div>
				<img class="wave" src="img/wave.png" alt="" />
				<div class="container_login">
					<div class="img">
						<img src="img/bg.svg" alt="" />
					</div>
					<div class="login-content">
						<form action="index.html">
							<img src="img/avatar.svg" alt="" />
							<h2 class="title">Welcome to Bookstore</h2>
							<div class="input-div one">
								<div class="i">
									<i class="fas fa-user" />
								</div>
								<div class="div">
									<h5>Username</h5>
									<input type="text" class="input" />
								</div>
							</div>
							<div class="input-div pass">
								<div class="i">
									<i class="fas fa-lock" />
								</div>
								<div class="div">
									<h5>Password</h5>
									<input type="password" class="input" />
								</div>
							</div>
							<a href="#">Forgot Password?</a>
							<div className="row">
								<div className="col-12 col-sm-6">
									<input type="submit" class="btn" value="Login" />
								</div>
								<div className="col-12 col-sm-6">
									<input type="submit" class="btn" value="Register" />
								</div>
								
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPage;
