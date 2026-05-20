# Admin Login, Password Reset, Image Alt Text, and Student Portal Timer

## Admin login

Admin login page:

```txt
/admin/login
```

Default super admin created by the seed script:

```txt
Email: admin@ekinrin-ng.com
Password: admin
```

Change this password after first login.

## Required database setup

After pulling this update, run:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

The update adds these tables:

- `AdminUser`
- `PasswordResetToken`
- `PortalSetting`

## Password reset email setup

Forgot password page:

```txt
/admin/forgot-password
```

Reset password page:

```txt
/admin/reset-password?token=...`
```

For production email sending, add these to `.env`:

```env
NEXT_PUBLIC_APP_URL="https://your-domain.com"
AUTH_SECRET="change-this-to-a-long-random-secret"
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SMTP_FROM="CNS Ekinrin Admin <no-reply@ekinrin-ng.com>"
```

During local development, if SMTP is not configured, the reset link is printed in the terminal and returned as a development-only link.

## Admin image upload and alt text

When an admin selects an image from the device in `/admin/pages`, the editor now automatically creates an editable alt text field beside the image field.

Example:

```json
{
  "image": "/uploads/example.jpg",
  "alt": "Example"
}
```

The alt field remains a normal text input so the admin can write meaningful accessibility text.

## Student portal coming soon page

Public coming-soon page:

```txt
/student-portal
```

Admin timer settings page:

```txt
/admin/student-portal
```

From the admin dashboard, the admin can set:

- coming-soon title
- description
- launch date and time
- whether the coming-soon page is enabled
