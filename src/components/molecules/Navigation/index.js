import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCardIcon from "@mui/icons-material/AddCard";
import PasswordIcon from "@mui/icons-material/Password";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import {deleteCookie } from "../../../utils/utils";

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const ListItemLink = React.memo((props) => {
  const { icon, primary, to, open, handleDrawerClose } = props;

  return (
    <ListItem
      button
      component={Link}
      to={to}
      disablePadding
      sx={{ display: "block" }}
    >
      <Tooltip
        title={primary}
        placement="right"
        componentsProps={{
          tooltip: {
            sx: {
              color: "theme.palette.mode.white",
              backgroundColor: "#003057",
              padding: 1,
              fontSize: "1em",
            },
          },
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={(e) => {
            if (open) {
              handleDrawerClose();
            }
          }}
        >
          {icon ? (
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
          ) : null}
          <ListItemText fontSize="large" primary={primary} />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
});

const ListItemButtonComponent = React.memo((props) => {
  const { icon, primary, open, handleDrawerClose, onItemClick } = props;

  return (
    <ListItem
      button
      disablePadding
      sx={{ display: "block" }}
      onClick={onItemClick}
    >
      <Tooltip
        title={primary}
        placement="right"
        componentsProps={{
          tooltip: {
            sx: {
              color: "theme.palette.mode.white",
              backgroundColor: "#003057",
              padding: 1,
              fontSize: "1em",
            },
          },
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          onClick={(e) => {
            if (open) {
              handleDrawerClose();
            }
          }}
        >
          {icon ? (
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2,
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
          ) : null}
          <ListItemText fontSize="large" primary={primary} />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
});

const Navigation = React.memo(({ open, handleDrawerClose }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isUserEnabled = !!(auth?.isLoggedIn && auth?.role === "admin");
  const handleLogout = (e) => {
    e.preventDefault();
    deleteCookie(process.env.REACT_APP_TOKEN_KEY, "", 0);
    navigate("/login");
    navigate(0);
  };
  return (
    <List sx={{ mt: "20px" }}>
      <ListItemLink
        to="/dashboard"
        primary="Dashboard"
        icon={<HomeIcon fontSize="medium" />}
      />
      {isUserEnabled && (
        <ListItemLink
          to="/users"
          primary="Users"
          icon={<PeopleIcon fontSize="medium" />}
        />
      )}
      <ListItemLink
        to="/cards"
        primary="Cards"
        icon={<AddCardIcon fontSize="medium" />}
      />
      <ListItemLink
        to="/certificate"
        primary="Certificate"
        icon={<ReceiptIcon fontSize="medium" />}
      />
      <ListItemLink
        to="/change-password"
        primary="Change Password"
        icon={<PasswordIcon fontSize="medium" />}
      />
      <ListItemLink
        to="/profile"
        primary="Profile"
        icon={<ManageAccountsIcon fontSize="medium" />}
      />
      <ListItemButtonComponent
        primary="Logout"
        icon={<LogoutIcon fontSize="medium" />}
        onItemClick={handleLogout}
      />
    </List>
  );
});

export default Navigation;
