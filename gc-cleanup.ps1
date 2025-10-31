# PowerShell script to force garbage collection on Node.js processes
# Run this script to reduce memory usage

Write-Host "🧹 Node.js Memory Cleanup Tool" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

# Check if PM2 is running
$pm2List = pm2 list | Out-String

if ($pm2List -match "ThuyTung") {
    Write-Host "`n📊 Current PM2 Process Status:" -ForegroundColor Yellow
    pm2 list
    
    Write-Host "`n🔄 Restarting services with GC flags..." -ForegroundColor Yellow
    pm2 restart ThuyTungClient ThuyTungServer
    
    Write-Host "`n⏳ Waiting for services to stabilize..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    
    Write-Host "`n🧹 Running garbage collection..." -ForegroundColor Green
    node --expose-gc .\force-gc.js
    
    Write-Host "`n📊 Updated Process Status:" -ForegroundColor Yellow
    pm2 list
    
    Write-Host "`n✅ Memory cleanup complete!" -ForegroundColor Green
    Write-Host "`n💡 Tips:" -ForegroundColor Cyan
    Write-Host "   - Run this script periodically to free memory" -ForegroundColor Gray
    Write-Host "   - Check memory usage with: pm2 monit" -ForegroundColor Gray
    Write-Host "   - Auto-restart at 1GB is configured" -ForegroundColor Gray
} else {
    Write-Host "`n❌ PM2 processes not found!" -ForegroundColor Red
    Write-Host "   Please start the services first with PM2" -ForegroundColor Yellow
}

Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
