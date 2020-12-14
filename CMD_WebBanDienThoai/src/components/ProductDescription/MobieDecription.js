import React, { Component } from 'react';

class MobieDecription extends Component {
  constructor(props) {
    const { description} = props;
    console.log("description", description.mobile);
    super(props);
    this.state = {
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

  render() {
    const {listDisplay} = this.props;
    console.log("listDisplay", listDisplay)
    const {display, revolution, widescreen, operation, camera1, camera2, cpu, ram, memory, microcard, sim, network, pin, quickcharging, weight, thick, color} = this.state;
    return (
      <div>
        <div className="form-group">
          <label>Display:</label>
          <select className="form-control" required="required" name="display"
              value={display}
              onChange={this.onChange}>
            {listDisplay.map((display_item, index) =>{
              return(
                <option key={index} value={display_item._id}>{display_item.name}</option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Revolution:</label>
          <input type="text" className="form-control" name="revolution" value={revolution} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Wide screen:</label>
          <input type="text" className="form-control" name="widescreen" value={widescreen} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Operation:</label>
          <input type="text" className="form-control" name="operation" value={operation} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Camera trước:</label>
          <input type="text" className="form-control" name="camera1" value={camera1} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Camera sau:</label>
          <input type="text" className="form-control" name="camera2" value={camera2} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>CPU:</label>
          <input type="text" className="form-control" name="cpu" value={cpu} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>RAM:</label>
          <input type="text" className="form-control" name="ram" value={ram} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Memory:</label>
          <input type="text" className="form-control" name="memory" value={memory} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Microcard:</label>
          <input type="text" className="form-control" name="microcard" value={microcard} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>SIM:</label>
          <input type="text" className="form-control" name="sim" value={sim} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Network:</label>
          <input type="text" className="form-control" name="network" value={network} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Battery:</label>
          <input type="text" className="form-control" name="pin" value={pin} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Quick charging:</label>
          <input type="text" className="form-control" name="quickcharging" value={quickcharging} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input type="text" className="form-control" name="weight" value={weight} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Thick:</label>
          <input type="text" className="form-control" name="thick" value={thick} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input type="text" className="form-control" name="color" value={color} onChange={this.onChange}/>
        </div>
      </div>
    );
  }
}

export default MobieDecription;
