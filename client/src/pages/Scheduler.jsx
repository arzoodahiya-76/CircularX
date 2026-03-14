import React, { useState, useEffect } from 'react'
import { Truck, Building2, Calendar, MapPin, Clock, ChevronLeft, ChevronRight, CheckCircle, Home, Navigation, Map, Eye, X, Package, Star, Phone, Mail } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView(center, 15)
  }, [center, map])
  return null
}

function Scheduler() {
  const [pickupType, setPickupType] = useState('doorstep')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedHub, setSelectedHub] = useState(null)
  const [address, setAddress] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [booking, setBooking] = useState(null)
  const [showTracking, setShowTracking] = useState(false)
  const [driverLocation, setDriverLocation] = useState(null)
  const [bookingHistory, setBookingHistory] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const hubs = [
    { id: 1, name: 'GreenTech Hub', address: '123 Main St, Delhi', lat: 28.6139, lng: 77.2090, distance: '2.3 km', rating: 4.8 },
    { id: 2, name: 'EcoRecycle Center', address: '456 North Ave, Delhi', lat: 28.6328, lng: 77.2197, distance: '4.1 km', rating: 4.6 },
    { id: 3, name: 'CircularHub', address: '789 East Blvd, Delhi', lat: 28.5941, lng: 77.2295, distance: '5.8 km', rating: 4.9 }
  ]

  const slots = [
    { id: 'AM', time: '9:00 AM - 12:00 PM', available: true, slotsLeft: 3 },
    { id: 'PM', time: '2:00 PM - 5:00 PM', available: true, slotsLeft: 5 }
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear(), month = date.getMonth()
    const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0)
    const days = Array(firstDay.getDay()).fill(null)
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i))
    return days
  }

  const isDisabled = (date) => {
    if (!date) return true
    const today = new Date(); today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 || date.getDay() === 6
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = getDaysInMonth(currentDate)

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) return
    setIsBooking(true)
    setTimeout(() => {
      const newBooking = { 
        id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(), 
        type: pickupType, 
        date: selectedDate, 
        time: selectedSlot.time, 
        address: pickupType === 'doorstep' ? address : selectedHub?.address,
        hub: selectedHub,
        status: 'confirmed',
        estimatedArrival: new Date(Date.now() + 20 * 60000),
        items: ['E-waste items']
      }
      setBooking(newBooking)
      setBookingHistory(prev => [newBooking, ...prev])
      setIsBooking(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const startTracking = () => {
    setShowTracking(true)
    const hub = booking.hub || hubs[0]
    const startPos = { lat: hub.lat, lng: hub.lng }
    setDriverLocation(startPos)
    
    const destAddress = booking.address.split(',')
    const destLat = 28.6139 + (Math.random() * 0.02 - 0.01)
    const destLng = 77.2090 + (Math.random() * 0.02 - 0.01)
    
    const interval = setInterval(() => {
      setDriverLocation(current => {
        if (!current) return null
        const progress = Math.random() * 0.003
        return {
          lat: current.lat + (destLat - current.lat) * progress + 0.0005,
          lng: current.lng + (destLng - current.lng) * progress + 0.0005
        }
      })
    }, 2000)

    setTimeout(() => clearInterval(interval), 60000)
  }

  if (showTracking && driverLocation) {
    return (
      <div className="scheduler-page">
        <div className="tracking-header">
          <div>
            <h1>Live Tracking</h1>
            <p>Booking ID: <span className="booking-id">{booking?.id}</span></p>
          </div>
          <button className="close-tracking-btn" onClick={() => { setShowTracking(false); setBooking(null) }}>
            <X size={18} /> Close
          </button>
        </div>

        <div className="tracking-content">
          <div className="tracking-map">
            <MapContainer center={[driverLocation.lat, driverLocation.lng]} zoom={15} scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[driverLocation.lat, driverLocation.lng]}>
                <Popup>
                  <div style={{ textAlign: 'center', padding: '8px' }}>
                    <Truck size={24} color="#10B981" style={{ marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontWeight: '600' }}>Driver En Route</p>
                  </div>
                </Popup>
              </Marker>
              <MapUpdater center={[driverLocation.lat, driverLocation.lng]} />
            </MapContainer>
          </div>

          <div className="tracking-info">
            <div className="driver-card">
              <div className="driver-avatar">
                <Truck size={24} />
              </div>
              <div className="driver-details">
                <h4>Driver Assigned</h4>
                <p>GreenTech E-Waste Services</p>
              </div>
              <div className="eta-badge">
                <Clock size={14} />
                <span>{Math.floor(Math.random() * 10) + 5} min</span>
              </div>
            </div>

            <div className="pickup-details-card">
              <h4><MapPin size={18} /> Pickup Details</h4>
              <div className="detail-row">
                <span>Type</span>
                <span>{booking?.type === 'doorstep' ? 'Doorstep Pickup' : 'Hub Drop-off'}</span>
              </div>
              <div className="detail-row">
                <span>Date</span>
                <span>{booking?.date?.toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>Time</span>
                <span>{booking?.time}</span>
              </div>
              <div className="detail-row">
                <span>Address</span>
                <span>{booking?.address}</span>
              </div>
            </div>

            <div className="items-card">
              <Package size={20} />
              <div>
                <h4>Items to Pickup</h4>
                <p>E-waste items from AI Recognition</p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .scheduler-page { padding: 24px; max-width: 1400px; margin: 0 auto; }
          .tracking-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
          .tracking-header h1 { font-size: 1.5rem; font-weight: 700; color: #0F172A; margin: 0; }
          .tracking-header p { color: #64748B; margin: 4px 0 0; }
          .booking-id { background: #F1F5F9; padding: 4px 10px; border-radius: 8px; font-family: monospace; }
          .close-tracking-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #F1F5F9; border: none; border-radius: 10px; font-weight: 500; cursor: pointer; }
          .tracking-content { display: grid; grid-template-columns: 1fr 400px; gap: 24px; }
          .tracking-map { height: 500px; border-radius: 20px; overflow: hidden; }
          .tracking-info { display: flex; flex-direction: column; gap: 16px; }
          .driver-card { background: white; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 14px; }
          .driver-avatar { width: 50px; height: 50px; background: linear-gradient(135deg, #10B981, #059669); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; }
          .driver-details h4 { margin: 0; font-weight: 600; }
          .driver-details p { margin: 4px 0 0; font-size: 0.85rem; color: #64748B; }
          .eta-badge { margin-left: auto; background: #D1FAE5; color: #065F46; padding: 8px 14px; border-radius: 20px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
          .pickup-details-card { background: white; border-radius: 16px; padding: 20px; }
          .pickup-details-card h4 { display: flex; align-items: center; gap: 8px; margin: 0 0 16px; font-weight: 600; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F1F5F9; }
          .detail-row:last-child { border: none; }
          .detail-row span:first-child { color: #64748B; }
          .detail-row span:last-child { font-weight: 500; }
          .items-card { background: linear-gradient(135deg, #10B981, #059669); border-radius: 16px; padding: 20px; color: white; display: flex; align-items: center; gap: 14px; }
          .items-card h4 { margin: 0; font-weight: 600; }
          .items-card p { margin: 4px 0 0; opacity: 0.9; font-size: 0.9rem; }
          @media (max-width: 1024px) { .tracking-content { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    )
  }

  if (booking && showConfirmation) {
    return (
      <div className="scheduler-page">
        <div className="confirmation-container">
          <div className="success-animation">
            <div className="success-circle">
              <CheckCircle size={48} />
            </div>
            <div className="success-rings">
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
          </div>
          
          <h2>Booking Confirmed!</h2>
          <p>Your pickup has been scheduled successfully</p>
          
          <div className="booking-details">
            <div className="detail-item">
              <span className="label">Booking ID</span>
              <span className="value">{booking.id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Type</span>
              <span className="value">{booking.type === 'doorstep' ? 'Doorstep Pickup' : 'Hub Drop-off'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Date</span>
              <span className="value">{booking.date.toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Time</span>
              <span className="value">{booking.time}</span>
            </div>
            <div className="detail-item">
              <span className="label">Location</span>
              <span className="value">{booking.address}</span>
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="track-btn" onClick={startTracking}>
              <Navigation size={18} /> Track Delivery
            </button>
            <button className="schedule-btn" onClick={() => { setBooking(null); setShowConfirmation(false); setSelectedDate(null); setSelectedSlot(null); }}>
              Schedule Another
            </button>
          </div>

          <div className="contact-info">
            <p><Phone size={14} /> Need help? Call: 1800-XXX-XXXX</p>
            <p><Mail size={14} /> Confirmation sent to your email</p>
          </div>
        </div>

        <style>{`
          .scheduler-page { padding: 24px; max-width: 800px; margin: 0 auto; }
          .confirmation-container { background: white; border-radius: 24px; padding: 48px; text-align: center; }
          .success-animation { position: relative; width: 100px; height: 100px; margin: 0 auto 24px; }
          .success-circle { width: 80px; height: 80px; background: #D1FAE5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #10B981; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1; animation: scaleIn 0.5s ease; }
          @keyframes scaleIn { from { transform: translate(-50%, -50%) scale(0); } to { transform: translate(-50%, -50%) scale(1); } }
          .success-rings { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
          .ring { position: absolute; border: 2px solid #10B981; border-radius: 50%; animation: ringExpand 1s ease-out 0.3s forwards; opacity: 0; }
          .ring:nth-child(1) { inset: 5px; }
          .ring:nth-child(2) { inset: -5px; }
          @keyframes ringExpand { from { transform: scale(0.5); opacity: 1; } to { transform: scale(1.5); opacity: 0; } }
          .confirmation-container h2 { font-size: 1.75rem; font-weight: 700; color: #0F172A; margin: 0 0 8px; }
          .confirmation-container > p { color: #64748B; margin: 0 0 32px; }
          .booking-details { background: #F8FAFC; border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: left; }
          .detail-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #E2E8F0; }
          .detail-item:last-child { border: none; }
          .detail-item .label { color: #64748B; }
          .detail-item .value { font-weight: 600; color: #0F172A; }
          .confirmation-actions { display: flex; gap: 12px; margin-bottom: 24px; }
          .track-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 16px; background: linear-gradient(135deg, #10B981, #059669); color: white; border: none; border-radius: 14px; font-weight: 600; cursor: pointer; }
          .schedule-btn { flex: 1; padding: 16px; background: #F1F5F9; color: #374151; border: none; border-radius: 14px; font-weight: 600; cursor: pointer; }
          .contact-info { color: #94A3B8; font-size: 0.85rem; }
          .contact-info p { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 8px 0; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="scheduler-page">
      <div className="scheduler-header">
        <h1>Schedule Pickup</h1>
        <p>Book doorstep pickup or drop at a partner hub</p>
      </div>

      <div className="scheduler-content">
        <div className="scheduler-left">
          <div className="selection-card">
            <h3>Select Pickup Type</h3>
            <div className="type-options">
              <div className={`type-option ${pickupType === 'doorstep' ? 'active' : ''}`} onClick={() => setPickupType('doorstep')}>
                <div className="type-icon"><Truck size={24} /></div>
                <div>
                  <h4>Doorstep Pickup</h4>
                  <p>We come to you</p>
                </div>
              </div>
              <div className={`type-option ${pickupType === 'hub' ? 'active' : ''}`} onClick={() => setPickupType('hub')}>
                <div className="type-icon"><Building2 size={24} /></div>
                <div>
                  <h4>Hub Drop-off</h4>
                  <p>Drop at nearest hub</p>
                </div>
              </div>
            </div>
          </div>

          <div className="selection-card">
            <h3><Calendar size={20} /> Select Date</h3>
            <div className="calendar-header">
              <span className="month-year">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              <div className="calendar-nav">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}><ChevronLeft size={18} /></button>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="day-name">{d}</div>)}
              {days.map((d, i) => (
                <div key={i} className={`day ${!d ? 'empty' : ''} ${isDisabled(d) ? 'disabled' : ''} ${selectedDate?.toDateString() === d?.toDateString() ? 'selected' : ''}`} onClick={() => d && !isDisabled(d) && setSelectedDate(d)}>
                  {d?.getDate()}
                </div>
              ))}
            </div>
            {selectedDate && (
              <div className="time-slots">
                <h4><Clock size={18} /> Select Time Slot</h4>
                <div className="slots-grid">
                  {slots.map(slot => (
                    <div key={slot.id} className={`slot ${selectedSlot?.id === slot.id ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`} onClick={() => slot.available && setSelectedSlot(slot)}>
                      <span className="slot-time">{slot.time}</span>
                      <span className="slots-left">{slot.slotsLeft} slots left</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {pickupType === 'doorstep' ? (
            <div className="selection-card">
              <h3><Home size={20} /> Pickup Address</h3>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your full address" className="address-input" />
              <div className="address-hint">
                <MapPin size={16} /> We'll send our driver to this address
              </div>
            </div>
          ) : (
            <div className="selection-card">
              <div className="hub-header">
                <h3><MapPin size={20} /> Select Hub</h3>
                <button className="map-toggle-btn" onClick={() => setShowMap(!showMap)}>
                  <Navigation size={14} /> {showMap ? 'Hide' : 'Show'} Map
                </button>
              </div>
              {showMap && (
                <div className="map-preview">
                  <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: '200px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[28.6139, 77.2090]} />
                  </MapContainer>
                </div>
              )}
              <div className="hubs-list">
                {hubs.map(hub => (
                  <div key={hub.id} className={`hub-item ${selectedHub?.id === hub.id ? 'selected' : ''}`} onClick={() => setSelectedHub(hub)}>
                    <div className="hub-info">
                      <h4>{hub.name}</h4>
                      <p>{hub.address}</p>
                    </div>
                    <div className="hub-meta">
                      <span className="distance">{hub.distance}</span>
                      <span className="rating"><Star size={12} fill="#F59E0B" color="#F59E0B" /> {hub.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="scheduler-right">
          <div className="summary-card">
            <h3>Booking Summary</h3>
            <div className="summary-items">
              <div className="summary-item">
                <span>Type</span>
                <span>{pickupType === 'doorstep' ? 'Doorstep Pickup' : 'Hub Drop-off'}</span>
              </div>
              <div className="summary-item">
                <span>Date</span>
                <span>{selectedDate?.toLocaleDateString() || 'Not selected'}</span>
              </div>
              <div className="summary-item">
                <span>Time</span>
                <span>{selectedSlot?.time || 'Not selected'}</span>
              </div>
              <div className="summary-item">
                <span>Location</span>
                <span>{pickupType === 'doorstep' ? (address || 'Enter address') : (selectedHub?.name || 'Select hub')}</span>
              </div>
            </div>
            <button className="book-btn" disabled={!selectedDate || !selectedSlot || (pickupType === 'doorstep' && !address) || (pickupType === 'hub' && !selectedHub) || isBooking}>
              {isBooking ? (
                <><span className="spinner"></span> Booking...</>
              ) : (
                <>Confirm Booking</>
              )}
            </button>
          </div>

          <div className="benefits-card">
            <h4>Why Choose Us?</h4>
            <div className="benefit">
              <CheckCircle size={18} color="#10B981" />
              <span>Free pickup on orders above ₹500</span>
            </div>
            <div className="benefit">
              <CheckCircle size={18} color="#10B981" />
              <span>Instant payment after pickup</span>
            </div>
            <div className="benefit">
              <CheckCircle size={18} color="#10B981" />
              <span>Certified eco-friendly recycling</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scheduler-page { padding: 24px; max-width: 1400px; margin: 0 auto; }
        .scheduler-header { margin-bottom: 32px; }
        .scheduler-header h1 { font-size: 1.75rem; font-weight: 700; color: #0F172A; margin: 0; }
        .scheduler-header p { color: #64748B; margin: 8px 0 0; }
        .scheduler-content { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }
        .scheduler-left { display: flex; flex-direction: column; gap: 20px; }
        .selection-card { background: white; border-radius: 20px; padding: 24px; }
        .selection-card h3 { display: flex; align-items: center; gap: 10px; font-size: 1.1rem; font-weight: 600; color: #0F172A; margin: 0 0 20px; }
        .type-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .type-option { display: flex; align-items: center; gap: 14px; padding: 18px; border: 2px solid #E2E8F0; border-radius: 14px; cursor: pointer; transition: all 0.2s; }
        .type-option:hover { border-color: #10B981; }
        .type-option.active { border-color: #10B981; background: #F0FDF4; }
        .type-icon { width: 50px; height: 50px; background: #F1F5F9; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #64748B; }
        .type-option.active .type-icon { background: #10B981; color: white; }
        .type-option h4 { margin: 0; font-weight: 600; color: #0F172A; }
        .type-option p { margin: 4px 0 0; font-size: 0.85rem; color: #64748B; }
        .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .month-year { font-weight: 600; color: #0F172A; }
        .calendar-nav { display: flex; gap: 4px; }
        .calendar-nav button { width: 32px; height: 32px; border: 1px solid #E2E8F0; background: white; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
        .day-name { text-align: center; font-size: 0.75rem; color: #94A3B8; padding: 8px; font-weight: 500; }
        .day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
        .day.empty { cursor: default; }
        .day.disabled { color: #CBD5E1; cursor: not-allowed; }
        .day:not(.disabled):hover { background: #F1F5F9; }
        .day.selected { background: #10B981; color: white; }
        .time-slots { margin-top: 20px; padding-top: 20px; border-top: 1px solid #E2E8F0; }
        .time-slots h4 { display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 600; margin: 0 0 14px; }
        .slots-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .slot { padding: 16px; border: 2px solid #E2E8F0; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
        .slot:hover { border-color: #10B981; }
        .slot.selected { border-color: #10B981; background: #F0FDF4; }
        .slot.unavailable { opacity: 0.5; cursor: not-allowed; }
        .slot-time { display: block; font-weight: 600; margin-bottom: 4px; }
        .slots-left { font-size: 0.75rem; color: #10B981; }
        .address-input { width: 100%; padding: 14px 16px; border: 2px solid #E2E8F0; border-radius: 12px; font-size: 1rem; margin-bottom: 12px; }
        .address-input:focus { outline: none; border-color: #10B981; }
        .address-hint { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #64748B; }
        .hub-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .hub-header h3 { margin: 0; }
        .map-toggle-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #F0FDF4; color: #059669; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 500; cursor: pointer; }
        .map-preview { height: 200px; border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
        .hubs-list { display: flex; flex-direction: column; gap: 10px; }
        .hub-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 2px solid #E2E8F0; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
        .hub-item:hover { border-color: #10B981; }
        .hub-item.selected { border-color: #10B981; background: #F0FDF4; }
        .hub-info h4 { margin: 0; font-weight: 600; }
        .hub-info p { margin: 4px 0 0; font-size: 0.85rem; color: #64748B; }
        .hub-meta { text-align: right; }
        .distance { display: block; font-weight: 600; color: #3B82F6; }
        .rating { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: #64748B; }
        .scheduler-right { display: flex; flex-direction: column; gap: 16px; }
        .summary-card { background: white; border-radius: 20px; padding: 24px; position: sticky; top: 100px; }
        .summary-card h3 { font-size: 1.1rem; font-weight: 600; margin: 0 0 20px; }
        .summary-items { margin-bottom: 20px; }
        .summary-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F1F5F9; }
        .summary-item span:first-child { color: #64748B; }
        .summary-item span:last-child { font-weight: 500; }
        .book-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #10B981, #059669); color: white; border: none; border-radius: 14px; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .book-btn:disabled { background: #CBD5E1; cursor: not-allowed; }
        .spinner { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .benefits-card { background: linear-gradient(135deg, #F0FDF4, #D1FAE5); border-radius: 16px; padding: 20px; }
        .benefits-card h4 { margin: 0 0 16px; font-size: 1rem; font-weight: 600; color: #065F46; }
        .benefit { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: #065F46; font-size: 0.9rem; }
        .benefit:last-child { margin: 0; }
        @media (max-width: 1024px) { .scheduler-content { grid-template-columns: 1fr; } .summary-card { position: static; } }
      `}</style>
    </div>
  )
}

export default Scheduler
