import { getBooking, getCabin } from "../../../../_lib/data-service";
import { getBookedDatesByCabinId } from "../../../../_lib/data-service";
import EditReservationForm from "../../../../_components/EditReservationForm";

export default async function Page({ params }) {
  const bookingId = params.bookingId;
  const { numGuests, observations, cabinId, startDate, endDate } =
    await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);
  const bookedDates = await getBookedDatesByCabinId(cabinId);

  return (
    <EditReservationForm
      bookingId={bookingId}
      numGuests={numGuests}
      observations={observations}
      maxCapacity={maxCapacity}
      startDate={startDate}
      endDate={endDate}
      bookedDates={bookedDates}
    />
  );
}
