'use client'

import { AppSidebar } from "@/components/app-sidebar";
import { DetailsPage } from "@/components/details-table/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useState } from "react"


interface FileUploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileUpload: () => void;
}

function FileUploadDialog({
    isOpen,
    onClose,
    onFileChange,
    onFileUpload,
}: FileUploadDialogProps) {
    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg w-96">
                    <h2 className="text-xl font-semibold">Upload CSV</h2>
                    <Input
                        type="file"
                        accept=".csv"
                        onChange={onFileChange}
                        className="my-4"
                    />
                    <div className="flex justify-end gap-4">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onFileUpload}>Upload</Button>
                    </div>
                </div>
            </div>
        )
    )
}

export default function Dashboard() {
  const params = useParams<{ id: string }>();
  const id = params.id;
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [csvFile, setCsvFile] = useState<File | null>(null)



    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        if (file && file.type === "text/csv") {
            setCsvFile(file)
        } else {
            alert("Please select a valid CSV file")
        }
    }

    const handleFileUpload = () => {
        if (csvFile) {
            // Handle file processing here (e.g., parse CSV, upload to server)
            alert("CSV file selected: " + csvFile.name)
            handleCloseDialog()  // Close the dialog after uploading
        } else {
            alert("No file selected.")
        }
    }

    return (
        <SidebarProvider className="bg-black">
            {/* Conditionally render AppSidebar based on isDialogOpen */}
            {!isDialogOpen && <AppSidebar className="bg-black "/>}
            
            <SidebarInset >
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <DetailsPage id={id} />
                </div>
            </SidebarInset>

            <FileUploadDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onFileChange={handleFileChange}
                onFileUpload={handleFileUpload}
            />
        </SidebarProvider>
    )
}
