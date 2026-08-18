import { stylists } from "../data.js";

export default function StylistStep({ selected, onSelect, error }) {
  return (
    <section className="step-panel">
      <div className="step-title">Pick your stylist</div>
      <p className="step-sub">Or let us match you with the first available.</p>
      <div className="stylist-grid">
        {stylists.map((s) => (
          <button type="button" key={s.id} className={`stylist-card ${selected?.id === s.id ? "selected" : ""}`} onClick={() => onSelect(s)}>
            <div className="stylist-avatar">{s.init}</div>
            <div>
              <div className="stylist-name">{s.name}</div>
              <div className="stylist-role">{s.role}</div>
            </div>
          </button>
        ))}
      </div>
      {error && <div className="field-error" style={{ display: "block", marginTop: 10 }}>Please choose a stylist to continue.</div>}
    </section>
  );
}
