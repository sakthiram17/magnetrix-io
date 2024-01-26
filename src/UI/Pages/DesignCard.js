import Card from "../Card";
import "./DesignCard.css"
import React from "react";
import axios from "axios";
import Modal from "../Modal";
import LoadingSpinner from "../LoadingSpinner";
const DesignCard = (props) => {
   const {data} = props;
    const {
      core,
      data: timestamp,
      length,
      name,
      parameters,
      power,
      resistance,
      turns,
    } = data;
  
    return (
       <React.Fragment>
        
        <div className="table-card your-designs">
  <h2><b>{name}</b></h2>

  <table className="styled-table combined-table">
    <tbody>
      <tr className="heading" id="heading">
        <td><p className="heading" >Design Information</p></td>
        <td><p className="heading" >Core Information</p></td>
        <td><p className="heading"  >Parameters</p></td>
      </tr>
      <tr>
        <td><strong>Name of Design:</strong> {name}</td>
        <td><strong>Area Product:</strong> {core['Area Product']}</td>
        <td><strong>Inductance:</strong> {parameters.inductance}µH</td>
      </tr>
      <tr>
        <td><strong>Date:</strong> {new Date(timestamp).toLocaleString()}</td>
        <td><strong>Core Area:</strong> {core['Core Area']}</td>
        <td><strong>Min Wire:</strong> {parameters.minWire}</td>
      </tr>
      <tr>
        <td><strong>Length:</strong> {Math.ceil(length)}cm</td>
        <td><strong>Mean Turn Length:</strong> {core['Mean Turn Length']}</td>
        <td><strong>Peak:</strong> {parameters.peak}A</td>
      </tr>
      <tr>
        <td><strong>Power:</strong> {power}W</td>
        <td><strong>SKU:</strong> {core.SKU}</td>
        <td><strong>RMS:</strong> {parameters.rms}A</td>
      </tr>
      <tr>
        <td><strong>Resistance:</strong> {Math.ceil(resistance)} mΩ</td>
        <td><strong>Window Area:</strong> {core['Window Area']}</td>
        <td><strong>Winding Factor:</strong> {parameters.windingFactor}</td>
      </tr>
      <tr>
        <td><strong>Turns:</strong> {turns}</td>
      </tr>
    </tbody>
  </table>
  <button className="btn-primary" onClick = {()=>{
    props.deleteDesign(name)
  }}>
    Delete Design
  </button>
 
</div>
       </React.Fragment>
    );
  };
  
  export default DesignCard;