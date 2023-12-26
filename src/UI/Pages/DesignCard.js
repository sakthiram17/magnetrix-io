import Card from "../Card";
import "./DesignCard.css"
import React from "react";
const DesignCard = ({ data }) => {
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
        <h2><b>{name}</b></h2>
        <div className="table-card">
        <table class="styled-table">
    <thead>
      <tr>
        <th>Name of Design</th>
        <th>Date</th>
        <th>Length </th>
        <th>Power</th>
        <th>Resistance</th>
        <th>Turns</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{new Date(timestamp).toLocaleString()}</td>
        <td>{Math.ceil(length)}cm</td>
        <td>{power}W</td>
        <td>{Math.ceil(resistance)} mΩ</td>
        <td>{turns}</td>
      </tr>
    </tbody>
  </table>

  <h3>Core Information</h3>
  <table class="styled-table">
    <thead>
      <tr>
        <th>Area Product</th>
        <th>Core Area</th>
        <th>Mean Turn Length</th>
        <th>SKU</th>
        <th>Window Area</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{core['Area Product']}</td>
        <td>{core['Core Area']}</td>
        <td>{core['Mean Turn Length']}</td>
        <td>{core.SKU}</td>
        <td>{core['Window Area']}</td>
      </tr>
    </tbody>
  </table>

  <h3>Parameters</h3>
  <table class="styled-table">
    <thead>
      <tr>
        <th>Inductance</th>
        <th>Min Wire</th>
        <th>Peak</th>
        <th>RMS</th>
        <th>Winding Factor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{parameters.inductance}µH </td>
        <td>{parameters.minWire}</td>
        <td>{parameters.peak}A</td>
        <td>{parameters.rms}A </td>
        <td>{parameters.windingFactor}</td>
      </tr>
    </tbody>
  </table>
</div>
       </React.Fragment>
    );
  };
  
  export default DesignCard;