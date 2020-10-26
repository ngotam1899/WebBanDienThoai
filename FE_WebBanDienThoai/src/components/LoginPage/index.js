
import React, { Component } from 'react';
import './loginStyles.css'
import { assets } from '../../constants/assetsImage';

class LoginPage extends Component {
	render() {
		return (
			<div>
				<img className="wave" src={ assets("wave.png")} alt="" />
				<div className="container_login">
					<div className="img">
						<img src={ assets("bg.svg")} alt="" />
					</div>
					<div className="login-content">
						<form action="index.html">
							<img src="img/avatar.svg" alt="" />
							<h2 className="title">Welcome to</h2>
							<img className="pb-4" src={assets("brand.png")}></img>
							<div className="input-div one">
								<div className="i">
									<i className="fas fa-user" />
								</div>
								<div className="div">
									<h5>Username</h5>
									<input type="text" className="input" />
								</div>
							</div>
							<div className="input-div pass">
								<div className="i">
									<i className="fas fa-lock" />
								</div>
								<div className="div">
									<h5>Password</h5>
									<input type="password" className="input" />
								</div>
							</div>
							<a href="#">Forgot Password?</a>
							<div classNameName="row">
								<div classNameName="col-12 col-sm-6">
									<input type="submit" className="btn" value="Login" />
								</div>
								<div classNameName="col-12 col-sm-6">
									<input type="submit" className="btn" value="Register" />
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
