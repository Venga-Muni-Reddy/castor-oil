import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div>

      <h1>Dashboard</h1>

      <Link to="/login">
        Login
      </Link>

      <br />

      <Link to="/signup">
        Signup
      </Link>

      <br />

      <Link to="/my-profile">
        My Profile
      </Link>

    </div>

  );
}

export default Dashboard;