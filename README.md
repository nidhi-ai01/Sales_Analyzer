# Smart Sales Analytics

A full-stack business analytics application that transforms raw sales data into meaningful business insights through interactive metrics, charts, and data analysis.

## Live Demo

🚀 **Live Application:**  
https://frontend-9buw8c0vv-nidhis-projects-cdd74adb.vercel.app/

📂 **GitHub Repository:**  
https://github.com/nidhi-ai01/Sales_Analyzer

---

## Overview

Smart Sales Analytics is a web-based application that allows users to upload sales datasets in CSV format, process and validate the data, and explore important business performance metrics through an interactive dashboard.

The application helps users understand sales performance across products, categories, regions, and time periods.

---

## Features

- Upload sales data in CSV format
- Validate and clean uploaded data using Pandas
- Display key business metrics:
  - Total Revenue
  - Total Units Sold
  - Total Orders
  - Average Order Value
- Identify top-performing products
- Identify top-performing regions
- Analyze revenue by:
  - Product
  - Category
  - Region
  - Month
- Generate interactive charts and visualizations
- Display a preview of the processed dataset
- Separate React frontend and FastAPI backend
- REST API integration for data processing and analysis
- Responsive and user-friendly dashboard interface

---

## Technology Stack

### Frontend

- React.js
- Vite
- Recharts
- JavaScript
- CSS

### Backend

- Python
- FastAPI
- Pandas
- Uvicorn
- Python Multipart

### Deployment

- Vercel — Frontend
- Render — Backend

---

## Project Structure

```text
Sales_Analyzer/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── data/
│   └── sales_data.csv
│
├── .gitignore
└── README.md
```

---

## Requirements

Make sure the following are installed on your system:

- Python 3.10 or higher
- Node.js 18 or higher
- npm

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nidhi-ai01/Sales_Analyzer.git
cd Sales_Analyzer
```

---

# Backend Setup

### 2. Navigate to the Backend Directory

```bash
cd backend
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

### 5. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the FastAPI Server

```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at:

```text
http://localhost:8000
```

### API Documentation

FastAPI provides interactive API documentation at:

```text
http://localhost:8000/docs
```

---

# Frontend Setup

### 7. Open a New Terminal

Navigate to the frontend directory from the project root:

```bash
cd frontend
```

### 8. Install Frontend Dependencies

```bash
npm install
```

### 9. Start the Development Server

```bash
npm run dev
```

The frontend will usually be available at:

```text
http://localhost:5173
```

---

## Using the Application

1. Start the backend server.
2. Start the frontend development server.
3. Open the frontend application in your browser.
4. Upload a sales dataset in CSV format.
5. Click **Analyze Data**.
6. Review the calculated business metrics.
7. Explore product, category, regional, and monthly revenue charts.
8. Review the processed data preview.

---

## Dataset Format

The application expects sales data containing the following columns:

| Column | Description |
|---|---|
| `Date` | Date of the transaction |
| `Product` | Name of the product |
| `Category` | Product category |
| `Region` | Sales region |
| `Units_Sold` | Number of units sold |
| `Unit_Price` | Price per unit |
| `Revenue` | Total revenue generated |

### Sample Dataset

```csv
Date,Product,Category,Region,Units_Sold,Unit_Price,Revenue
2026-01-05,Laptop,Electronics,Chennai,5,55000,275000
2026-01-12,Mouse,Electronics,Bangalore,25,800,20000
2026-01-18,Keyboard,Electronics,Chennai,18,1500,27000
```

A sample dataset is included in the `data` directory.

---

## API Endpoint

### Analyze Sales Data

```text
POST /analyze
```

This endpoint accepts a CSV file, validates and cleans the data, and returns:

- Summary metrics
- Product-wise revenue
- Category-wise revenue
- Region-wise revenue
- Monthly revenue
- Data preview
- Number of cleaned records

---

## Deployment

### Backend Deployment

The FastAPI backend can be deployed using Render or another Python-compatible hosting platform.

#### Root Directory

```text
backend
```

#### Build Command

```bash
pip install -r requirements.txt
```

#### Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

### Frontend Deployment

The React frontend can be deployed using Vercel or Netlify.

#### Root Directory

```text
frontend
```

#### Build Command

```bash
npm run build
```

#### Output Directory

```text
dist
```

#### Install Command

```bash
npm install
```

### Environment Variable

Configure the backend API URL in the frontend deployment settings:

```text
VITE_API_URL=https://YOUR-BACKEND-URL
```

Replace `YOUR-BACKEND-URL` with the deployed backend URL.

---

## Application Workflow

```text
Upload CSV File
       │
       ▼
Validate Dataset
       │
       ▼
Clean and Prepare Data
       │
       ▼
Calculate Business Metrics
       │
       ▼
Generate Charts
       │
       ▼
Display Business Insights
```

---

## Future Improvements

Potential future enhancements include:

- Date-range filters
- Product and region filters
- Exportable analytics reports
- Advanced sales forecasting
- Customer segmentation
- Machine learning-based sales prediction
- Automated business recommendations
- Role-based access control
- Downloadable reports
- Advanced dashboard customization

---

## Author

### Nidhi Tiwari

- GitHub: https://github.com/nidhi-ai01
- LinkedIn: https://www.linkedin.com/in/nidhis13/

---

## License

This project is intended for educational and demonstration purposes.