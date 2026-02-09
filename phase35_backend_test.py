"""
PHASE 35 Backend Testing Script
Tests all Super Admin and Credit System functionality
"""

import asyncio
import httpx
from datetime import datetime

BASE_URL = "http://localhost:8001/api"

# Test credentials
SUPER_ADMIN_EMAIL = "superadmin@wedding.com"
SUPER_ADMIN_PASSWORD = "SuperAdmin@123"

# Store tokens
super_admin_token = None
photographer_admin_token = None
photographer_admin_id = None


async def test_super_admin_login():
    """Test 1: Super Admin Login"""
    print("\n" + "="*80)
    print("TEST 1: Super Admin Login")
    print("="*80)
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/auth/login",
            json={
                "email": SUPER_ADMIN_EMAIL,
                "password": SUPER_ADMIN_PASSWORD
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            global super_admin_token
            super_admin_token = data.get('access_token')
            print(f"✅ Super Admin login successful")
            print(f"   Token: {super_admin_token[:50]}...")
            print(f"   Admin Name: {data.get('name')}")
            print(f"   Role: {data.get('role')}")
            return True
        else:
            print(f"❌ Login failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_get_super_admin_profile():
    """Test 2: Get Super Admin Profile"""
    print("\n" + "="*80)
    print("TEST 2: Get Super Admin Profile (/api/auth/me)")
    print("="*80)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {super_admin_token}"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Profile retrieved successfully")
            print(f"   Email: {data.get('email')}")
            print(f"   Name: {data.get('name')}")
            print(f"   Role: {data.get('role')}")
            print(f"   Status: {data.get('status')}")
            print(f"   Credits: {data.get('available_credits')} available / {data.get('total_credits')} total")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_create_photographer_admin():
    """Test 3: Create Photographer Admin"""
    print("\n" + "="*80)
    print("TEST 3: Create Photographer Admin")
    print("="*80)
    
    photographer_email = f"photographer_{int(datetime.now().timestamp())}@test.com"
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/super-admin/admins",
            headers={"Authorization": f"Bearer {super_admin_token}"},
            json={
                "email": photographer_email,
                "password": "Test@1234",
                "name": "Test Photographer",
                "initial_credits": 100
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            global photographer_admin_id
            photographer_admin_id = data.get('id')
            print(f"✅ Photographer admin created successfully")
            print(f"   ID: {photographer_admin_id}")
            print(f"   Email: {photographer_email}")
            print(f"   Name: {data.get('name')}")
            print(f"   Role: {data.get('role')}")
            print(f"   Initial Credits: {data.get('total_credits')}")
            
            # Store for later login test
            global photographer_email_stored
            photographer_email_stored = photographer_email
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_list_all_admins():
    """Test 4: List All Photographer Admins"""
    print("\n" + "="*80)
    print("TEST 4: List All Photographer Admins")
    print("="*80)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/super-admin/admins",
            headers={"Authorization": f"Bearer {super_admin_token}"}
        )
        
        if response.status_code == 200:
            admins = response.json()
            print(f"✅ Retrieved {len(admins)} photographer admin(s)")
            for admin in admins:
                print(f"\n   Admin: {admin.get('name')}")
                print(f"   Email: {admin.get('email')}")
                print(f"   Status: {admin.get('status')}")
                print(f"   Credits: {admin.get('available_credits')} / {admin.get('total_credits')}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_add_credits():
    """Test 5: Add Credits to Photographer"""
    print("\n" + "="*80)
    print("TEST 5: Add Credits to Photographer")
    print("="*80)
    
    if not photographer_admin_id:
        print("❌ No photographer admin ID available")
        return False
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/super-admin/credits/add",
            headers={"Authorization": f"Bearer {super_admin_token}"},
            json={
                "admin_id": photographer_admin_id,
                "amount": 50,
                "reason": "Test credit addition for verification"
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Credits added successfully")
            print(f"   Admin ID: {data.get('admin_id')}")
            print(f"   Total Credits: {data.get('total_credits')}")
            print(f"   Available Credits: {data.get('available_credits')}")
            print(f"   Ledger Entry ID: {data.get('ledger_id')}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_deduct_credits():
    """Test 6: Deduct Credits from Photographer"""
    print("\n" + "="*80)
    print("TEST 6: Deduct Credits from Photographer")
    print("="*80)
    
    if not photographer_admin_id:
        print("❌ No photographer admin ID available")
        return False
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/super-admin/credits/deduct",
            headers={"Authorization": f"Bearer {super_admin_token}"},
            json={
                "admin_id": photographer_admin_id,
                "amount": 20,
                "reason": "Test credit deduction for verification"
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Credits deducted successfully")
            print(f"   Admin ID: {data.get('admin_id')}")
            print(f"   Total Credits: {data.get('total_credits')}")
            print(f"   Available Credits: {data.get('available_credits')}")
            print(f"   Ledger Entry ID: {data.get('ledger_id')}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_view_credit_ledger():
    """Test 7: View Credit Ledger"""
    print("\n" + "="*80)
    print("TEST 7: View Credit Ledger")
    print("="*80)
    
    if not photographer_admin_id:
        print("❌ No photographer admin ID available")
        return False
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/super-admin/credits/ledger/{photographer_admin_id}",
            headers={"Authorization": f"Bearer {super_admin_token}"}
        )
        
        if response.status_code == 200:
            ledger = response.json()
            print(f"✅ Ledger retrieved successfully")
            print(f"   Total Entries: {len(ledger)}")
            
            for i, entry in enumerate(ledger, 1):
                print(f"\n   Entry {i}:")
                print(f"      Action: {entry.get('action_type')}")
                print(f"      Amount: {entry.get('amount')}")
                print(f"      Balance After: {entry.get('balance_after')}")
                print(f"      Reason: {entry.get('reason')}")
                print(f"      Date: {entry.get('created_at')}")
            
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_photographer_login():
    """Test 8: Photographer Admin Login"""
    print("\n" + "="*80)
    print("TEST 8: Photographer Admin Login")
    print("="*80)
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/auth/login",
            json={
                "email": photographer_email_stored,
                "password": "Test@1234"
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            global photographer_admin_token
            photographer_admin_token = data.get('access_token')
            print(f"✅ Photographer admin login successful")
            print(f"   Token: {photographer_admin_token[:50]}...")
            print(f"   Admin Name: {data.get('name')}")
            print(f"   Role: {data.get('role')}")
            return True
        else:
            print(f"❌ Login failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_photographer_view_own_credits():
    """Test 9: Photographer Views Own Credits"""
    print("\n" + "="*80)
    print("TEST 9: Photographer Views Own Credits (/api/auth/me)")
    print("="*80)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {photographer_admin_token}"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Photographer can view own credits")
            print(f"   Email: {data.get('email')}")
            print(f"   Role: {data.get('role')}")
            print(f"   Available Credits: {data.get('available_credits')}")
            print(f"   Total Credits: {data.get('total_credits')}")
            print(f"   Used Credits: {data.get('used_credits')}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_photographer_cannot_access_super_admin_routes():
    """Test 10: Photographer Cannot Access Super Admin Routes"""
    print("\n" + "="*80)
    print("TEST 10: Photographer Cannot Access Super Admin Routes")
    print("="*80)
    
    async with httpx.AsyncClient() as client:
        # Try to access Super Admin route
        response = await client.get(
            f"{BASE_URL}/super-admin/admins",
            headers={"Authorization": f"Bearer {photographer_admin_token}"}
        )
        
        if response.status_code == 403:
            print(f"✅ Photographer correctly denied access (403 Forbidden)")
            print(f"   Response: {response.json()}")
            return True
        else:
            print(f"❌ Unexpected status code: {response.status_code}")
            print(f"   Expected 403, got {response.status_code}")
            return False


async def test_suspend_admin():
    """Test 11: Suspend Admin"""
    print("\n" + "="*80)
    print("TEST 11: Suspend Admin Account")
    print("="*80)
    
    if not photographer_admin_id:
        print("❌ No photographer admin ID available")
        return False
    
    async with httpx.AsyncClient() as client:
        response = await client.put(
            f"{BASE_URL}/super-admin/admins/{photographer_admin_id}/status",
            headers={"Authorization": f"Bearer {super_admin_token}"},
            json={"status": "suspended"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Admin suspended successfully")
            print(f"   Admin ID: {photographer_admin_id}")
            print(f"   New Status: {data.get('status')}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def test_activate_admin():
    """Test 12: Activate Admin"""
    print("\n" + "="*80)
    print("TEST 12: Activate Admin Account")
    print("="*80)
    
    if not photographer_admin_id:
        print("❌ No photographer admin ID available")
        return False
    
    async with httpx.AsyncClient() as client:
        response = await client.put(
            f"{BASE_URL}/super-admin/admins/{photographer_admin_id}/status",
            headers={"Authorization": f"Bearer {super_admin_token}"},
            json={"status": "active"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Admin activated successfully")
            print(f"   Admin ID: {photographer_admin_id}")
            print(f"   New Status: {data.get('status')}")
            return True
        else:
            print(f"❌ Failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False


async def run_all_tests():
    """Run all PHASE 35 backend tests"""
    print("\n" + "="*80)
    print("PHASE 35 BACKEND TESTING - COMPREHENSIVE VERIFICATION")
    print("="*80)
    print(f"Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80)
    
    tests = [
        test_super_admin_login,
        test_get_super_admin_profile,
        test_create_photographer_admin,
        test_list_all_admins,
        test_add_credits,
        test_deduct_credits,
        test_view_credit_ledger,
        test_photographer_login,
        test_photographer_view_own_credits,
        test_photographer_cannot_access_super_admin_routes,
        test_suspend_admin,
        test_activate_admin,
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            result = await test()
            if result:
                passed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"❌ Test raised exception: {str(e)}")
            failed += 1
    
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Total Tests: {len(tests)}")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"Success Rate: {(passed / len(tests) * 100):.1f}%")
    print(f"End Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80)


if __name__ == "__main__":
    asyncio.run(run_all_tests())
