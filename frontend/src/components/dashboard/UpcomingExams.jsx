
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpcomingExams = ({ exams = [] }) => {
  const navigate = useNavigate();

  const examList = exams.length
    ? exams
    : [
        {
          id: 1,
          subject: "Data Structures",
          code: "CS301",
          date: "2026-11-05",
          time: "09:00 AM",
          venue: "Examination Hall A",
          type: "Mid-Semester",
        },
        {
          id: 2,
          subject: "Database Management",
          code: "CS302",
          date: "2026-11-10",
          time: "02:00 PM",
          venue: "Examination Hall B",
          type: "Mid-Semester",
        },
        {
          id: 3,
          subject: "Computer Networks",
          code: "CS303",
          date: "2026-11-15",
          time: "09:00 AM",
          venue: "Examination Hall A",
          type: "Practical",
        },
      ];

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="dashboard-panel upcoming-exams">
      <div className="panel-header">
        <div>
          <h2>Upcoming Examinations</h2>
          <p>Stay prepared for your exams</p>
        </div>

        <button
          className="panel-action"
          onClick={() => navigate("/examinations")}
          aria-label="View all examinations"
        >
          <span>View All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="exam-list">
        {examList.length > 0 ? (
          examList.map((exam) => (
            <article className="exam-item" key={exam.id}>
              <div className="exam-icon">
                <BookOpen size={21} />
              </div>

              <div className="exam-content">
                <div className="exam-title-row">
                  <h3>{exam.subject}</h3>
                  <span className="exam-type">{exam.type}</span>
                </div>

                <p className="exam-code">{exam.code}</p>

                <div className="exam-details">
                  <span>
                    <CalendarDays size={14} />
                    {formatDate(exam.date)}
                  </span>

                  <span>
                    <Clock size={14} />
                    {exam.time}
                  </span>
                </div>

                {exam.venue && (
                  <div className="exam-venue">
                    <MapPin size={14} />
                    {exam.venue}
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="exam-empty">
            <CalendarDays size={30} />
            <p>No upcoming examinations.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingExams;
