import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { connect } from "react-redux";
// @Actions
import ColorActions from "../../redux/actions/color";

class ColorDetail extends Component {
  constructor(props){
    super(props);
    const {color} = props;
    this.state = {
      id: color ? color._id : '',
      name: color ? color.color : ''
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

  onSubmit = () =>{
    const {id, name} = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {color: name}
    if (id) {
      onUpdate(id, data);
    }
    else {
      // 4. Create data
      onCreate(data);
    }
  }

	render() {
    const {name} = this.state;
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
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
								</div>
              </form>
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
