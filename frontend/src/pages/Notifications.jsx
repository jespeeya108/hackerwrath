
import { useState } from "react";
import { Bell, CalendarDays, CheckCheck, Megaphone } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

const initialNotifications = [
  { id: 1, title: "Examination Schedule Published", message: "Check the examinations page for your upcoming examination schedule.", date: "2026-10-20", type: "important", read: false },
  { id: 2, title: "Library Hours Updated", message: "The central library has extended its operating hours.", date: "2026-10-18", type: "announcement", read: false },
  { id: 3, title: "Fee Payment Reminder", message: "Please review your outstanding fee balance and due dates.", date: "2026-10-15", type: "reminder", read: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const visibleNotifications = notifications.filter(
    (item) => filter === "all" || (filter === "unread" && !item.read)
  );

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({ ...item, read: true }))
    );
  };

  const markRead = (id) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Notifications"
        description="Stay updated with announcements and reminders."
        breadcrumbs={[{ label: "Notifications" }]}
        actions={
          <button className="btn btn-secondary" onClick={markAllRead}>
            <CheckCheck size={17} /> Mark all read
          </button>
        }
      />

      <section className="dashboard-panel">
        <div className="day-selector">
          <button
            className={filter === "all" ? "day-tab active" : "day-tab"}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "unread" ? "day-tab active" : "day-tab"}
            onClick={() => setFilter("unread")}
          >
            Unread ({notifications.filter((item) => !item.read).length})
          </button>
        </div>

        {visibleNotifications.length ? (
          <div className="notification-list">
            {visibleNotifications.map((item) => (
              <article
                className={`notification-item ${item.read ? "read" : "unread"}`}
                key={item.id}
              >
                <div className="notification-icon">
                  {item.type === "announcement" ? (
                    <Megaphone size={21} />
                  ) : (
                    <Bell size={21} />
                  )}
                </div>

                <div className="notification-content">
                  <h3>{item.title}</h3>
                  <p>{item.message}</p>
                  <span><CalendarDays size={14} /> {item.date}</span>
                </div>

                {!item.read && (
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => markRead(item.id)}
                  >
                    Mark read
                  </button>
                )}
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="You're all caught up"
            description="There are no notifications to display."
            icon={Bell}
          />
        )}
      </section>
    </div>
  );
};

export default Notifications;
