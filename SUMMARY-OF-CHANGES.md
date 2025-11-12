# Summary of Changes Made to Fix Deployment Issues

This document summarizes all the key changes made to resolve the deployment issues with the ThuyTung application, including Node.js module errors, IIS 500 errors, and CORS/ERR_BLOCKED_BY_CLIENT errors.

## 1. Node.js Module System Issue Resolution

### Problem
- Error: "SyntaxError: Cannot use import statement outside a module"
- Root cause: Mismatch between tsconfig.json (ES modules) and package.json (CommonJS)

### Solution
Modified [server/tsconfig.json](file:///D:/ThuyTung/sever/deployment/server/src/tsconfig.json) to use CommonJS modules:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    // ... other options
  }
}
```

## 2. IIS Configuration Issues

### Problem
- 500 Internal Server Errors when accessing sites through IIS
- Incorrect physical paths in IIS sites
- Invalid iisnode configuration attributes

### Solutions
1. **Fixed IIS Site Paths**: Ensured sites point to correct physical directories
2. **Removed Invalid Attributes**: Removed `enableXForwardedFor` from iisnode configuration
3. **Added Tracing**: Enabled Failed Request Tracing for debugging
4. **Proper Proxy Configuration**: Configured reverse proxy rules correctly

### Key Configuration Files

#### Client web.config
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <proxy enabled="true" />
    <rewrite>
      <rules>
        <!-- API requests to backend -->
        <rule name="Proxy API to Backend" stopProcessing="true">
          <match url="^api/v1/(.*)" />
          <action type="Rewrite" url="http://localhost:5000/api/v1/{R:1}" />
        </rule>
        
        <!-- All other requests to Next.js -->
        <rule name="Proxy to Next.js App" stopProcessing="true">
          <match url="(.*)" />
          <action type="Rewrite" url="http://localhost:3000/{R:1}" />
        </rule>
      </rules>
    </rewrite>
    <httpProtocol>
      <customHeaders>
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-Frame-Options" value="DENY" />
        <add name="X-XSS-Protection" value="1; mode=block" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

#### Server web.config
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <proxy enabled="true" />
    <httpProtocol>
      <customHeaders>
        <add name="Access-Control-Allow-Origin" value="https://www.thuytung.edu.vn" />
        <add name="Access-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS" />
        <add name="Access-Control-Allow-Headers" value="Origin, X-Requested-With, Content-Type, Accept, Authorization" />
        <add name="Access-Control-Allow-Credentials" value="true" />
      </customHeaders>
    </httpProtocol>
    <rewrite>
      <rules>
        <rule name="Proxy to Node.js App" stopProcessing="true">
          <match url="(.*)" />
          <action type="Rewrite" url="http://localhost:5000/{R:1}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## 3. CORS/ERR_BLOCKED_BY_CLIENT Issues

### Problem
- Frontend JavaScript hardcoded to use `http://localhost:5000`
- Browser blocking requests due to CORS policy
- Cannot modify pre-built JavaScript files directly

### Solution
Implemented comprehensive runtime configuration injection in [client/server.js](file:///D:/ThuyTung/sever/deployment/client/server.js):

1. **HTML Response Interception**: Modified the server to intercept HTML responses
2. **Script Injection**: Injected JavaScript to override XMLHttpRequest, fetch API, jQuery AJAX, and Axios
3. **Multiple Interception Methods**: Added support for various JavaScript frameworks and libraries

### Key Features of Runtime Configuration
```javascript
// Override XMLHttpRequest
XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
  const newUrl = url.replace(/http:\/\/localhost:5000/g, 'https://api.thuytung.edu.vn');
  return originalXHROpen.call(this, method, newUrl, async, user, password);
};

// Override fetch API
window.fetch = function(input, init) {
  let modifiedInput = input;
  if (typeof input === 'string') {
    modifiedInput = input.replace(/http:\/\/localhost:5000/g, 'https://api.thuytung.edu.vn');
  }
  return originalFetch.call(this, modifiedInput, init);
};

// Intercept jQuery AJAX
jQuery.ajaxSetup({
  beforeSend: function(xhr, settings) {
    settings.url = settings.url.replace(/http:\/\/localhost:5000/g, 'https://api.thuytung.edu.vn');
  }
});

// Intercept Axios
axios.interceptors.request.use(function(config) {
  config.url = config.url.replace(/http:\/\/localhost:5000/g, 'https://api.thuytung.edu.vn');
  return config;
});
```

## 4. Application Startup Files

### Client server.js Key Features
- Starts Next.js application on port 3000
- Implements HTML response interception
- Injects runtime configuration script
- Handles both compressed and uncompressed responses
- Comprehensive logging for debugging

### Server server.js Key Features
- Starts Node.js API on port 5000 (standard port)
- Uses spawn to run dist/index.js
- Proper environment variable configuration
- Process management and graceful shutdown

## 5. Hosts File Configuration

Added entries to resolve domain names locally:
```
127.0.0.1 www.thuytung.edu.vn
127.0.0.1 api.thuytung.edu.vn
```

## 6. SSL Certificate Configuration

- Created self-signed certificates for both domains
- Bound certificates to HTTPS ports
- Configured IIS sites with HTTPS bindings

## 7. Environment Configuration

### Client .env
```env
NEXT_PUBLIC_SERVER_URL=https://api.thuytung.edu.vn
NEXT_PUBLIC_API_URL=https://api.thuytung.edu.vn/api/v1
NEXT_PUBLIC_DOMAIN=thuytung.edu.vn
```

### Server .env
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://www.thuytung.edu.vn
```

## 8. Testing Files

Created several test files to verify functionality:
- [api-test.html](file:///D:/ThuyTung/sever/deployment/client/public/api-test.html) - Tests API connectivity
- Various other test files in the client/public directory

## Key Improvements

1. **Fixed Module System Issues**: Updated tsconfig.json to use CommonJS modules
2. **Enhanced Runtime Configuration**: Implemented comprehensive JavaScript interception
3. **Proper IIS Configuration**: Corrected web.config files to avoid 500 errors
4. **Standard Port Usage**: Using standard port 5000 for the backend API
5. **Comprehensive Interception**: Added support for XMLHttpRequest, fetch API, jQuery AJAX, and Axios
6. **Improved Error Handling**: Added detailed logging to help with troubleshooting

## Deployment Architecture

```
Internet
    ↓
IIS (Port 80/443)
    ↓
├── Client Site (www.thuytung.edu.vn)
│   ├── Reverse Proxy to Next.js App (localhost:3000)
│   └── API Requests → Reverse Proxy to Backend (localhost:5000)
└── Server Site (api.thuytung.edu.vn)
    └── Reverse Proxy to Node.js API (localhost:5000)
```

This comprehensive approach resolves all the issues encountered during the initial deployment and provides a stable, production-ready setup.