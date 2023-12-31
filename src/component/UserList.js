// src/component/UserList.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers,updateUser,deleteUser } from '../slices/User/userSlice';
function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    userName: '',
    mobileNo: '',
    city: '',
    email: '',
    password: '',
    userTypeId: 0,
    role: '',
  });

  useEffect(() => {
    // Dispatch the async thunk when the component mounts
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUserData({
      userName: user.userName,
      mobileNo: user.mobileNo,
      city: user.city,
      email: user.email,
      password: user.password,
      userTypeId: user.userTypeId,
      role: user.role,
    });
  };

  const handleSaveEdit = () => {
    dispatch(updateUser({ ...editedUserData, id: editingUserId }));
    setEditingUserId(null);
  };

  const handleDeleteClick = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      dispatch(deleteUser(userId));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Mobile Number</th>
            <th>City</th>
            <th>Email</th>
            <th>Password</th>
            <th>UserType Id</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{editingUserId === user.id ? <input type="text" value={editedUserData.userName} onChange={(e) => setEditedUserData({ ...editedUserData, userName: e.target.value })} /> : user.userName}</td>
              <td>{editingUserId === user.id ? <input type="text" value={editedUserData.mobileNo} onChange={(e) => setEditedUserData({ ...editedUserData, mobileNo: e.target.value })} /> : user.mobileNo}</td>
              <td>{editingUserId === user.id ? <input type="text" value={editedUserData.city} onChange={(e) => setEditedUserData({ ...editedUserData, city: e.target.value })} /> : user.city}</td>
              <td>{editingUserId === user.id ? <input type="text" value={editedUserData.email} onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} /> : user.email}</td>
              <td>{editingUserId === user.id ? <input type="text" value={editedUserData.password} onChange={(e) => setEditedUserData({ ...editedUserData, password: e.target.value })} /> : user.password}</td>
              <td>{editingUserId === user.id ? <input type="text" value={editedUserData.userTypeId} onChange={(e) => setEditedUserData({ ...editedUserData, userTypeId: e.target.value })} /> : user.userTypeId}</td>
              <td>{editingUserId === user.id ? <input type="text" value={editedUserData.role} onChange={(e) => setEditedUserData({ ...editedUserData, role: e.target.value })} /> : user.role}</td>
              <td>
                {editingUserId === user.id ? (
                  <button onClick={handleSaveEdit}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                )}
                <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
