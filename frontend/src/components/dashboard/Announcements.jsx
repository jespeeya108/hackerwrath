
import {
  Megaphone,
  CalendarDays,
  ArrowRight,
  Pin,
  Info,
  AlertTriangle,
  PartyPopper,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const announcementIcons = {
  info: Info,
  important: AlertTriangle,
  event: PartyPopper,
};

const Announcements = ({ announcements = [] }) => {
  const navigate = useNavigate();

  const announcementList = announcements.length
    ? announcements
    : [
        {
          id: 1,
          title: "Mid-Semester Examination Schedule",
          description:
            "The mid-semester examination schedule has been published. Check your examination dates and prepare accordingly.",
          date: "2026-10-20",
          category: "important",
          pinned: true,
        },
        {
          id: 2,
          title: "Library Hours Extended",
          description:
            "The central library will remain open until 9 PM during the examination preparation period.",
          date: "2026-10-18",
          category: "info",
          pinned: false,
        },
        {
          id: 3,
          title: "Annual Campus Fest",
          description:
            "Registrations are open for cultural events, technical competitions, and student activities.",
          date: "2026-10-16",
          category: "event",
          pinned: false,
        },
      ];

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="dashboard-panel announcements">
      <div className="panel-header">
        <div>
          <h2>Announcements</h2>
          <p>Latest campus updates</p>
        </div>

        <button
          className="panel-action"
          onClick={() => navigate("/notifications")}
          aria-label="View all announcements"
        >
          <span>View All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="announcement-list">
        {announcementList.length > 0 ? (
          announcementList.map((announcement) => {
            const Icon =
              announcementIcons[announcement.category] || Megaphone;

            return (
              <article
                className="announcement-item"
                key={announcement.id}
              >
                <div
                  className={`announcement-icon announcement-${announcement.category || "info"}`}
                >
                  <Icon size={20} />
                </div>

                <div className="announcement-content">
                  <div className="announcement-title-row">
                    <h3>{announcement.title}</h3>

                    {announcement.pinned && (
                      <Pin
                        size={15}
                        className="announcement-pin"
                        aria-label="Pinned announcement"
                      />
                    )}
                  </div>

                  <p>{announcement.description}</p>

                  <span className="announcement-date">
                    <CalendarDays size={14} />
                    {formatDate(announcement.date)}
                  </span>
                </div>
              </article>
            );
          })
        ) : (
          <div className="announcement-empty">
            <Megaphone size={30} />
            <p>No announcements available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;
