import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { CirclesWithBar } from "react-loader-spinner";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  // <-------------------------------------------------------------STATES------------------------------------------------------------------------->
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // <-------------------------------------------------------------CONSTANTS------------------------------------------------------------------------->
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const SidebarData = [
    {
      title: "Dashboard",
      to: "/",
      icon: <HomeOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Manage Team",
      to: "/team",
      icon: <PeopleOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Contacts Information",
      to: "/contacts",
      icon: <ContactsOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Invoices Balances",
      to: "/invoices",
      icon: <ReceiptOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Profile Form",
      to: "/form",
      icon: <PersonOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Calendar",
      to: "/calendar",
      icon: <CalendarTodayOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "FAQ Page",
      to: "/faq",
      icon: <CalendarTodayOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Bar Chart",
      to: "/bar",
      icon: <BarChartOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Pie Chart",
      to: "/pie",
      icon: <PieChartOutlineOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Line Chart",
      to: "/line",
      icon: <TimelineOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
    {
      title: "Geography Chart",
      to: "/geography",
      icon: <MapOutlinedIcon />,
      selected: selected,
      setSelected: setSelected,
    },
  ];

  // <-------------------------------------------------------------useEFFECTS------------------------------------------------------------------------->
  useEffect(() => {
    loadRandomUserAPI();
  }, []);

  // <-------------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------------------->
  const circularProfileLoader = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CirclesWithBar
          height="100"
          width="100"
          color={colors.greenAccent[400]}
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    );
  };

  const loadRandomUserAPI = () => {
    setIsLoading(true);
    fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then((json) => {
        let UserDataObj = {
          name: `${json.results[0].name.title} ${json.results[0].name.first} ${json.results[0].name.last}`,
          picture: json.results[0].picture.large,
          profession: [
            "Coach",
            "Senior Admin",
            "Freelance Therapist",
            "Cashier",
            "Urban Planner",
            "Compliance Officer",
            "Designer",
            "Mason",
            "Mathematician",
            "Chemist",
          ][Math.floor(Math.random() * 10)],
        };
        setUserData(UserDataObj);
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  React Data Gauge
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && !isLoading && Object.keys(userData).length ? (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userData.picture}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userData.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userData.profession}
                </Typography>
              </Box>
            </Box>
          ) : (
            circularProfileLoader()
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {SidebarData.map((SidebarItem, i) => (
              // 1, 3, 6
              <div key={SidebarItem.to}>
                <Item
                  title={SidebarItem.title}
                  to={SidebarItem.to}
                  icon={SidebarItem.icon}
                  selected={selected}
                  setSelected={setSelected}
                />
                <div>
                  {i === 1 || i === 3 || i === 6 ? (
                    <Typography
                      variant="h6"
                      color={colors.grey[300]}
                      sx={{ m: "15px 0 5px 20px" }}
                    >
                      {i === 1 ? "Data" : i === 3 ? "Pages" : "Charts"}
                    </Typography>
                  ) : null}
                </div>
              </div>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
