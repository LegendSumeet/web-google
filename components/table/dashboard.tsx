import { useState, useEffect } from "react"
import { columns, ScrapedData } from "./columns"
import { DataTable } from "./data-table"

// Fetch data function to return ScrapedData structure
async function getData(): Promise<ScrapedData[]> {
  // Replace this with your actual API call
  return [
    {
      id: "728ed52f",
      title: "Example Page 1",
      url: "https://example.com/1",
      description: "This is an example description for page 1.",
      keywords: "example, page, test",
      scrapedAt: new Date().toISOString(),  // Timestamp when scraped
    },
    {
      id: "728ed52g",
      title: "Example Page 2",
      url: "https://example.com/2",
      description: "This is an example description for page 2.",
      keywords: "example, page, another",
      scrapedAt: new Date().toISOString(),  // Timestamp when scraped
    },
    // More data...
  ]
}

export function DemoPage() {
  const [data, setData] = useState<ScrapedData[]>([])  // State to store data
  const [loading, setLoading] = useState(true)        // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData()
      setData(data)  // Set the fetched data
      setLoading(false)  // Set loading to false after fetching
    }

    fetchData()
  }, [])  // Empty dependency array ensures this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>  // Show a loading state while fetching
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
