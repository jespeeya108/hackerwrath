
import { CreditCard, Receipt, CalendarDays } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

const feeRecords = [
  { id: 1, title: "Tuition Fee", amount: 35000, dueDate: "2026-11-15", status: "Pending" },
  { id: 2, title: "Library Fee", amount: 2000, dueDate: "2026-08-15", status: "Paid" },
  { id: 3, title: "Examination Fee", amount: 1500, dueDate: "2026-11-20", status: "Pending" },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const Fees = () => {
  const totalPaid = feeRecords
    .filter((fee) => fee.status === "Paid")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalPending = feeRecords
    .filter((fee) => fee.status === "Pending")
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="page-container">
      <PageHeader
        title="Fees & Payments"
        description="Review your fee records and payment status."
        breadcrumbs={[{ label: "Fees" }]}
      />

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon stat-icon-green"><Receipt size={22} /></div>
          <div className="stat-card-content">
            <p className="stat-card-title">Total Paid</p>
            <h3 className="stat-card-value">{formatCurrency(totalPaid)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-icon-orange"><CreditCard size={22} /></div>
          <div className="stat-card-content">
            <p className="stat-card-title">Outstanding Fees</p>
            <h3 className="stat-card-value">{formatCurrency(totalPending)}</h3>
          </div>
        </div>
      </div>

      <section className="dashboard-panel">
        <div className="panel-header">
          <div>
            <h2>Fee Records</h2>
            <p>Your fee payment history and outstanding dues</p>
          </div>
        </div>

        {feeRecords.length ? (
          <div className="fee-list">
            {feeRecords.map((fee) => (
              <article className="fee-item" key={fee.id}>
                <div className="fee-icon"><CreditCard size={21} /></div>
                <div className="fee-content">
                  <h3>{fee.title}</h3>
                  <p><CalendarDays size={14} /> Due date: {fee.dueDate}</p>
                </div>
                <div className="fee-amount">
                  <strong>{formatCurrency(fee.amount)}</strong>
                  <span className={`fee-status ${fee.status.toLowerCase()}`}>
                    {fee.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No fee records"
            description="Your fee records will appear here."
            icon={CreditCard}
          />
        )}
      </section>
    </div>
  );
};

export default Fees;
