
import { Clock, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TodaySchedule = ({ schedule = [] }) => {
  const navigate = useNavigate();

  const todaySchedule = schedule.length
    ? schedule
    : [
        {
          id: 1,
          subject: "Data Structures",
          code: "CS301",
          time: "09:00 AM - 10:00 AM",
          room: "Room 204",
          instructor: "Dr. Sharma",
          status: "completed",
          color: "blue",
        },
        {
          id: 2,
          subject: "Database Management",
          code: "CS302",
          time: "10:15 AM - 11:15 AM",
          room: "Lab 102",
          instructor: "Prof. Singh",
          status: "ongoing",
          color: "purple",
        },
        {
          id: 3,
          subject: "Computer Networks",
          code: "CS303",
          time: "11:30 AM - 12:30 PM",
          room: "Room 301",
          instructor: "Dr. Verma",
          status: "upcoming",
          color: "green",
        },
        {
          id: 4,
          subject: "Operating Systems",
          code: "CS304",
          time: "02:00 PM - 03:00 PM",
          room: "Room 205",
          instructor: "Prof. Kaur",
          status: "upcoming",
          color: "orange",
        },
      ];

  return (
    <section className="dashboard-panel today-schedule">
      <div className="panel-header">
        <div>
          <h2>Today's Schedule</h2>
          <p>Your classes for today</p>
        </div>

        <button
          className="panel-action"
          onClick={() => navigate("/timetable")}
          aria-label="View full timetable"
        >
          <CalendarDays size={18} />
          <span>View All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="schedule-list">
        {todaySchedule.length > 0 ? (
          todaySchedule.map((item) => (
            <article
              className={`schedule-item schedule-${item.color || "blue"}`}
              key={item.id}
            >
              <div className="schedule-time">
                <Clock size={15} />
                <span>{item.time}</span>
              </div>

              <div className="schedule-item-main">
                <div className="schedule-subject-row">
                  <h3>{item.subject}</h3>

                  <span
                    className={`schedule-status status-${item.status}`}
                  >
                    {item.status === "completed"
                      ? "Completed"
                      : item.status === "ongoing"
                        ? "In Progress"
                        : "Upcoming"}
                  </span>
                </div>

                <p className="schedule-code">{item.code}</p>

                <div className="schedule-details">
                  <span>
                    <MapPin size={14} />
                    {item.room}
                  </span>

                  <span>{item.instructor}</span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="schedule-empty">
            <CalendarDays size={30} />
            <p>No classes scheduled for today.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TodaySchedule;

