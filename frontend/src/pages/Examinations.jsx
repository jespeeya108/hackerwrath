
import { CalendarDays, Clock, MapPin } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

const exams = [
  { id: 1, subject: "Data Structures", code: "CS301", date: "2026-11-05", time: "09:00 AM", venue: "Examination Hall A", type: "Mid-Semester" },
  { id: 2, subject: "Database Management", code: "CS302", date: "2026-11-10", time: "02:00 PM", venue: "Examination Hall B", type: "Mid-Semester" },
  { id: 3, subject: "Computer Networks", code: "CS303", date: "2026-11-15", time: "09:00 AM", venue: "Examination Hall A", type: "Practical" },
];

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const Examinations = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="Examinations"
        description="Review your examination schedule and venues."
        breadcrumbs={[{ label: "Examinations" }]}
      />

      <section className="dashboard-panel">
        <div className="panel-header">
          <div>
            <h2>Examination Schedule</h2>
            <p>Upcoming examinations</p>
          </div>
        </div>

        {exams.length ? (
          <div className="exam-list">
            {exams.map((exam) => (
              <article className="exam-item" key={exam.id}>
                <div className="exam-icon">
                  <CalendarDays size={22} />
                </div>

                <div className="exam-content">
                  <div className="exam-title-row">
                    <h3>{exam.subject}</h3>
                    <span className="exam-type">{exam.type}</span>
                  </div>

                  <p className="exam-code">{exam.code}</p>

                  <div className="exam-details">
                    <span><CalendarDays size={14} /> {formatDate(exam.date)}</span>
                    <span><Clock size={14} /> {exam.time}</span>
                  </div>

                  <div className="exam-venue">
                    <MapPin size={14} /> {exam.venue}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No examinations scheduled"
            description="Your examination schedule will appear here."
            icon={CalendarDays}
          />
        )}
      </section>
    </div>
  );
};

export default Examinations;
