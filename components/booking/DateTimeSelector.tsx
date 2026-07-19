"use client";

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
  return (
    <div className="date-time-selector">
      <div className="date-picker-shell">
        <label>
          <span>Wedding date</span>
          <input
            min={new Date().toISOString().slice(0, 10)}
            onChange={(event) => onDateChange(event.target.value)}
            type="date"
            value={date}
          />
        </label>
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
