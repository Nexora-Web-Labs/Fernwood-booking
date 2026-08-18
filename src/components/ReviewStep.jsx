import { formatDateLong } from "../data.js";

export default function ReviewStep({ booking, onJump }) {
  const { service, stylist, date, time, details } = booking;
  return (
    <section className="step-panel">
      <div className="step-title">Review &amp; confirm</div>
      <p className="step-sub">Double-check the details below.</p>
      <div className="review-list">
        <div className="review-row">
          <span className="review-label">Service</span>
          <span className="review-value">{service.name} <button className="review-edit" onClick={() => onJump(1)}>Edit</button></span>
        </div>
        <div className="review-row">
          <span className="review-label">Stylist</span>
          <span className="review-value">{stylist.name} <button className="review-edit" onClick={() => onJump(2)}>Edit</button></span>
        </div>
        <div className="review-row">
          <span className="review-label">When</span>
          <span className="review-value">{formatDateLong(date)}, {time} <button className="review-edit" onClick={() => onJump(3)}>Edit</button></span>
        </div>
        <div className="review-row">
          <span className="review-label">Contact</span>
          <span className="review-value">{details.name} · {details.email} <button className="review-edit" onClick={() => onJump(4)}>Edit</button></span>
        </div>
        <div className="review-total"><span>Total due at visit</span><b>${service.price}</b></div>
      </div>
    </section>
  );
}
