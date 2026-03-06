# Form Submissions Management Guide

## Overview
The contact form on your website now automatically saves all submissions, which can be viewed and managed in the admin dashboard.

## How It Works

### 1. **Form Submission**
When a visitor fills out the contact form on your website:
- Form data is automatically saved to browser localStorage
- Submission includes: Name, Email, Phone, Service, Message, File attachment (if any)
- Each submission gets a unique ID and timestamp
- Status is automatically set to "new"

### 2. **Viewing Submissions**
As an admin, you can view all submissions:

**Access the Submissions Page:**
- Login to admin dashboard: `/admin/login`
- Navigate to: `/admin/submissions`
- Or click "View Submissions" button in the admin dashboard header

### 3. **Features**

#### **Statistics Dashboard**
- **Total Submissions**: Total number of form submissions
- **New**: Unread submissions
- **Read**: Submissions you've marked as read
- **Contacted**: Submissions you've already contacted

#### **Submission List**
- View all submissions in a table format
- Filter by status (All, New, Read, Contacted)
- Click any row to view full details
- Delete submissions you no longer need

#### **Submission Details Panel**
When you click on a submission:
- View complete contact information
- Read the full message
- See attached file name (if any)
- Update submission status
- Delete the submission
- Quick links to email or call the client

#### **Status Management**
- **New**: Default status for new submissions
- **Read**: Mark when you've reviewed the submission
- **Contacted**: Mark when you've reached out to the client

## File Structure

```
src/
├── services/
│   └── formSubmissionService.ts    # Handles saving/retrieving submissions
├── components/
│   └── ContactFrom/
│       └── ContactForm.tsx          # Updated to save submissions
└── main-component/
    └── AdminSubmissions/
        ├── AdminSubmissions.tsx     # Admin page to view submissions
        └── AdminSubmissions.css     # Styling for submissions page
```

## Data Storage

Currently, submissions are stored in **localStorage** (browser storage). This means:
- ✅ Works immediately without backend setup
- ✅ Data persists across page refreshes
- ⚠️ Data is stored locally in the browser
- ⚠️ Data is cleared if browser cache is cleared

## Upgrading to Backend API

To connect to a real backend API, update `formSubmissionService.ts`:

```typescript
export const saveFormSubmission = async (formData) => {
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
};

export const getFormSubmissions = async () => {
  const response = await fetch('/api/submissions');
  return response.json();
};
```

## Usage Tips

1. **Regular Check**: Check `/admin/submissions` regularly for new inquiries
2. **Status Updates**: Update status as you process submissions to track your workflow
3. **Quick Actions**: Use email/phone links to quickly contact clients
4. **Clean Up**: Delete old submissions you've already handled

## Default Admin Credentials
- **Email**: admin@minex.com
- **Password**: admin123

## Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main admin dashboard
- `/admin/submissions` - View all form submissions
