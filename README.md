# SocialPulse - Social Media Analytics Dashboard

> **Academic Conceptual Application:** Demonstrating full-stack social media analytics collection, data modeling, aggregation pipelines, and interactive data visualizations.

---

## 1. Project Overview & Objectives

**SocialPulse** is a modern, responsive Social Media Analytics Dashboard engineered to empower marketing teams, content creators, and brand managers with centralized performance visibility across four major social networks: **Instagram**, **Facebook**, **YouTube**, and **X (Twitter)**.

### Core Objectives:
1. **Monitor Multi-Channel Performance**: Track aggregate impressions, reach, followers, and engagement rates in real time.
2. **Engagement Pattern Analysis**: Unpack interactions (likes, comments, shares) with daily trends and cross-platform distribution.
3. **Audience Acquisition Tracking**: Analyze compounding audience growth, net daily gains, and weekly trajectory.
4. **Content-Level Intelligence**: Evaluate post-level performance and identify high-converting content hooks.
5. **Executive Reporting**: Produce comprehensive audit summaries with 7, 30, and 90-day filters and browser-native print export.

*Note: All data displayed is realistic simulated historical data stored and queried in MongoDB to demonstrate architectural feasibility.*

---

## 2. Technology Stack

Built strictly adhering to the specified minimal, performant full-stack architecture:

- **Frontend**:
  - React.js (v18)
  - JavaScript (ES6+)
  - HTML5 & Responsive Semantic Markup
  - Vanilla CSS3 (Custom design system with CSS variables, light SaaS palette, responsive flex/grid layouts)
  - Custom SVG/CSS Data Visualizations (Zero heavy third-party charting bloat)
  - Lucide React (Clean icon set)
  - Vite (Fast development tooling & optimized production bundler)
- **Backend**:
  - Node.js (v24 runtime)
  - Express.js (REST API, routing, error-handling middleware)
  - CORS middleware & dotenv environment configuration
- **Database**:
  - MongoDB
  - Mongoose ODM (Schemas, references, compound indices, validation)

---

## 3. Application Modules

### 🟣 Module 1: Overview Dashboard
- **6 KPI Metric Cards**:
  - *Total Followers*: Current aggregate across all channels, percentage delta, and trend indicator.
  - *Total Engagement*: Gross interactions (Likes + Comments + Shares).
  - *Engagement Rate*: Weighted percentage ratio of engagement to reach.
  - *Total Reach*: Unique impressions achieved over the period.
  - *Total Impressions*: Gross content views.
  - *Total Posts*: Active published content items.
- **Visualizations**:
  - Follower Growth (SVG Line Chart with area gradient, grid lines, and interactive hover tooltip).
  - Engagement Trends (SVG Bar Chart with multi-metric hover breakdown).
  - Platform Performance Comparison (Multi-metric comparison bars).
  - Engagement Distribution (Interactive SVG Donut Chart with center value).
- **Recent Posts Table**:
  - Post Title, Platform badge, Likes, Comments, Shares, Engagement Rate, and Publication Date.

### 🟣 Module 2: Platform Analytics
- Comprehensive platform cards for **Instagram**, **Facebook**, **YouTube**, and **X**.
- Platform-wise display of: Followers/Subscribers, Total Posts, Likes, Comments, Shares, Reach, Impressions, and Engagement Rate.
- Comparative multi-channel visual benchmark and reach distribution.

### 🟣 Module 3: Engagement Analytics
- KPI breakdown of Total Likes, Total Comments, Total Shares, and Average Engagement Rate.
- Interactive daily engagement trend chart with hover details for each metric.
- Platform-wise engagement distribution donut chart.
- Top performing content table ranked by engagement rate and likes.

### 🟣 Module 4: Audience Growth
- Macro growth summary: Total Audience, New Followers Gained, and Overall Growth Percentage.
- Cumulative audience growth trajectory line chart.
- Platform-wise audience market share donut chart.
- Toggleable **Daily** and **Weekly** net follower acquisition trends.

### 🟣 Module 5: Reports
- Executive performance summary report with selectable timeframes (7, 30, 90 days).
- Section-by-section breakdown:
  1. Executive Performance Summary
  2. Engagement Analysis
  3. Audience Growth Summary
  4. Platform Performance Breakdown Table
  5. Visual Platform Benchmark
- Browser-native **Print Report** button (`window.print()`) styled with clean `@media print` rules for clean paper or PDF export.

---

## 4. Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SocialPulse Client                       │
│        (React 18 + Pure SVG Charts + Vanilla CSS)           │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON API Calls
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express REST API                         │
│           (Controllers, Routes, Middleware)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │ Mongoose ODM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│       (Platforms, Daily Analytics 90-Days, Posts)           │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Folder Structure

```
SocialPulse/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── charts/
│   │   │   ├── BarChart.jsx            # Pure SVG Bar Chart
│   │   │   ├── ComparisonChart.jsx     # Multi-platform comparative chart
│   │   │   ├── DonutChart.jsx          # Pure SVG Donut Chart with center label
│   │   │   └── LineChart.jsx           # Pure SVG Line Chart with gradient & tooltip
│   │   ├── components/
│   │   │   ├── FilterBar.jsx           # 7/30/90 days & platform dropdown filter
│   │   │   ├── Header.jsx              # Responsive header & DB status
│   │   │   ├── KpiCard.jsx             # Metric card with delta & trend indicator
│   │   │   ├── RecentPostsTable.jsx    # Post analytics table
│   │   │   └── Sidebar.jsx             # Navigation sidebar with mobile drawer
│   │   ├── pages/
│   │   │   ├── AudienceGrowth.jsx      # Module 4
│   │   │   ├── Engagement.jsx          # Module 3
│   │   │   ├── Overview.jsx            # Module 1
│   │   │   ├── PlatformAnalytics.jsx   # Module 2
│   │   │   └── Reports.jsx             # Module 5 (Printable)
│   │   ├── services/
│   │   │   └── api.js                  # Frontend API client
│   │   ├── styles/
│   │   │   └── index.css               # Design system & responsive styles
│   │   ├── App.jsx                     # Core application component
│   │   └── main.jsx                    # React entrypoint
│   ├── index.html                      # HTML template
│   ├── package.json                    # Client dependencies
│   └── vite.config.js                  # Vite configuration & API proxy
│
├── server/
│   ├── config/
│   │   └── db.js                       # Mongoose database connection
│   ├── controllers/
│   │   ├── analyticsController.js      # Aggregation & metric calculations
│   │   ├── platformController.js       # Platform entity handlers
│   │   └── postController.js           # Post queries & filtering
│   ├── middleware/
│   │   └── errorHandler.js             # 404 & Centralized error handler
│   ├── models/
│   │   ├── Analytics.js                # Daily analytics schema
│   │   ├── Platform.js                 # Social platform schema
│   │   └── Post.js                     # Content post schema
│   ├── routes/
│   │   ├── analyticsRoutes.js          # /api/analytics routes
│   │   ├── platformRoutes.js           # /api/platforms routes
│   │   └── postRoutes.js               # /api/posts routes
│   ├── seed/
│   │   └── seedData.js                 # 90-day multi-channel seeding script
│   ├── .env.example                    # Backend environment template
│   ├── package.json                    # Server dependencies
│   └── server.js                       # Express application bootstrap
│
├── .env.example                        # Root environment reference
├── .gitignore                          # Git ignore specification
├── package.json                        # Root helper scripts
└── README.md                           # Documentation
```

---

## 6. Database Collections & Schemas

### 1. Platforms Collection (`Platform.js`)
| Field | Type | Description |
|---|---|---|
| `platformName` | String | Unique enum (`Instagram`, `Facebook`, `YouTube`, `X`) |
| `username` | String | Platform handle (e.g., `@socialpulse_app`) |
| `followers` | Number | Current follower or subscriber count |
| `connectedAt` | Date | Initial channel connection timestamp |

### 2. Analytics Collection (`Analytics.js`)
| Field | Type | Description |
|---|---|---|
| `platformId` | ObjectId | Reference to `Platform` model |
| `date` | Date | Daily timestamp (indexed) |
| `followers` | Number | Daily total followers |
| `likes` | Number | Total daily likes |
| `comments` | Number | Total daily comments |
| `shares` | Number | Total daily shares / retweets |
| `reach` | Number | Total daily unique accounts reached |
| `impressions` | Number | Total content impressions |
| `engagementRate` | Number | Daily engagement percentage |

*Note: Compound index on `{ platformId: 1, date: 1 }` for high-performance time-series queries.*

### 3. Posts Collection (`Post.js`)
| Field | Type | Description |
|---|---|---|
| `platformId` | ObjectId | Reference to `Platform` model |
| `postTitle` | String | Content caption or headline |
| `postDate` | Date | Publication date |
| `likes` | Number | Post likes |
| `comments` | Number | Post comments |
| `shares` | Number | Post shares |
| `reach` | Number | Post reach |
| `engagementRate` | Number | Calculated post engagement rate |

---

## 7. API Endpoint Documentation

All endpoints return standardized JSON: `{ success: true, data: { ... } }`.

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Service health check |
| `GET` | `/api/platforms` | None | List all connected platforms |
| `GET` | `/api/platforms/:id` | None | Get single platform by ID or Name |
| `GET` | `/api/posts` | `platform`, `search`, `sort`, `page`, `limit` | Paginated post analytics |
| `GET` | `/api/analytics` | `days` (7, 30, 90), `platform` | Filtered raw analytics entries |
| `GET` | `/api/analytics/overview` | `days`, `platform` | Overview KPIs, % changes, and 4 chart datasets |
| `GET` | `/api/analytics/platforms`| `days` | Platform-wise stats and comparative benchmarks |
| `GET` | `/api/analytics/engagement`| `days`, `platform` | Likes, comments, shares, trends, and top posts |
| `GET` | `/api/analytics/audience` | `days`, `platform` | Audience growth, net gains, and trajectory |

---

## 8. Installation & Setup Instructions

### Prerequisites:
- **Node.js**: v18.0.0 or later (v24 recommended)
- **MongoDB**: Local MongoDB instance running on default port `27017` or a MongoDB Atlas URI

### Step 1: Clone the Repository
```bash
git clone https://github.com/Nina789n/SocialPulse.git
cd SocialPulse
```

### Step 2: Environment Configuration
Copy `.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Default configuration for local MongoDB:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/socialpulse
CLIENT_URL=http://localhost:5173
```
*For MongoDB Atlas: Replace `MONGODB_URI` with your connection string:*
`mongodb+srv://<username>:<password>@<cluster>.mongodb.net/socialpulse?retryWrites=true&w=majority`

### Step 3: Install Dependencies
Install dependencies across both client and server:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

cd ..
```

### Step 4: Seed the Database
Populate MongoDB with 90 days of realistic multi-channel analytics and post data:
```bash
cd server
npm run seed
```
Output:
```
[MongoDB Connected]: 127.0.0.1:27017/socialpulse
Inserted 4 platforms.
Inserted 360 analytics records (90 days x 4 platforms).
Inserted 18 sample posts.
✅ Seeding completed successfully!
```

### Step 5: Start the Application
Run the backend and frontend in separate terminal windows:

**Terminal 1 (Backend API):**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

Open your browser at **http://localhost:5173** to access SocialPulse!

---

## 9. Screenshots Placeholder

*(Screenshots can be added here after local deployment)*

- **Overview Dashboard**: High-level KPIs, Follower Growth Line Chart, Engagement Trends Bar Chart, Platform Comparison Chart, and Recent Posts.
- **Platform Analytics**: Channel cards for Instagram, Facebook, YouTube, and X with comparative metrics.
- **Engagement Analytics**: Likes, comments, shares breakdown with interactive trend graphs.
- **Audience Growth**: Compounding trajectory with toggleable daily/weekly acquisition views.
- **Analytical Reports**: Executive audit view with one-click print-to-PDF export.

---

## 10. License

Developed for academic conceptual demonstration purposes. Licensed under the MIT License.
