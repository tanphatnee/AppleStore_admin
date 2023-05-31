import React, { useEffect, useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    fetch('http://localhost:8000/user')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  const handleBlockUser = (userId) => {
    // Xử lý block người dùng với userId
    // Cập nhật danh sách người dùng bằng cách đánh dấu người dùng có userId là blocked
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, blocked: true };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  if (users === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <table border={1} width={"100%"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.blocked ? 'Đã ban' : 'Không bị ban'}</td>
              <td>
                {!user.blocked ? (
                  <button onClick={() => handleBlockUser(user.id)}>Ban</button>
                ) : (
                  <button disabled>Đã ban</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
