"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/action";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { loadScript } from "../_lib/utils";
import { sendConfirmationEmail } from "../_lib/action";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const [isLoading, setIsLoading] = useState(false);

  const { maxCapacity, name: cabinName, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    cabinPrice,
    numNights,
    cabinId: id,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const numGuests = formData.get("numGuests");
    const observations = formData.get("observations");

    if (!startDate || !endDate || !numGuests) return;

    setIsLoading(true);

    const razorpayLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!razorpayLoaded) {
      alert("Razorpay failed to load");
      setIsLoading(false);
      return;
    }

    // Create order on backend
    const res = await fetch("/api/payment/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: cabinPrice }),
    });

    const orderData = await res.json();

    // ✅ Add Razorpay details into formData
    formData.set("paymentId", orderData.razorpay_payment_id || "fake-id");
    formData.set("orderId", orderData.id);
    formData.set("status", "confirmed");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      name: "The Wild Oasis",
      description: "Cabin Reservation",
      order_id: orderData.id,
      handler: async function (response) {
        // ✅ On successful payment, call createBooking with 2 arguments
        formData.set("paymentId", response.razorpay_payment_id);
        formData.set("orderId", response.razorpay_order_id);

        await createBooking(bookingData, formData);

        const emailResult = await sendConfirmationEmail({
          email: user.email,
          name: user.name,
          booking: {
            cabinName: cabinName,
            startDate,
            endDate,
            totalPrice: bookingData.cabinPrice,
            orderId: response.razorpay_order_id,
          },
        });

        console.log("📧 Email sent:", emailResult);

        resetRange();
        setIsLoading(false);
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: { color: "#F5C518" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">Anything we should know?</label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Pets, allergies, etc."
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving..." disabled={isLoading}>
              Pay & Reserve Now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
