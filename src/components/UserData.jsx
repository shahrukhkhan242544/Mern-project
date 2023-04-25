import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const UserData = ({ users, handleDelete }) => {
  //   console.log(users);
  //   const { records } = users.data.users;

  // useEffect(() => {}, [users]);
  return (
    <>
      {users.map((curUser, i) => {
        const { _id, name, email, photo, role } = curUser;

        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              {" "}
              <Avatar
                src={`${import.meta.env.VITE_BASE_URL}/user/${photo}`}
                sx={{
                  height: 80,
                  mb: 2,
                  width: 80,
                }}
              />
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
              {" "}
              <Link to={`/user/${_id}`} variant="contained" size="small">
                <Button variant="contained" size="small">
                  Edit
                </Button>
              </Link>{" "}
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(_id)}
                size="small"
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default UserData;
