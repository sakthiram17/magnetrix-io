import Card from "../Card";
import "./DesignCard.css";
import React, { useState } from "react";
import axios from "axios";
import Modal from "../Modal";
import LoadingSpinner from "../LoadingSpinner";

const DesignCard = (props) => {
  const { data } = props;
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
  const [accordianList, setAccordian] = useState([true, false, false]);
  const [deleteModal, setDeleteModal] = useState(null);
  const handleAccordianChange = (index) => {
    let temp = [...accordianList];
    temp[index] = !temp[index];
    setAccordian(temp);
  };

  return (
    <React.Fragment>
      <div className="table-card your-designs">
        <h2>
          <b>{name}</b>
        </h2>
        {deleteModal}
        <div className="accordian">
          <button
            className={
              accordianList[0] ? "accordian-btn active" : "accordian-btn"
            }
            onClick={() => {
              handleAccordianChange(0);
            }}
          >
            General Information
          </button>
          {accordianList[0] ? (
            <ul>
              <li>
                <strong>Name of Design:</strong> {name}
              </li>
              <li>
                <strong>Length:</strong> {Math.ceil(length)}cm
              </li>
              <li>
                <strong>Power Loss:</strong> {power}W
              </li>
              <li>
                <strong>Resistance:</strong> {Math.ceil(resistance)} mΩ
              </li>
              <li>
                <strong>Date:</strong> {new Date(timestamp).toLocaleString()}
              </li>
              <li>
                <strong>Turns:</strong> {turns}
              </li>
            </ul>
          ) : null}
        </div>

        <div className="accordian">
          <button
            className={
              accordianList[1] ? "accordian-btn active" : "accordian-btn"
            }
            onClick={() => {
              handleAccordianChange(1);
            }}
          >
            Core Information
          </button>
          {accordianList[1] ? (
            <ul>
              <li>
                <strong>Area Product:</strong> {core["Area Product"]}
              </li>
              <li>
                <strong>Core Area:</strong> {core["Core Area"]}
              </li>
              <li>
                <strong>Mean Turn Length:</strong> {core["Mean Turn Length"]}
              </li>
              <li>
                <strong>SKU:</strong> {core.SKU}
              </li>
              <li>
                <strong>Window Area:</strong> {core["Window Area"]}
              </li>
            </ul>
          ) : null}
        </div>

        <div className="accordian">
          <button
            className={
              accordianList[2] ? "accordian-btn active" : "accordian-btn"
            }
            onClick={() => {
              handleAccordianChange(2);
            }}
          >
            Parameters
          </button>
          {accordianList[2] ? (
            <ul>
              <li>
                <strong>Inductance:</strong> {parameters.inductance}µH
              </li>
              <li>
                <strong>Smallest Wire Possible:</strong> {parameters.minWire}
              </li>
              <li>
                <strong>Peak:</strong> {parameters.peak}A
              </li>
              <li>
                <strong>RMS:</strong> {parameters.rms}A
              </li>
              <li>
                <strong>Winding Factor:</strong> {parameters.windingFactor}
              </li>
              <li>
                <strong>Wire Chosen:</strong>{" "}
                {props.selectedWire ? props.selectedWire["name"] : parameters.minWire}
              </li>
              <li>
                <strong>Current Rating:</strong>{" "}
                {props.selectedWire ? props.selectedWire["Current"] : parameters.rms}
              </li>
            </ul>
          ) : null}
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setDeleteModal(
              <Modal code="modal-card">
                Are you Sure ??
                <button
                  className="btn-danger"
                  onClick={() => {
                    setDeleteModal(null);
                    props.deleteDesign(timestamp);
                  }}
                >
                  Yes
                </button>
                <button
                  className="btn-safe"
                  onClick={() => {
                    setDeleteModal(null);
                  }}
                >
                  No
                </button>
              </Modal>
            );
          }}
        >
          Delete Design
        </button>
      </div>
    </React.Fragment>
  );
};

export default DesignCard;
