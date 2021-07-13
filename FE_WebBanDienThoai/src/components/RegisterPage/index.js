import React, { Component } from 'react';
import { connect } from "react-redux";

// @Actions
import AuthorizationActions from '../../redux/actions/auth'
import AddressActions from "../../redux/actions/address";
// @Functions
import { toastError } from '../../utils/toastHelper';
import '../LoginPage/loginStyles.css'

class RegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: null,
			lastname: null,
			phonenumber: null,
			address: null,
			city: "",
      district:"",
      ward: "",
			email: null,
			password: null,
			confirmPassword: null,
		}
	}

	componentDidMount() {
    const {onGetListCity} = this.props;
		onGetListCity();
		
		document.title = "[TellMe] Đăng ký"
		this.improveScreen();
  }

	onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
	}

	setDistrict = (event) =>{
    const {value, options, selectedIndex} = event.target;
    const {onGetListDistrict} = this.props;
    this.setState({
      cityID: value,
      city: options[selectedIndex].text,
      district: "",
    })
    onGetListDistrict({province_id: event.target.value });
  }

  setWard = (event) => {
    const {options, selectedIndex} = event.target;
    const {onGetListWard} = this.props;
    const {cityID} = this.state;
    this.setState({
      district: options[selectedIndex].text,
    })
    onGetListWard(cityID, event.target.value);
  }

  setAddress = (event) =>{
    const {options, selectedIndex} = event.target;
    this.setState({
      ward: options[selectedIndex].text
    })
  }
	
	onRegister(data){
		const {firstname, lastname, phonenumber, address, city, district, ward, email, password, confirmPassword} = this.state;
		const {onRegister,t} = this.props;
		data = {firstname, lastname, phonenumber, address : `${address.replaceAll(',', '')}, ${ward}, ${district}, ${city}`, email, password};
		if(password === confirmPassword){
			onRegister(data);
		}else{
			toastError(t('user.password.error'))
		}
	}

	improveScreen(){
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
		const {firstname, lastname, phonenumber, address, email, password, confirmPassword} = this.state;
		const {listCity, listDistrict, listWard} = this.props;
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
													<input type="text" className="input" name="firstname" value={firstname} onChange={this.onChange}/>
												</div>
											</div>
											<div className="col-12 col-sm-6 input-div one">
												<div className="i">
													<i className="fas fa-user-edit" />
												</div>
												<div className="div">
													<h5>Last name</h5>
													<input type="text" className="input" name="lastname" value={lastname} onChange={this.onChange}/>
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
													<input type="tel" className="input" name="phonenumber" value={phonenumber} onChange={this.onChange}/>
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
													<input type="text" className="input" name="address" value={address} onChange={this.onChange}/>
												</div>
											</div>
                    </div>
										<div className="row">
											<div className="col input-div one">
												<div className="i">
												</div>
												<div className="div form-inline">
												<div className="col-12 col-md-4">
													<select  className="form-control w-100" type="text" placeholder="Chọn tỉnh/ thành"
													onChange={this.setDistrict} required>
														{listCity && listCity.map((item, index)=>{
																return(
																	<option key={index} value={item.ProvinceID} name="city">{item.ProvinceName}</option>
																)
															})
														}
													</select>
												</div>
												<div className="col-12 col-md-4">
													<select  className="form-control w-100" type="text" placeholder="Chọn quận/ huyện"
													onChange={this.setWard} required>
														{listDistrict && listDistrict.map((item, index)=>{
																	return(
																		<option key={index} value={item.DistrictID} name="district">{item.DistrictName}</option>
																	)
																})
															}
													</select>
												</div>
												<div className="col-12 col-md-4">
													<select  className="form-control w-100" type="text" placeholder="Chọn phường xã"
													onChange={this.setAddress} required>
														{listWard && listWard.map((item, index)=>{
																	return(
																		<option key={index} name="ward">{item.WardName}</option>
																	)
																})
															}
													</select>
												</div>
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
												<input type="email" className="input" name="email" value={email} onChange={this.onChange}/>
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
												<input type="password" className="input" name="password" value={password} onChange={this.onChange}/>
											</div>
										</div>
                    <div className="col-12 col-sm-6 input-div pass">
											<div className="i">
												<i className="fas fa-check-circle" />
											</div>
											<div className="div">
												<h5>Confirm Password</h5>
												<input type="password" className="input" name="confirmPassword" value={confirmPassword} onChange={this.onChange}/>
											</div>
										</div>
                    </div>
										<div className="row">
											<div className="col-md-3 col-12">
												<form className="p-0" action="/user/dang-nhap">
													<input type="submit" className="btn" value="Login"/>
												</form>
											</div>
											<div className="col-md-6 col-12">
												<input className="btn" value="Register" onClick={() => this.onRegister()}/>
											</div>
											<div className="col-md-3 col-12">
												<form className="p-0" action="/">
													<input type="submit" className="btn" value="Home"/>
												</form>
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
		listCity: state.address.city,
    listDistrict: state.address.district,
    listWard: state.address.ward,
  };
};

const mapDispatchToProps =(dispatch)=> {
	return {
		onRegister : (data) =>{
			dispatch(AuthorizationActions.onRegister(data))
		},
		onGetListCity: () => {
      dispatch(AddressActions.onGetCity())
    },
    onGetListDistrict: (cityID) => {
      dispatch(AddressActions.onGetDistrict(cityID))
    },
    onGetListWard: (cityID, districtID) => {
      dispatch(AddressActions.onGetWard(cityID, districtID))
    },
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
