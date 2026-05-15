# GPS Tracking Attendance System

## Overview

The **GPS Tracking Attendance System** is a web and Android-based application designed to automatically record attendance using GPS location tracking.

The system detects when a **student or lecturer arrives at a specific class venue** and records their attendance together with the **time of arrival and departure**. By verifying the user's physical location, the system helps prevent fraudulent attendance and reduces the need for manual attendance registers.

## Features
The system provides the following features:
* Automatic attendance marking using GPS location.
* Tracking of student and lecturer presence at a class venue.
* Recording of arrival time and departure time.
* Association of attendance records with:
  * Course
  * Class venue
  * User (student or lecturer)
* Real-time database updates using Firebase.
* Web-based interface accessible through a browser.
* Android application support for students.

## Technologies Used:

### Frontend

* HTML
* CSS
* JavaScript

### Backend / Database

* Firebase Authentication
* Firebase Firestore / Realtime Database

### Other Technologies

* GPS Location API (Browser Geolocation API)

## How the System Works

1. A student or lecturer logs into the system.
2. The system retrieves the user's current GPS location using the browser’s Geolocation API.
3. The system compares the user's location with the registered class venue coordinates.
4. If the user is within the allowed range of the venue:

   * Attendance is automatically recorded.
   * The arrival time is stored in the database.
5. When the user leaves the venue, the system records the departure time.

## Future Improvements

Possible improvements for the system include:

* Mobile application for lecturers
* Attendance analytics and reports
* Improved GPS accuracy using geofencing
* Admin dashboard with detailed statistics

