import React, { Component } from 'react';

class MobileDescription extends Component {
  constructor(props) {
    const { description } = props;
    super(props);
    this.state = {
      des_mobile: {
        display: description ? description.mobile.display : "",
        revolution: description ? description.mobile.revolution : "",
        widescreen: description ? description.mobile.widescreen : "",
        operation: description ? description.mobile.operation : "",
        camera1: description ? description.mobile.camera1 : "",
        camera2: description ? description.mobile.camera2 : "",
        cpu: description ? description.mobile.cpu : "",
        ram: description ? description.mobile.ram : "",
        memory: description ? description.mobile.memory : "",
        microcard: description ? description.mobile.microcard : "",
        sim: description ? description.mobile.sim : "",
        network: description ? description.mobile.network : "",
        pin: description ? description.mobile.pin : "",
        quickcharging: description ? description.mobile.quickcharging : "",
        weight: description ? description.mobile.weight : "",
        thick: description ? description.mobile.thick : "",
        color: description ? description.mobile.color : ""
      },
    }
  }

  onChange = (event) =>{
    const {des_mobile} = this.state;
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      des_mobile: {
        [name]:  value
      }
    })
  }

  render() {
    const {des_mobile} = this.state;
    return (
      <div>
        <div className="form-group">
          <label>Display:</label>
          <input type="text" className="form-control" name="display" value={des_mobile.display} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Revolution:</label>
          <input type="text" className="form-control" name="revolution" value={des_mobile.revolution} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Wide screen:</label>
          <input type="text" className="form-control" name="widescreen" value={des_mobile.widescreen} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Operation:</label>
          <input type="text" className="form-control" name="operation" value={des_mobile.operation} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Camera trước:</label>
          <input type="text" className="form-control" name="camera1" value={des_mobile.camera1} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Camera sau:</label>
          <input type="text" className="form-control" name="camera2" value={des_mobile.camera2} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>CPU:</label>
          <input type="text" className="form-control" name="cpu" value={des_mobile.cpu} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>RAM:</label>
          <input type="text" className="form-control" name="ram" value={des_mobile.ram} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Memory:</label>
          <input type="text" className="form-control" name="memory" value={des_mobile.memory} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Microcard:</label>
          <input type="text" className="form-control" name="microcard" value={des_mobile.microcard} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>SIM:</label>
          <input type="text" className="form-control" name="sim" value={des_mobile.sim} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Network:</label>
          <input type="text" className="form-control" name="network" value={des_mobile.network} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Battery:</label>
          <input type="text" className="form-control" name="pin" value={des_mobile.pin} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Quick charging:</label>
          <input type="text" className="form-control" name="quickcharging" value={des_mobile.quickcharging} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input type="text" className="form-control" name="weight" value={des_mobile.weight} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Thick:</label>
          <input type="text" className="form-control" name="thick" value={des_mobile.thick} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input type="text" className="form-control" name="color" value={des_mobile.color} onChange={this.onChange}/>
        </div>
      </div>
    );
  }
}

export default MobileDescription;
