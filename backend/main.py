from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io

app = FastAPI(title="Smart Sales Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REQUIRED_COLUMNS = [
    "Date", "Product", "Category", "Region",
    "Units_Sold", "Unit_Price", "Revenue"
]

def clean_data(contents: bytes):
    df = pd.read_csv(io.BytesIO(contents))
    missing = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing:
        raise ValueError(f"Missing columns: {', '.join(missing)}")

    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df["Units_Sold"] = pd.to_numeric(df["Units_Sold"], errors="coerce")
    df["Unit_Price"] = pd.to_numeric(df["Unit_Price"], errors="coerce")
    df["Revenue"] = pd.to_numeric(df["Revenue"], errors="coerce")

    df = df.dropna(subset=REQUIRED_COLUMNS).drop_duplicates()
    df["Month"] = df["Date"].dt.strftime("%Y-%m")
    return df

def generate_summary(df):
    top_product = (
        df.groupby("Product", as_index=False)["Revenue"]
        .sum()
        .sort_values("Revenue", ascending=False)
        .iloc[0]
    )

    top_region = (
        df.groupby("Region", as_index=False)["Revenue"]
        .sum()
        .sort_values("Revenue", ascending=False)
        .iloc[0]
    )

    return {
        "total_revenue": float(df["Revenue"].sum()),
        "total_units": int(df["Units_Sold"].sum()),
        "total_orders": int(len(df)),
        "average_order_value": float(df["Revenue"].mean()),
        "top_product": str(top_product["Product"]),
        "top_product_revenue": float(top_product["Revenue"]),
        "top_region": str(top_region["Region"]),
        "top_region_revenue": float(top_region["Revenue"]),
    }

def generate_analysis(df):
    product = (
        df.groupby("Product", as_index=False)["Revenue"]
        .sum()
        .sort_values("Revenue", ascending=False)
    )
    category = (
        df.groupby("Category", as_index=False)["Revenue"]
        .sum()
        .sort_values("Revenue", ascending=False)
    )
    region = (
        df.groupby("Region", as_index=False)["Revenue"]
        .sum()
        .sort_values("Revenue", ascending=False)
    )
    monthly = (
        df.groupby("Month", as_index=False)["Revenue"]
        .sum()
        .sort_values("Month")
    )

    return {
        "product_revenue": product.to_dict(orient="records"),
        "category_revenue": category.to_dict(orient="records"),
        "region_revenue": region.to_dict(orient="records"),
        "monthly_revenue": monthly.to_dict(orient="records"),
    }

@app.get("/")
def root():
    return {"message": "Smart Sales Analytics API is running"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Please upload a CSV file.")

    contents = await file.read()

    try:
        df = clean_data(contents)
        return {
            "summary": generate_summary(df),
            "analysis": generate_analysis(df),
            "preview": df.drop(columns=["Month"]).head(10).to_dict(orient="records"),
            "cleaned_rows": int(len(df)),
        }
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))
