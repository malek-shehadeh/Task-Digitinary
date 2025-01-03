import React from "react";

function UserList({ typingUsers }) {
  return (
    <div className="user-list">
      <h3>Users</h3>
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          {typingUsers.map((user) => `${user} is typing...`).join(", ")}
        </div>
      )}
    </div>
  );
}

export default UserList;
