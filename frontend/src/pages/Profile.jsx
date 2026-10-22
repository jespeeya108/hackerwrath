
import { useState } from "react";
import { UserRound, Mail, Phone, GraduationCap, Save } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Student Name",
    rollNumber: "GNDU2026001",
    email: "student@example.com",
    phone: "",
    department: "Computer Science",
    semester: "3",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    setProfile((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="My Profile"
        description="View and update your student information."
        breadcrumbs={[{ label: "Profile" }]}
      />

      <section className="dashboard-panel profile-panel">
        <div className="profile-banner">
          <div className="profile-large-avatar"><UserRound size={38} /></div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.rollNumber}</p>
            <span><GraduationCap size={15} /> {profile.department}</span>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-field">
              Full Name
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field">
              Roll Number
              <input value={profile.rollNumber} readOnly />
            </label>

            <label className="form-field">
              Email Address
              <span className="form-input-icon">
                <Mail size={17} />
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </span>
            </label>

            <label className="form-field">
              Phone Number
              <span className="form-input-icon">
                <Phone size={17} />
                <input
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </span>
            </label>

            <label className="form-field">
              Department
              <input value={profile.department} readOnly />
            </label>

            <label className="form-field">
              Semester
              <input value={profile.semester} readOnly />
            </label>
          </div>

          {saved && (
            <p className="form-success" role="status">
              Changes are saved in this page's current state.
            </p>
          )}

          <Button type="submit" icon={Save}>
            Save Changes
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Profile;
