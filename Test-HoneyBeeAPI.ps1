# Automated API Testing Script for Honey Bee Storefront
# Tests all 19 public API endpoints
# Run: .\Test-HoneyBeeAPI.ps1

param(
    [string]$BaseUrl = "http://localhost:8000/api/v1",
    [string]$StoreId = "2"
)

# Color output functions
function Write-Success { param($msg) Write-Host "[PASS] $msg" -ForegroundColor Green }
function Write-Fail { param($msg) Write-Host "[FAIL] $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warning { param($msg) Write-Host "[WARN] $msg" -ForegroundColor Yellow }

# Test result tracking
$script:totalTests = 0
$script:passedTests = 0
$script:failedTests = 0
$script:testResults = @()

# Headers for all requests
$headers = @{
    "X-Store-ID" = $StoreId
    "Accept" = "application/json"
    "Content-Type" = "application/json"
}

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Url,
        [hashtable]$Body = $null,
        [int]$ExpectedStatus = 200,
        [string]$AuthToken = $null
    )
    
    $script:totalTests++
    $testHeaders = $headers.Clone()
    
    if ($AuthToken) {
        $testHeaders["Authorization"] = "Bearer $AuthToken"
    }
    
    try {
        $startTime = Get-Date
        
        $params = @{
            Uri = "$BaseUrl$Url"
            Method = $Method
            Headers = $testHeaders
            UseBasicParsing = $true
            ErrorAction = "Stop"
        }
        
        if ($Body) {
            $params["Body"] = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-WebRequest @params
        $endTime = Get-Date
        $duration = ($endTime - $startTime).TotalMilliseconds
        
        $statusCode = [int]$response.StatusCode
        
        if ($statusCode -eq $ExpectedStatus) {
            Write-Success "$Name - Status: $statusCode - ${duration}ms"
            $script:passedTests++
            $result = @{
                Test = $Name
                Method = $Method
                Status = "PASS"
                StatusCode = $statusCode
                Duration = [math]::Round($duration, 0)
                Error = $null
            }
        } else {
            Write-Fail "$Name - Expected: $ExpectedStatus, Got: $statusCode"
            $script:failedTests++
            $result = @{
                Test = $Name
                Method = $Method
                Status = "FAIL"
                StatusCode = $statusCode
                Duration = [math]::Round($duration, 0)
                Error = "Status code mismatch"
            }
        }
    }
    catch {
        Write-Fail "$Name - Error: $($_.Exception.Message)"
        $script:failedTests++
        $result = @{
            Test = $Name
            Method = $Method
            Status = "FAIL"
            StatusCode = "N/A"
            Duration = "N/A"
            Error = $_.Exception.Message
        }
    }
    
    $script:testResults += $result
}

Write-Info "Starting Honey Bee API Tests..."
Write-Info "Base URL: $BaseUrl"
Write-Info "Store ID: $StoreId"
Write-Host ""

# ────────────────────────────────────────────────────────────────────
#  Category 1: Products API
# ────────────────────────────────────────────────────────────────────

Write-Host "`n═══ PRODUCTS API ═══" -ForegroundColor Yellow

Test-Endpoint `
    -Name "GET /products - List all products" `
    -Method "GET" `
    -Url "/public/products" `
    -ExpectedStatus 200

Test-Endpoint `
    -Name "GET /products?search=lavender - Search products" `
    -Method "GET" `
    -Url "/public/products?search=lavender" `
    -ExpectedStatus 200

Test-Endpoint `
    -Name "GET /products?is_featured=1 - Featured products" `
    -Method "GET" `
    -Url "/public/products?is_featured=1" `
    -ExpectedStatus 200

Test-Endpoint `
    -Name "GET /products/{slug} - Single product by slug" `
    -Method "GET" `
    -Url "/public/products/manuka-honey-cleansing-bar" `
    -ExpectedStatus 200

# ────────────────────────────────────────────────────────────────────
#  Category 2: Categories API
# ────────────────────────────────────────────────────────────────────

Write-Host "`n═══ CATEGORIES API ═══" -ForegroundColor Yellow

Test-Endpoint `
    -Name "GET /categories - List all categories" `
    -Method "GET" `
    -Url "/public/categories" `
    -ExpectedStatus 200

Test-Endpoint `
    -Name "GET /categories/{slug} - Single category" `
    -Method "GET" `
    -Url "/public/categories/pure-honey-soaps" `
    -ExpectedStatus 200

# ────────────────────────────────────────────────────────────────────
#  Category 3: Cart API
# ────────────────────────────────────────────────────────────────────

Write-Host "`n═══ CART API ═══" -ForegroundColor Yellow

# Test 1: Create cart
Test-Endpoint `
    -Name "POST /cart - Create new cart" `
    -Method "POST" `
    -Url "/public/cart" `
    -ExpectedStatus 201

# Get cart token from response
try {
    $cartResponse = Invoke-RestMethod -Uri "$BaseUrl/public/cart" -Method POST -Headers $headers
    $cartToken = $cartResponse.data.token
    Write-Info "Cart token: $cartToken"
    
    # Test 2: Get cart
    Test-Endpoint `
        -Name "GET /cart/{token} - Get cart by token" `
        -Method "GET" `
        -Url "/public/cart/$cartToken" `
        -ExpectedStatus 200
    
    # Test 3: Add item to cart
    Test-Endpoint `
        -Name "POST /cart/items - Add item to cart" `
        -Method "POST" `
        -Url "/public/cart/$cartToken/items" `
        -Body @{ product_id = 26; quantity = 2 } `
        -ExpectedStatus 201
    
    # Get cart items to test update/delete
    $cartWithItems = Invoke-RestMethod -Uri "$BaseUrl/public/cart/$cartToken" -Headers $headers
    
    if ($cartWithItems.data.items.Count -gt 0) {
        $itemId = $cartWithItems.data.items[0].id
        
        # Test 4: Update item quantity
        Test-Endpoint `
            -Name "PATCH /cart/items/{id} - Update quantity" `
            -Method "PATCH" `
            -Url "/public/cart/$cartToken/items/$itemId" `
            -Body @{ quantity = 5 } `
            -ExpectedStatus 200
        
        # Test 5: Remove item
        Test-Endpoint `
            -Name "DELETE /cart/items/{id} - Remove item" `
            -Method "DELETE" `
            -Url "/public/cart/$cartToken/items/$itemId" `
            -ExpectedStatus 200
    } else {
        Write-Warning "No items in cart - skipping update/delete tests"
    }
}
catch {
    Write-Warning "Cart tests partially failed: $($_.Exception.Message)"
}

# ────────────────────────────────────────────────────────────────────
#  Category 4: Customer API
# ────────────────────────────────────────────────────────────────────

Write-Host "`n═══ CUSTOMER API ═══" -ForegroundColor Yellow

# Test 1: Register customer
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$registerData = @{
    name = "API Test User $timestamp"
    email = "apitest$timestamp@example.com"
    phone = "+919876543210" # India E.164 format
    password = "password123"
    password_confirmation = "password123"
}

Test-Endpoint `
    -Name "POST /customer/register - Register new customer" `
    -Method "POST" `
    -Url "/public/customer/register" `
    -Body $registerData `
    -ExpectedStatus 201

# Test 2: Login customer
$loginData = @{
    login = $registerData.phone
    password = $registerData.password
}

try {
    $loginResponse = Invoke-RestMethod `
        -Uri "$BaseUrl/public/customer/login" `
        -Method POST `
        -Headers $headers `
        -Body ($loginData | ConvertTo-Json)
    
    $authToken = $loginResponse.data.token
    Write-Info "Auth token: $authToken"
    
    Test-Endpoint `
        -Name "POST /customer/login - Login customer" `
        -Method "POST" `
        -Url "/public/customer/login" `
        -Body $loginData `
        -ExpectedStatus 200
    
    # Test 3: Get profile (authenticated)
    Test-Endpoint `
        -Name "GET /customer/profile - Get customer profile" `
        -Method "GET" `
        -Url "/public/customer/profile" `
        -AuthToken $authToken `
        -ExpectedStatus 200
    
    # Test 4: Get orders (authenticated)
    Test-Endpoint `
        -Name "GET /customer/orders - Get order history" `
        -Method "GET" `
        -Url "/public/customer/orders" `
        -AuthToken $authToken `
        -ExpectedStatus 200
    
    # Test 5: Logout
    Test-Endpoint `
        -Name "POST /customer/logout - Logout customer" `
        -Method "POST" `
        -Url "/public/customer/logout" `
        -AuthToken $authToken `
        -ExpectedStatus 200
}
catch {
    Write-Warning "Customer auth tests partially failed: $($_.Exception.Message)"
}

# ────────────────────────────────────────────────────────────────────
#  Category 5: Checkout API
# ────────────────────────────────────────────────────────────────────

Write-Host "`n═══ CHECKOUT API ═══" -ForegroundColor Yellow

# Create cart with item for checkout
try {
    $checkoutCartResponse = Invoke-RestMethod -Uri "$BaseUrl/public/cart" -Method POST -Headers $headers
    $checkoutCartToken = $checkoutCartResponse.data.token
    
    # Add item
    $addItemBody = @{ product_id = 26; quantity = 2 } | ConvertTo-Json
    Invoke-RestMethod `
        -Uri "$BaseUrl/public/cart/$checkoutCartToken/items" `
        -Method POST `
        -Headers $headers `
        -Body $addItemBody | Out-Null
    
    # Test guest checkout
    $checkoutData = @{
        cart_token = $checkoutCartToken
        payment_method = "pending"
        email = "guestcheckout@example.com"
        first_name = "Guest"
        last_name = "Customer"
        phone = "+919876543210"
        note = "API test order"
    }
    
    Test-Endpoint `
        -Name "POST /checkout/guest - Guest checkout" `
        -Method "POST" `
        -Url "/public/checkout" `
        -Body $checkoutData `
        -ExpectedStatus 201
}
catch {
    Write-Warning "Checkout test failed: $($_.Exception.Message)"
}

# ────────────────────────────────────────────────────────────────────
#  Test Summary
# ────────────────────────────────────────────────────────────────────

Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "          TEST SUMMARY" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

Write-Host "Total Tests: $totalTests"
Write-Success "Passed: $passedTests"
Write-Fail "Failed: $failedTests"

$passRate = if ($totalTests -gt 0) { [math]::Round(($passedTests / $totalTests) * 100, 1) } else { 0 }
Write-Host "Pass Rate: $passRate%"

# Display failed tests
if ($failedTests -gt 0) {
    Write-Host "`n[!] FAILED TESTS:" -ForegroundColor Red
    $script:testResults | Where-Object { $_.Status -eq "FAIL" } | ForEach-Object {
        Write-Host "  - $($_.Test)" -ForegroundColor Red
        if ($_.Error) {
            Write-Host "    Error: $($_.Error)" -ForegroundColor Gray
        }
    }
}

# Save results to file
$reportPath = "API-Test-Results-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
$script:testResults | ConvertTo-Json -Depth 10 | Out-File -FilePath $reportPath
Write-Info "Results saved to: $reportPath"

Write-Host "`n"

# Exit code
if ($failedTests -eq 0) {
    Write-Success "ALL TESTS PASSED"
    exit 0
} else {
    Write-Fail "SOME TESTS FAILED"
    exit 1
}
