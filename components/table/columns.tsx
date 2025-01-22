"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ScrapedData = {
  id: string
  status: string
  userId: string
  createdAt: string
}

export const columns: ColumnDef<ScrapedData>[] = [
  {
    accessorKey: "id", 
    header: "Task Id",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "userId", 
    header: "User Id",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt", 
    header: "Created At",
    cell: (info) => info.getValue(),
  }
]

// taksid status user-id createddate 