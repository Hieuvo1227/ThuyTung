# ThuyTung Application Deployment Guide

This guide provides a comprehensive overview of how to properly deploy the ThuyTung application with both frontend (Next.js) and backend (Node.js/Express) components through IIS, resolving all previous issues including 500 errors and CORS problems.

## Overview of Issues Resolved

1. **Node.js Module System Mismatch**: Fixed "SyntaxError: Cannot use import statement outside a module" by updating tsconfig.json to use CommonJS modules
2. **IIS 500 Internal Server Errors**: Resolved through proper IIS configuration and application pool settings
3. **CORS/ERR_BLOCKED_BY_CLIENT Errors**: Fixed by implementing comprehensive runtime configuration injection
4. **Hardcoded localhost URLs**: Addressed through multiple interception methods in the client-side JavaScript

## Prerequisites

1. Windows Server with IIS installed
2. IIS Node module installed from https://github.com/Azure/iisnode
3. Node.js installed on the server
4. SSL certificates for both domains (www.thuytung.edu.vn and api.thuytung.edu.vn)

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

## Step-by-Step Deployment

### 1. Environment Configuration

#### Client Environment (.env file)
```env
NEXT_PUBLIC_SERVER_URL=https://api.thuytung.edu.vn
NEXT_PUBLIC_API_URL=https://api.thuytung.edu.vn/api/v1
NEXT_PUBLIC_DOMAIN=thuytung.edu.vn
```

#### Server Environment (.env file)
Update all placeholder values with actual production values:
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://www.thuytung.edu.vn
# Update all other values with your actual production credentials
```

### 2. IIS Configuration

#### Create Application Pools

1. Open IIS Manager
2. In the left Connections pane, expand the server node and click on "Application Pools"
3. Create two application pools:
   - **ThuyTungClient**: .NET CLR version: "No Managed Code", Managed pipeline mode: "Integrated"
   - **ThuyTungServer**: .NET CLR version: "No Managed Code", Managed pipeline mode: "Integrated"

#### Create Websites

##### Client Website (www.thuytung.edu.vn)
1. In IIS Manager, right-click on "Sites" and select "Add Website..."
2. Site name: `ThuyTung Client`
3. Application pool: `ThuyTungClient`
4. Physical path: Path to the `client` deployment folder
5. Hostname: `www.thuytung.edu.vn`
6. Port: `80` (or `443` for HTTPS)

##### Server Website (api.thuytung.edu.vn)
1. In IIS Manager, right-click on "Sites" and select "Add Website..."
2. Site name: `ThuyTung Server`
3. Application pool: `ThuyTungServer`
4. Physical path: Path to the `server` deployment folder
5. Hostname: `api.thuytung.edu.vn`
6. Port: `80` (or `443` for HTTPS)

### 3. IIS Configuration Files

#### Client web.config
This configuration handles reverse proxying to the Next.js application and API requests:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <proxy enabled="true" />
    <rewrite>
      <rules>
        <!-- Rule to proxy API requests to the backend server -->
        <rule name="Proxy API to Backend" stopProcessing="true">
          <match url="^api/v1/(.*)" />
          <action type="Rewrite" url="http://localhost:5000/api/v1/{R:1}" />
        </rule>
        
        <!-- Rule to proxy to Next.js App for all other requests -->
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
This configuration handles reverse proxying to the Node.js API and sets CORS headers:

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

### 4. Application Startup Files

#### Client server.js
This file starts the Next.js application and implements runtime configuration injection to handle hardcoded localhost URLs:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Set environment to production if not already set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Use a specific port for the client application
const port = 3000;

console.log('Starting Next.js application...');
console.log('Port:', port);
console.log('Environment:', process.env.NODE_ENV);

// For direct execution, we need to use the production build
const app = next({ dev: process.env.NODE_ENV !== 'production', hostname: 'localhost', port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('Next.js application prepared successfully');
  createServer((req, res) => {
    console.log('Received request:', req.url);
    
    // Store original methods
    const originalWrite = res.write;
    const originalEnd = res.end;
    
    let chunks = [];
    let isHtml = false;
    let isCompressed = false;
    
    // Override write method
    res.write = function(chunk) {
      // Check if this is an HTML response
      const contentType = res.getHeader('content-type');
      isHtml = false;
      if (contentType) {
        const contentTypeStr = contentType.toString().toLowerCase();
        isHtml = contentTypeStr.includes('text/html') || contentTypeStr.includes('application/xhtml+xml');
      }
      
      // Check if response is compressed
      const contentEncoding = res.getHeader('content-encoding');
      isCompressed = contentEncoding && (contentEncoding.includes('gzip') || contentEncoding.includes('deflate'));
      
      // For HTML responses, collect chunks
      if (isHtml) {
        chunks.push(chunk);
      } else {
        originalWrite.apply(res, arguments);
      }
    };
    
    // Override end method
    res.end = function(chunk) {
      // Double-check content type at the end
      const contentType = res.getHeader('content-type');
      if (contentType) {
        const contentTypeStr = contentType.toString().toLowerCase();
        isHtml = contentTypeStr.includes('text/html') || contentTypeStr.includes('application/xhtml+xml');
      }
      
      if (isHtml) {
        if (chunk) {
          chunks.push(chunk);
        }
        
        // Properly concatenate all chunks
        let body = '';
        for (let i = 0; i < chunks.length; i++) {
          if (Buffer.isBuffer(chunks[i])) {
            body += chunks[i].toString('utf8');
          } else if (typeof chunks[i] === 'string') {
            body += chunks[i];
          } else {
            body += chunks[i].toString();
          }
        }
        
        // Inject comprehensive runtime configuration script
        const runtimeConfigScript = `
<script>
  // Runtime configuration for API calls
  window.RUNTIME_CONFIG = {
    API_URL: 'https://api.thuytung.edu.vn/api/v1',
    SERVER_URL: 'https://api.thuytung.edu.vn'
  };

  // Override XMLHttpRequest to redirect localhost:5000 calls
  (function() {
    // Enhanced replacement function that handles multiple localhost patterns
    function replaceLocalhost(url) {
      if (typeof url === 'string') {
        // Replace various localhost patterns with the production API URL
        return url
          .replace(/http:\\/\\/localhost:5000/g, 'https://api.thuytung.edu.vn')
          .replace(/localhost:5000/g, 'https://api.thuytung.edu.vn');
      }
      return url;
    }

    // Intercept XMLHttpRequest
    if (typeof XMLHttpRequest !== 'undefined') {
      const originalXHROpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        const newUrl = replaceLocalhost(url);
        if (url !== newUrl) {
          console.log('Redirecting XHR from', url, 'to', newUrl);
        }
        return originalXHROpen.call(this, method, newUrl, async, user, password);
      };
    }
    
    // Override fetch API
    if (typeof fetch !== 'undefined') {
      const originalFetch = window.fetch;
      window.fetch = function(input, init) {
        let modifiedInput = input;
        
        if (typeof input === 'string') {
          modifiedInput = replaceLocalhost(input);
          if (input !== modifiedInput) {
            console.log('Redirecting fetch from', input, 'to', modifiedInput);
          }
        } else if (input && typeof input === 'object') {
          if (input.url) {
            const newUrl = replaceLocalhost(input.url);
            if (input.url !== newUrl) {
              console.log('Redirecting fetch from', input.url, 'to', newUrl);
            }
            modifiedInput = {...input, url: newUrl};
          } else if (input instanceof Request) {
            const newUrl = replaceLocalhost(input.url);
            if (input.url !== newUrl) {
              console.log('Redirecting fetch from', input.url, 'to', newUrl);
            }
            modifiedInput = new Request(newUrl, {
              method: input.method,
              headers: input.headers,
              body: input.body,
              mode: input.mode,
              credentials: input.credentials,
              cache: input.cache,
              redirect: input.redirect,
              referrer: input.referrer,
              integrity: input.integrity
            });
          }
        }
        
        return originalFetch.call(this, modifiedInput, init);
      };
    }
    
    // Intercept jQuery AJAX if present
    if (window.jQuery && window.jQuery.ajaxSetup) {
      window.jQuery.ajaxSetup({
        beforeSend: function(xhr, settings) {
          if (settings.url) {
            const oldUrl = settings.url;
            settings.url = replaceLocalhost(settings.url);
            if (oldUrl !== settings.url) {
              console.log('Redirecting jQuery AJAX from', oldUrl, 'to', settings.url);
            }
          }
        }
      });
    }
    
    // Intercept Axios if present
    if (window.axios) {
      window.axios.interceptors.request.use(function(config) {
        if (config.url) {
          const oldUrl = config.url;
          config.url = replaceLocalhost(config.url);
          if (oldUrl !== config.url) {
            console.log('Redirecting Axios from', oldUrl, 'to', config.url);
          }
        }
        if (config.baseURL) {
          const oldBaseURL = config.baseURL;
          config.baseURL = replaceLocalhost(config.baseURL);
          if (oldBaseURL !== config.baseURL) {
            console.log('Redirecting Axios baseURL from', oldBaseURL, 'to', config.baseURL);
          }
        }
        return config;
      });
    }
    
    // Also override any direct references to the axios baseURL
    setTimeout(() => {
      // Look for any existing axios instances and update their baseURL
      for (let key in window) {
        try {
          if (window[key] && window[key].defaults && window[key].defaults.baseURL && 
              window[key].defaults.baseURL.includes('localhost:5000')) {
            console.log('Updating axios baseURL for instance:', key);
            window[key].defaults.baseURL = 'https://api.thuytung.edu.vn/api/v1';
          }
        } catch (e) {
          // Ignore errors when accessing window properties
        }
      }
    }, 0);
  })();
</script>`;
        
        // Insert the script just before the closing head tag
        if (body.includes('</head>')) {
          body = body.replace('</head>', runtimeConfigScript + '</head>');
        } else if (body.includes('<body>')) {
          // If no head tag, insert before body
          body = body.replace('<body>', '<head>' + runtimeConfigScript + '</head><body>');
        } else {
          // If no head or body tag, prepend to the document
          body = runtimeConfigScript + body;
        }
        
        // Set the correct content length
        res.setHeader('Content-Length', Buffer.byteLength(body, 'utf8'));
        
        // Restore original methods
        res.write = originalWrite;
        res.end = originalEnd;
        
        // Send the modified response as a string
        res.end(body, 'utf8');
      } else {
        // Restore original methods
        res.write = originalWrite;
        res.end = originalEnd;
        
        // Send the response as is
        res.end(chunk);
      }
    };
    
    // Handle the request
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) {
      console.error('Error starting server:', err);
      throw err;
    }
    console.log('> Ready on http://localhost:' + port);
  });
}).catch(err => {
  console.error('Error preparing Next.js application:', err);
  process.exit(1);
});
```

#### Server server.js
This file starts the Node.js API application:

```javascript
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting server.js...');
console.log('Current working directory:', process.cwd());

// Set the proper environment
process.env.NODE_ENV = 'production';

// Start the Node.js application using the compiled JavaScript files
// Use port 5000 for the server application (standard port)
process.env.PORT = 5000;

const app = spawn('node', ['dist/index.js'], {
  cwd: path.join(__dirname),
  stdio: ['ignore', 'pipe', 'pipe'],
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: 5000
  }
});

console.log('Spawned node process with dist/index.js on port 5000');

app.stdout.on('data', (data) => {
  console.log(`Server output: ${data}`);
  
  // If we see the message that the root user was created, we know the server is ready
  if (data.toString().includes('Root user đã được tạo, dừng tiến trình...')) {
    console.log('Server initialization complete. Server should be running on port 5000.');
  }
});

app.stderr.on('data', (data) => {
  console.error(`Server error: ${data}`);
});

app.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, killing app process');
  app.kill('SIGTERM');
});

// Keep the parent process alive
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  app.kill('SIGINT');
  process.exit(0);
});
```

### 5. Hosts File Configuration

Add the following entries to the server's hosts file (C:\Windows\System32\drivers\etc\hosts):
```
127.0.0.1 www.thuytung.edu.vn
127.0.0.1 api.thuytung.edu.vn
```

### 6. SSL Certificate Configuration

For production deployment, configure SSL certificates for both websites:
1. Obtain SSL certificates for `www.thuytung.edu.vn` and `api.thuytung.edu.vn`
2. Import the certificates into the server
3. In IIS Manager, select each website and click "Bindings" in the Actions pane
4. Add HTTPS bindings with the appropriate certificates

### 7. Starting the Applications

1. Start both websites in IIS
2. Start the Next.js application: `cd client && node server.js`
3. Start the Node.js API application: `cd server && node server.js`

### 8. Testing the Deployment

1. Access the main website: https://www.thuytung.edu.vn
2. Verify the API is accessible: https://api.thuytung.edu.vn/api/v1
3. Test API calls from the frontend to ensure CORS issues are resolved

## Troubleshooting

### Common Issues and Solutions

1. **500 Internal Server Error**
   - Check Windows Event Logs for IIS errors
   - Verify Node.js processes are running correctly
   - Ensure application pools are configured with "No Managed Code"

2. **ERR_BLOCKED_BY_CLIENT / CORS Errors**
   - Verify the runtime configuration injection is working
   - Check browser console for any errors with the script injection
   - Ensure CORS headers are properly set in the server web.config

3. **Static Assets Not Loading**
   - Check IIS logs for specific error codes
   - Verify the Next.js application is running and accessible on port 3000
   - Ensure the reverse proxy rules in web.config are correct

4. **API Calls Still Going to localhost:5000**
   - Check that the runtime configuration script is being injected into HTML responses
   - Verify that the interception methods in the script are working
   - Check browser console for any errors with the XMLHttpRequest/fetch overrides

## Key Improvements in This Deployment

1. **Fixed Module System Issues**: Updated tsconfig.json to use CommonJS modules to resolve import statement errors
2. **Enhanced Runtime Configuration**: Implemented comprehensive JavaScript interception to handle all types of API calls
3. **Proper IIS Configuration**: Corrected web.config files to avoid 500 errors
4. **Standard Port Usage**: Using standard port 5000 for the backend API
5. **Comprehensive Interception**: Added support for XMLHttpRequest, fetch API, jQuery AJAX, and Axios
6. **Improved Error Handling**: Added detailed logging to help with troubleshooting

This deployment package should resolve all previous issues and provide a stable, production-ready setup for the ThuyTung application.