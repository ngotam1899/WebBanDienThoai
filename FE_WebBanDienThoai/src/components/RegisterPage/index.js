import React, { Component } from 'react';
import { connect } from "react-redux";
//dispatch action
import {bindActionCreators} from 'redux';

import '../LoginPage/loginStyles.css'

class RegisterPage extends Component {
	componentDidMount(){ 
		const inputs = document.querySelectorAll(".input");
		function addcl(){
			let parent = this.parentNode.parentNode;
			parent.classList.add("focus");
		}

		function remcl(){
			let parent = this.parentNode.parentNode;
			if(this.value == ""){
				parent.classList.remove("focus");
			}
		}
		inputs.forEach(input => {
			input.addEventListener("focus", addcl);
			input.addEventListener("blur", remcl);
		});
	}


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
													<h5>First name</h5>
													<input type="text" className="input"/>
												</div>
											</div>
											<div className="col-12 col-sm-6 input-div one">
												<div className="i">
													<i className="fas fa-user-edit" />
												</div>
												<div className="div">
													<h5>Last name</h5>
													<input type="text" className="input" />
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col input-div one ">
												<div className="i">
													<i className="fas fa-mobile-alt" />
												</div>
												<div className="div">
													<h5>Phone number</h5>
													<input type="tel" className="input" />
												</div>
											</div>
										</div>
										<div className="row">
                    <div className="col input-div one">
											<div className="i">
												<i className="fas fa-home" />
											</div>
											<div className="div">
												<h5>Address</h5>
												<input type="text" className="input" />
											</div>
										</div>
                    </div>
										<div className="row">
                    <div className="col input-div one">
											<div className="i">
												<i className="fas fa-user" />
											</div>
											<div className="div">
												<h5>Email</h5>
												<input type="text" className="input"/>
											</div>
										</div>
                    </div>
										<div className="row">
                    <div className="col-12 col-sm-6 input-div pass">
											<div className="i">
												<i className="fas fa-lock" />
											</div>
											<div className="div">
												<h5>Password</h5>
												<input type="password" className="input"/>
											</div>
										</div>
                    <div className="col-12 col-sm-6 input-div pass">
											<div className="i">
												<i className="fas fa-check-circle" />
											</div>
											<div className="div">
												<h5>Confirm Password</h5>
												<input type="password" className="input" />
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

const mapStateToProps = (state) => {
  return {
   
  };
};

const mapDispatchToProps = {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
