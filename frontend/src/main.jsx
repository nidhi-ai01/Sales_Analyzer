import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import "./styles.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const COLORS = ["#6366f1", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6"];

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeFile = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to analyze the file.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">BUSINESS ANALYTICS PROJECT</p>
          <h1>Smart Sales Analytics</h1>
          <p className="subtitle">
            Upload your sales dataset and discover meaningful business insights.
          </p>
        </div>
        <div className="hero-badge">AI & DATA ANALYTICS</div>
      </header>

      <main className="container">
        <section className="upload-card">
          <div>
            <h2>Analyze Your Dataset</h2>
            <p>Upload a CSV file containing sales information.</p>
          </div>
          <div className="upload-row">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={analyzeFile} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Data"}
            </button>
          </div>
          <p className="hint">
            Required columns: Date, Product, Category, Region, Units_Sold, Unit_Price, Revenue
          </p>
          {error && <p className="error">{error}</p>}
        </section>

        {!result && (
          <section className="empty-state">
            <div className="empty-icon">📊</div>
            <h2>Your business insights will appear here</h2>
            <p>Upload the included sales_data.csv file to test the dashboard.</p>
          </section>
        )}

        {result && (
          <>
            <section className="metrics">
              <Metric title="Total Revenue" value={money(result.summary.total_revenue)} />
              <Metric title="Units Sold" value={result.summary.total_units.toLocaleString()} />
              <Metric title="Total Orders" value={result.summary.total_orders} />
              <Metric title="Average Order Value" value={money(result.summary.average_order_value)} />
            </section>

            <section className="insights">
              <div className="insight">
                <span>Top Product</span>
                <strong>{result.summary.top_product}</strong>
                <small>{money(result.summary.top_product_revenue)} revenue</small>
              </div>
              <div className="insight">
                <span>Top Region</span>
                <strong>{result.summary.top_region}</strong>
                <small>{money(result.summary.top_region_revenue)} revenue</small>
              </div>
              <div className="insight">
                <span>Cleaned Records</span>
                <strong>{result.cleaned_rows}</strong>
                <small>Valid records used for analysis</small>
              </div>
            </section>

            <section className="charts-grid">
              <ChartCard title="Revenue by Product">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={result.analysis.product_revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Product" />
                    <YAxis />
                    <Tooltip formatter={(value) => money(value)} />
                    <Bar dataKey="Revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Monthly Revenue Trend">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={result.analysis.monthly_revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" />
                    <YAxis />
                    <Tooltip formatter={(value) => money(value)} />
                    <Line type="monotone" dataKey="Revenue" stroke="#14b8a6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Revenue by Category">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={result.analysis.category_revenue}
                      dataKey="Revenue"
                      nameKey="Category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {result.analysis.category_revenue.map((entry, index) => (
                        <Cell key={entry.Category} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => money(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Revenue by Region">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={result.analysis.region_revenue} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="Region" width={80} />
                    <Tooltip formatter={(value) => money(value)} />
                    <Bar dataKey="Revenue" fill="#f59e0b" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </section>

            <section className="table-card">
              <h2>Data Preview</h2>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(result.preview[0] || {}).map((key) => <th key={key}>{key}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {result.preview.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, i) => <td key={i}>{String(value)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      <footer>
        Built for classroom learning • Smart Sales Analytics
      </footer>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="metric">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="chart-card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
