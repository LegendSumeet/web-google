import { useState, useEffect } from "react";
import { DataTable } from "./data-table"; 
import { columns } from "./columns";
import Cookies from "js-cookie";


export type ScrapedData = {
  id: string;
  status: string;
  userId: string;
  createdAt: string;
};

interface ApiResponse {
  message: string;
  data: {
    id: number;
    status: string;
    userId: number;
    createdBy: string | null;
    updatedBy: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
  total: number;
  limit: number;
  offset: number;
}



async function getData(): Promise<ScrapedData[]> {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const response = await fetch("http://34.123.92.197/api/searchTask/getAll", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ApiResponse = await response.json();

  if(response.status !== 200) {
    throw new Error(data.message);
  }

  return data.data.map((item) => ({
    id: String(item.id),       
    status: item.status,       
    userId: String(item.userId),
    createdAt: item.createdAt,  
  }));
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

export function DemoPage() {
  const [data, setData] = useState<ScrapedData[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getData();
        setData(fetchedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-xl font-semibold mb-4">Loading Data...</h1>
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
      <DataTable
        columns={columns}
        data={data.map((item) => ({
          id: item.id,
          status: item.status,
          userId: item.userId,
          createdAt: new Date(item.createdAt).toLocaleString(),
        }))}
      />
    </div>
  );
}
