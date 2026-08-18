import { useState } from "react";
import Stepper from "./components/Stepper.jsx";
import ServiceStep from "./components/ServiceStep.jsx";
import StylistStep from "./components/StylistStep.jsx";
import DateTimeStep from "./components/DateTimeStep.jsx";
import DetailsStep from "./components/DetailsStep.jsx";
import ReviewStep from "./components/ReviewStep.jsx";
import Confirmation from "./components/Confirmation.jsx";

const emptyDetails = { name: "", phone: "", email: "", notes: "" };

export default function App() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [stylist, setStylist] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState(emptyDetails);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  function validateStep(current) {
    const e = {};
    if (current === 1 && !service) e.service = true;
    if (current === 2 && !stylist) e.stylist = true;
    if (current === 3) {
      if (!date) e.date = true;
      if (!time) e.time = true;
    }
    if (current === 4) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim());
      if (!details.name.trim()) e.name = true;
      if (!details.phone.trim()) e.phone = true;
      if (!emailOk) e.email = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step === 5) {
      setBookingRef("FW-" + Math.random().toString(36).slice(2, 7).toUpperCase());
      setConfirmed(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function back() { setStep((s) => s - 1); }
  function jump(target) { setStep(target); }

  function bookAnother() {
    setService(null); setStylist(null); setDate(""); setTime("");
    setDetails(emptyDetails); setErrors({}); setConfirmed(false); setStep(1);
  }

  function handleDateChange(d) { setDate(d); setTime(""); setErrors((e) => ({ ...e, date: false })); }
  function handleTimeChange(t) { setTime(t); setErrors((e) => ({ ...e, time: false })); }
  function handleDetailsChange(patch) {
    setDetails((d) => ({ ...d, ...patch }));
    setErrors((e) => ({ ...e, name: false, phone: false, email: false }));
  }

  return (
    <div className="page">
      <div className="studio-header">
        <div className="studio-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21c-4-3-7-6.5-7-10.5A7 7 0 0112 3a7 7 0 017 7.5c0 4-3 7.5-7 10.5z"/><path d="M12 12v9"/></svg>
        </div>
        <h1>Fernwood Studio</h1>
        <p>BOOK YOUR APPOINTMENT</p>
      </div>

      {!confirmed && <Stepper currentStep={step} />}

      <div className="booking-card">
        {confirmed ? (
          <Confirmation booking={{ service, stylist, date, time }} bookingRef={bookingRef} onBookAnother={bookAnother} />
        ) : (
          <>
            {step === 1 && <ServiceStep selected={service} onSelect={(s) => { setService(s); setErrors((e) => ({ ...e, service: false })); }} error={errors.service} />}
            {step === 2 && <StylistStep selected={stylist} onSelect={(s) => { setStylist(s); setErrors((e) => ({ ...e, stylist: false })); }} error={errors.stylist} />}
            {step === 3 && <DateTimeStep date={date} time={time} onDateChange={handleDateChange} onTimeChange={handleTimeChange} errors={errors} />}
            {step === 4 && <DetailsStep details={details} onChange={handleDetailsChange} errors={errors} />}
            {step === 5 && <ReviewStep booking={{ service, stylist, date, time, details }} onJump={jump} />}

            <div className="step-nav">
              {step > 1 && <button className="btn ghost" onClick={back}>Back</button>}
              <button className="btn primary" onClick={next}>{step === 5 ? "Confirm booking" : "Continue"}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
