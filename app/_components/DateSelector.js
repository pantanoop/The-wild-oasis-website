"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin = null, bookedDates = [] }) {
  const { range, setRange, resetRange } = useReservation();
  const isEditMode = cabin === null;

  const displayRange = isEditMode
    ? range
    : isAlreadyBooked(range, bookedDates)
      ? {}
      : range;

  // Only calculate price if cabin is provided
  const { regularPrice = 0, discount = 0 } = cabin || {};
  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = (regularPrice - discount) * numNights;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center text-accent-600"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      {/* Show pricing only in non-edit mode */}
      {!isEditMode && (
        <div className="flex items-center justify-between px-8 bg-accent-600 text-primary-800 h-[72px]">
          <div className="flex items-baseline gap-6">
            <p className="flex gap-2 items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-2xl">₹{regularPrice - discount}</span>
                  <span className="line-through font-semibold text-primary-700">
                    ₹{regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl"> ₹{regularPrice}</span>
              )}
              <span className="">/night</span>
            </p>

            {numNights ? (
              <>
                <p className="bg-accent-600 px-3 py-2 text-2xl">
                  <span>&times;</span> <span>{numNights}</span>
                </p>
                <p>
                  <span className="text-lg font-bold uppercase">Total</span>{" "}
                  <span className="text-2xl font-semibold">₹{cabinPrice}</span>
                </p>
              </>
            ) : null}
          </div>

          {(range?.from || range?.to) && (
            <button
              className="border border-primary-800 py-2 px-4 text-sm font-semibold"
              onClick={resetRange}
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DateSelector;
