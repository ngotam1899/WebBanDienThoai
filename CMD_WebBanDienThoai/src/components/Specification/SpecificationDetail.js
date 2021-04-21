import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CDataTable } from '@coreui/react';
import { connect } from "react-redux";
// @Actions
import SpecificationActions from "../../redux/actions/specification";

const fields = ['name' ,{ key: 'actions', _style: { width: '10%'} }]

class SpecificationDetail extends Component {
  constructor(props){
    super(props);
    const {specification} = props;
    this.state = {
      id: specification ? specification._id : '',
      name: specification ? specification.name : '',
      selections: specification ? specification.selections : [],
      selection: ""
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
    const {id, name, selections} = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {name, selections}
    if (id) {
      onUpdate(id, data);
    }
    else {
      onCreate(data);
    }
  }

  onDeleteSelection = (item) =>{
    const {selections} = this.state;
    selections.splice(selections.indexOf(item), 1);
    this.setState({
      selections
    })
  }

  onAddSelection = () =>{
    const {selections, selection} = this.state;
    selections.push(selection);
    this.setState({
      selections,
      selection: ""
    })
  }

	render() {
    const { name, selections, selection } = this.state;
    const { large, onClose, specification} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{specification ? "Sửa thông tin thuộc tính" : "Thêm thuộc tính mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div className="row">
						<div className="col-12 col-lg-6">
								<div className="form-group">
									<label>Tên hệ thuộc tính:</label>
                  <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}/>
								</div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="form-group">
									<label>Tùy chọn bổ sung:</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="selection" value={selection} onChange={this.onChange}/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={this.onAddSelection} type="button">Add</button>
                    </div>
                  </div>
                  {selections && <CDataTable
                    items={selections}
                    fields={fields}
                    striped
                    itemsPerPage={5}
                    pagination
                    scopedSlots = {{
                      'name': (item) => (
                        <td>{item}</td>
                      ),
                      'actions': (item) => (
                        <CButton
                          onClick={() => this.onDeleteSelection(item)}
                          className="mr-1 mb-1 mb-xl-0"
                          color="danger"
                        >
                          Xoá
                        </CButton>
                      )
                    }}
                  />}
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
      dispatch(SpecificationActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(SpecificationActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificationDetail);
