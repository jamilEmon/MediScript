# CMED Prescription Generator

A modern web application for doctors to manage patient prescriptions with authentication, search, and reporting features.

## Features

- **User Authentication**: Secure login/logout system using Supabase Auth
- **Prescription Management**: Create, view, edit, and delete prescriptions
- **Search & Filter**: Search by patient name or diagnosis with date range filtering
- **Pagination**: Efficient handling of large prescription lists
- **Dashboard**: Quick overview with today's and monthly prescription counts
- **Reports**: Visual charts showing prescription trends over the last 10 days
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Toast Notifications**: Real-time feedback for user actions

## Technology Stack

- **Frontend**: Angular 20 (standalone components)
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **Charts**: Chart.js
- **Styling**: Custom CSS with CMED Health theme (blue & white)

## Project Structure

```
/src
  /app
    /components          # UI components
      - login.component.ts
      - layout.component.ts
      - dashboard.component.ts
      - prescriptions.component.ts
      - prescription-form.component.ts
      - reports.component.ts
      - toast.component.ts
    /services           # Business logic services
      - supabase.service.ts
      - prescription.service.ts
      - toast.service.ts
    /guards            # Route guards
      - auth.guard.ts
    - app.routes.ts    # Application routes
  - main.ts            # Application entry point
  - global_styles.css  # Global styles
```

## Database Schema

### Tables

**doctors**
- id (uuid, primary key)
- email (text, unique)
- password_hash (text)
- full_name (text)
- created_at (timestamp)
- updated_at (timestamp)

**prescriptions**
- id (uuid, primary key)
- doctor_id (uuid, foreign key)
- prescription_date (date)
- patient_name (text)
- patient_age (integer, 0-120)
- gender (text: Male/Female/Other)
- diagnosis (text)
- medicines (text)
- next_visit_date (date)
- created_at (timestamp)
- updated_at (timestamp)

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. The Supabase configuration is already set up in the `.env` file

4. Create a demo user account:
   - Open the application
   - Or use the Supabase dashboard to create a user with email: `doctor@cmed.com`

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

### Building for Production

Build the application:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Usage

### Login

Use the following demo credentials:
- **Email**: doctor@cmed.com
- **Password**: password123

(Note: You need to create this user first through Supabase Auth)

### Creating Prescriptions

1. Navigate to the Prescriptions page
2. Click "New Prescription"
3. Fill in the required fields:
   - Prescription Date (required)
   - Patient Name (required)
   - Age (optional, 0-120)
   - Gender (optional)
   - Diagnosis (optional)
   - Medicines (optional)
   - Next Visit Date (optional)
4. Click "Create Prescription"

### Viewing Prescriptions

- Use the date range filters to view prescriptions for specific periods
- Search by patient name or diagnosis
- Navigate through pages using pagination controls
- Default view shows current month's prescriptions

### Editing/Deleting Prescriptions

- Click the edit icon to modify a prescription
- Click the delete icon to remove a prescription (confirmation required)

### Reports

View prescription statistics and trends on the Reports page:
- Bar chart showing last 10 days prescription counts
- Total prescriptions count
- Daily average
- Peak day count

## Security

- Row Level Security (RLS) enabled on all tables
- Doctors can only view and manage their own prescriptions
- All database operations require authentication
- Secure password hashing using Supabase Auth

## API Endpoints

All API calls are handled through Supabase client:
- `getPrescriptions()` - List prescriptions with filters
- `getPrescriptionById()` - Get single prescription
- `createPrescription()` - Create new prescription
- `updatePrescription()` - Update existing prescription
- `deletePrescription()` - Delete prescription
- `getDailyStats()` - Get prescription statistics

## License

Proprietary - CMED Health
