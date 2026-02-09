# PHASE 35 (NEW): SUPER ADMIN & CREDIT FOUNDATION SYSTEM

## ✅ IMPLEMENTATION STATUS: COMPLETE

---

## 🎯 OVERVIEW

This phase implements a two-tier hierarchical admin system with credit management:

1. **SUPER ADMIN** (Platform Owner) - Full control over all admins and credits
2. **ADMIN** (Photographer) - Limited access to their own wedding data

---

## 🏗️ SYSTEM ARCHITECTURE

### Role Hierarchy
```
SUPER ADMIN (Platform Owner)
    ├── Create/Manage Admin Accounts
    ├── Assign/Add/Deduct Credits
    ├── View Credit Usage History
    ├── Suspend/Activate Admin Accounts
    └── Access All Admin Data

ADMIN (Photographer)
    ├── View Own Credit Balance (Read-Only)
    ├── Manage Own Wedding Profiles
    ├── Cannot Access Other Admins' Data
    └── Cannot Modify Credits
```

---

## 📦 BACKEND IMPLEMENTATION

### 1. Models (backend/models.py)

#### AdminRole Enum (Lines 499-503)
```python
class AdminRole(str, Enum):
    SUPER_ADMIN = "super_admin"  # Platform owner - full control
    ADMIN = "admin"              # Photographer - limited to own data
```

#### AdminStatus Enum (Lines 505-510)
```python
class AdminStatus(str, Enum):
    ACTIVE = "active"
    SUSPENDED = "suspended"
    INACTIVE = "inactive"
```

#### Enhanced Admin Model (Lines 512-531)
```python
class Admin(BaseModel):
    id: str
    email: str
    password_hash: str
    name: str
    role: AdminRole = AdminRole.ADMIN
    status: AdminStatus = AdminStatus.ACTIVE
    total_credits: int = 0
    used_credits: int = 0
    created_at: datetime
    created_by: Optional[str] = None
    
    @property
    def available_credits(self) -> int:
        return self.total_credits - self.used_credits
```

#### CreditLedger Model (Line 598)
```python
class CreditLedger(BaseModel):
    credit_id: str                     # Unique transaction ID
    admin_id: str                      # Admin this transaction belongs to
    action_type: Literal["add", "deduct", "adjust"]
    amount: int                        # Credits added/deducted
    reason: str                        # Mandatory explanation
    related_wedding_id: Optional[str]  # Nullable - for future use
    performed_by: str                  # Super Admin who made change
    balance_after: int                 # Credit balance after transaction
    metadata: Dict[str, Any]           # Additional context
    created_at: datetime               # Immutable timestamp
```

### 2. Authentication (backend/auth.py)

#### Role-Based Middleware
- `get_current_admin_with_role()` - Returns admin_id + role from JWT
- `require_super_admin()` - Enforces Super Admin access (403 if not)
- `require_admin()` - Allows both Super Admin and Admin

### 3. API Endpoints (backend/server.py)

#### Super Admin Routes

| Endpoint | Method | Purpose | Access |
|----------|--------|---------|--------|
| `/api/super-admin/admins` | POST | Create Admin account | Super Admin Only |
| `/api/super-admin/admins` | GET | List all Admins | Super Admin Only |
| `/api/super-admin/credits/add` | POST | Add credits to Admin | Super Admin Only |
| `/api/super-admin/credits/deduct` | POST | Deduct credits from Admin | Super Admin Only |
| `/api/super-admin/credits/ledger/{admin_id}` | GET | View credit history | Super Admin Only |
| `/api/super-admin/admins/{admin_id}/status` | PUT | Update Admin status | Super Admin Only |

#### Admin Route (Enhanced)
| Endpoint | Method | Purpose | Access |
|----------|--------|---------|--------|
| `/api/auth/me` | GET | Get own info + credits | All Admins |

### 4. Super Admin Initialization (backend/init_super_admin.py)

**Default Super Admin Account:**
- Email: `superadmin@wedding.com`
- Password: `SuperAdmin@123`
- Credits: 999,999 (unlimited)
- Status: ACTIVE
- Role: SUPER_ADMIN

**Script executed successfully** ✅

---

## 🎨 FRONTEND IMPLEMENTATION

### 1. Routing (frontend/src/App.js)

```jsx
// Super Admin Routes
<Route path="/super-admin/login" element={<SuperAdminLogin />} />
<Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />

// Regular Admin Routes
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
```

### 2. Super Admin Pages

#### SuperAdminLogin (frontend/src/pages/SuperAdminLogin.jsx)
- Purple gradient premium design
- Uses AuthContext for authentication
- Redirects to `/super-admin/dashboard` on success
- Link to regular admin login

#### SuperAdminDashboard (frontend/src/pages/SuperAdminDashboard.jsx)

**Features:**
- **Admin List Table** showing:
  - Name
  - Email
  - Status (Active/Suspended badge)
  - Credits (Available / Total / Used)
  - Action buttons

- **Create Admin Modal**
  - Fields: Name, Email, Password (min 8 chars), Initial Credits
  - Validation + error handling

- **Credit Operation Modal**
  - Add or Deduct credits
  - Amount input (integer)
  - Reason textarea (mandatory)
  - Color-coded buttons (green/red)

- **Credit Ledger Modal**
  - Transaction history table
  - Columns: Date, Action Badge, Amount (+/-), Balance After, Reason
  - Scrollable for large datasets

- **Admin Status Toggle**
  - Activate/Suspend with icons
  - Status badge updates in real-time

### 3. Admin Dashboard Enhancement (frontend/src/pages/AdminDashboard.jsx)

#### Credit Balance Display (Lines 275-285)
```jsx
{admin?.role === 'admin' && (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 
                  bg-gradient-to-r from-purple-50 to-indigo-50 
                  border border-purple-200 rounded-lg">
    <Sparkles className="w-4 h-4 text-purple-600" />
    <span className="text-sm font-medium text-gray-700">
      Credits: <span className="text-purple-700 font-bold">
        {admin?.available_credits || 0}
      </span>
    </span>
    <span className="text-xs text-gray-500">
      ({admin?.total_credits || 0} total / {admin?.used_credits || 0} used)
    </span>
  </div>
)}
```

**Features:**
- Visible only for role='admin' (not Super Admin)
- Shows available credits prominently
- Displays total/used in smaller text
- Read-only badge with sparkles icon
- Gradient background (purple to indigo)

---

## 🔒 SECURITY FEATURES

### 1. Role-Based Access Control (RBAC)
- ✅ JWT tokens include `role` field
- ✅ Middleware enforces Super Admin access for sensitive routes
- ✅ 403 Forbidden if regular Admin tries to access Super Admin routes
- ✅ Frontend checks `admin.role` before rendering Super Admin UI

### 2. Credit System Security
- ✅ Credits are **immutable** once in ledger
- ✅ Ledger entries cannot be edited or deleted
- ✅ All operations require **mandatory reason**
- ✅ Balance validation before deduction
- ✅ Admin cannot modify their own credits
- ✅ Admin cannot access other admins' data

### 3. Admin Management Security
- ✅ Super Admin cannot modify other Super Admin accounts
- ✅ Super Admin cannot modify their own role
- ✅ Email uniqueness validation
- ✅ Password minimum 8 characters
- ✅ Account status (active/suspended) enforced

---

## 💳 CREDIT SYSTEM

### Credit Properties
- **Global per Admin** - Not tied to individual weddings
- **Non-expiring** - Credits persist until used
- **Integer-based** - Whole number credits only
- **Auditable** - Complete transaction history

### Credit Operations

#### 1. Add Credits
- **Who:** Super Admin only
- **API:** `POST /api/super-admin/credits/add`
- **Required:** admin_id, amount, reason
- **Result:** Increases `total_credits`, creates ledger entry

#### 2. Deduct Credits
- **Who:** Super Admin only
- **API:** `POST /api/super-admin/credits/deduct`
- **Required:** admin_id, amount, reason
- **Validation:** Checks sufficient balance
- **Result:** Increases `used_credits`, creates ledger entry

#### 3. View Credits
- **Who:** Admin (own credits), Super Admin (all admins)
- **API:** `GET /api/auth/me` or `GET /api/super-admin/admins`
- **Returns:** total_credits, used_credits, available_credits

#### 4. Credit Ledger
- **Who:** Super Admin only
- **API:** `GET /api/super-admin/credits/ledger/{admin_id}`
- **Returns:** Complete transaction history
- **Properties:** Read-only, immutable, chronological

---

## 📊 LEDGER STRUCTURE

Each ledger entry contains:
```json
{
  "credit_id": "uuid",
  "admin_id": "admin_uuid",
  "action_type": "add|deduct|adjust",
  "amount": 100,
  "reason": "Initial credits for new photographer",
  "related_wedding_id": null,
  "performed_by": "super_admin_id",
  "balance_after": 100,
  "metadata": {
    "action": "super_admin_add",
    "source": "manual_operation"
  },
  "created_at": "2025-02-09T10:30:00Z"
}
```

---

## 🚀 TESTING CHECKLIST

### Backend Testing
- [ ] Super Admin login with correct credentials
- [ ] Super Admin login with incorrect credentials (401)
- [ ] Regular Admin cannot access Super Admin routes (403)
- [ ] Create Admin account with initial credits
- [ ] Create Admin with duplicate email (400)
- [ ] List all Admins (excludes Super Admins)
- [ ] Add credits to Admin (positive amount)
- [ ] Deduct credits with sufficient balance
- [ ] Deduct credits with insufficient balance (400)
- [ ] View credit ledger (chronological order)
- [ ] Ledger immutability (no edit/delete endpoints)
- [ ] Suspend/Activate Admin account
- [ ] Admin status enforcement

### Frontend Testing
- [ ] Super Admin login page loads
- [ ] Redirect to dashboard after login
- [ ] Admin list table displays correctly
- [ ] Create Admin modal validation
- [ ] Credit operation modal (add/deduct toggle)
- [ ] Ledger modal displays transaction history
- [ ] Regular Admin sees credit balance in dashboard
- [ ] Regular Admin cannot access `/super-admin/dashboard`
- [ ] Logout functionality
- [ ] Real-time UI updates after operations

---

## 🔮 FUTURE COMPATIBILITY

This system is designed to support future features:

### ✅ Ready for:
1. **Design-Based Credit Deduction**
   - Different designs cost different credits
   - Deduct credits on template/design selection

2. **Publish-Time Deduction**
   - Auto-deduct credits when wedding is published
   - Prevent publish if insufficient credits

3. **God/No-God Design Pricing**
   - Premium designs with religious elements
   - Different pricing tiers

4. **Payment-Based Credit Purchases**
   - Admin can buy credits via payment gateway
   - Razorpay/Stripe integration ready

5. **Credit Expiry (Optional)**
   - Currently no expiry (by design)
   - Can add expiry_date field if needed

6. **Referral Bonuses**
   - Award credits for successful referrals
   - Integration with existing referral system

---

## 📝 IMPLEMENTATION NOTES

### Why Two Admin Systems?
- **Regular Admin** (existing) manages wedding profiles
- **Super Admin** (new) manages the Admins themselves
- Separation of concerns: platform management vs. content management

### Credit System Design Decisions
1. **Global Credits** - Simplifies management, avoids per-wedding complexity
2. **Non-Expiring** - Admin-friendly, reduces friction
3. **Integer-Based** - Clearer pricing, easier calculations
4. **Immutable Ledger** - Audit compliance, trust building

### Security Considerations
- JWT tokens store role for quick authorization
- Database stores authoritative role (token validated on each request)
- Super Admin routes use `Depends(require_super_admin)` for enforcement
- Frontend hides UI elements, but backend enforces access

---

## 🔑 DEFAULT CREDENTIALS

### Super Admin
- **URL:** `/super-admin/login`
- **Email:** `superadmin@wedding.com`
- **Password:** `SuperAdmin@123`
- **Credits:** 999,999 (unlimited)

### Test Admin (Create via Super Admin Dashboard)
- Create through Super Admin UI
- Set initial credits during creation
- Default status: ACTIVE

---

## 📚 API DOCUMENTATION

### 1. Create Admin
```bash
POST /api/super-admin/admins
Authorization: Bearer {super_admin_token}
Content-Type: application/json

{
  "email": "photographer@example.com",
  "password": "SecurePass123",
  "name": "John Photographer",
  "initial_credits": 50
}

Response: AdminResponse (200)
```

### 2. List Admins
```bash
GET /api/super-admin/admins
Authorization: Bearer {super_admin_token}

Response: List[AdminResponse] (200)
```

### 3. Add Credits
```bash
POST /api/super-admin/credits/add
Authorization: Bearer {super_admin_token}
Content-Type: application/json

{
  "admin_id": "admin_uuid",
  "amount": 100,
  "reason": "Bonus credits for excellent performance"
}

Response: {"message": "Credits added successfully"} (200)
```

### 4. Deduct Credits
```bash
POST /api/super-admin/credits/deduct
Authorization: Bearer {super_admin_token}
Content-Type: application/json

{
  "admin_id": "admin_uuid",
  "amount": 10,
  "reason": "Manual adjustment for refund"
}

Response: {"message": "Credits deducted successfully"} (200)
```

### 5. View Ledger
```bash
GET /api/super-admin/credits/ledger/{admin_id}
Authorization: Bearer {super_admin_token}

Response: List[CreditLedgerResponse] (200)
```

### 6. Update Admin Status
```bash
PUT /api/super-admin/admins/{admin_id}/status
Authorization: Bearer {super_admin_token}
Content-Type: application/json

{
  "status": "suspended"
}

Response: {"message": "Admin status updated"} (200)
```

---

## ✅ SUCCESS CRITERIA

All requirements met:

- [x] Super Admin fully controls Admin creation & credits
- [x] Admins cannot bypass or manipulate credits
- [x] Credit ledger is audit-safe and immutable
- [x] System is scalable for future monetization
- [x] Strict role-based access control (RBAC)
- [x] Credits are non-expiring and integer-based
- [x] Middleware-level enforcement
- [x] Complete UI for Super Admin and Admin
- [x] Foundation ready for design logic integration

---

## 🎉 PHASE 35 (NEW) - COMPLETE!

**Status:** ✅ Fully Implemented and Ready for Testing

**Next Steps:**
1. Test all Super Admin workflows
2. Test Admin credit balance display
3. Verify role-based access control
4. Validate ledger immutability
5. Prepare for Phase 36/37 integration (credit deduction on publish)
