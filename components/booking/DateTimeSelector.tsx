"use client";

import { useRef } from "react";
import { timeSlots } from "@/lib/constants";

export function DateTimeSelector({
  date,
  onDateChange,
  onSlotChange,
  slot,
}: {
  date: string;
  onDateChange: (value: string) => void;
  onSlotChange: (value: string) => void;
  slot: string;
}) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  function openDatePicker() {
    const input = dateInputRef.current;
    if (!input) return;

    input.focus();
    if (typeof input.showPicker === "function") {
      input.showPicker();
    }
  }

  return (
    <div className="date-time-selector">
      <div className="date-picker-shell">
        <div className="date-picker-field">
          <label htmlFor="wedding-date">Wedding date</label>
          <div className="date-input-control">
            <input
              id="wedding-date"
              min={new Date().toISOString().slice(0, 10)}
              name="eventDate"
              onChange={(event) => onDateChange(event.target.value)}
              ref={dateInputRef}
              type="date"
              value={date}
            />
            <button
              aria-controls="wedding-date"
              aria-label="Open wedding date calendar"
              className="calendar-trigger"
              onClick={openDatePicker}
              type="button"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M7 3v3m10-3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
              </svg>
            </button>
          </div>
        </div>
        <p>
          <span>Selected ritual time</span>
          <strong>{slot}</strong>
        </p>
      </div>
      <div className="booking-time-slots">
        <span>Preparation time</span>
        <div className="slot-grid" role="radiogroup" aria-label="Select appointment time">
          {timeSlots.map((time) => (
            <button
              aria-checked={slot === time}
              className={slot === time ? "selected" : ""}
              key={time}
              onClick={() => onSlotChange(time)}
              role="radio"
              type="button"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
