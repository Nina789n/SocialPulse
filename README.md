
# SocialPulse – Social Media Analytics Dashboard

> **Academic Conceptual Application:** A full-stack social media analytics dashboard demonstrating data collection, database management, performance analysis, and interactive data visualization.

## 1. Project Overview

**SocialPulse** is a modern, responsive Social Media Analytics Dashboard designed to provide centralized insights into social media performance across four major platforms:

- Instagram
- Facebook
- YouTube
- X (Twitter)

The application helps users monitor engagement metrics, analyze audience growth, compare platform performance, and generate analytical reports through an intuitive dashboard.

### Core Objectives

1. **Multi-Platform Performance Monitoring:** Track followers, reach, impressions, and engagement across multiple social media platforms.
2. **Engagement Analysis:** Monitor likes, comments, and shares through interactive charts and historical trends.
3. **Audience Growth Tracking:** Analyze daily and weekly follower acquisition and overall audience growth.
4. **Content Performance Analysis:** Evaluate individual post performance and identify high-engagement content.
5. **Analytical Reporting:** Generate performance summaries and platform comparisons with selectable 7, 30, and 90-day reporting periods.

> **Note:** All analytics displayed in this application are based on realistic simulated historical data stored in MongoDB. The application does not currently connect to live social media APIs.

---

## 2. Technology Stack

SocialPulse is developed using the specified React, Node.js, Express.js, and MongoDB technology stack.

### Frontend
- React.js – Component-based user interface.
- JavaScript (ES6+) – Application logic and interactivity.
- HTML5 – Semantic application structure.
- CSS3 – Responsive layouts and custom styling.
- Vite – Frontend development server and production build tool.
- Lucide React – Interface icons.
- SVG and CSS – Custom data visualizations.

### Backend
- Node.js – Server-side JavaScript runtime.
- Express.js – REST API development and routing.
- Mongoose – MongoDB object modelling.
- CORS – Cross-origin request handling.
- dotenv – Environment configuration.

### Database
- MongoDB – NoSQL database.
- Mongoose schemas – Data modelling, validation, and database operations.

---

## 3. Application Modules

### Module 1: Overview Dashboard

Provides a centralized view of overall social media performance.

**Key Performance Indicators (KPIs):**
- Total Followers
- Total Engagement
- Engagement Rate
- Total Reach
- Total Impressions
- Total Posts

Each metric displays its current value, percentage change, and performance trend.

**Data Visualizations:**

- Follower Growth – Interactive SVG line chart.
- Engagement Trends – SVG bar chart.
- Platform Performance – Comparative platform chart.
- Engagement Distribution – SVG donut chart.

**Recent Posts Table:**

Displays post title, platform, likes, comments, shares, engagement rate, and publication date.

### Module 2: Platform Analytics

Provides individual performance insights for:

- Instagram
- Facebook
- YouTube
- X (Twitter)

**Metrics displayed:**
- Followers or subscribers.
- Total posts.
- Likes.
- Comments.
- Shares.
- Reach.
- Impressions.
- Engagement rate.

Includes comparative visualizations to evaluate performance across platforms.

### Module 3: Engagement Analytics

Analyzes audience interactions across social media platforms.

**Features:**
- Total likes.
- Total comments.
- Total shares.
- Average engagement rate.
- Daily engagement trends.
- Platform-wise engagement distribution.
- Top-performing content.

Interactive charts provide a visual breakdown of engagement patterns.

### Module 4: Audience Growth

Provides insights into audience acquisition and growth trends.

**Features:**
- Total audience.
- New followers gained.
- Overall growth percentage.
- Cumulative audience growth trajectory.
- Platform-wise audience distribution.
- Daily and weekly follower acquisition trends.

### Module 5: Analytical Reports

Provides a consolidated view of social media performance.

**Report sections:**
1. Executive Performance Summary.
2. Engagement Analysis.
3. Audience Growth Summary.
4. Platform Performance Breakdown.
5. Visual Platform Comparison.

**Additional functionality:**
- 7-day, 30-day, and 90-day reporting periods.
- Platform selection.
- Dynamic analytical summaries.
- Browser-native print functionality.
- Print-to-PDF support.

---

## 4. Application Architecture

SocialPulse follows a three-tier architecture that separates the frontend, backend, and database.

```text
              SOCIALPULSE APPLICATION
                       |
                       v
        +-----------------------------+
        |       React Frontend        |
        |                             |
        | Dashboard | Charts | Reports|
        | Filters   | Analytics       |
        +-------------+---------------+
                      |
                 HTTP / JSON
                      |
                      v
        +-----------------------------+
        |       Express.js API        |
        |                             |
        | Routes | Controllers        |
        | Middleware | Business Logic |
        +-------------+---------------+
                      |
                   Mongoose
                      |
                      v
        +-----------------------------+
        |          MongoDB            |
        |                             |
        | Platforms                   |
        | Analytics                   |
        | Posts                       |
        +-----------------------------+
```

### Architecture Workflow

1. The user interacts with the React frontend.
2. React sends HTTP requests to the Express REST API.
3. Express processes requests through the appropriate routes and controllers.
4. Mongoose communicates with MongoDB.
5. MongoDB returns the requested analytical data.
6. The backend processes the data and sends JSON responses.
7. React updates the dashboard metrics and visualizations.

---

## 5. Project Folder Structure

```text
SocialPulse/
│
├── client/
│   ├── public/
│   └── src/
│       ├── charts/
│       │   ├── BarChart.jsx
│       │   ├── ComparisonChart.jsx
│       │   ├── DonutChart.jsx
│       │   └── LineChart.jsx
│       │
│       ├── components/
│       │   ├── FilterBar.jsx
│       │   ├── Header.jsx
│       │   ├── KpiCard.jsx
│       │   ├── RecentPostsTable.jsx
│       │   └── Sidebar.jsx
│       │
│       ├── pages/
│       │   ├── AudienceGrowth.jsx
│       │   ├── Engagement.jsx
│       │   ├── Overview.jsx
│       │   ├── PlatformAnalytics.jsx
│       │   └── Reports.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── styles/
│       │   └── index.css
│       │
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── analyticsController.js
│   │   ├── platformController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── Analytics.js
│   │   ├── Platform.js
│   │   └── Post.js
│   │
│   ├── routes/
│   │   ├── analyticsRoutes.js
│   │   ├── platformRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── seed/
│   │   └── seedData.js
│   │
│   ├── testEndpoints.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
│
└── client/
    └── package.json
```

---

## 6. Database Design

MongoDB is used to store platform information, historical analytics, and post-level performance data.

The application contains three primary collections.

### 6.1 Platforms Collection

**Model:** `Platform.js`

| Field | Data Type | Description |
|---|---|---|
| platformName | String | Social media platform name |
| username | String | Platform account handle |
| followers | Number | Current follower count |
| connectedAt | Date | Initial connection timestamp |

Supported platform names: Instagram, Facebook, YouTube, and X.

### 6.2 Analytics Collection

**Model:** `Analytics.js`

| Field | Data Type | Description |
|---|---|---|
| platformId | ObjectId | Reference to Platform |
| date | Date | Analytics record date |
| followers | Number | Total followers |
| likes | Number | Daily likes |
| comments | Number | Daily comments |
| shares | Number | Daily shares |
| reach | Number | Unique accounts reached |
| impressions | Number | Total impressions |
| engagementRate | Number | Engagement percentage |

A compound index on `platformId` and `date` supports efficient analytical queries.

### 6.3 Posts Collection

**Model:** `Post.js`

| Field | Data Type | Description |
|---|---|---|
| platformId | ObjectId | Reference to Platform |
| postTitle | String | Post title or caption |
| postDate | Date | Publication date |
| likes | Number | Total likes |
| comments | Number | Total comments |
| shares | Number | Total shares |
| reach | Number | Post reach |
| engagementRate | Number | Post engagement percentage |

---

## 7. REST API Documentation

The backend exposes RESTful endpoints through Express.js.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check server health |
| GET | `/api/platforms` | Retrieve all platforms |
| GET | `/api/platforms/:id` | Retrieve a specific platform |
| GET | `/api/posts` | Retrieve post analytics |
| GET | `/api/analytics` | Retrieve historical analytics |
| GET | `/api/analytics/overview` | Retrieve overview metrics |
| GET | `/api/analytics/platforms` | Retrieve platform comparisons |
| GET | `/api/analytics/engagement` | Retrieve engagement statistics |
| GET | `/api/analytics/audience` | Retrieve audience growth data |

### Supported Query Parameters

- `days`: Select 7, 30, or 90 days.
- `platform`: Filter by social media platform.
- `search`: Search posts.
- `sort`: Specify sorting order.
- `page`: Select pagination page.
- `limit`: Set the number of returned records.

The API returns structured JSON responses for frontend consumption.

---

## 8. Installation and Setup

### Prerequisites

- Node.js (v18 or later).
- npm.
- MongoDB local installation or MongoDB Atlas account.
- Git.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Nina789n/SocialPulse.git

cd SocialPulse
```

### Step 2: Configure Environment Variables

Copy the server environment template:

```bash
cp server/.env.example server/.env
```

Configure the environment variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/socialpulse
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace the local MongoDB URI with your Atlas connection string.

### Step 3: Install Dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

### Step 4: Seed the Database

Ensure MongoDB is running, then execute:

```bash
cd server
npm run seed
```

The seed script populates the database with simulated historical analytics.

Expected sample dataset:

- 4 social media platforms.
- 360 daily analytics records (90 days × 4 platforms).
- 18 sample posts.

### Step 5: Run the Backend

Open a terminal:

```bash
cd server
npm start
```

The backend runs at:

`http://localhost:5000`

### Step 6: Run the Frontend

Open a separate terminal:

```bash
cd client
npm run dev
```

The frontend runs at:

`http://localhost:5173`

Open the frontend URL in your browser to access SocialPulse.

---

## 9. Testing and Verification

The project includes an automated API testing script.

Run the backend test suite using:

```bash
cd server
node testEndpoints.js
```

The following endpoints were reported as successfully tested:

- Health check.
- Platform retrieval.
- Post retrieval.
- Historical analytics.
- Overview metrics.
- Platform analytics.
- Engagement analytics.
- Audience growth.

The frontend production build was also reported successful using:

```bash
cd client
npm run build
```

> Testing results should be reverified after any future code changes.

---

## 10. Screenshots

Screenshots of the application can be added here after running the project locally.

Suggested screenshots:

1. Overview Dashboard.
2. Platform Analytics.
3. Engagement Analytics.
4. Audience Growth.
5. Analytical Reports.

---

## 11. Future Enhancements

Potential extensions for future development include:

- Integration with official social media APIs.
- Real-time analytics synchronization.
- User authentication and role-based access.
- Advanced content performance analysis.
- Automated scheduled reports.
- Predictive audience growth analysis.

These features are outside the scope of the current MVP.

---

## 12. License

Developed as an academic conceptual application for demonstrating full-stack web development, database integration, and social media analytics visualization.

Licensed under the MIT License.
=======
# SocialPulse

