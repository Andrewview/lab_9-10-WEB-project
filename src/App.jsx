import { Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext.jsx'
import Header   from './components/Header.jsx'
import Home     from './pages/Home.jsx'
import Booking  from './pages/Booking.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <BookingProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"                  element={<Home />} />
            <Route path="/booking/:trainId"  element={<Booking />} />
            <Route path="*"                  element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BookingProvider>
  )
}