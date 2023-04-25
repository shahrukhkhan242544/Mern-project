import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UserData from "./components/UserData";
import ReactPaginate from "react-paginate";

const API = `${import.meta.env.VITE_API_BASE_URL}users/`; //http://localhost:3001/api/v1/users/";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchUser = async (currentPage) => {
    try {
      const result = await fetch(`${API}?page=${currentPage}&limit=2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2U3MjIyNGUwNzBhMGI3MjY5YmI0OSIsImlhdCI6MTY4MTgxNDA1MCwiZXhwIjoxNjg5NTkwMDUwfQ.vw3B6H9IXoAeyOSFd50OIRAD4Kh0DZM5btvJCXpLMMQ",
          Accept: "application/json",
        },
      });

      const data = await result.json();

      if (data.result > 0) {
        // setUsers(data.data.users);
        setpageCount(Math.ceil(data.total / 2));
        setUsers(data.data.users);
        //return data.data.users;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}users/${id}`, {
      method: "DELETE",
      "Content-Type": "application/json",
      Accept: "application/json",
    }).then((result) => {
      if (result.status === 204) {
        alert("user deleted successfully");
      }
    });

    fetchUser(currentPage);
  };

  useEffect(() => {
    /*
    const getchUser = async () => {
      const result = await fetch(`${API}?page=1&limit=2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2U3MjIyNGUwNzBhMGI3MjY5YmI0OSIsImlhdCI6MTY4MTgxNDA1MCwiZXhwIjoxNjg5NTkwMDUwfQ.vw3B6H9IXoAeyOSFd50OIRAD4Kh0DZM5btvJCXpLMMQ",
          Accept: "application/json",
        },
      });

      const data = await result.json(); 
      if (data.result > 0) { 
        setpageCount(Math.ceil(data.total / 2));
        setUsers(data.data.users);
      }
    };
    */

    fetchUser(currentPage);
  }, [users]);

  const handlePageClick = async (data) => {
    // console.log("clicked ", data.selected);

    setCurrentPage(data.selected + 1);
    fetchUser(currentPage);
    ``;
    // const usersFromApi = await fetchUser(currentPage);
    // setUsers(usersFromApi);
  };

  return (
    <Container>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <UserData users={users} handleDelete={handleDelete} />
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </Container>
  );
};

export default Users;
