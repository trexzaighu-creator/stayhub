# 🗺️ Location Marking Feature - User Guide

## Overview
Hostel owners can now mark the exact location of their hostels on an interactive map during creation and editing. Guests can view the hostel location on a map when browsing hostels.

---

## For Hostel Owners

### Creating a Hostel with Location

1. **Go to Owner Dashboard**
   - Click "Owner Dashboard" link in header (when logged in as owner)

2. **Click "Create New Hostel"**
   - Button appears at top of hostels list

3. **Fill in Basic Details**
   - Hostel Name
   - City
   - Monthly Rent (PKR)
   - Available Seats
   - Description

4. **Mark Location on Map**
   - Scroll down to "Location (Click on map to select)" section
   - A map will be displayed with Pakistan visible
   - **Click anywhere on the map** to mark your hostel location
   - A red marker will appear at your clicked location
   - Coordinates will display below: "📍 Location: 31.5497, 74.3436"

5. **Review and Submit**
   - Verify all details are correct
   - Click "Create Hostel" button
   - Your hostel is now created with location!

### Editing Hostel Location

1. **Go to Owner Dashboard**

2. **Find your hostel** in the "Your Hostels" list

3. **Click "Edit" button** on the hostel card

4. **Update Location** (if needed)
   - The map will load with your **current location marker**
   - Click a new location on the map to update it
   - Or leave as-is if you don't want to change it

5. **Click "Update Hostel"**
   - Changes saved!

---

## For Guests (Travelers)

### View Hostel Location on Map

#### Option 1: View on Hostel List Map
1. Go to **Hostels** page
2. Look at the **map on the left side** (or top on mobile)
3. **Red markers** show all hostel locations
4. Hover over a marker to see the hostel name
5. Click on a marker to view that hostel

#### Option 2: View on Hostel Detail Page
1. Click on any hostel in the list
2. Go to hostel detail page
3. Scroll down to **"📍 Location" section**
4. See the **interactive map** with the hostel marked
5. The marker shows the exact location
6. **Zoom in/out** using map controls

---

## Map Features

### LocationPicker (Owner Creating/Editing)
- ✅ Full Pakistan view by default
- ✅ Click to select location
- ✅ Real-time coordinate display
- ✅ Marker updates on click
- ✅ Displays latitude & longitude
- ✅ Uses OpenStreetMap (free, no API key needed)

### LocationDisplay (Guest Viewing)
- ✅ Shows hostel location
- ✅ Marker with hostel name
- ✅ Zoom level 15 (street-level detail)
- ✅ Interactive pan & zoom
- ✅ Mobile responsive
- ✅ Read-only (can't edit)

---

## Key Coordinates for Pakistan Cities

### Major Cities (for reference)
| City | Latitude | Longitude |
|------|----------|-----------|
| Karachi | 24.8607 | 67.0011 |
| Lahore | 31.5497 | 74.3436 |
| Islamabad | 33.6844 | 73.0479 |
| Peshawar | 34.0151 | 71.5249 |
| Quetta | 30.1798 | 67.0070 |
| Multan | 30.1575 | 71.4454 |
| Faisalabad | 31.4181 | 72.9881 |
| Hyderabad | 25.3960 | 68.4717 |

---

## Troubleshooting

### Map Not Loading?
1. Check internet connection
2. Try refreshing the page
3. Clear browser cache
4. Try a different browser

### Marker Not Showing?
1. Make sure you **clicked on the map** to select location
2. Wait a moment for the marker to appear
3. Check coordinates display below the map

### Coordinates Not Saving?
1. Make sure you **clicked to select location** on the map
2. Verify you see the blue info box with coordinates
3. Check if coordinates field is populated before submitting

### Location Not Visible on Detail Page?
1. Owner must have clicked to select location when creating
2. Try refreshing the page
3. Check if hostel was created with location (Edit hostel to verify)

---

## Best Practices for Owners

✅ **DO:**
- Mark location as accurately as possible
- Choose the exact building/entrance location
- Mark location when creating (easier than editing later)
- Verify coordinates before saving

❌ **DON'T:**
- Leave location unmarked (guests won't see map)
- Mark wrong city location
- Mark location far from actual hostel
- Forget to click "Create/Update Hostel" after marking

---

## Mobile Experience

- 📱 **Responsive map** works on all screen sizes
- 📱 **Touch-friendly** click areas
- 📱 **Pinch to zoom** on map (native mobile feature)
- 📱 **Marker clearly visible** on mobile maps

---

## API Integration

### Creating Hostel with Location
```
POST /api/hostels/add
{
  "name": "Cozy Downtown Hostel",
  "city": "karachi",
  "monthly_rent": 15000,
  "lat": 24.8607,
  "lng": 67.0011,
  ...
}
```

### Getting Hostel with Location
```
GET /api/hostels/{id}
Response includes:
{
  "lat": 24.8607,
  "lng": 67.0011,
  ...
}
```

---

## Future Enhancements (Planned)

🔜 Address search/autocomplete
🔜 Reverse geocoding (address lookup from coordinates)
🔜 Multiple location markers for multi-site hostels
🔜 Distance calculation from city center
🔜 Nearby attractions/landmarks on map

---

## Support

Having issues? 
- Make sure JavaScript is enabled in your browser
- Leaflet/OpenStreetMap requires internet connection
- Try a different browser if issues persist
