import React from "react";
import "../Tracking/tracking.css"
import "../../src/app/globals.css"

interface TrackingStep {
  time: string;
  date: string;
  status: string;
  description: string;
}

interface TrackingProps {
  trackingNumber: string;
  courier: string;
  deliveryType: string;
  status: string;
  steps: TrackingStep[];
}

const TrackingTimeline: React.FC<TrackingProps> = ({
  trackingNumber,
  courier,
  deliveryType,
  status,
  steps,
}) => {
  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <h2>Shipment details</h2>
        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>

      <div className="timeline">
        {steps.map((step, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="time">{step.time}</div>
              <div className="date">{step.date}</div>
              <div className="status">{step.status}</div>
              <div className="description">{step.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="delivery-info">
        <p><strong>Delivery Type:</strong> {deliveryType}</p>
        <p><strong>Courier:</strong> {courier}</p>
        <p><strong>Tracking Number:</strong> {trackingNumber}</p>
      </div>
    </div>
  );
};

export default TrackingTimeline;
