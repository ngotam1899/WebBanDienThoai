import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from "react-redux";
import { SketchPicker } from 'react-color';
// @Actions
import ColorActions from "../../redux/actions/color";

class ColorDetail extends Component {
  constructor(props){
    super(props);
    const {color} = props;
    this.state = {
      id: color ? color._id : '',
      name_vn: color ? color.name_vn : '',
      name_en: color ? color.name_en : '',
      code: color ? color.code : '#fff',
    }
  }
  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
        [name]: value
    })
  }

  onSubmit = () =>{
    const {id, name_vn, name_en, code} = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {name_vn, name_en, code}
    if (id) {
      onUpdate(id, data);
    }
    else {
      // 4. Create data
      onCreate(data);
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ code: color.hex });
  };

	render() {
    const {name_vn, name_en , code} = this.state;
    const { large, onClose, color} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{color ? "Sửa thông tin màu" : "Thêm màu mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
        <div className="row">
						<div className="col-12 col-lg-6">
							<form>
								<div className="form-group">
									<label>Tên màu:</label>
                  <input type="text" className="form-control" name="name_vn" value={name_vn} onChange={this.onChange}/>
								</div>
                <div className="form-group">
									<label>Tên tiếng anh:</label>
                  <input type="text" className="form-control" name="name_en" value={name_en} onChange={this.onChange}/>
								</div>

              </form>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group">
                <label>Chọn màu:</label>
                <SketchPicker
                  color={ code }
                  onChangeComplete={ this.handleChangeComplete }
                />
              </div>
            </div>
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton color="primary" onClick={() => this.onSubmit(!large)}>
						Save
					</CButton>{' '}
					<CButton color="secondary" onClick={() => onClose(!large)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		);
	}
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: (params) =>{
      dispatch(ColorActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(ColorActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorDetail);
