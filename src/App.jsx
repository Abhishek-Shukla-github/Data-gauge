import { Suspense, lazy} from "react";
// import { useState } from 'react'
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
const LazySidebar = lazy(() => import("./scenes/global/Sidebar"))
const LazyDashboard = lazy(() => import("./scenes/dashboard/"));
const LazyTeam = lazy(() => import("./scenes/team"))
const LazyInvoices = lazy(() => import("./scenes/invoices"));
const LazyContacts = lazy(() => import("./scenes/contacts"));
const LazyBar = lazy(() => import("./scenes/bar"));
const LazyForm = lazy(() => import("./scenes/form"));
const LazyLine = lazy(() => import("./scenes/line"));
const LazyPie = lazy(() => import("./scenes/pie"));
const LazyFAQ = lazy(() => import("./scenes/faq"));
const LazyGeography = lazy(() => import("./scenes/geography"));
const LazyCalendar = lazy(() => import("./scenes/calendar/calendar"));


function App() {
  const [theme, colorMode] = useMode();
  return (
  <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Suspense fallback={<div></div>} >
            <LazySidebar />
          </Suspense>
          <main className="content">
            <Topbar />
            <Suspense fallback={<></>} >
            <Routes>
              <Route path="/" element={<LazyDashboard />} />
              <Route path="/team" element={<LazyTeam />} />
              <Route path="/contacts" element={<LazyContacts />} />
              <Route path="/invoices" element={<LazyInvoices />} />
              <Route path="/form" element={<LazyForm />} />
              <Route path="/bar" element={<LazyBar />} />
              <Route path="/pie" element={<LazyPie />} />
              <Route path="/line" element={<LazyLine />} />
              <Route path="/faq" element={<LazyFAQ />} />
              <Route path="/calendar" element={<LazyCalendar />} />
              <Route path="/geography" element={<LazyGeography />} />
            </Routes>
            </Suspense>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
