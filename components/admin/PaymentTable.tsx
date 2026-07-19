const previewPayments = [
  { amount: "Rs. 10,000", bride: "Meera K.", id: "pay_preview_001", status: "paid" },
  { amount: "Rs. 10,000", bride: "Aarohi S.", id: "order_preview_002", status: "created" },
  { amount: "Rs. 10,000", bride: "Ishani R.", id: "order_preview_003", status: "created" },
];

export function PaymentTable() {
  return (
    <div className="admin-table glass-panel">
      <div className="admin-table-head">
        <span>Latest payments</span>
        <strong>Razorpay-ready</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th>Bride</th>
            <th>Reference</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {previewPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.bride}</td>
              <td>{payment.id}</td>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
