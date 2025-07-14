import React from "react";
import { getBookings } from "../_lib/data-service";
import ReservationCard from "./ReservationCard";
import SmartLink from "./SmartLink";

export default async function AccountHome({ guestId }) {
  const allBookings = await getBookings(guestId);
  const today = new Date();

  // Split into upcoming and past
  const upcomingBookings = allBookings.filter(
    (booking) => new Date(booking.startDate) > today
  );
  const pastBookings = allBookings.filter(
    (booking) => new Date(booking.startDate) <= today
  );

  // Sort both (just in case)
  upcomingBookings.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  pastBookings.sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate) // most recent past first
  );

  // Pick the most relevant booking
  const currentBooking = upcomingBookings[0] || pastBookings[0];

  if (!currentBooking) {
    return (
      <div className="bg-primary-900 p-6 rounded-md shadow-lg text-primary-200">
        <h2 className="text-xl font-semibold mb-2 text-accent-500">
          You haven’t booked a stay yet!
        </h2>
        <p className="text-primary-300 mb-4">
          Discover our luxury cabins and start your adventure today.
        </p>
        <SmartLink
          href="/cabins"
          className="inline-block uppercase text-sm font-bold text-primary-900 bg-accent-500 px-5 py-3 rounded shadow hover:bg-accent-600 transition-all"
        >
          Explore Cabins
        </SmartLink>
      </div>
    );
  }

  return <ReservationCard booking={currentBooking} />;
}
