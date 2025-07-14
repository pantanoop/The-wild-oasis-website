"use server";
import { revalidatePath } from "next/cache";
import { signIn, signOut, auth } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please Provide a valid national Id");

  const UpdateData = { nationality, countryFlag, nationalID };
  // console.log(UpdateData);

  const { data, error } = await supabase
    .from("guests")
    .update(UpdateData)
    .eq("id", session.user.guestId);

  if (error) {
    // console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function editBooking(formData) {
  const session = await auth();
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  const bookingId = Number(formData.get("bookingId"));
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: formData.get("status"),
    isPaid: true,
    hasBreakfast: false,
    paymentId: formData.get("paymentId"),
    orderId: formData.get("orderId"),
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail({ email, name, booking }) {
  const formattedStart = new Date(booking.startDate).toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const formattedEnd = new Date(booking.endDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    const result = await resend.emails.send({
      from: "The Wild Oasis <onboarding@resend.dev>",
      to: email,
      subject: "🌿 Your Booking at The Wild Oasis is Confirmed!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #6A994E;">Hi ${name},</h2>
          <p style="font-size: 16px;">We’re thrilled to confirm your stay at <strong>The Wild Oasis</strong>! 🌿✨</p>
          
          <table style="width: 100%; margin-top: 20px; font-size: 16px;">
            <tr><td style="padding: 8px;"><strong>🛏 Cabin:</strong></td><td>${booking.cabinName}</td></tr>
            <tr><td style="padding: 8px;"><strong>📅 Check-in:</strong></td><td>${formattedStart}</td></tr>
            <tr><td style="padding: 8px;"><strong>📅 Check-out:</strong></td><td>${formattedEnd}</td></tr>
            <tr><td style="padding: 8px;"><strong>💳 Total Paid:</strong></td><td>₹${booking.totalPrice}</td></tr>
            <tr><td style="padding: 8px;"><strong>📘 Booking ID:</strong></td><td><code>${booking.orderId}</code></td></tr>
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #f0fdf4; border-left: 4px solid #6A994E;">
            <p style="margin: 0;">Your cozy cabin awaits along the peaceful banks of the Ganges. 🌊</p>
            <p style="margin: 0;">We look forward to hosting you soon.</p>
          </div>

          <p style="margin-top: 30px;">With warm regards,<br/>The Wild Oasis Team</p>
          <p style="font-size: 12px; color: #999;">This is an automated confirmation. Need help? Reply to this email.</p>
        </div>
      `,
    });

    console.log("📧 Resend email sent result:", result);
    return result;
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw err;
  }
}

export async function editBookingWithDates(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to edit this booking");

  // Extract and sanitize form data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };

  // Update booking
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  // Revalidate pages and redirect
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
