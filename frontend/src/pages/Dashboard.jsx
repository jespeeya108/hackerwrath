
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import TodaySchedule from "../components/dashboard/TodaySchedule";
import UpcomingExams from "../components/dashboard/UpcomingExams";
import Announcements from "../components/dashboard/Announcements";

const Dashboard = () => {
  const stats = [
    {
      title: "Attendance",
      value: "92%",
      subtitle: "Overall attendance",
      icon: CalendarDays,
      color: "blue",
      trend: 4.5,
      trendLabel: "4.5%",
    },
    {
      title: "Current CGPA",
      value: "8.6",
      subtitle: "Academic performance",
      icon: GraduationCap,
      color: "purple",
    },
    {
      title: "Enrolled Courses",
      value: "6",
      subtitle: "Current semester",
      icon: BookOpen,
      color: "green",
    },
    {
      title: "Credits Earned",
      value: "84",
      subtitle: "Total credits completed",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your academic overview."
      />

      <section className="dashboard-welcome">
        <div>
          <p className="welcome-label">YOUR CAMPUS, YOUR PROGRESS</p>
          <h2>Welcome back, Student!</h2>
          <p>
            Keep track of your classes, academic progress, and
            upcoming activities all in one place.
          </p>
        </div>

        <div className="welcome-decoration">
          <GraduationCap size={76} strokeWidth={1.2} />
        </div>
      </section>

      <section className="dashboard-stats" aria-label="Academic statistics">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-grid-main">
          <TodaySchedule />
          <UpcomingExams />
        </div>

        <div className="dashboard-grid-side">
          <Announcements />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
