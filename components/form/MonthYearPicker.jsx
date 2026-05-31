import React, { useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

function parseValue(value) {
  if (!value || value === "present") return { month: null, year: null, isPresent: value === "present" };
  const d = new Date(value);
  if (isNaN(d.getTime())) return { month: null, year: null, isPresent: false };
  return { month: d.getMonth(), year: d.getFullYear(), isPresent: false };
}

function toDateString(month, year) {
  if (month === null || year === null) return "";
  const m = String(month + 1).padStart(2, "0");
  return `${year}-${m}-01`;
}

const MonthYearPicker = ({ value, onChange, name, label, showPresent = false }) => {
  const parsed = parseValue(value);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(parsed.month);
  const [year, setYear] = useState(parsed.year ?? currentYear);
  const [isPresent, setIsPresent] = useState(parsed.isPresent);
  const ref = useRef(null);

  useEffect(() => {
    const p = parseValue(value);
    setMonth(p.month);
    setYear(p.year ?? currentYear);
    setIsPresent(p.isPresent);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const emitChange = (val) => {
    onChange({ target: { name, value: val } });
  };

  const stepYear = (dir) => {
    const newYear = year + dir;
    if (newYear > currentYear) return;
    setYear(newYear);
    if (month !== null) {
      const clampedMonth = newYear === currentYear && month > currentMonth ? currentMonth : month;
      if (clampedMonth !== month) setMonth(clampedMonth);
      emitChange(toDateString(clampedMonth, newYear));
    }
  };

  const selectMonth = (m) => {
    if (year === currentYear && m > currentMonth) return;
    setMonth(m);
    setIsPresent(false);
    emitChange(toDateString(m, year));
    setOpen(false);
  };

  const selectPresent = () => {
    setIsPresent(true);
    setMonth(null);
    emitChange("present");
    setOpen(false);
  };

  const isMonthDisabled = (m) => year === currentYear && m > currentMonth;

  const displayText = isPresent
    ? "Present"
    : month !== null
    ? `${MONTHS[month]} ${year}`
    : "";

  return (
    <div ref={ref} className="relative">
      {label && <label className="field-label">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="other-input w-full text-left flex items-center justify-between cursor-pointer"
        style={{ marginBottom: 0 }}
      >
        <span className={displayText ? "text-black" : "text-gray-400"}>
          {displayText || "Select date"}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-30 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3" style={{ width: "220px" }}>
          {/* Present option */}
          {showPresent && (
            <button
              type="button"
              onClick={selectPresent}
              className={`w-full mb-2 py-1.5 text-xs rounded font-medium transition-colors ${
                isPresent
                  ? "text-white"
                  : "text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              style={isPresent ? { backgroundColor: "var(--cv-primary)" } : undefined}
            >
              Present
            </button>
          )}

          {/* Year row */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => stepYear(-1)}
              className="p-1 rounded hover:bg-gray-100 text-gray-500"
            >
              <FaChevronUp size={10} />
            </button>
            <span className="text-sm font-semibold">{year}</span>
            <button
              type="button"
              onClick={() => stepYear(1)}
              className={`p-1 rounded ${
                year >= currentYear
                  ? "text-gray-200 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-500"
              }`}
              disabled={year >= currentYear}
            >
              <FaChevronDown size={10} />
            </button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((m, i) => (
              <button
                key={m}
                type="button"
                onClick={() => selectMonth(i)}
                disabled={isMonthDisabled(i)}
                className={`py-1.5 text-xs rounded transition-colors ${
                  isMonthDisabled(i)
                    ? "text-gray-300 cursor-not-allowed"
                    : month === i && !isPresent
                    ? "text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                style={
                  month === i && !isPresent && !isMonthDisabled(i)
                    ? { backgroundColor: "var(--cv-primary)" }
                    : undefined
                }
              >
                {m}
              </button>
            ))}
          </div>

          {/* Clear */}
          <button
            type="button"
            onClick={() => {
              setMonth(null);
              setIsPresent(false);
              emitChange("");
              setOpen(false);
            }}
            className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 text-center"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default MonthYearPicker;
