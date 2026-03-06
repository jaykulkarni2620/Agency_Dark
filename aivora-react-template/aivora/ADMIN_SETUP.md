# Admin Dashboard Setup Guide

## Overview
The admin dashboard has been integrated into your React application with authentication.

## Default Login Credentials
- **Email:** admin@minex.com
- **Password:** admin123

## Access Points
- **Login Page:** `/admin/login`
- **Dashboard:** `/admin/dashboard` (protected, requires login)

## How It Works

1. **Authentication:** Uses React Context API to manage admin login state
2. **Protected Routes:** Admin dashboard is protected - users must log in first
3. **Session Storage:** Login state persists in localStorage
4. **Logout:** Available in the admin dashboard header

## File Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Authentication context & provider
├── components/
│   └── ProtectedRoute/
│       └── ProtectedRoute.tsx    # Route protection wrapper
└── main-component/
    ├── AdminLogin/
    │   ├── AdminLogin.tsx       # Login page component
    │   └── AdminLogin.css       # Login page styles
    └── AdminDashboard/
        ├── AdminDashboard.tsx   # Dashboard wrapper component
        └── AdminDashboard.css    # Dashboard wrapper styles

public/
└── admin-dashboard/             # Admin dashboard HTML files
    ├── index.html
    ├── assets/
    └── ...
```

## Customization

### Change Default Credentials
Edit `src/context/AuthContext.tsx`:
```typescript
const ADMIN_EMAIL = 'your-email@example.com';
const ADMIN_PASSWORD = 'your-password';
```

### Connect to Backend API
Replace the mock login in `AuthContext.tsx` with your API call:
```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('admin_token', data.token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
```

## Notes
- The admin dashboard HTML files are served from `/public/admin-dashboard/`
- Make sure all admin dashboard assets are copied to the public folder
- The dashboard loads in an iframe to maintain its original functionality
