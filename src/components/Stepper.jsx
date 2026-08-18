const STEPS = [
  { key: 1, label: "Service" }, { key: 2, label: "Stylist" }, { key: 3, label: "Date" },
  { key: 4, label: "Details" }, { key: 5, label: "Review" },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="stepper">
      {STEPS.map((s, i) => (
        <div className="step-item-wrap" key={s.key} style={{ display: "contents" }}>
          <div className={`step-item ${s.key < currentStep ? "done" : s.key === currentStep ? "current" : ""}`}>
            <div className="step-circle">{s.key < currentStep ? "✓" : s.key}</div>
            <div className="step-label">{s.label}</div>
          </div>
          {i < STEPS.length - 1 && <div className={`step-connector ${s.key < currentStep ? "filled" : ""}`}></div>}
        </div>
      ))}
    </div>
  );
}
