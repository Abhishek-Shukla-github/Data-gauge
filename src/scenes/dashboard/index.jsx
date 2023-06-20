import { useEffect, useState, useRef, useCallback } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { Bars, ThreeDots } from "react-loader-spinner";
import { CommonAPICaller } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { useReactToPrint } from 'react-to-print';
import "react-toastify/dist/ReactToastify.css";
import "../../mirage/mirage";

const Dashboard = () => {
  // <-------------------------------------------------------------CONSTANTS------------------------------------------------------------------------->
  const componentRef = useRef();
  const graphRef = useRef();
  const observer = useRef();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const urlsToBeLoaded = ["/api/emailsCount", "/api/salesCount"];
  const StateKeywords = ["emailsCount", "salesCount"];
  const transactionLoaderStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "75%",
  }
  
  // <-------------------------------------------------------------STATES------------------------------------------------------------------------->
  const [isLazyAPILoading, setIsLazyAPILoading] = useState(true);
  const [mockTransactions , setMockTransactions] = useState([]);
  const [loadingStates, setLoadingStates] = useState({
    emailsCount: false,
    salesCount: false,
    newClientsCount: false,
  });
  const [dataState, setDataState] = useState({});
  const [offSet, setOffSet] = useState(0);
  const lastElementRef = useCallback(node => {
    if (isLazyAPILoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting ) {
        setOffSet(prevoffSet => prevoffSet + 10)
      }
    })
    if (node) observer.current.observe(node)
  }, [isLazyAPILoading])

  // <-------------------------------------------------------------useEFFECTS------------------------------------------------------------------------->
  useEffect(() => {
      CommonAPICaller(
        urlsToBeLoaded,
        StateKeywords,
        loadingStates,
        setLoadingStates,
        dataState,
        setDataState,
        {
          type : "success",
          message: <p> <strong>Emails Sent</strong> and  <strong>Sales Obtained</strong> are loaded</p>,
        },
        null,
        toastNotifications,
      );
  }, []);

  useEffect(() => {
      callLazyAPI();
  }, [offSet]);

  useEffect(() => {
    if (dataState?.salesCount)
      CommonAPICaller(
        ["/api/newClientsCount"],
        ["newClientsCount"],
        loadingStates,
        setLoadingStates,
        dataState,
        setDataState,
        {
          type : "success",
          message: <p><strong>New Clients</strong> are now loaded</p>,
        },
        {
          type : "processing",
          message: <p>Now fetching <strong>New Clients</strong>...</p>,
        },
        toastNotifications
      );
  }, [dataState.salesCount]);


  // <-------------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------------------->
  const renderLoader = () => {
    return (
      <Bars
        height="80"
        width="80"
        color="#4cceac"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  };

  const renderDotLoader = (height = "30", width = "60", radius = "9") => {
    return (
      <ThreeDots
        height= {height}
        width={width}
        radius={radius}
        color="#4cceac"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    );
  };

  const toastNotifications = {
    processing : (message) => toast.info(message ? message : "Success", {
      position: 'top-right',
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      progressStyle: { background: colors.blueAccent[800] },
      //  : {background: colors.greenAccent[800]},
      theme: 'colored',
      style: { background: colors.blueAccent[600] },
    }),
    success : (message) => toast.success(message ? message : "Success", {
      position: 'top-right',
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      progressStyle: { background: colors.greenAccent[800] },
      //  : {background: colors.greenAccent[800]},
      theme: 'colored',
      style: { background: colors.greenAccent[600] },
    })
  }

  const callLazyAPI = () => {
    setIsLazyAPILoading(true)
    fetch(`https://api.escuelajs.co/api/v1/products?offset=${offSet}&limit=10`)
    .then((response) => response.json())
    .then((json) =>{
      setIsLazyAPILoading(false)
      setMockTransactions(prevState => [...prevState,...json])
    });
  }

  const renderMockTransactions = () => {
   return mockTransactions.length ? mockTransactions.map((transaction, i) => (
      mockTransactions.length === i+4 ?     
      <Box
      ref={lastElementRef}
      key={`${transaction.id}-${i}`}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`4px solid ${colors.primary[500]}`}
      p="15px"
    >
      <Box>
        <Typography
          color={colors.greenAccent[500]}
          variant="h5"
          fontWeight="600"
        >
          #-{transaction.id}
        </Typography>
        <Typography color={colors.grey[100]}>
          {transaction.title}
        </Typography>
      </Box>
      <Box color={colors.grey[100]}>{transaction.updatedAt}</Box>
      <Box
        backgroundColor={colors.greenAccent[500]}
        p="5px 10px"
        borderRadius="4px"
      >
        ${transaction.price}
      </Box>
    </Box>
      : <Box
        key={`${transaction.id}-${i}`}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        p="15px"
      >
        <Box>
          <Typography
            color={colors.greenAccent[500]}
            variant="h5"
            fontWeight="600"
          >
            #-{transaction.id}
          </Typography>
          <Typography color={colors.grey[100]}>
            {transaction.title}
          </Typography>
        </Box>
        <Box color={colors.grey[100]}>{transaction.updatedAt}</Box>
        <Box
          backgroundColor={colors.greenAccent[500]}
          p="5px 10px"
          borderRadius="4px"
        >
          ${transaction.price}
        </Box>
      </Box>
    )): <div style={transactionLoaderStyles}>{renderDotLoader("60", "90","9")}</div>
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGraphPrint = useReactToPrint({
    content: () => graphRef.current,
  });


  return (
    <Box m="20px" ref={componentRef}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button  onClick={handlePrint}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!loadingStates.emailsCount && dataState?.emailsCount?.count ? (
            <StatBox
              title={dataState?.emailsCount?.count?.toLocaleString()}
              subtitle="Emails Sent"
              progress={dataState?.emailsCount?.progress}
              increase={dataState?.emailsCount?.delta}
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          ) : (
            renderLoader()
          )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!loadingStates.salesCount && dataState?.salesCount?.count ? (
            <StatBox
              title={dataState?.salesCount?.count?.toLocaleString()}
              subtitle="Sales Obtained"
              progress={dataState?.salesCount?.progress}
              increase={dataState?.salesCount?.delta}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          ) : (
            renderLoader()
          )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {
            <StatBox
              title={
                !loadingStates.emailsCount &&
                !loadingStates.salesCount &&
                !loadingStates.newClientsCount
                  ? dataState?.newClientsCount?.count?.toLocaleString()
                  : loadingStates.newClientsCount
                  ? renderDotLoader()
                  : null
              }
              subtitle="New Clients"
              progress={dataState?.newClientsCount?.progress}
              increase={dataState?.newClientsCount?.delta}
              showProgress={dataState?.newClientsCount?.count ? true : false}
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          }
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          ref={graphRef}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box >
              <IconButton onClick={handleGraphPrint}>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0" >
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {renderMockTransactions()}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
