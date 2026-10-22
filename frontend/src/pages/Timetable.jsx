
import { useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

const timetableData = [
  { id: 1, day: "Monday", time: "09:00 - 10:00", subject: "Data Structures", code: "CS301", room: "Room 204", color: "blue" },
  { id: 2, day: "Monday", time: "10:15 - 11:15", subject: "Database Management", code: "CS302", room: "Lab 102", color: "purple" },
  { id: 3, day: "Tuesday", time: "09:00 - 10:00", subject: "Computer Networks", code: "CS303", room: "Room 301", color: "green" },
  { id: 4, day: "Tuesday", time: "11:30 - 12:30", subject: "Operating Systems", code: "CS304", room: "Room 205", color: "orange" },
  { id: 5, day: "Wednesday", time: "10:15 - 11:15", subject: "Database Management", code: "CS302", room: "Lab 102", color: "purple" },
  { id: 6, day: "Thursday", time: "09:00 - 10:00", subject: "Data Structures", code: "CS301", room: "Room 204", color: "blue" },
  { id: 7, day: "Friday", time: "11:30 - 12:30", subject: "Computer Networks", code: "CS303", room: "Room 301", color: "green" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const classes = timetableData.filter(
    (item) => item.day === selectedDay
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Timetable"
        description="View your weekly class schedule."
        breadcrumbs={[{ label: "Timetable" }]}
      />

      <section className="dashboard-panel">
        <div className="panel-header">
          <div>
            <h2>Weekly Schedule</h2>
            <p><CalendarDays size={15} /> Semester class timetable</p>
          </div>
        </div>

        <div className="day-selector">
          {days.map((day) => (
            <button
              key={day}
              className={selectedDay === day ? "day-tab active" : "day-tab"}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {classes.length ? (
          <div className="schedule-list">
            {classes.map((item) => (
              <article
                className={`schedule-item schedule-${item.color}`}
                key={item.id}
              >
                <div className="schedule-time">
                  <Clock size={16} />
                  {item.time}
                </div>

                <div className="schedule-item-main">
                  <h3>{item.subject}</h3>
                  <p className="schedule-code">{item.code}</p>
                  <div className="schedule-details">
                    <span><MapPin size={14} /> {item.room}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No classes scheduled"
            description={`You have no classes scheduled for ${selectedDay}.`}
            icon={CalendarDays}
          />
        )}
      </section>
    </div>
  );
};

export default Timetable;
