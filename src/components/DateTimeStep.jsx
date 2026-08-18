import { useMemo } from "react";
import { today, slotsForDate } from "../data.js";

export default function DateTimeStep({ date, time, onDateChange, onTimeChange, errors }) {
  const slots = useMemo(() => (date ? slotsForDate(date) : []), [date]);
  const minDate = today.toISOString().slice(0, 10);

  return (
    <section className="step-panel">
      <div className="step-title">Select date &amp; time</div>
      <p className="step-sub">Availability updates based on the date you choose.</p>

      <div className={`field ${errors.date ? "invalid" : ""}`}>
        <label htmlFor="dateInput">Date</label>
        <input id="dateInput" type="date" min={minDate} value={date} onChange={(e) => onDateChange(e.target.value)} />
        <div className="field-error">Please choose a date.</div>
      </div>

      <div className="field">
        <label>Available times</label>
        <div className="slot-grid">
          {!date ? (
            <div className="no-slots">Choose a date to see open times.</div>
          ) : slots.map((s) => (
            <button
              type="button" key={s.time} disabled={!s.available}
              className={`slot-btn ${time === s.time ? "selected" : ""}`}
              onClick={() => onTimeChange(s.time)}
            >
              {s.time}
            </button>
          ))}
        </div>
        {errors.time && <div className="field-error" style={{ display: "block", marginTop: 8 }}>Please pick a time slot.</div>}
      </div>
    </section>
  );
}
