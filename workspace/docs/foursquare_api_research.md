# Foursquare API Research Findings
Last Updated: 2024-02-19

## Executive Summary
Our investigation of Foursquare's Personalization API for accessing user check-in data reveals that while the API endpoints exist, they require specific OAuth authentication flows and user authorization.

## API Credentials
- Client ID: 4V1P22T2MXSSSQBIZVHZBFJCHH1H33KLISIZ1GD0CWRR3F0A
- Target User ID: 34510087

## API Endpoints Tested

### 1. User Details
```
GET https://api.foursquare.com/v2/users/{USER_ID}
Params:
  v: 20240101
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

### 2. User Checkins
```
GET https://api.foursquare.com/v2/users/{USER_ID}/checkins
Params:
  v: 20240101
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

### 3. User Visits
```
GET https://api.foursquare.com/v2/users/{USER_ID}/visits
Params:
  v: 20240101
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

## Authentication Requirements

### OAuth 2.0 Flow
1. **User Authorization**
```
https://foursquare.com/oauth2/authenticate
?client_id=4V1P22T2MXSSSQBIZVHZBFJCHH1H33KLISIZ1GD0CWRR3F0A
?response_type=code
?redirect_uri=http://localhost:3000/callback
```

2. **Token Exchange**
```
POST https://foursquare.com/oauth2/access_token
Params:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
  grant_type: authorization_code
  redirect_uri: YOUR_REDIRECT_URI
  code: AUTHORIZATION_CODE
```

## Implementation Guide

### 1. Setup Requirements
- Register redirect URI in Foursquare Developer Console
- Set up secure storage for OAuth tokens
- Implement proper error handling

### 2. Frontend Implementation
```javascript
// OAuth initialization
const initOAuth = () => {
  const authUrl = `https://foursquare.com/oauth2/authenticate
    ?client_id=${CLIENT_ID}
    &response_type=code
    &redirect_uri=${REDIRECT_URI}`;
  window.location.href = authUrl;
};

// Handle OAuth callback
const handleCallback = async (code) => {
  const response = await fetch('/api/token', {
    method: 'POST',
    body: JSON.stringify({ code })
  });
  const { access_token } = await response.json();
  // Store token securely
};
```

### 3. Backend Implementation
```javascript
// Token exchange endpoint
app.post('/api/token', async (req, res) => {
  const { code } = req.body;
  const tokenUrl = 'https://foursquare.com/oauth2/access_token';
  const params = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code
  };
  
  const response = await fetch(`${tokenUrl}?${new URLSearchParams(params)}`);
  const data = await response.json();
  res.json(data);
});
```

## Test Results

### Direct API Access (Client Credentials)
- Status: Failed
- Error: Authorization required
- Note: Client credentials alone are insufficient

### OAuth Flow Required
- User must explicitly authorize access
- Access token required for all personalization endpoints
- Token must be refreshed periodically

## Implementation Recommendations

### Short-term Solution
1. Implement mock data for visited locations
2. Add visual indicators on map (different colored pins)
3. Store visit status locally

### Long-term Solution
1. Implement full OAuth flow
2. Add secure token storage
3. Handle token refresh
4. Implement proper error handling
5. Add loading states for API calls

## Technical Considerations
1. OAuth tokens must be stored securely
2. Implement proper error handling for API failures
3. Consider rate limiting and API quotas
4. Add fallback for when API is unavailable

## Conclusion
Accessing user check-in data through Foursquare's API requires implementing OAuth 2.0 authentication. While technically feasible, it requires significant development effort and user authorization. We recommend starting with the short-term solution while implementing the full OAuth flow as a future enhancement.