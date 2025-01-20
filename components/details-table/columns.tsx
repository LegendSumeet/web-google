"use client"

import { ColumnDef } from "@tanstack/react-table"

// Define the structure for the scraped data
export type ScrapedData = {
  id: string
  title: string
  url: string
  description: string
  keywords: string
  scrapedAt: string // Timestamp when the data was scraped
}

export const columns: ColumnDef<ScrapedData>[] = [
  {
    accessorKey: "title", // Column for the scraped page title
    header: "Title",
    cell: (info) => info.getValue(), // Rendering the title
  },
  {
    accessorKey: "url", // Column for the scraped URL
    header: "URL",
  },
  {
    accessorKey: "description", // Column for the scraped page description
    header: "Description",
    cell: (info) => info.getValue(), // Rendering the description
  },
  {
    accessorKey: "keywords", // Column for the scraped keywords
    header: "Keywords",
    cell: (info) => info.getValue(), // Rendering the keywords
  },
  {
    accessorKey: "scrapedAt", // Timestamp when the data was scraped
    header: "Scraped At",
  },
]
