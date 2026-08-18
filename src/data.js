export const services = [
  { id: "cut", icon: "✂️", name: "Haircut & Style", meta: "45 min", price: 65 },
  { id: "color", icon: "🎨", name: "Color & Highlights", meta: "2 hr", price: 140 },
  { id: "blowout", icon: "💨", name: "Blowout", meta: "30 min", price: 40 },
  { id: "treatment", icon: "🌿", name: "Deep Conditioning Treatment", meta: "40 min", price: 55 },
  { id: "bridal", icon: "💍", name: "Bridal Trial", meta: "90 min", price: 180 },
];

export const stylists = [
  { id: "any", name: "Any available", role: "First open slot", init: "★" },
  { id: "maya", name: "Maya Chen", role: "Color specialist", init: "MC" },
  { id: "leila", name: "Leila Haddad", role: "Cuts & styling", init: "LH" },
  { id: "dara", name: "Dara Osei", role: "Bridal & events", init: "DO" },
  { id: "finn", name: "Finn Byrne", role: "Texture & curls", init: "FB" },
];

export const today = new Date(2026, 7, 18);

export function slotsForDate(dateStr) {
  const base = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:30 PM","4:00 PM","4:30 PM"];
  let seed = 0;
  for (const ch of dateStr) seed += ch.charCodeAt(0);
  return base.map((t, i) => ({ time: t, available: (seed + i) % 4 !== 0 }));
}

export function formatDateLong(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function pad(n) { return n.toString().padStart(2, "0"); }

export function buildIcs({ service, stylist, date, time, bookingRef }) {
  const d = new Date(date + "T00:00:00");
  const match = time.match(/(\d+):(\d+)\s?(AM|PM)/);
  let hh = parseInt(match[1]), mm = parseInt(match[2]);
  if (match[3] === "PM" && hh !== 12) hh += 12;
  if (match[3] === "AM" && hh === 12) hh = 0;
  d.setHours(hh, mm, 0, 0);
  const end = new Date(d.getTime() + 45 * 60000);
  const fmt = (dt) => dt.getFullYear() + pad(dt.getMonth() + 1) + pad(dt.getDate()) + "T" + pad(dt.getHours()) + pad(dt.getMinutes()) + "00";
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Fernwood Studio//Booking//EN", "BEGIN:VEVENT",
    "UID:" + bookingRef + "@fernwoodstudio.example",
    "DTSTAMP:" + fmt(d),
    "DTSTART:" + fmt(d),
    "DTEND:" + fmt(end),
    "SUMMARY:" + service.name + " at Fernwood Studio",
    "DESCRIPTION:Appointment with " + stylist.name + ". Confirmation " + bookingRef,
    "LOCATION:Fernwood Studio",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
