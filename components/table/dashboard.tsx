import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Cookies from "js-cookie";
import { Button } from "../ui/button";

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

async function getData(offset: number, limit: number): Promise<{ data: ScrapedData[]; total: number }> {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const response = await fetch(
    `https://myclan.co.in/api/searchTask/getAll?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result: ApiResponse = await response.json();

  if (response.status !== 200) {
    throw new Error(result.message);
  }

  const data = result.data.map((item) => ({
    id: String(item.id),
    status: item.status,
    userId: String(item.userId),
    createdAt: item.createdAt,
  }));

  return { data, total: result.total };
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
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 10; 
  const fetchData = async (newOffset: number) => {
    try {
      setLoading(true);
      const result = await getData(newOffset, limit);
      setData(result.data);
      setTotal(result.total);
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

  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  const handleNext = () => {
    if (offset + limit < total) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset((prev) => prev - limit);
    }
  };

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
      <div className="flex justify-end space-x-4 py-4">
     
        <Button
          onClick={handlePrevious}
          disabled={offset === 0}
          className="px-3 py-2 rounded-md text-sm border border-black text-white disabled:opacity-50 hover:bg-gray-100"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={offset + limit >= total}
          className="px-3 py-2 rounded-md text-sm border border-black text-white disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
