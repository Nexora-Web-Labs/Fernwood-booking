export default function DetailsStep({ details, onChange, errors }) {
  return (
    <section className="step-panel">
      <div className="step-title">Your details</div>
      <p className="step-sub">We'll send your confirmation here.</p>

      <div className="field-row">
        <div className={`field ${errors.name ? "invalid" : ""}`}>
          <label htmlFor="nameInput">Full name</label>
          <input id="nameInput" type="text" autoComplete="name" value={details.name} onChange={(e) => onChange({ name: e.target.value })} />
          <div className="field-error">Please enter your name.</div>
        </div>
        <div className={`field ${errors.phone ? "invalid" : ""}`}>
          <label htmlFor="phoneInput">Phone</label>
          <input id="phoneInput" type="tel" autoComplete="tel" value={details.phone} onChange={(e) => onChange({ phone: e.target.value })} />
          <div className="field-error">Please enter a phone number.</div>
        </div>
      </div>

      <div className={`field ${errors.email ? "invalid" : ""}`}>
        <label htmlFor="emailInput">Email</label>
        <input id="emailInput" type="email" autoComplete="email" value={details.email} onChange={(e) => onChange({ email: e.target.value })} />
        <div className="field-error">Please enter a valid email address.</div>
      </div>

      <div className="field">
        <label htmlFor="notesInput">Notes <span style={{ textTransform: "none", fontWeight: 400, color: "var(--text-faint)" }}>(optional)</span></label>
        <textarea id="notesInput" placeholder="Anything we should know before your visit?" value={details.notes} onChange={(e) => onChange({ notes: e.target.value })} />
      </div>
    </section>
  );
}
