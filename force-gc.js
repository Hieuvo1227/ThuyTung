/**
 * Script to manually trigger garbage collection for Node.js processes
 * Requires processes to be started with --expose-gc flag
 */

const http = require('http');

async function triggerGC(processName, port) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: port,
      path: '/api/force-gc',
      method: 'POST',
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`✅ ${processName}: GC triggered successfully`);
        resolve(data);
      });
    });

    req.on('error', (err) => {
      console.log(`⚠️  ${processName}: Using process signal method`);
      resolve();
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout for ${processName}`));
    });

    req.end();
  });
}

async function forceGlobalGC() {
  if (global.gc) {
    const before = process.memoryUsage();
    console.log('\n📊 Memory before GC:');
    console.log(`   RSS: ${(before.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Heap Used: ${(before.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Heap Total: ${(before.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    
    console.log('\n🧹 Running garbage collection...');
    global.gc();
    
    // Wait a bit for GC to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const after = process.memoryUsage();
    console.log('\n📊 Memory after GC:');
    console.log(`   RSS: ${(after.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Heap Used: ${(after.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Heap Total: ${(after.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    
    console.log('\n💾 Memory freed:');
    console.log(`   RSS: ${((before.rss - after.rss) / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Heap: ${((before.heapUsed - after.heapUsed) / 1024 / 1024).toFixed(2)} MB`);
  } else {
    console.log('❌ Garbage collector not exposed. Start Node.js with --expose-gc flag');
  }
}

async function main() {
  console.log('🚀 Force Garbage Collection Tool\n');
  console.log('=' .repeat(50));
  
  // If this script itself has access to gc, run it
  if (global.gc) {
    await forceGlobalGC();
  } else {
    console.log('\n📡 Attempting to trigger GC on running services...\n');
    
    try {
      await triggerGC('Client (Port 3000)', 3000);
    } catch (err) {
      console.log(`⚠️  Client: ${err.message}`);
    }
    
    try {
      await triggerGC('Server (Port 4040)', 4040);
    } catch (err) {
      console.log(`⚠️  Server: ${err.message}`);
    }
    
    console.log('\n💡 Tip: Use PM2 restart to apply new --expose-gc settings');
    console.log('   pm2 restart ThuyTungClient ThuyTungServer');
  }
  
  console.log('\n' + '='.repeat(50));
}

main().catch(console.error);
