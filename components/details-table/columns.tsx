"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ScrapedData = {
  id: string
  keyword: string
  searchTaskId: string
  userId: string
  addsCount: number
  linksCount: number
  html: string
  createdAt: string
}

export const columns: ColumnDef<ScrapedData>[] = [
  {
    accessorKey: "id", 
    header: "Keyword Id",
    cell: (info) => info.getValue(), 
  },
  {
    accessorKey: "keyword", 
    header: "Keyword",
  },
  {
    accessorKey: "searchTaskId", 
    header: "Search Task Id",
    cell: (info) => info.getValue(), 
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: (info) => info.getValue(), 
  },
  {
    accessorKey: "addsCount",
    header: "Adds Count",
  },
  {
    accessorKey: "linksCount", 
    header: "Links Count",
  },
  {
    accessorKey: "html", 
    header: "HTML",
    cell: (info) => {
      const htmlContent = info.getValue() || "<p><strong>Welcome to the HTML view!</strong> This is some demo content.</p>";
      return (
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      );
    },
  },
  {
    accessorKey: "createdAt", 
    header: "Created At",
    cell: (info) => info.getValue(), 
  }
]



// keyword id
// keyword
// search task id
// user id
// addscount
// links count
// html
// createdat