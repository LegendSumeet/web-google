import { ColumnDef } from "@tanstack/react-table"
import { DialogDemo } from "../dialog"

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
      // Get the HTML content as a string
      const htmlContent = info.getValue<string>();  // Explicitly asserting the type to string
      return <DialogDemo htmlContent={htmlContent} />;  // Pass the htmlContent to the DialogDemo component
    },
  },
  {
    accessorKey: "createdAt", 
    header: "Created At",
    cell: (info) => info.getValue(), 
  }
]
