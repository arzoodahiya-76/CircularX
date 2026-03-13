import React, { useState, useEffect } from 'react'
import { Truck, Building2, Calendar, MapPin, Clock, ChevronLeft, ChevronRight, CheckCircle, Home, Navigation, Map, Eye, X, Package } from 'lucide-react'
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

  const hubs = [
    { id: 1, name: 'GreenTech Hub', address: '123 Main St, Delhi', lat: 28.6139, lng: 77.2090, distance: '2.3 km' },
    { id: 2, name: 'EcoRecycle Center', address: '456 North Ave, Delhi', lat: 28.6328, lng: 77.2197, distance: '4.1 km' },
    { id: 3, name: 'CircularHub', address: '789 East Blvd, Delhi', lat: 28.5941, lng: 77.2295, distance: '5.8 km' }
  ]

  const slots = [
    { id: 'AM', time: '9:00 AM - 12:00 PM', available: true },
    { id: 'PM', time: '2:00 PM - 5:00 PM', available: true }
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
        id: 'BK-' + Date.now(), 
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
    }, 1500)
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
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>Live Tracking</h1>
            <p style={{ color: '#64748B' }}>Booking ID: {booking?.id}</p>
          </div>
          <button onClick={() => { setShowTracking(false); setBooking(null) }} style={{ padding: '10px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <X size={18} /> Close
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
          <div style={{ height: '500px', borderRadius: '16px', overflow: 'hidden', border: '2px solid #E2E8F0' }}>
            <MapContainer center={[driverLocation.lat, driverLocation.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[driverLocation.lat, driverLocation.lng]}>
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <Truck size={24} color="#10B981" />
                    <p style={{ margin: '8px 0 0', fontWeight: '600' }}>Driver En Route</p>
                  </div>
                </Popup>
              </Marker>
              <MapUpdater center={[driverLocation.lat, driverLocation.lng]} />
            </MapContainer>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: '#10B981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={24} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Driver Assigned</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>GreenTech E-Waste Services</div>
                </div>
              </div>
              <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>Arriving Soon</div>
                <div style={{ fontSize: '13px', color: '#065F46' }}>Estimated: {Math.floor(Math.random() * 10) + 5} minutes</div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} /> Pickup Details
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Type</span>
                  <span style={{ fontWeight: '500' }}>{booking?.type === 'doorstep' ? 'Doorstep Pickup' : 'Hub Drop-off'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Date</span>
                  <span style={{ fontWeight: '500' }}>{booking?.date?.toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Time</span>
                  <span style={{ fontWeight: '500' }}>{booking?.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Address</span>
                  <span style={{ fontWeight: '500', textAlign: 'right', maxWidth: '150px' }}>{booking?.address}</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #10B981, #059669)', borderRadius: '16px', padding: '20px', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Package size={20} />
                <span style={{ fontWeight: '600' }}>Items to Pickup</span>
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>E-waste items from AI Recognition</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (booking) {
    return (
      <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 20px', background: '#D1FAE5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={40} color="#10B981" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Booking Confirmed!</h2>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Your pickup has been scheduled</p>
          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', textAlign: 'left', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
              <span style={{ color: '#64748B' }}>Booking ID</span>
              <span style={{ fontWeight: '600' }}>{booking.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
              <span style={{ color: '#64748B' }}>Type</span>
              <span style={{ fontWeight: '600' }}>{booking.type === 'doorstep' ? 'Doorstep Pickup' : 'Hub Drop-off'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
              <span style={{ color: '#64748B' }}>Date</span>
              <span style={{ fontWeight: '600' }}>{booking.date.toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ color: '#64748B' }}>Location</span>
              <span style={{ fontWeight: '600' }}>{booking.address || 'Not set'}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={startTracking} style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} /> Track Delivery
            </button>
            <button onClick={() => setBooking(null)} style={{ padding: '14px 28px', background: '#F8FAFC', color: '#374151', border: '1px solid #E2E8F0', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
              Schedule Another
            </button>
          </div>
        </div>

        {bookingHistory.length > 1 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Past Bookings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bookingHistory.slice(1).map(b => (
                <div key={b.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{b.id}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>{b.date.toLocaleDateString()} - {b.type === 'doorstep' ? 'Doorstep' : 'Hub'}</div>
                  </div>
                  <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>Completed</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', marginBottom: '8px', fontFamily: 'Sora, sans-serif' }}>Schedule Pickup</h1>
        <p style={{ color: '#64748B' }}>Book doorstep pickup or drop at a partner hub</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Select Pickup Type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { id: 'doorstep', icon: Truck, label: 'Doorstep Pickup', desc: 'We come to you' },
                { id: 'hub', icon: Building2, label: 'Hub Drop-off', desc: 'Drop at nearest hub' }
              ].map(item => (
                <div key={item.id} onClick={() => setPickupType(item.id)} style={{ padding: '20px', border: `2px solid ${pickupType === item.id ? '#10B981' : '#E2E8F0'}`, borderRadius: '12px', cursor: 'pointer', background: pickupType === item.id ? '#F0FDF4' : 'white', textAlign: 'center', transition: 'all 0.2s' }}>
                  <item.icon size={28} color={pickupType === item.id ? '#10B981' : '#64748B'} />
                  <div style={{ fontWeight: '600', marginTop: '8px' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} /> Select Date
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontWeight: '600' }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} style={{ width: '32px', height: '32px', border: '1px solid #E2E8F0', borderRadius: '8px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={16} /></button>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} style={{ width: '32px', height: '32px', border: '1px solid #E2E8F0', borderRadius: '8px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={16} /></button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '16px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', padding: '8px' }}>{d}</div>)}
              {days.map((d, i) => (
                <div key={i} onClick={() => d && !isDisabled(d) && setSelectedDate(d)} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', cursor: d && !isDisabled(d) ? 'pointer' : 'default', background: selectedDate?.toDateString() === d?.toDateString() ? '#10B981' : 'transparent', color: !d ? 'transparent' : isDisabled(d) ? '#CBD5E1' : selectedDate?.toDateString() === d?.toDateString() ? 'white' : '#1E293B', fontSize: '14px', fontWeight: d && !isDisabled(d) ? '500' : '400' }}>
                  {d?.getDate()}
                </div>
              ))}
            </div>
            {selectedDate && (
              <div>
                <h4 style={{ fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={18} /> Select Time</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {slots.map(slot => (
                    <div key={slot.id} onClick={() => slot.available && setSelectedSlot(slot)} style={{ padding: '16px', border: `2px solid ${selectedSlot?.id === slot.id ? '#10B981' : '#E2E8F0'}`, borderRadius: '10px', cursor: slot.available ? 'pointer' : 'not-allowed', background: selectedSlot?.id === slot.id ? '#F0FDF4' : 'white', opacity: slot.available ? 1 : 0.5 }}>
                      <div style={{ fontWeight: '600' }}>{slot.time}</div>
                      <div style={{ fontSize: '13px', color: '#10B981' }}>Available</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {pickupType === 'doorstep' ? (
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Home size={20} /> Pickup Address</h3>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your full address" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E2E8F0', borderRadius: '10px', fontSize: '15px' }} />
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={20} /> Select Hub</h3>
                <button onClick={() => setShowMap(!showMap)} style={{ padding: '8px 16px', background: '#F0FDF4', color: '#059669', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                  <Navigation size={14} style={{ marginRight: '4px' }} /> {showMap ? 'Hide' : 'Show'} Map
                </button>
              </div>
              {showMap && <div style={{ height: '200px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}><MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: '100%', width: '100%' }}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Marker position={[28.6139, 77.2090]} /></MapContainer></div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {hubs.map(hub => (
                  <div key={hub.id} onClick={() => setSelectedHub(hub)} style={{ padding: '14px', border: `2px solid ${selectedHub?.id === hub.id ? '#10B981' : '#E2E8F0'}`, borderRadius: '10px', cursor: 'pointer', background: selectedHub?.id === hub.id ? '#F0FDF4' : 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>{hub.name}</span>
                      <span style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>{hub.distance}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>{hub.address}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', height: 'fit-content', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontWeight: '600', marginBottom: '20px' }}>Booking Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Type</span><span style={{ fontWeight: '500' }}>{pickupType === 'doorstep' ? 'Doorstep' : 'Hub'}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Date</span><span style={{ fontWeight: '500' }}>{selectedDate?.toLocaleDateString() || 'Not selected'}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Time</span><span style={{ fontWeight: '500' }}>{selectedSlot?.time || 'Not selected'}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748B' }}>Location</span><span style={{ fontWeight: '500', textAlign: 'right', maxWidth: '150px' }}>{pickupType === 'doorstep' ? (address || 'Enter address') : (selectedHub?.name || 'Select hub')}</span></div>
          </div>
          <button onClick={handleBook} disabled={!selectedDate || !selectedSlot || (pickupType === 'doorstep' && !address) || (pickupType === 'hub' && !selectedHub) || isBooking} style={{ width: '100%', padding: '16px', background: (!selectedDate || !selectedSlot || (pickupType === 'doorstep' && !address) || (pickupType === 'hub' && !selectedHub)) ? '#94A3B8' : 'linear-gradient(135deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
            {isBooking ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Scheduler
