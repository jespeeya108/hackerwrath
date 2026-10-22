
import { BookOpen, GraduationCap } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";

const courses = [
  { id: 1, code: "CS301", name: "Data Structures", credits: 4, instructor: "Dr. Sharma" },
  { id: 2, code: "CS302", name: "Database Management", credits: 4, instructor: "Prof. Singh" },
  { id: 3, code: "CS303", name: "Computer Networks", credits: 3, instructor: "Dr. Verma" },
  { id: 4, code: "CS304", name: "Operating Systems", credits: 4, instructor: "Prof. Kaur" },
  { id: 5, code: "CS305", name: "Software Engineering", credits: 3, instructor: "Dr. Gupta" },
  { id: 6, code: "CS306", name: "Web Development", credits: 3, instructor: "Prof. Gill" },
];

const Academics = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="Academics"
        description="View your enrolled courses and academic information."
        breadcrumbs={[{ label: "Academics" }]}
      />

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon stat-icon-blue"><BookOpen size={22} /></div>
          <div className="stat-card-content">
            <p className="stat-card-title">Enrolled Courses</p>
            <h3 className="stat-card-value">{courses.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stat-icon-purple"><GraduationCap size={22} /></div>
          <div className="stat-card-content">
            <p className="stat-card-title">Total Course Credits</p>
            <h3 className="stat-card-value">
              {courses.reduce((total, course) => total + course.credits, 0)}
            </h3>
          </div>
        </div>
      </div>

      <section className="dashboard-panel">
        <div className="panel-header">
          <div>
            <h2>My Courses</h2>
            <p>Current semester courses</p>
          </div>
        </div>

        {courses.length ? (
          <div className="course-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.id}>
                <div className="course-card-icon"><BookOpen size={24} /></div>
                <span className="course-code">{course.code}</span>
                <h3>{course.name}</h3>
                <p>{course.instructor}</p>
                <span className="course-credits">{course.credits} credits</span>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No courses found"
            description="Your enrolled courses will appear here."
            icon={BookOpen}
          />
        )}
      </section>
    </div>
  );
};

export default Academics;
