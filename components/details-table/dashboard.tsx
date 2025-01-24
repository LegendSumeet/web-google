import React, { useState, useEffect } from "react";
import { columns, ScrapedData } from "./columns";
import { DataTable } from "./data-table"; 
import Cookies from "js-cookie";

type ApiResponse = {
  id: number;
  keyword: string;
  searchTaskId: number;
  userId: number;
  adsCount: number | null;
  linksCount: number | null;
  html: string | null;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}[];


async function getData(id: string): Promise<ScrapedData[]> {
  const token = Cookies.get("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/keywords/searchTask/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const data: ApiResponse = await response.json();


  if (!Array.isArray(data)) {
    throw new Error("Invalid data structure received from API");
  }

  return data.map((item) => ({
    id: String(item.id),
    keyword: item.keyword,
    searchTaskId: String(item.searchTaskId),
    userId: String(item.userId),
    addsCount: item.adsCount || 0,
    linksCount: item.linksCount || 0,
    html: item.html || "",
    createdAt: item.createdAt,
  }));
}

export function DetailsPage({ id }: { id: string }) {
  const [data, setData] = useState<ScrapedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(id);
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-xl font-semibold mb-4">Loading...</h1>
        <LoadingSkeleton rows={5} height={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-xl font-semibold text-red-500">Error:</h1>
        <p>{error}</p>
      </div>
    );
  }



  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl font-semibold mb-4">Details</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}


const LoadingSkeleton = ({ rows = 5, height = 40 }: { rows?: number; height?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse rounded"
          style={{ height: `${height}px`, width: "100%" }}
        ></div>
      ))}
    </div>
  );
};