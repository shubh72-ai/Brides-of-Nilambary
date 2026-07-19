const previewBookings = [
  {
    bride: "Aarohi S.",
    date: "2026-12-12",
    payment: "pending",
    service: "Maharashtrian Bridal Look",
    status: "pending",
    time: "8:30 AM",
  },
  {
    bride: "Meera K.",
    date: "2026-12-18",
    payment: "paid",
    service: "Airbrush Bridal Makeup",
    status: "confirmed",
    time: "6:00 AM",
  },
  {
    bride: "Ishani R.",
    date: "2027-01-04",
    payment: "pending",
    service: "Saree Draping",
    status: "pending",
    time: "11:00 AM",
  },
];

export function BookingTable() {
  return (
    <div className="admin-table glass-panel">
      <div className="admin-table-head">
        <span>Upcoming appointments</span>
        <strong>{previewBookings.length} preview records</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th>Bride</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {previewBookings.map((booking) => (
            <tr key={`${booking.bride}-${booking.date}`}>
              <td>{booking.bride}</td>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.payment}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
