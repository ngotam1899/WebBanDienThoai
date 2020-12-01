
import React, { Component } from 'react';
import './loginStyles.css'
import { assets } from '../../constants/assetsImage';
import { connect } from "react-redux";
//dispatch action
import AuthorizationActions from '../../redux/actions/auth'

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
		}
	}

	onLogin = () =>{
		const { email, password} = this.state;
		const {onLogin} = this.props;
		const data = {email, password};
		if(data){
			onLogin(data);
		}
	}

	onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
	}

	componentDidMount(){ 
		this.improveScreen()
	}

	componentWillReceiveProps(props){
		const {loggedIn,history} = props;
		if(loggedIn && loggedIn===true){
			history.push('/');
		}
	}

	improveScreen() {
		const inputs = document.querySelectorAll(".input");
		function addcl(){
			let parent = this.parentNode.parentNode;
			parent.classList.add("focus");
		}

		function remcl(){
			let parent = this.parentNode.parentNode;
			if(this.value === ""){
				parent.classList.remove("focus");
			}
		}
		inputs.forEach(input => {
			input.addEventListener("focus", addcl);
			input.addEventListener("blur", remcl);
		});
	}

	render() {
		const {email, password} = this.state;
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
									<h5>Email</h5>
									<input type="email" className="input" name="email" value={email} onChange={this.onChange}/>
								</div>
							</div>
							<div className="input-div pass">
								<div className="i">
									<i className="fas fa-lock" />
								</div>
								<div className="div">
									<h5>Password</h5>
									<input type="password" className="input" name="password" value={password} onChange={this.onChange}/>
								</div>
							</div>
							<a href="#">Forgot Password?</a>
							<div classNameName="row">
								<div classNameName="col-12 col-sm-6">
									<input className="btn" value="Login" onClick={()=> this.onLogin()}/>
								</div>
								<div classNameName="col-12 col-sm-6">
									<form action="/user/dang-ky" method="get">
									<input type="submit" className="btn" value="Register"/>
									</form>
								</div>
								
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps =(dispatch)=> {
	return {
		onLogin : (data) =>{
			dispatch(AuthorizationActions.onLogin(data))
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
