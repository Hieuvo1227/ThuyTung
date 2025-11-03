# Quản Lý Bộ Nhớ Node.js / Node.js Memory Management

## ⚠️ IMPORTANT: IIS Error 500.19 Fix

If you see **HTTP Error 500.19** with `DynamicCompressionModule` error when accessing the website:
- **Cause**: One or both Node.js services are not running
- **Solution**: Ensure both services are running with `pm2 list`
- **Quick Fix**:
  ```powershell
  pm2 restart all
  # Wait 10-15 seconds for Next.js to compile
  # Then access the website
  ```

**IIS requires BOTH services running:**
- Frontend (THỦY TÙNG Client): Port 3000
- Backend (THỦY TÙNG Server): Port 4040

## Cấu hình đã thiết lập / Configuration Applied

### 1. Garbage Collection Flags
Cả hai service đã được cấu hình với các flags sau trong PM2:
- `--expose-gc`: Cho phép gọi garbage collector thủ công
- `--max-old-space-size=768`: Giới hạn heap memory ở 768MB

### 2. Auto Restart
- Tự động khởi động lại khi RAM vượt quá 1GB (`max_memory_restart: '1G'`)

## Cách sử dụng / Usage

### Kiểm tra trạng thái bộ nhớ / Check Memory Status
```powershell
# Xem danh sách processes và memory usage
pm2 list

# Xem chi tiết real-time
pm2 monit
```

### Gọi Garbage Collector thủ công / Trigger Manual GC

#### Cách 1: Sử dụng script đơn giản
```powershell
# Restart services để force GC
pm2 restart "THỦY TÙNG Client" "THỦY TÙNG Server"
```

#### Cách 2: Sử dụng script cleanup (khuyến nghị)
```powershell
# Chạy script cleanup
.\gc-cleanup.ps1
```

Script này sẽ:
- Restart cả hai services
- Trigger garbage collection
- Hiển thị trạng thái memory trước và sau

### Theo dõi Memory liên tục / Monitor Memory

Sử dụng PM2 built-in monitoring:
```powershell
pm2 monit
```

## Các lệnh hữu ích / Useful Commands

```powershell
# Xem logs
pm2 logs

# Xem logs của 1 service cụ thể
pm2 logs "THỦY TÙNG Client"
pm2 logs "THỦY TÙNG Server"

# Flush logs để giảm dung lượng disk
pm2 flush

# Restart một service
pm2 restart "THỦY TÙNG Client"
pm2 restart "THỦY TÙNG Server"

# Lưu cấu hình hiện tại
pm2 save
```

## Giải thích kỹ thuật / Technical Details

### Node.js Garbage Collection
- **--expose-gc**: Cho phép code gọi `global.gc()` để force garbage collection
- **--max-old-space-size=768**: Giới hạn old space heap (nơi lưu objects lâu dài) ở 768MB
  - Giảm từ mặc định (~1.4GB trên hệ thống 64-bit)
  - Buộc GC chạy thường xuyên hơn
  - Giảm memory footprint tổng thể

### Khi nào Memory được giải phóng / When Memory is Freed
1. **Automatic**: V8 engine tự động chạy GC khi cần
2. **Manual restart**: PM2 restart sẽ clear toàn bộ memory
3. **Max memory reached**: Auto restart khi đạt 1GB (cấu hình `max_memory_restart`)

## Lưu ý / Notes

- Dev mode (`NODE_ENV=development`) thường dùng nhiều memory hơn production mode
- Nếu cần chạy production mode, phải build trước:
  ```powershell
  cd client
  npm run build
  # Sau đó đổi 'dev' thành 'start' trong ecosystem.config.js
  ```
- Memory usage bình thường:
  - Client (dev mode): 50-150MB
  - Server: 40-100MB
  - Vượt 300MB là dấu hiệu memory leak

## Troubleshooting

### Memory vẫn cao sau GC
```powershell
# Restart toàn bộ
pm2 restart all

# Hoặc delete và start lại
pm2 delete all
pm2 start client/ecosystem.config.js
pm2 start sever/ecosystem.config.cjs
pm2 save
```

### Service không start
```powershell
# Xem logs để debug
pm2 logs "THỦY TÙNG Client" --lines 50
pm2 logs "THỦY TÙNG Server" --lines 50
```
