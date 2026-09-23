# Smart Sales Analytics

A beginner-friendly full-stack business analytics project.

## Features

- Upload a CSV sales dataset
- Validate and clean data using Pandas
- Display total revenue, units sold, orders and average order value
- Identify top-performing product and region
- Generate product, category, region and monthly revenue charts
- Display a preview of the processed data
- Separate React frontend and FastAPI backend

## Project Structure

```text
smart_sales_analytics/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── data/
│   └── sales_data.csv
└── README.md
```

## Requirements

- Python 3.10+
- Node.js 18+
- npm

## Run the Backend

Open a terminal inside the `backend` folder:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the API:

```bash
uvicorn main:app --reload --port 8000
```

Backend URL:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

## Run the Frontend

Open another terminal inside the `frontend` folder:

```bash
npm install
npm run dev
```

Open the URL displayed by Vite, normally:

```text
http://localhost:5173
```

## Test the Application

1. Open the frontend.
2. Upload `data/sales_data.csv`.
3. Click **Analyze Data**.
4. Review the metrics and charts.

## Deployment Notes

### Backend

Deploy the `backend` folder to Render or another Python hosting service.

Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Frontend

Deploy the `frontend` folder to Vercel or Netlify.

Add this environment variable:

```text
VITE_API_URL=https://YOUR-BACKEND-URL
```

Replace `YOUR-BACKEND-URL` with the deployed backend URL.

## Classroom Assessment Idea

Ask students to create a similar analytics dashboard using another dataset.

Minimum requirements:

- Upload or load a CSV file
- Display the data
- Show at least three metrics
- Create two charts
- Add one filter or interactive feature
- Display three meaningful insights
- Explain the business problem and solution
