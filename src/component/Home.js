

// src/component/Home.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logout from '../Logout';
import UserList from './UserList';
import UserTypeList from './UserTypeList';
import Leave from './Leave';
import AddLeave from './InsertLeave/AddLeave'



function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="userlist">User List</Link>
          </li>
          <li>
            <Link to="usertypelist">User Type List</Link>
          </li>
          <li>
            <Link to="leave">Leave List</Link>
          </li>
          <li>
            <Link to="Applyleave">Apply Leave</Link>
          </li>

          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Home;
export { UserList, UserTypeList, Leave,AddLeave };






