# Admin Interface Upgrade Plan - Consolidated Requirements

## Complete Admin Structure Tree

├── ADMIN INTERFACE
│   ├── TOP NAVIGATION BAR
│   │   ├── [LOGO] - Thuy Tung Logo (1 image)
│   │   ├── DASHBOARD - Main dashboard overview
│   │   ├── PROGRAM DASHBOARD - Program management
│   │   ├── CONTACT DASHBOARD - Contact message management
│   │   ├── FAQ DASHBOARD - FAQ management
│   │   ├── USER DASHBOARD - User management
│   │   ├── CONTENT MANAGEMENT - Content editing section
│   │   └── USER PROFILE - Account settings (1 dropdown menu)
│   │
│   ├── LEFT SIDEBAR NAVIGATION
│   │   ├── DASHBOARD SECTION
│   │   │   └── 🏠 TỔNG QUAN - System overview and statistics
│   │   │
│   │   ├── CONTENT MANAGEMENT SECTION
│   │   │   ├── 📝 QUẢN LÝ NỘI DUNG
│   │   │   │   ├── TRANG CHỦ (Homepage)
│   │   │   │   │   ├── Hero Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   ├── Subtitle (1 text field)
│   │   │   │   │   │   ├── Background Image (1 image)
│   │   │   │   │   │   ├── Statistics (Multiple items)
│   │   │   │   │   │   │   ├── Stat Value (1 number field)
│   │   │   │   │   │   │   ├── Stat Label (1 text field)
│   │   │   │   │   │   │   └── Stat Suffix (1 text field)
│   │   │   │   │   │   ├── Call-to-Action Buttons (Multiple buttons)
│   │   │   │   │   │   │   ├── Button Text (1 text field)
│   │   │   │   │   │   │   ├── Button Link (1 URL field)
│   │   │   │   │   │   │   └── Button Style (1 selection)
│   │   │   │   │   │   └── Intro Video (1 video/embed)
│   │   │   │   │   │
│   │   │   │   │   ├── Vì Sao Chọn Thủy Tùng Section
│   │   │   │   │   │   ├── Main Title (1 text field) "Vì sao chọn Thủy Tùng làm đối tác của bạn?"
│   │   │   │   │   │   ├── Description (1 text area)
│   │   │   │   │   │   ├── Logo Image (1 image)
│   │   │   │   │   │   ├── Feature Images (3 images)
│   │   │   │   │   │   ├── Statistics Table (1 table with 2 rows)
│   │   │   │   │   │   │   ├── Row 1: Stat Icon (1 icon), Stat Value (1 number), Stat Label (1 text)
│   │   │   │   │   │   │   └── Row 2: Stat Icon (1 icon), Stat Value (1 number), Stat Label (1 text)
│   │   │   │   │   │   ├── Call-to-Action Section
│   │   │   │   │   │   │   ├── "Giới thiệu" Button (1 button with link to about page)
│   │   │   │   │   │   │   └── Phone Number Display (1 text field with phone number)
│   │   │   │   │   │   └── Contact Prompt (1 text field) "Bạn cần tư vấn?"
│   │   │   │   │   │
│   │   │   │   │   ├── Slideshow Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   └── Slides (Multiple slides)
│   │   │   │   │   │       ├── Slide Image (1 image)
│   │   │   │   │   │       ├── Slide Title (1 text field)
│   │   │   │   │   │       ├── Slide Description (1 text area)
│   │   │   │   │   │       └── Slide Button (1 button config)
│   │   │   │   │   │
│   │   │   │   │   ├── Working Process Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   ├── Subtitle (1 text field)
│   │   │   │   │   │   └── Process Steps (6 steps)
│   │   │   │   │   │       ├── Step Number (1 number)
│   │   │   │   │   │       ├── Step Icon (1 icon)
│   │   │   │   │   │       ├── Step Title (1 text field)
│   │   │   │   │   │       └── Step Description (1 text area)
│   │   │   │   │   │
│   │   │   │   │   ├── Country Flags Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   └── Countries (Multiple countries)
│   │   │   │   │   │       ├── Country Name (1 text field)
│   │   │   │   │   │       └── Country Flag Image (1 image)
│   │   │   │   │   │
│   │   │   │   │   ├── Study Abroad Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   ├── Subtitle (1 text field)
│   │   │   │   │   │   ├── Description (1 text area)
│   │   │   │   │   │   ├── Background Image (1 image)
│   │   │   │   │   │   └── Gallery Images (Multiple images: 3-5 images)
│   │   │   │   │   │
│   │   │   │   │   └── CTA Section
│   │   │   │   │       ├── Main Title (1 text field)
│   │   │   │   │       ├── Subtitle (1 text field)
│   │   │   │   │       ├── Description (1 text area)
│   │   │   │   │       ├── Background Color (1 color picker)
│   │   │   │   │       ├── Contact Info (3 fields)
│   │   │   │   │       │   ├── Phone (1 text field)
│   │   │   │   │       │   ├── Email (1 text field)
│   │   │   │   │       │   └── Address (1 text field)
│   │   │   │   │       └── Buttons (Multiple buttons)
│   │   │   │   │           ├── Button Text (1 text field)
│   │   │   │   │           ├── Button Link (1 URL field)
│   │   │   │   │           └── Button Style (1 selection)
│   │   │   │   │
│   │   │   │   ├── GIỚI THIỆU (About Page)
│   │   │   │   │   ├── Intro Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   ├── Description (1 text area)
│   │   │   │   │   │   ├── Background Image (1 image)
│   │   │   │   │   │   └── Content Image (1 image)
│   │   │   │   │   │
│   │   │   │   │   ├── Mission & Vision Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   ├── Mission Title (1 text field)
│   │   │   │   │   │   ├── Mission Description (1 text area)
│   │   │   │   │   │   ├── Mission Icon (1 icon)
│   │   │   │   │   │   ├── Vision Title (1 text field)
│   │   │   │   │   │   ├── Vision Description (1 text area)
│   │   │   │   │   │   └── Vision Icon (1 icon)
│   │   │   │   │   │
│   │   │   │   │   ├── Statistics Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   ├── Background Image (1 image)
│   │   │   │   │   │   └── Statistics (Multiple items)
│   │   │   │   │   │       ├── Stat Icon (1 icon)
│   │   │   │   │   │       ├── Stat Value (1 number field)
│   │   │   │   │   │       └── Stat Label (1 text field)
│   │   │   │   │   │
│   │   │   │   │   ├── Why Choose Us Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   └── Reasons (6 items)
│   │   │   │   │   │       ├── Reason Icon (1 icon)
│   │   │   │   │   │       ├── Reason Title (1 text field)
│   │   │   │   │   │       └── Reason Description (1 text area)
│   │   │   │   │   │
│   │   │   │   │   ├── Services Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   └── Services (3 items)
│   │   │   │   │   │       ├── Service Icon (1 icon)
│   │   │   │   │   │       ├── Service Title (1 text field)
│   │   │   │   │   │       └── Service Description (1 text area)
│   │   │   │   │   │
│   │   │   │   │   ├── Commitments Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   └── Commitments (4 items)
│   │   │   │   │   │       ├── Commitment Icon (1 icon)
│   │   │   │   │   │       ├── Commitment Title (1 text field)
│   │   │   │   │   │       └── Commitment Description (1 text area)
│   │   │   │   │   │
│   │   │   │   │   └── Contact Info Section
│   │   │   │   │       ├── Main Title (1 text field)
│   │   │   │   │       ├── Background Image (1 image)
│   │   │   │   │       ├── Address (1 text field)
│   │   │   │   │       ├── Phone (1 text field)
│   │   │   │   │       ├── Email (1 text field)
│   │   │   │   │       └── Business Hours (1 text field)
│   │   │   │   │
│   │   │   │   ├── LIÊN HỆ (Contact Page)
│   │   │   │   │   ├── Header Section
│   │   │   │   │   │   ├── Main Title (1 text field)
│   │   │   │   │   │   ├── Subtitle (1 text field)
│   │   │   │   │   │   └── Background Image (1 image)
│   │   │   │   │   │
│   │   │   │   │   ├── Contact Form Section
│   │   │   │   │   │   ├── Form Title (1 text field)
│   │   │   │   │   │   ├── Success Message (1 text area)
│   │   │   │   │   │   └── Form Fields (Multiple fields)
│   │   │   │   │   │       ├── Field Label (1 text field)
│   │   │   │   │   │       ├── Field Type (1 selection)
│   │   │   │   │   │       └── Required (1 checkbox)
│   │   │   │   │   │
│   │   │   │   │   └── Contact Info Section
│   │   │   │   │       ├── Main Title (1 text field)
│   │   │   │   │       ├── Background Color (1 color picker)
│   │   │   │   │       ├── Address (1 text field)
│   │   │   │   │       ├── Phone (1 text field)
│   │   │   │   │       ├── Email (1 text field)
│   │   │   │   │       ├── Business Hours (1 text field)
│   │   │   │   │       └── Social Media Links (Multiple links)
│   │   │   │   │           ├── Facebook (1 URL)
│   │   │   │   │           ├── Instagram (1 URL)
│   │   │   │   │           └── YouTube (1 URL)
│   │   │   │   │
│   │   │   │   └── THÔNG TIN WEBSITE (Website Info)
│   │   │   │       ├── Topbar Settings
│   │   │   │       │   ├── Phone Number (1 text field)
│   │   │   │       │   ├── Email (1 text field)
│   │   │   │       │   └── Social Media Links (Multiple links)
│   │   │   │       │       ├── Facebook (1 URL)
│   │   │   │       │       ├── Instagram (1 URL)
│   │   │   │       │       └── YouTube (1 URL)
│   │   │   │       │
│   │   │   │       ├── Footer Settings
│   │   │   │       │   ├── Logo (1 image)
│   │   │   │       │   ├── Description (1 text area)
│   │   │   │       │   ├── Address (1 text field)
│   │   │   │       │   ├── Phone (1 text field)
│   │   │   │       │   ├── Email (1 text field)
│   │   │   │       │   ├── Social Media Links (Multiple links)
│   │   │   │       │   │   ├── Facebook (1 URL)
│   │   │   │       │   │   ├── Instagram (1 URL)
│   │   │   │       │   │   └── YouTube (1 URL)
│   │   │   │       │   ├── Quick Links (Multiple links)
│   │   │   │       │   │   ├── Link Text (1 text field)
│   │   │   │       │   │   └── Link URL (1 URL)
│   │   │   │       │   └── Copyright Text (1 text field)
│   │   │   │       │
│   │   │   │       ├── Privacy Policy Page
│   │   │   │       │   ├── Main Title (1 text field)
│   │   │   │       │   └── Content (1 rich text editor)
│   │   │   │       │
│   │   │   │       ├── Terms of Use Page
│   │   │   │       │   ├── Main Title (1 text field)
│   │   │   │       │   └── Content (1 rich text editor)
│   │   │   │       │
│   │   │   │       └── Global Settings
│   │   │   │           ├── Site Title (1 text field)
│   │   │   │           ├── Site Description (1 text area)
│   │   │   │           ├── Favicon (1 image)
│   │   │   │           └── Primary Color (1 color picker)
│   │   │   │
│   │   │   ├── 👥 QUẢN LÝ NGƯỜI DÙNG
│   │   │   │   ├── Danh Sách Người Dùng
│   │   │   │   │   ├── User Table (Multiple users)
│   │   │   │   │   │   ├── Name (1 text field)
│   │   │   │   │   │   ├── Email (1 text field)
│   │   │   │   │   │   ├── Role (1 selection)
│   │   │   │   │   │   └── Status (1 selection)
│   │   │   │   │   └── User Actions (Filter, Search, Export)
│   │   │   │   │
│   │   │   │   └── Thêm Người Dùng
│   │   │   │       ├── Name (1 text field)
│   │   │   │       ├── Email (1 text field)
│   │   │   │       ├── Password (1 password field)
│   │   │   │       ├── Role (1 selection)
│   │   │   │       └── Status (1 selection)
│   │   │   │
│   │   │   ├── 📊 THỐNG KÊ & BÁO CÁO
│   │   │   │   ├── Tổng Quan
│   │   │   │   │   ├── Traffic Statistics (Charts and graphs: 4-5 charts)
│   │   │   │   │   ├── User Statistics (Charts and graphs: 2-3 charts)
│   │   │   │   │   └── Program Statistics (Charts and graphs: 2-3 charts)
│   │   │   │   │
│   │   │   │   └── Báo Cáo Chi Tiết
│   │   │   │       ├── Report Filters (Date range, type, etc.)
│   │   │   │       ├── Generated Reports (List of reports)
│   │   │   │       └── Export Options (PDF, Excel, CSV)
│   │   │   │
│   │   │   └── ⚙️ CÀI ĐẶT HỆ THỐNG
│   │   │       ├── Cấu Hình Chung
│   │   │       │   ├── Site Name (1 text field)
│   │   │       │   ├── Admin Email (1 text field)
│   │   │       │   ├── Timezone (1 selection)
│   │   │       │   └── Language (1 selection)
│   │   │       │
│   │   │       ├── Quản Lý Vai Trò
│   │   │       │   ├── Role List (Multiple roles)
│   │   │       │   │   ├── Role Name (1 text field)
│   │   │       │   │   └── Permissions (Multiple checkboxes)
│   │   │       │   └── Role Actions (Add, Edit, Delete)
│   │   │       │
│   │   │       └── Nhật Ký Hoạt Động
│   │   │           ├── Activity Log Table (Multiple entries)
│   │   │           │   ├── User (1 text field)
│   │   │           │   ├── Action (1 text field)
│   │   │           │   ├── Date/Time (1 timestamp)
│   │   │           │   └── Details (1 text area)
│   │   │           └── Log Actions (Filter, Export)
│   │   │
│   │   └── EXISTING DASHBOARDS (Direct Access)
│   │       ├── 📋 QUẢN LÝ CHƯƠNG TRÌNH
│   │       │   ├── Danh Sách (Program List)
│   │       │   │   ├── Program Table (Multiple programs)
│   │       │   │   │   ├── Title (1 text field)
│   │       │   │   │   ├── Country (1 text field)
│   │       │   │   │   ├── Duration (1 text field)
│   │       │   │   │   ├── Tuition (1 text field)
│   │       │   │   │   └── Status (1 selection)
│   │       │   │   └── Program Actions (Filter, Search, Export)
│   │       │   │
│   │       │   ├── Thêm Mới (Add New Program)
│   │       │   │   ├── Title (1 text field)
│   │       │   │   ├── Description (1 text area)
│   │       │   │   ├── Country (1 text field)
│   │       │   │   ├── Duration (1 text field)
│   │       │   │   ├── Tuition (1 text field)
│   │       │   │   ├── Opportunities (1 text area)
│   │       │   │   ├── About (1 text area)
│   │       │   │   ├── Requirements (1 text area)
│   │       │   │   ├── Benefits (1 text area)
│   │       │   │   ├── Image (1 image)
│   │       │   │   ├── Featured (1 checkbox)
│   │       │   │   └── Status (1 selection)
│   │       │   │
│   │       │   └── Chỉnh Sửa (Edit Program)
│   │       │       ├── Title (1 text field)
│   │       │       ├── Description (1 text area)
│   │       │       ├── Country (1 text field)
│   │       │       ├── Duration (1 text field)
│   │       │       ├── Tuition (1 text field)
│   │       │       ├── Opportunities (1 text area)
│   │       │       ├── About (1 text area)
│   │       │       ├── Requirements (1 text area)
│   │       │       ├── Benefits (1 text area)
│   │       │       ├── Image (1 image)
│   │       │       ├── Featured (1 checkbox)
│   │       │       └── Status (1 selection)
│   │       │
│   │       ├── 📨 QUẢN LÝ LIÊN HỆ
│   │       │   ├── Tin Nhắn (Messages)
│   │       │   │   ├── Message Table (Multiple messages)
│   │       │   │   │   ├── Name (1 text field)
│   │       │   │   │   ├── Email (1 text field)
│   │       │   │   │   ├── Subject (1 text field)
│   │       │   │   │   ├── Date (1 timestamp)
│   │       │   │   │   └── Status (1 selection)
│   │       │   │   └── Message Actions (Filter, Search, Export)
│   │       │   │
│   │       │   ├── Phản Hồi (Replies)
│   │       │   │   ├── Reply Form (1 form)
│   │       │   │   │   ├── To (1 email field)
│   │       │   │   │   ├── Subject (1 text field)
│   │       │   │   │   └── Message (1 text area)
│   │       │   │   └── Reply History (List of sent replies)
│   │       │   │
│   │       │   └── Gửi Email (Send Email)
│   │       │       ├── To (1 email field or selection)
│   │       │       ├── Subject (1 text field)
│   │       │       ├── Message (1 rich text editor)
│   │       │       └── Attachments (Multiple files: 0-5 files)
│   │       │
│   │       ├── ❓ QUẢN LÝ FAQ
│   │       │   ├── Danh Sách Câu Hỏi (FAQ List)
│   │       │   │   ├── FAQ Table (Multiple FAQs)
│   │       │   │   │   ├── Question (1 text field)
│   │       │   │   │   ├── Answer (1 text area)
│   │       │   │   │   ├── Category (1 selection)
│   │       │   │   │   └── Status (1 selection)
│   │       │   │   └── FAQ Actions (Filter, Search, Export)
│   │       │   │
│   │       │   ├── Thêm Câu Hỏi (Add FAQ)
│   │       │   │   ├── Question (1 text field)
│   │       │   │   ├── Answer (1 text area)
│   │       │   │   ├── Category (1 selection)
│   │       │   │   └── Status (1 selection)
│   │       │   │
│   │       │   └── Danh Mục (Categories)
│   │       │       ├── Category List (Multiple categories)
│   │       │       │   ├── Name (1 text field)
│   │       │       │   └── Description (1 text area)
│   │       │       └── Category Actions (Add, Edit, Delete)
│   │       │
│   │       └── 👥 QUẢN LÝ NGƯỜI DÙNG
│   │           ├── Danh Sách (User List)
│   │           │   ├── User Table (Multiple users)
│   │           │   │   ├── Name (1 text field)
│   │           │   │   ├── Email (1 text field)
│   │           │   │   ├── Role (1 selection)
│   │           │   │   ├── Status (1 selection)
│   │           │   │   └── Last Login (1 timestamp)
│   │           │   └── User Actions (Filter, Search, Export)
│   │           │
│   │           ├── Thêm Mới (Add User)
│   │           │   ├── Name (1 text field)
│   │           │   ├── Email (1 text field)
│   │           │   ├── Password (1 password field)
│   │           │   ├── Role (1 selection)
│   │           │   └── Status (1 selection)
│   │           │
│   │           ├── Phân Quyền (Permissions)
│   │           │   ├── Role Permissions (Multiple roles)
│   │           │   │   ├── Role Name (1 text field)
│   │           │   │   └── Permissions (Multiple checkboxes)
│   │           │   └── Permission Actions (Save, Reset)
│   │           │
│   │           └── Nhóm Người Dùng (User Groups)
│   │               ├── Group List (Multiple groups)
│   │               │   ├── Name (1 text field)
│   │               │   ├── Description (1 text area)
│   │               │   └── Members (Multiple users)
│   │               └── Group Actions (Add, Edit, Delete)
│   │
│   └── MAIN CONTENT AREA
│       ├── DASHBOARD VIEW
│       │   ├── Quick Stats (4 cards)
│       │   │   ├── Total Visitors Card
│       │   │   │   ├── Icon (1 icon)
│       │   │   │   ├── Value (1 number)
│       │   │   │   └── Change Percentage (1 text)
│       │   │   ├── Unique Visitors Card
│       │   │   │   ├── Icon (1 icon)
│       │   │   │   ├── Value (1 number)
│       │   │   │   └── Change Percentage (1 text)
│       │   │   ├── Page Views Card
│       │   │   │   ├── Icon (1 icon)
│       │   │   │   ├── Value (1 number)
│       │   │   │   └── Change Percentage (1 text)
│       │   │   └── Avg. Session Card
│       │   │       ├── Icon (1 icon)
│       │   │       ├── Value (1 time duration)
│       │   │       └── Change Percentage (1 text)
│       │   │
│       │   ├── Charts Section (2 charts)
│       │   │   ├── Traffic Chart (1 line chart)
│       │   │   └── Top Pages Chart (1 bar chart)
│       │   │
│       │   └── Recent Activity (1 activity list)
│       │       ├── Activity Items (Multiple items)
│       │       │   ├── Icon (1 icon)
│       │       │   ├── Action (1 text)
│       │       │   └── Time (1 timestamp)
│       │       └── Activity Actions (Refresh, View All)
│       │
│       ├── CONTENT EDITOR VIEW
│       │   ├── Section Header
│       │   │   ├── Breadcrumb Navigation (1 navigation path)
│       │   │   ├── Section Title (1 text field)
│       │   │   └── Status Toggle (1 switch)
│       │   │
│       │   ├── Content Editor
│       │   │   ├── Text Editors (Multiple rich text editors)
│       │   │   ├── Image Uploaders (Multiple image upload areas: 5-10 images)
│       │   │   ├── Video Embed (1 video embed field)
│       │   │   ├── Form Fields (Various input types)
│       │   │   └── Repeater Fields (Add/remove content blocks)
│       │   │
│       │   ├── Preview Panel (Optional toggle)
│       │   │   ├── Device Toggles (Desktop, Tablet, Mobile: 3 buttons)
│       │   │   └── Live Preview (1 iframe/preview area)
│       │   │
│       │   └── Action Bar
│       │       ├── Save Draft (1 button)
│       │       ├── Preview Changes (1 button)
│       │       ├── Publish Content (1 button)
│       │       └── Reset (1 button)
│       │
│       └── EXISTING DASHBOARD VIEWS
│           ├── Program Dashboard View
│           │   ├── Program Table (1 data table)
│           │   ├── Search/Filter Bar (1 search bar + filters)
│           │   └── Action Buttons (Add, Edit, Delete, Export)
│           │
│           ├── Contact Dashboard View
│           │   ├── Message Table (1 data table)
│           │   ├── Search/Filter Bar (1 search bar + filters)
│           │   └── Action Buttons (Reply, Mark Read, Delete, Export)
│           │
│           ├── FAQ Dashboard View
│           │   ├── FAQ Table (1 data table)
│           │   ├── Search/Filter Bar (1 search bar + filters)
│           │   └── Action Buttons (Add, Edit, Delete, Export)
│           │
│           └── User Dashboard View
│               ├── User Table (1 data table)
│               ├── Search/Filter Bar (1 search bar + filters)
│               └── Action Buttons (Add, Edit, Delete, Export)

## Sample Admin Dashboard Tables

### 1. User Management Table

| ID | Name | Email | Role | Status | Last Login | Actions |
|----|------|-------|------|--------|------------|---------|
| 1 | John Doe | john@example.com | Admin | Active | 2025-11-19 14:30 | Edit / Delete |
| 2 | Jane Smith | jane@example.com | Editor | Active | 2025-11-19 10:15 | Edit / Delete |
| 3 | Bob Johnson | bob@example.com | Viewer | Inactive | 2025-11-18 09:45 | Edit / Delete |
| 4 | Alice Brown | alice@example.com | Editor | Pending | Never | Edit / Delete |

### 2. Content Management Table

| Section | Page | Last Updated | Updated By | Status | Actions |
|---------|------|--------------|------------|--------|---------|
| Hero Section | Homepage | 2025-11-19 15:30 | Admin | Published | Edit / Preview |
| Why Choose Us | Homepage | 2025-11-18 11:20 | Editor | Draft | Edit / Preview |
| Mission & Vision | About | 2025-11-17 09:15 | Admin | Published | Edit / Preview |
| Services | About | 2025-11-16 16:45 | Editor | Published | Edit / Preview |
| Contact Form | Contact | 2025-11-15 13:20 | Admin | Published | Edit / Preview |

### 3. Media Assets Table

| Name | Type | Size | Uploaded By | Upload Date | Status | Actions |
|------|------|------|-------------|-------------|--------|---------|
| logo12.png | Image | 245 KB | Admin | 2025-11-19 | Active | View / Delete |
| hero-bg.jpg | Image | 1.2 MB | Editor | 2025-11-18 | Active | View / Delete |
| process-icon-1.svg | Icon | 8 KB | Admin | 2025-11-17 | Active | View / Delete |
| about-team.jpg | Image | 850 KB | Editor | 2025-11-16 | Active | View / Delete |
| favicon.ico | Icon | 4 KB | Admin | 2025-11-15 | Active | View / Delete |

### 4. Activity Log Table

| Timestamp | User | Action | Description | IP Address | Status |
|-----------|------|--------|-------------|------------|--------|
| 2025-11-19 15:45:22 | Admin | Content Update | Updated Hero Section | 192.168.1.100 | Success |
| 2025-11-19 14:30:15 | Editor | User Management | Created new user | 192.168.1.101 | Success |
| 2025-11-19 11:20:45 | Admin | Media Upload | Uploaded new logo | 192.168.1.100 | Success |
| 2025-11-19 09:15:33 | Editor | Content Update | Modified About page | 192.168.1.101 | Success |
| 2025-11-18 16:45:12 | Admin | System Settings | Changed site title | 192.168.1.100 | Success |

## Content Management Sections

### Path: /admin/content/homepage

**Components:**
- Hero Section Editor
- "Why Choose Us" Section Editor
- Slideshow Section Editor
- Working Process Section Editor
- Country Flags Section Editor
- Study Abroad Section Editor
- CTA Section Editor

**Features:**
- Drag-and-drop section ordering
- Real-time preview
- Publish/draft functionality
- Version history

### Path: /admin/content/about

**Components:**
- Intro Section Editor
- Mission & Vision Section Editor
- Statistics Section Editor
- Why Choose Us Section Editor
- Services Section Editor
- Commitments Section Editor
- Contact Info Section Editor

**Features:**
- Section visibility toggles
- Rich text editing
- Image upload capabilities
- Multi-language support

### Path: /admin/content/contact

**Components:**
- Header Section Editor
- Contact Form Section Editor
- Contact Info Section Editor

**Features:**
- Form field customization
- Validation rules
- Social media link management
- Business hours configuration

### Path: /admin/content/website

**Components:**
- Topbar Settings Editor
- Footer Settings Editor
- Privacy Policy Editor
- Terms of Use Editor
- Global Settings Editor

**Features:**
- Site-wide settings management
- SEO configuration
- Analytics integration
- Social media links management

### Path: /admin/content/media

**Components:**
- Media Grid View
- Upload Area
- Search and Filter
- Metadata Editor
- Bulk Actions

**Features:**
- Image optimization
- File type filtering
- Tagging system
- Usage tracking

### Path: /admin/content/history

**Components:**
- Version Timeline
- Diff Viewer
- Restore Functionality
- User Activity Log

**Features:**
- Compare versions
- Rollback capability
- User attribution
- Timestamp tracking

## Admin Interface Visualization

┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  🌿 QUẢN TRỊ WEBSITE THỦY TÙNG - BẢNG ĐIỀU KHIỂN TỔNG HỢP                                   │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  [LOGO]  DASHBOARD  PROGRAM DASHBOARD  CONTACT DASHBOARD  FAQ DASHBOARD  USER DASHBOARD  │  │
│  │  CONTENT MANAGEMENT  Xin chào, Quản trị viên ▼                                        │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  ┌───────────────────────────────┬─────────────────────────────────────────────────────────────┐  │
│  │  THANH BÊN (SIDEBAR)          │  KHUNG NỘI DUNG CHÍNH (MAIN PANEL)                          │  │
│  │  ┌─────────────────────────┐  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  🏠 DASHBOARD            │  │  │  TIÊU ĐỀ TRANG                                          │  │  │
│  │  │                         │  │  ├─────────────────────────────────────────────────────────┤  │  │
│  │  │  📋 QUẢN LÝ CHƯƠNG TRÌNH │  │  │  ┌─────────────────────────────────────────────────────┐  │  │  │
│  │  │  ├── Danh Sách           │  │  │  │  ĐƯỜNG DẪN ĐIỀU HƯỚNG                            │  │  │  │
│  │  │  ├── Thêm Mới            │  │  │  ├─────────────────────────────────────────────────────┤  │  │  │
│  │  │  └── Chỉnh Sửa           │  │  │  │                                                     │  │  │  │
│  │  │                         │  │  │  │  [Nội dung dashboard sẽ hiển thị ở đây]              │  │  │  │
│  │  │  📨 QUẢN LÝ LIÊN HỆ      │  │  │  │                                                     │  │  │  │
│  │  │  ├── Tin Nhắn           │  │  │  │  ├── Biểu đồ thống kê                            │  │  │  │
│  │  │  ├── Phản Hồi           │  │  │  │  ├── Bảng dữ liệu                                │  │  │  │
│  │  │  └── Gửi Email          │  │  │  │  ├── Form lọc và tìm kiếm                        │  │  │  │
│  │  │                         │  │  │  │  └───────────────────────────────────────────────┘  │  │  │  │
│  │  │  ❓ QUẢN LÝ FAQ          │  │  │  │                                                     │  │  │  │
│  │  │  ├── Danh Sách Câu Hỏi   │  │  │  │  ┌─────────────────────────────────────────────────┐  │  │  │
│  │  │  ├── Thêm Câu Hỏi       │  │  │  │  │  THANH HÀNH ĐỘNG                                 │  │  │  │
│  │  │  └── Danh Mục            │  │  │  │  ├─────────────────────────────────────────────────┤  │  │  │
│  │  │                         │  │  │  │  │  [Làm mới] [Xuất báo cáo] [Cài đặt]             │  │  │  │
│  │  │  👥 QUẢN LÝ NGƯỜI DÙNG    │  │  │  │  └─────────────────────────────────────────────────┘  │  │  │  │
│  │  │  ├── Danh Sách           │  │  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  │  ├── Thêm Mới            │  │  └─────────────────────────────────────────────────────────────┘  │  │
│  │  │  ├── Phân Quyền          │  │                                                                 │  │
│  │  │  └── Nhóm Người Dùng     │  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │                         │  │  │  KHUNG XEM TRƯỚC (Nếu cần)                          │  │  │  │
│  │  │  📝 QUẢN LÝ NỘI DUNG     │  │  │  ┌─────────────────────────────────────────────────────┐  │  │  │
│  │  │  ├── Trang Chủ           │  │  │  │                                                     │  │  │  │
│  │  │  │   ├── Hero Section    │  │  │  │  [Preview nội dung nếu cần thiết]                    │  │  │  │
│  │  │  │   ├── About Section   │  │  │  │                                                     │  │  │  │
│  │  │  │   ├── Slideshow       │  │  │  └─────────────────────────────────────────────────────┘  │  │  │
│  │  │  │   ├── Working Process │  │  └─────────────────────────────────────────────────────────┘  │  │
│  │  │  │   ├── Country Flags   │  │                                                                 │  │
│  │  │  │   ├── Study Abroad    │  │                                                                 │  │
│  │  │  │   └── CTA             │  │                                                                 │  │
│  │  │  ├── Giới Thiệu          │  │                                                                 │  │
│  │  │  │   ├── Intro Section   │  │                                                                 │  │
│  │  │  │   ├── Mission/Vision  │  │                                                                 │  │
│  │  │  │   ├── Statistics      │  │                                                                 │  │
│  │  │  │   ├── Why Choose Us   │  │                                                                 │  │
│  │  │  │   ├── Services        │  │                                                                 │  │
│  │  │  │   ├── Commitments     │  │                                                                 │  │
│  │  │  │   └── Contact Info    │  │                                                                 │  │
│  │  │  ├── Liên Hệ             │  │                                                                 │  │
│  │  │  │   ├── Header          │  │                                                                 │  │
│  │  │  │   ├── Contact Form    │  │                                                                 │  │
│  │  │  │   └── Contact Info    │  │                                                                 │  │
│  │  │  └── Thông Tin Website    │  │                                                                 │  │
│  │  │      ├── Topbar          │  │                                                                 │  │
│  │  │      ├── Footer          │  │                                                                 │  │
│  │  │      ├── Privacy Policy  │  │                                                                 │  │
│  │  │      ├── Terms of Use    │  │                                                                 │  │
│  │  │      └── Global Settings │  │                                                                 │  │
│  │  │                         │  │                                                                 │  │
│  │  │  📊 THỐNG KÊ & BÁO CÁO    │  │                                                                 │  │
│  │  │  ├── Tổng Quan           │  │                                                                 │  │
│  │  │  └── Báo Cáo Chi Tiết    │  │                                                                 │  │
│  │  │                         │  │                                                                 │  │
│  │  │  ⚙️ CÀI ĐẶT HỆ THỐNG      │  │                                                                 │  │
│  │  │  ├── Cấu Hình Chung      │  │                                                                 │  │
│  │  │  ├── Quản Lý Vai Trò     │  │                                                                 │  │
│  │  │  └── Nhật Ký Hoạt Động   │  │                                                                 │  │
│  │  └─────────────────────────┘  │                                                                 │  │
│  └───────────────────────────────┴─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

## Top Navigation Menu Structure

┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  🌿 THỦY TÙNG ADMIN | Bảng Điều Khiển Tổng Hợp                                             │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [LOGO]  DASHBOARD  PROGRAM DASHBOARD  CONTACT DASHBOARD  FAQ DASHBOARD  USER DASHBOARD       │
│  CONTENT MANAGEMENT  Xin chào, Quản trị viên ▼                                              │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

## Detailed Sections for Existing Dashboards

### 1. DASHBOARD (Main Dashboard)

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  DASHBOARD - TỔNG QUAN HOẠT ĐỘNG HỆ THỐNG                                          × │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  THỐNG KÊ NHANH                                                              │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │  │
│  │  │  📈 TRUY CẬP     │  │  👥 NGƯỜI DÙNG   │  │  📋 CHƯƠNG TRÌNH │  │  📨 LIÊN HỆ  │  │  │
│  │  │  15,248         │  │  1,248          │  │  86             │  │  42         │  │  │
│  │  │  [+12% tháng]   │  │  [+5% tháng]    │  │  [+3 mới]       │  │  [+8 mới]   │  │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  BIỂU ĐỒ & HOẠT ĐỘNG GẦN ĐÂY                                                 │  │
│  │  ┌──────────────────────────────────┬────────────────────────────────────────┐  │  │
│  │  │  📈 LƯU LƯỢNG TRUY CẬP          │  📋 HOẠT ĐỘNG GẦN ĐÂY                   │  │  │
│  │  │  [Biểu đồ line chart]           │  ┌─────────────────────────────────────┐  │  │  │
│  │  │                                 │  │  09:30 - Thêm chương trình mới      │  │  │  │
│  │  │                                 │  │  11:45 - Người dùng đăng ký         │  │  │  │
│  │  │                                 │  │  14:20 - Gửi email phản hồi         │  │  │  │
│  │  │                                 │  │  16:05 - Cập nhật FAQ               │  │  │  │
│  │  │                                 │  └─────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────┴────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  THANH HÀNH ĐỘNG                                                                 │  │
│  │  [ Làm mới ] [ Xuất báo cáo ] [ Cài đặt ]                                     │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘

### 2. PROGRAM DASHBOARD

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  PROGRAM DASHBOARD - QUẢN LÝ CHƯƠNG TRÌNH DU HỌC                               × │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  [➕ Thêm Chương Trình] [🔍 Tìm kiếm] [🔄 Làm mới] [⚙️ Bộ lọc]                    │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  BẢNG DANH SÁCH CHƯƠNG TRÌNH                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Tiêu đề         Quốc gia    Thời gian    Học phí    Trạng thái    Hành động  │  │  │
│  │  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │  │
│  │  │  │  Du học Nhật Bản    Japan      2 năm      5.000$      Kích hoạt     [✏️][🗑️]│  │  │  │
│  │  │  │  Du học Hàn Quốc    Korea      3 năm      6.500$      Kích hoạt     [✏️][🗑️]│  │  │  │
│  │  │  │  Du học Đài Loan    Taiwan     1 năm      4.200$      Kích hoạt     [✏️][🗑️]│  │  │  │
│  │  │  └─────────────────────────────────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  THANH HÀNH ĐỘNG                                                                 │  │
│  │  [ Xuất Excel ] [ In báo cáo ] [ Xóa đã chọn ]                                 │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘

### 3. CONTACT DASHBOARD

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  CONTACT DASHBOARD - QUẢN LÝ LIÊN HỆ                                           × │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  [🔍 Tìm kiếm] [🔄 Làm mới] [⚙️ Bộ lọc] [📤 Gửi Email Hàng Loạt]                  │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  BẢNG TIN NHẮN LIÊN HỆ                                                        │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Tên            Email              Tiêu đề           Ngày        Trạng thái   │  │  │
│  │  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │  │
│  │  │  │  Nguyễn Văn A   nguyenvana@email.com   Thông tin du học   15/05/2023   Đã đọc  │  │  │  │
│  │  │  │  Trần Thị B     tranb@email.com        Hỏi về học bổng    16/05/2023   Mới     │  │  │  │
│  │  │  │  Lê Văn C       lec@email.com          Đăng ký tư vấn     17/05/2023   Đã xử lý│  │  │  │
│  │  │  └─────────────────────────────────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  THANH HÀNH ĐỘNG                                                                 │  │
│  │  [ Đánh dấu đã đọc ] [ Xuất Excel ] [ Xóa đã chọn ]                           │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘

### 4. FAQ DASHBOARD

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  FAQ DASHBOARD - QUẢN LÝ CÂU HỎI THƯỜNG GẶP                                    × │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  [➕ Thêm Câu Hỏi] [🔍 Tìm kiếm] [🔄 Làm mới] [⚙️ Bộ lọc]                          │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  DANH SÁCH CÂU HỎI                                                            │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  STT  Câu hỏi                                           Danh mục    Hành động  │  │  │
│  │  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │  │
│  │  │  │  1    Điều kiện du học Nhật Bản là gì?              Du học Nhật   [✏️][🗑️]│  │  │  │
│  │  │  │  2    Học bổng du học Hàn Quốc có những loại nào?   Du học Hàn   [✏️][🗑️]│  │  │  │
│  │  │  │  3    Thời gian xử lý visa mất bao lâu?             Visa          [✏️][🗑️]│  │  │  │
│  │  │  └─────────────────────────────────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  THANH HÀNH ĐỘNG                                                                 │  │
│  │  [ Sắp xếp ] [ Xuất Excel ] [ Xóa đã chọn ]                                   │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘

### 5. USER DASHBOARD

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  USER DASHBOARD - QUẢN LÝ NGƯỜI DÙNG                                           × │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  [➕ Thêm Người Dùng] [🔍 Tìm kiếm] [🔄 Làm mới] [⚙️ Bộ lọc]                       │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  DANH SÁCH NGƯỜI DÙNG                                                         │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │  Tên           Email              Vai trò        Trạng thái    Lần đăng nhập  │  │  │
│  │  │  ┌─────────────────────────────────────────────────────────────────────────┐  │  │  │
│  │  │  │  Admin User    admin@thuytung.com    Quản trị viên   Kích hoạt    17/05/2023  │  │  │  │
│  │  │  │  Editor User   editor@thuytung.com   Biên tập viên   Kích hoạt    16/05/2023  │  │  │  │
│  │  │  │  Guest User    guest@thuytung.com    Khách          Vô hiệu hóa  Chưa đăng nhập│  │  │  │
│  │  │  └─────────────────────────────────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐  │
│  │  THANH HÀNH ĐỘNG                                                                 │  │
│  │  [ Kích hoạt ] [ Vô hiệu hóa ] [ Xuất Excel ] [ Xóa đã chọn ]                 │  │
│  └─────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘

## Implementation Strategy and Timeline

### Technical Approach

The upgrade will follow a phased implementation strategy to minimize risks and ensure stability:

**Phase 1: Core Infrastructure (2-3 days)**
- Create content management folder structure in /client/src/app/admin/
- Implement basic routing for all content sections
- Develop shared content editing components (text editors, image uploaders)
- Set up basic API endpoints for content management

**Phase 2: Homepage Content Editors (3-4 days)**
- Hero section editor with background image, statistics, and CTA buttons
- "Why Choose Us" section editor with feature items
- Slideshow editor for multiple slides
- Working process editor with 6-step configuration
- Country flags editor with add/remove functionality
- Study abroad section editor with gallery images
- CTA section editor with contact information

**Phase 3: Other Page Content Editors (3-4 days)**
- About page editors (intro, mission/vision, statistics, etc.)
- Contact page editors (header, form, info)
- Website info editors (topbar, footer, legal pages, global settings)

**Phase 4: Advanced Features & Integration (2-3 days)**
- Statistics dashboard with reporting features
- System settings management
- Role-based permissions management
- Activity logging and audit trails

**Phase 5: Testing & Optimization (1-2 days)**
- Comprehensive testing across all components
- Performance optimization
- Bug fixes and refinements
- Documentation updates

### Key Technical Components

#### Frontend Structure

The new content management system will integrate seamlessly with the existing admin interface:

```
/client/src/app/admin/
├── content/                    # New content management section
│   ├── homepage/               # Homepage content editors
│   │   ├── hero-editor.tsx
│   │   ├── why-choose-editor.tsx
│   │   ├── slideshow-editor.tsx
│   │   ├── process-editor.tsx
│   │   ├── countries-editor.tsx
│   │   ├── study-abroad-editor.tsx
│   │   └── cta-editor.tsx
│   ├── about/                  # About page content editors
│   │   ├── intro-editor.tsx
│   │   ├── mission-editor.tsx
│   │   ├── stats-editor.tsx
│   │   ├── why-choose-editor.tsx
│   │   ├── services-editor.tsx
│   │   ├── commitments-editor.tsx
│   │   └── contact-editor.tsx
│   ├── contact/                # Contact page content editors
│   │   ├── header-editor.tsx
│   │   ├── form-editor.tsx
│   │   └── info-editor.tsx
│   ├── website/                # Website info editors
│   │   ├── topbar-editor.tsx
│   │   ├── footer-editor.tsx
│   │   ├── privacy-editor.tsx
│   │   ├── terms-editor.tsx
│   │   └── global-editor.tsx
│   ├── components/             # Shared content editing components
│   │   ├── text-editor.tsx
│   │   ├── image-uploader.tsx
│   │   ├── video-embed.tsx
│   │   ├── stat-input.tsx
│   │   ├── cta-button.tsx
│   │   └── social-links.tsx
│   └── page.tsx                # Main content management dashboard
```

#### Backend API Structure

New API endpoints will be created to support content management:
- Content retrieval endpoints for each section
- Content update endpoints with validation
- Media asset management endpoints
- Content versioning and history endpoints

### Safety Measures and Risk Mitigation

#### Error Prevention
- TypeScript interfaces for all content structures to ensure type safety
- Form validation at both client and server side
- Proper error boundaries in React components to prevent crashes
- Database transaction management for content updates to maintain consistency

#### Performance Optimization
- Lazy loading for heavy editor components to improve initial load times
- Image optimization and caching to reduce bandwidth usage
- Pagination for content lists to handle large datasets efficiently
- Efficient state management with Zustand to minimize re-renders

#### Data Integrity
- Content versioning and history tracking to enable rollbacks
- Backup mechanisms for critical content
- Validation of all user inputs to prevent malicious data
- Proper sanitization of HTML content to prevent XSS attacks

## User Experience Considerations

### Auto-resizing UI Panels
As per user preferences, the interface will feature:
- Dynamic text areas that automatically expand with content
- No manual drag-resize interactions required
- Smooth transitions when panels resize

### Dynamic Layout Handling
- Automatic arrangement of added features based on content
- Responsive grid systems for content blocks that adapt to different screen sizes
- Consistent spacing and alignment across all sections

### Consistent Design Principles
- Unified editor interface across all content sections
- Shared components for common elements (buttons, inputs, cards)
- Consistent typography and styling following the existing design system

### Integration with Existing Dashboards
The new content management system will be seamlessly integrated with existing dashboards:
- Accessible via main navigation menu under "CONTENT MANAGEMENT"
- Shared authentication and authorization systems
- Consistent UI/UX with existing admin interface
- Reuse of existing components where possible to maintain familiarity

## Sample Dashboard Tables Summary

As shown in the consolidated information above, the upgraded admin interface will include enhanced dashboard tables:
- User Management Table with ID, Name, Email, Role, Status, Last Login, and Actions
- Content Management Table with Section, Page, Last Updated, Updated By, Status, and Actions
- Media Assets Table with Name, Type, Size, Uploaded By, Upload Date, Status, and Actions
- Activity Log Table with Timestamp, User, Action, Description, IP Address, and Status

## Conclusion

The admin interface upgrade is completely feasible with the current technology stack (Next.js, React, TypeScript, Tailwind CSS, shadcn/ui). The implementation timeline of 14-18 days allows for thorough testing and optimization while minimizing risks. The phased approach ensures that each component is implemented with proper safeguards and tested thoroughly before moving to the next phase.

The upgrade will provide a comprehensive content management system integrated with the existing dashboard functionality, allowing administrators to manage all website content through an intuitive interface while maintaining the stability and performance of the current system.



Website Content Summary - Thuy Tung Academy
Homepage Content
1. Hero Section
Title: "Kết Nối Giáo Dục & Nâng Tầm Cuộc Sống"
Content:
•	Main headline with call to action for international education
•	Description about personalized study abroad pathways
•	Statistics display: 12+ years of experience
Media Assets:
•	1 background image: "/images/Hero-image.jpg"
•	1 video: "/videos/gioi_thieu.mp4"
CTA Buttons:
•	"Tư vấn miễn phí" (Free consultation)
•	"Xem video giới thiệu" (Watch introduction video)
2. About Section ("Vì sao chọn Thủy Tùng")
Title: "Vì sao chọn Thủy Tùng làm đối tác của bạn?"
Content:
•	Description of partnerships with reputable institutions in Taiwan, Japan, Korea, Germany, USA, and Australia
•	Two feature boxes:
1.	"Uy Tín Tin Cậy" (Credibility) - Partnerships with reputable institutions and positive student feedback
2.	"Chi Phí Thấp" (Low Cost) - Scholarships and transparent service fees
Media Assets:
•	3 images: "/images/pic3.webp", "/images/picture1.jpg", "/images/picture2.jpg"
•	1 logo: "/images/logo2.png"
CTA Buttons:
•	"GIỚI THIỆU" (About Us)
•	Phone number display
3. Working Process Section
Title: "Quy Trình Làm Việc Tại Thủy Tùng"
Content:
•	6-step process for study abroad services:
1.	"Đăng Ký Nhận Tư Vấn" (Register for Consultation)
2.	"Khám Sức Khỏe" (Health Check)
3.	"Đào Tạo Ngoại Ngữ" (Language Training)
4.	"Phỏng Vấn" (Interview)
5.	"Xử Lý Hồ Sơ" (Document Processing)
6.	"Xuất Cảnh & Làm Việc" (Departure & Employment)
Media Assets:
•	1 background image: "/images/working-process.jpg"
•	6 custom SVG icons for each step
4. Country Flags Section
Title: "Các Quốc Gia Đối Tác"
Content:
•	Description of study abroad opportunities in 6 countries
Media Assets:
•	6 country flag SVGs:
o	South Korea: "/svg/south-korea_flag.svg"
o	Japan: "/svg/japan_flag.svg"
o	Taiwan: "/svg/taiwan_flag.svg"
o	Germany: "/svg/germany_flag.svg"
o	Australia: "/svg/australia_flag.svg"
o	Canada: "/svg/canada_flag.svg"
5. Study Abroad Section
Title: "Du Học Thủy Tùng - Mở Ra Chân Trời Mới"
Content:
•	Description of study abroad support services
•	5 study program categories:
1.	"Các học viên tiêu biểu của Thủy Tùng" (Featured Students)
2.	"Hệ Ngôn Ngữ" (Language Programs)
3.	"Học Cao Đẳng" (College Programs)
4.	"Học Đại Học" (University Programs)
5.	"Học Thạc Sĩ" (Master's Programs)
Media Assets:
•	5 images:
o	"/images/Study-abroad-representatives.jpg"
o	"/images/Study-abroad-language.jpg"
o	"/images/Study-abroad-college.jpg"
o	"/images/Study-abroad-university.jpg"
o	"/images/Study-abroad-masters.jpg"
CTA Buttons:
•	"Đăng Ký Ngay" (Register Now)
6. Slideshow Section
Content:
•	3 slides:
1.	"Chương Trình Du Học Nhật Bản 2025" with image "/images/slide-1.jpeg"
2.	"Tuyển Sinh Khóa Học Ngoại Ngữ" with image "/images/slide-2.jpg"
3.	"Hội Thảo Hướng Nghiệp Miễn Phí" with image "/images/slide-3.jpg"
7. CTA Section
Title: "Sẵn Sàng Cho Hành Trình Du Học?"
Content:
•	Description about free consultation and personalized study plans
CTA Buttons:
•	"Đăng ký tư vấn" (Register for consultation)
•	"Xem chương trình" (View programs)
About Page Content
1. Main Introduction Section
Title: "Về Chúng Tôi"
Content:
•	Vision: "Thủy Tùng là cầu nối hàng đầu đưa sinh viên, học sinh, và lao động Việt Nam đến các thị trường quốc tế"
•	Mission:
o	Opening high-quality study and work opportunities abroad
o	Providing quality, reputable, and responsible human resources to international partners
2. Why Choose Us Section
Title: "Tại Sao Nên Chọn Thủy Tùng?"
Content:
•	Multiple advantages of choosing the company (specific details in component code)
3. Statistics Section
Content:
•	Various statistics about the company's achievements (specific numbers in component code)
•	Icons for each statistic
4. Services Section
Title: "Các Dịch Vụ Chính"
Content:
•	Comprehensive services from consultation to supporting study abroad dreams
•	Multiple service categories with features (specific details in component code)
5. Commitments Section
Title: "Cam Kết Của Thủy Tùng"
Content:
•	Company commitments to customers and partners
•	Multiple commitment items with descriptions (specific details in component code)
6. Contact Info Section
Title: "Liên Hệ Với Chúng Tôi"
Content:
•	Contact information:
o	Address: "24/22 Đường số 23, Phường Hiệp Bình Chánh, Tp Thủ Đức"
o	Phone: "0908616014"
o	Email: "support@thuytung.edu.vn"
o	Working hours: Monday-Friday 8:00-18:00, Saturday 8:00-12:00, Sunday closed
Contact Page Content
1. Header Section
Title: "Liên Hệ Tư Vấn"
Content:
•	Description about free consultation for study abroad programs
2. Contact Form Section
Title: "Gửi thông tin tư vấn"
Content:
•	Form fields:
o	Name (required)
o	Phone (required)
o	Email (required)
o	Program of interest (dropdown)
o	Message/question
•	Privacy policy link
3. Contact Information Section
Title: "Thông tin liên hệ"
Content:
•	Detailed contact information:
o	Hotline: "0908616014"
o	Email: "support
Based on my analysis of the website's content, here's a detailed summary of the entire website structure:
Thuy Tung Website - Detailed Content Summary
Homepage Content
1. Hero Section
Title: "Kết Nối Giáo Dục & Nâng Tầm Cuộc Sống"
Content:
•	Main headline with call to action for international education
•	Description about helping students pursue master's degrees abroad
•	Personalized study plan development
•	Experience counter (12+ years)
Images:
•	1 background image: "/images/Hero-image.jpg"
Icons:
•	ArrowRight, Play (from lucide-react)
CTA Buttons:
•	"Tư vấn miễn phí" (Free consultation)
•	"Xem video giới thiệu" (Watch introduction video)
Video:
•	1 intro video: "/videos/gioi_thieu.mp4"
2. About Section ("Vì sao chọn Thủy Tùng")
Title: "Vì sao chọn Thủy Tùng làm đối tác của bạn?"
Content:
•	Description of company's partnerships with reputable institutions in Taiwan, Japan, Korea, Germany, USA, and Australia
•	Two feature boxes:
1.	"Uy Tín Tin Cậy" (Credibility) with items about reputable partnerships and positive feedback
2.	"Chi Phí Thấp" (Low Cost) with items about accessible scholarships and transparent service costs
Images:
•	3 content images: "/images/pic3.webp", "/images/picture1.jpg", "/images/picture2.jpg"
•	1 logo image: "/images/logo2.png"
Icons:
•	Handshake, Percent, CheckCircle (from lucide-react)
CTA Buttons:
•	"GIỚI THIỆU" (About)
•	Phone icon with contact number
3. Working Process Section
Title: "Quy Trình Làm Việc Tại Thủy Tùng"
Content:
•	Description about simplified 6-step process
•	6 process steps:
1.	"Đăng Ký Nhận Tư Vấn" (Register for Consultation)
2.	"Khám Sức Khỏe" (Health Check)
3.	"Đào Tạo Ngoại Ngữ" (Language Training)
4.	"Phỏng Vấn" (Interview)
5.	"Xử Lý Hồ Sơ" (Document Processing)
6.	"Xuất Cảnh & Làm Việc" (Departure & Employment)
Images:
•	1 background image: "/images/working-process.jpg"
Icons:
•	Custom SVG icons for each step (ClipboardList, HeartPulse, Languages, Users, FileText, Plane)
4. Country Flags Section
Title: "Các Quốc Gia Đối Tác"
Content:
•	Description about study opportunities in 6 countries
Images:
•	6 country flag SVGs:
o	South Korea: "/svg/south-korea_flag.svg"
o	Japan: "/svg/japan_flag.svg"
o	Taiwan: "/svg/taiwan_flag.svg"
o	Germany: "/svg/germany_flag.svg"
o	Australia: "/svg/australia_flag.svg"
o	Canada: "/svg/canada_flag.svg"
5. Study Abroad Section
Title: "Du Học Thủy Tùng - Mở Ra Chân Trời Mới"
Content:
•	Description about support for international education
•	5 study program cards:
1.	"Các học viên tiêu biểu của Thủy Tùng" (Outstanding Students)
2.	"Hệ Ngôn Ngữ" (Language Programs)
3.	"Học Cao Đẳng" (College Programs)
4.	"Học Đại Học" (University Programs)
5.	"Học Thạc Sĩ" (Master's Programs)
Images:
•	5 program images:
o	"/images/Study-abroad-representatives.jpg"
o	"/images/Study-abroad-language.jpg"
o	"/images/Study-abroad-college.jpg"
o	"/images/Study-abroad-university.jpg"
o	"/images/Study-abroad-masters.jpg"
Icons:
•	Emojis: 📋, 🗣️, 🎓, ✏️, 🎓
6. Slideshow Section
Content:
•	3 slides:
1.	"Chương Trình Du Học Nhật Bản 2025" with description about scholarships
2.	"Tuyển Sinh Khóa Học Ngoại Ngữ" with description about Japanese language courses
3.	"Hội Thảo Hướng Nghiệp Miễn Phí" with description about career counseling
Images:
•	3 slide images:
o	"/images/slide-1.jpeg"
o	"/images/slide-2.jpg"
o	"/images/slide-3.jpg"
7. CTA Section
Title: "Sẵn Sàng Cho Hành Trình Du Học?"
Content:
•	Description about free consultation and personalized study plans
CTA Buttons:
•	"Đăng ký tư vấn" (Register for consultation)
•	"Xem chương trình" (View programs)
About Page Content
1. Main Introduction Section
Title: "Về Chúng Tôi"
Content:
•	"Tầm Nhìn" (Vision): Bridge for Vietnamese students and workers to international markets
•	"Sứ Mệnh" (Mission):
o	Provide high-quality study and work opportunities abroad
o	Supply reputable and responsible workforce to international partners
2. Why Choose Us Section
Title: "Tại Sao Nên Chọn Thủy Tùng?"
Content:
•	6 reasons with descriptions (content loaded dynamically)
3. Statistics Section
Content:
•	4 statistics with numbers and labels (content loaded dynamically)
4. Services Section
Title: "Các Dịch Vụ Chính"
Content:
•	Description about comprehensive services from consultation to study/work abroad
•	3 services with features (content loaded dynamically)
5. Commitments Section
Title: "Cam Kết Của Thủy Tùng"
Content:
•	Description about commitment to providing best value to customers and partners
•	4 commitments with descriptions (content loaded dynamically)
6. Contact Info Section
Title: "Liên Hệ Với Chúng Tôi"
Content:
•	Description about connecting for fast and professional support
•	3 contact methods:
1.	Address: "24/22 Đường số 23, Phường Hiệp Bình Chánh, Tp Thủ Đức"
2.	Phone: "0908616014"
3.	Email: "support@thuytung.edu.vn"
Icons:
•	Phone, MapPin, Mail (from lucide-react)
Contact Page Content
1. Header Section
Title: "Liên Hệ Tư Vấn"
Content:
•	Description about free consultation and detailed information
2. Contact Form Section
Title: "Gửi thông tin tư vấn"
Content:
•	Description about filling detailed information for best consultation
•	Form fields:
o	Name (required)
o	Phone (required)
o	Email (required)
o	Program of interest (dropdown)
o	Message/question
CTA Button:
•	"Gửi thông tin tư vấn" (Send consultation information)
3. Contact Information Section
Title: "Thông tin liên hệ"
Content:
•	4 information blocks:
1.	"Hotline 24/7": 0908616014
2.	"Email": support@thuytung.edu.vn
3.	"Văn phòng": 24/22 Đường số 23, Phường Hiệp Bình Chánh, Tp Thủ Đức
4.	"Giờ làm việc": Monday-Friday 8:00-18:00, Saturday 8:00-12:00, Sunday closed
Programs Page Content
1. Header Section
Title: "Chương Trình Du Học"
Content:
•	Description about study opportunities in developed countries with world-class education quality
2. Program Filters Section
Content:
•	Search field for programs
•	Country filter dropdown
•	Clear filters button
3. Programs Grid Section
Content:
•	Dynamic grid of program cards based on filters
•	Each program card includes:
o	Image
o	Country
o	Title
o	Duration
o	Cost
o	Benefits
o	"Xem chi tiết" (View details) button
Overall Media Assets Summary
Images:
1.	Hero section: 1 image
2.	About section: 4 images
3.	Working process section: 1 image
4.	Country flags section: 6 SVG flags
5.	Study abroad section: 5 images
6.	Slideshow section: 3 images
7.	Program cards: Multiple program images
8.	Placeholder images: 1 placeholder image
Icons:
1.	Lucide React icons: Multiple icons used throughout the site
2.	Custom SVG icons: 6 custom icons for working process steps
3.	Emoji icons: 5 emojis for study program cards
Videos:
1.	Intro video: 1 video file
This comprehensive structure provides a complete overview of all content, titles, images, icons, and other media assets used throughout the Thuy Tung website.

