import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgCloseR } from "react-icons/cg";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import LogoutIcon from "@mui/icons-material/Logout";

import { deepOrange } from "@mui/material/colors";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  // console.log("userinfo", state);

  // const [user, setUser] = useState([null]);

  // useEffect(() => {
  //   console.log("sadas");
  //   let userInfo = localStorage.getItem("user-info");
  //   if (userInfo) {
  //     userInfo = JSON.parse(userInfo);
  //   } else {
  //     userInfo = "";
  //   }
  //   setUser(userInfo);
  // }, []);

  // console.log("user", user);
  let Username = "";
  if (state) {
    const UsernameString = state.name;
    Username = UsernameString.charAt(0).toUpperCase();
  } else {
    let userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      const UsernameString = userInfo.name;
      Username = UsernameString.charAt(0).toUpperCase();
    } else {
      Username = "";
    }
    // if (true) {

    //   const UsernameString = user.name;
    //   Username = UsernameString.charAt(0).toUpperCase();
    // } else {
    //   Username = "";
    // }
  }

  const [openMenu, setOpenMenu] = useState(false);

  const Nav = styled.nav`
    .navbar-list {
      display: flex;
      gap: 4.8rem;

      li {
        list-style: none;

        a {
          font-size: 1.5rem;
        }

        .navbar-link {
          &:link,
          &:visited {
            display: inline-block;
            text-decoration: none;
            font-size: 1.8rem;
            text-transform: uppercase;
            color: ${({ theme }) => theme.colors.black};
            transition: color 0.3s linear;
          }

          &:hover,
          &:active {
            color: ${({ theme }) => theme.colors.helper};
          }
        }
      }
    }

    .mobile-navbar-btn {
      display: none;

      .close-outline {
        display: none;
      }
    }

    .mobile-navbar-btn[name="close-outline"] {
      display: none;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      /* hide the original nav menu  */
      .navbar-list {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        text-align: center;

        transform: translateX(100%);

        visibility: hidden;
        opacity: 0;

        li {
          .navbar-link {
            &:link,
            &:visited {
              font-size: 4.2rem;
            }

            &:hover,
            &:active {
              color: ${({ theme }) => theme.colors.helper};
            }
          }
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 3%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .active .navbar-list {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
      }
    }
  `;
  const navigateTo = useNavigate();
  const Logout = () => {
    localStorage.clear(); //for localStorage
    sessionStorage.clear(); //for sessionStorage
    // setUser([]);
    dispatch({ type: "USER", payload: false });

    navigateTo("/login");
  };

  return (
    <Nav>
      <div className={openMenu ? "menuIcon active" : "menuIcon"}>
        <ul className="navbar-list">
          <li>
            <NavLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="/service"
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navbar-link"
              onClick={() => setOpenMenu(false)}
              to="/contact"
            >
              Contact
            </NavLink>
          </li>

          {Username ? (
            <li>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{Username}</Avatar>
                <Button
                  startDecorator={<LogoutIcon />}
                  onClick={() => Logout()}
                >
                  Logout
                </Button>
              </Box>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        {/* //nav icon */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setOpenMenu(true)}
          />
          <CgCloseR
            name="close-outline"
            className="close-outline mobile-nav-icon"
            onClick={() => setOpenMenu(false)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
