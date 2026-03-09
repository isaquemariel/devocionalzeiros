
## What to remove

The user wants to remove the animated user counter (`AdminUserCounter`) and everything related to it. Here is the complete scope:

### Files to change:

**1. `src/components/admin/AdminUserCounter.tsx`**
- Delete the file entirely (or replace with empty export so no import errors).
- This component fetches `admin_get_metrics` every 60s solely to display `total_users` with an animated counter. It has no other purpose.

**2. `src/pages/Home.tsx`**
- Remove the import of `AdminUserCounter` (line 28).
- Remove the JSX usage `<AdminUserCounter />` (lines 410–411).

**3. `src/components/admin/AdminUserCounter.tsx`**
- Replace with a null-returning stub (no delete needed since it's imported in Home.tsx — safest approach is to stub it out as an empty component).

### What this saves:
- Eliminates a `supabase.rpc('admin_get_metrics')` call that ran every 60 seconds for every admin user viewing the Home page. `admin_get_metrics` is a heavy function (multiple COUNT queries across `auth.users`, `authorized_purchases`, `daily_logins`, `reading_schedule`, `quiz_attempts`, `devotional_completions`) — 6+ sub-queries per execution.
- No visual change for regular users (they never saw this component).
- The admin panel (`AdminHD.tsx`) still calls `admin_get_metrics` as part of its full dashboard load — that stays untouched since it's the admin's dedicated management page.

### What stays the same:
- Admin dashboard (`/adminhd`) is completely unchanged — still shows all metrics including total users.
- All other features work normally.
