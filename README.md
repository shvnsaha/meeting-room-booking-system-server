#  Instructions on how to run the application locally

# Step 1 :
At first clone the above git repository using git clone command.
example: git clone https://github.com/shvnsaha/meeting-room-booking-system-server.git

# Step 2 :
After cloning git repository open folder location in cmd 

# Step 3 :
To install all dependencies use :  npm i

# Step 4 :
Open folder in vs code use : code . 

# Step 5 :
Add a .env file in the root directory of project and add port number and database url by the following format
Example:
NODE_ENV=development
PORT=5000
DATABASE_URL=your_db_url
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=3ad40058f886741b337b53a55cdb5ebfcda0e6c8276f6f5c2ac62bb9049296a1ed0b718d8ac4461de01e88d508a8c6a9f1121c78f3d35e36dd7a047de198a841

# Step 6 :
To run project use this command: npm run start:dev
If all are working well you see Example app listening on port 5000 in your console

# Project Name : Meeting Room Booking System for Co-working spaces

# Live Link : https://meeting-room-booking-system-server.vercel.app/

# Features: 

# User Features
1. Register new user accounts
2. User roles: user or admin
3. Authenticate users and provide JWT token

# Admin Feature 
# Room Management:
1. Create rooms with details: name, room number, floor number, capacity, price per slot, and amenities
2. Update room details
3. Soft delete rooms

# Slot Management:
1. Create time slots for rooms with start and end times
2. Retrieve available slots for specific rooms on specific date

# Booking Management
1. View all bookings made by users


# General Features

# Get Room Details:
1. Retrieve details of a specific room by its ID

# Get All Rooms
1. Retrieve details of all rooms

# Get Available Slots
1. Retrieve available slots for a specific room on a specific date
2. Retrieve all available slots if no specific room or date is specified


# User Booking Features

# Create Booking
1. Book multiple slots for a specific room on a specific date
2. Calculate total amount based on number of slots and price per slot

# Get All Bookings
1. Admins can view all bookings made by users


# Validation and Error Handling
1. Real-time Availability Check
2. Ensure no double booking of slots
3. Provide informative error messages for booking conflicts and validation errors


# Technology Used:
1. Node.js
2. Express.js
3. Mongoose
4. TypeScript
5. JWT
6. Bcrypt
7. Zod Validation

