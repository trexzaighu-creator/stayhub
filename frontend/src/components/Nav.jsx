import React from 'react'

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="brand">Hostel<span className="accent">Book</span></div>
        <nav>
          <a href="#">Browse</a>
          <a href="#">Host Your Hostel</a>
          <a href="#">Bookings</a>
        </nav>
      </div>
    </header>
  )
}
