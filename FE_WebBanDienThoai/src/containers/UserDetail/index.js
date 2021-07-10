import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Actions
import UsersActions from '../../redux/actions/user';
import AddressActions from "../../redux/actions/address";

class UserDetail extends Component {
  constructor(props) {
    super(props);
    const {userInfo, listCity} = props;
    var lastCity;
    if(userInfo.address){
      lastCity = listCity.find(obj => obj.ProvinceName === userInfo.address.split(', ')[3]).ProvinceID;
    }
    else{
      lastCity = -1;
    }
    this.state = {
      firstname: userInfo ? userInfo.firstname :"",
      lastname: userInfo ? userInfo.lastname :"",
      phonenumber: userInfo ? userInfo.phonenumber :"",
      address: userInfo && userInfo.address ? userInfo.address.split(', ')[0] :"",
      email: userInfo ? userInfo.email :"",
      cityID: lastCity,
      districtID: null,
      wardID: null,
      city: userInfo && userInfo.address ? userInfo.address.split(', ')[3] : "",
      district: userInfo && userInfo.address ? userInfo.address.split(', ')[2] : "",
      ward: userInfo && userInfo.address ? userInfo.address.split(', ')[1] : ""
    }
  }

  componentDidMount(){
    const {onGetListDistrict} = this.props;
    const {cityID} = this.state;
    if(cityID){
      onGetListDistrict({province_id: cityID})
    }
  }

  componentWillReceiveProps(props){
    const {listDistrict, userInfo, listCity} = props;
    var lastCity;
    if(userInfo.address){
      lastCity = listCity.find(obj => obj.ProvinceName === userInfo.address.split(', ')[3]).ProvinceID;
      const {cityID, districtID, wardID} = this.state;
      const {onGetListWard} = this.props;
      if(this.props.listDistrict !== props.listDistrict && cityID === lastCity){
        onGetListWard(cityID, listDistrict.find(obj => obj.DistrictName === userInfo.address.split(', ')[2]).DistrictID)
      }
      if(districtID===null && wardID===null && props.listWard){
        this.setState({
          districtID: this.props.listDistrict.find(obj => obj.DistrictName === userInfo.address.split(', ')[2]).DistrictID,
          wardID: props.listWard.find(obj => obj.WardName === userInfo.address.split(', ')[1]).WardCode
        })
      }
    }
    else{
      lastCity = -1;
    }
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
    const {options, selectedIndex, value} = event.target;
    const {onGetListWard} = this.props;
    const {cityID} = this.state;
    this.setState({
      district: options[selectedIndex].text,
      districtID: value
    })
    onGetListWard(cityID, event.target.value);
  }

  setAddress = (event) =>{
    const {options, selectedIndex, value} = event.target;
    this.setState({
      ward: options[selectedIndex].text,
      wardID: value
    })
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    })
  }


  updateProfile =()=>{
    const {userInfo, onUpdate} = this.props;
    const {firstname, lastname, phonenumber, address, ward, city, district, email} = this.state;
    /* Xử lý ảnh */
    const {selectedFile} = this.props;
    var formData = new FormData();
    formData.append("image",selectedFile);
    /* Xử lý ảnh */
    var data = {firstname, lastname, phonenumber, address : `${address.replaceAll(',', '')}, ${ward}, ${district}, ${city}`, email, image: selectedFile ? formData : null}
    onUpdate(userInfo._id, data);
  }

  render() {
    const {firstname, lastname, phonenumber, address, email, cityID, districtID, wardID} = this.state;
    const {t, listCity, listDistrict, listWard} = this.props;

    return (  
      <div>
        <div className="row py-2">
          <div className="col-6">
            <div className="form-floating">
              <input type="text" className="form-control" id="firstname" name="firstname" value={firstname} onChange={this.onChange}/>
              <label for="firstname">{t('checkout.firstname.input')}</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating">
              <input type="text" className="form-control" id="lastname" name="lastname" value={lastname} onChange={this.onChange}/>
              <label for="lastname">{t('checkout.lastname.input')}</label>
            </div>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-6">
            <div className="form-floating">
              <input type="tel" className="form-control" id="phonenumber" name="phonenumber" value={phonenumber} onChange={this.onChange}/>
              <label for="phonenumber">{t('checkout.phone.input')}</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating">
              <input type="email" className="form-control" id="email" name="email" value={email} onChange={this.onChange} disabled/>
              <label for="email">Email</label>
            </div>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-12">
            <div className="form-floating">
              <input type="text" className="form-control" id="address" name="address" value={address} onChange={this.onChange}/>
              <label for="address">{t('checkout.address.input')}</label>
            </div>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-4">
            <div className="form-floating">
              <select className="form-select" type="text" id="city" value={cityID}
              onChange={this.setDistrict} required>
                {listCity && listCity.map((item, index)=>{
                    return(
                      <option key={index} value={item.ProvinceID} name="city">{item.ProvinceName}</option>
                    )
                  })
                }
              </select>
              <label htmlFor="city">Tỉnh thành</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-floating">
              <select  className="form-select" type="text" id="district"
              value={districtID ? districtID : null}
              onChange={this.setWard} required>
                {listDistrict && listDistrict.map((item, index)=>{
                      return(
                        <option key={index} value={item.DistrictID} name="district">{item.DistrictName}</option>
                      )
                    })
                  }
              </select>
              <label htmlFor="district">Quận huyện</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-floating">
              <select  className="form-select" type="text" id="ward"
              value={wardID ? wardID : null}
              onChange={this.setAddress} required>
                {listWard && listWard.map((item, index)=>{
                      return(
                        <option key={index} value={item.WardCode} name="ward">{item.WardName}</option>
                      )
                    })
                  }
              </select>
              <label htmlFor="ward">Phường xã</label>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => this.updateProfile()}>{t('user.save-change.button')}</button>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    listDistrict: state.address.district,
    listWard: state.address.ward,
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    onUpdate : (id, params) =>{
			dispatch(UsersActions.onUpdate({id, params}))
    },
    onGetListDistrict: (cityID) => {
      dispatch(AddressActions.onGetDistrict(cityID))
    },
    onGetListWard: (cityID, districtID) => {
      dispatch(AddressActions.onGetWard(cityID, districtID))
    }
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(UserDetail);