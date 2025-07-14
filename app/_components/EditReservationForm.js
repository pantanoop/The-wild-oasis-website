"use client";

import { useEffect, useState } from "react";
import { useReservation } from "@/app/_components/ReservationContext";
import DateSelector from "@/app/_components/DateSelector";
import SubmitButton from "@/app/_components/SubmitButton";
import { editBookingWithDates } from "../_lib/action";
import { differenceInDays } from "date-fns";

export default function EditReservationForm({
  bookingId,
  numGuests,
  observations,
  maxCapacity,
  startDate,
  endDate,
  bookedDates,
}) {
  const { range, setRange } = useReservation();

  const numOriginalNights = differenceInDays(
    new Date(endDate),
    new Date(startDate)
  );

  useEffect(() => {
    setRange({ from: new Date(startDate), to: new Date(endDate) });
  }, [startDate, endDate, setRange]);

  return (
    <>
      <p className="text-xl text-accent-500 mt-4 font-medium">
        {`Edit Your Reservation with booking id ${bookingId}`}
      </p>
      <form
        action={editBookingWithDates}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <DateSelector
          bookedDates={bookedDates}
          settings={{
            minBookingLength: 1,
            maxBookingLength: numOriginalNights,
          }}
          cabin={null}
        />

        <p className="text-sm text-accent-300 italic">
          You can&apos;t extend your stay beyond your original{" "}
          {numOriginalNights} night{numOriginalNights > 1 ? "s" : ""}. To extend
          your trip, please contact our support team.
        </p>
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option key={x} value={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
        <input type="hidden" name="bookingId" value={bookingId} />
        <input
          type="hidden"
          name="startDate"
          value={range?.from?.toISOString() || ""}
        />
        <input
          type="hidden"
          name="endDate"
          value={range?.to?.toISOString() || ""}
        />
      </form>
    </>
  );
}
