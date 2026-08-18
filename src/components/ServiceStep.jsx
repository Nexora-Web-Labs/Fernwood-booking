import { services } from "../data.js";

export default function ServiceStep({ selected, onSelect, error }) {
  return (
    <section className="step-panel">
      <div className="step-title">Choose a service</div>
      <p className="step-sub">Select what you'd like to have done today.</p>
      <div className="option-list">
        {services.map((s) => (
          <button type="button" key={s.id} className={`option-card ${selected?.id === s.id ? "selected" : ""}`} onClick={() => onSelect(s)}>
            <div className="option-icon">{s.icon}</div>
            <div className="option-main">
              <div className="option-name">{s.name}</div>
              <div className="option-meta">{s.meta}</div>
            </div>
            <div className="option-price mono">${s.price}</div>
            <div className="option-check"></div>
          </button>
        ))}
      </div>
      {error && <div className="field-error" style={{ display: "block", marginTop: 10 }}>Please select a service to continue.</div>}
    </section>
  );
}
