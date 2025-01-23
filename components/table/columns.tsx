"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { TooltipComp } from "../tooltip"

export type ScrapedData = {
  id: string
  status: string
  userId: string
  createdAt: string
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'CREATED':
      return { color: 'blue-500', label: 'Created', icon: '📝' }
    case 'UPDATED':
      return { color: 'yellow-500', label: 'Updated', icon: '🔄' }
    case 'COMPLETED':
      return { color: 'green-500', label: 'Completed', icon: '✔️' }
    default:
      return { color: 'gray-500', label: 'Unknown', icon: '❓' }
  }
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
    cell: (info) => {
      const status = info.getValue() as string;  // Type assertion to string
      const { color, label, icon } = getStatusStyles(status);

      return (
        <div className={`text-${color} font-semibold flex items-center`}>
          <span className="mr-2">{icon}</span>
          <TooltipComp buttonName={status} content={`Task status is ${label}`}>
          </TooltipComp>
        </div>
      )
    }
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
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (info) => {
      return (
        <Button
          onClick={() => {
            console.log("Open button clicked", info.row.original.id)
          }}
          variant="outline"
        >
          Open
        </Button>
      )
    }
  }
]
