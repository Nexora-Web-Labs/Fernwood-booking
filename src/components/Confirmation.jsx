import { formatDateLong, buildIcs } from "../data.js";

export default function Confirmation({ booking, bookingRef, onBookAnother }) {
  const { service, stylist, date, time } = booking;

  function downloadIcs() {
    const ics = buildIcs({ service, stylist, date, time, bookingRef });
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fernwood-appointment.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <section className="step-panel">
      <div className="confirm-wrap">
        <div className="confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2>You're booked</h2>
        <p>{service.name} with {stylist.name} on {formatDateLong(date)} at {time}.</p>
        <div className="confirm-code mono">Confirmation {bookingRef}</div>
        <div className="confirm-actions">
          <button className="btn primary" style={{ flex: "none" }} onClick={downloadIcs}>Add to calendar</button>
          <button className="btn ghost" onClick={onBookAnother}>Book another</button>
        </div>
      </div>
    </section>
  );
}
