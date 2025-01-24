'use client'

import { AppSidebar } from "@/components/app-sidebar";
import { DemoPage } from "@/components/table/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { saveAs } from 'file-saver';
import { FaFileCsv } from 'react-icons/fa'; // Importing CSV file icon from React Icons


interface FileUploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileUpload: () => void;
    isUploading: boolean;
    uploadError: string | null;
    isUploadSuccess: boolean;
}



function FileUploadDialog({
    isOpen,
    onClose,
    onFileChange,
    onFileUpload,
    isUploading,
    uploadError,
    isUploadSuccess,
}: FileUploadDialogProps) {
    const downloadCsvTemplate = () => {
        const csvContent = 'Keywords\nflutter\njava\niphones\n';
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'template.csv');
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg w-96">
                    <h2 className="text-xl font-semibold">Upload CSV</h2>
                    <div className="flex items-center gap-2 my-4">
                    <Button
                            variant="outline"
                            onClick={downloadCsvTemplate}
                            className="px-2 py-1 rounded text-sm flex items-center gap-1 border border-gray-300"
                        >
                            <FaFileCsv className="text-black" />
                            Template
                        </Button>
                        <Input
                            type="file"
                            accept=".csv"
                            onChange={onFileChange}
                            className="flex-1"
                        />
                       
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onFileUpload}>Upload</Button>
                    </div>
                    {isUploading && <div className="mt-4 text-center">Uploading...</div>}
                    {isUploadSuccess && (
                        <div className="mt-4 text-center text-green-500">
                            File uploaded successfully!
                        </div>
                    )}
                    {uploadError && (
                        <div className="mt-4 text-center text-red-500">{uploadError}</div>
                    )}
                </div>
            </div>
        )
    );
}


export default function Dashboard() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);
    const [uploadSuccessTriggered, setUploadSuccessTriggered] = useState(false); 

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/");
        }
    }, [router]);

    const handleOpenDialog = () => {
        setIsUploadSuccess(false);
       setUploadSuccessTriggered(false);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.type === "text/csv") {
            setCsvFile(file);
        } else {
            alert("Please select a valid CSV file");
        }
    };

    const handleFileUpload = async () => {
        if (csvFile) {
            const formData = new FormData();
            formData.append("file", csvFile);

            setIsUploading(true);
            setUploadError(null);
            setIsUploadSuccess(false);

            try {
                const token = Cookies.get("token");

                const response = await fetch("https://myclan.co.in/api/searchTask/create", {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 201) {
                    console.log("File uploaded successfully");
                    setIsUploadSuccess(true);
                    setUploadSuccessTriggered(true);
                } else {
                    const errorData = await response.json();
                    setUploadError(errorData.message || "Error uploading file");
                }
            } catch (error) {
                console.error("Error during file upload:", error);
                setUploadError("There was an error during the file upload.");
                setUploadSuccessTriggered(false); 
            } finally {
                setIsUploading(false);
                handleCloseDialog(); 
            }
        } else {
            alert("No file selected.");
        }
    };

    return (
        <SidebarProvider className="bg-black">
            {!isDialogOpen && <AppSidebar className="bg-black" />}
            
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Button onClick={handleOpenDialog}>Upload CSV to Start Scraping</Button>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <DemoPage key={uploadSuccessTriggered ? "success" : "default"} />
                </div>
            </SidebarInset>

            <FileUploadDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onFileChange={handleFileChange}
                onFileUpload={handleFileUpload}
                isUploading={isUploading}
                uploadError={uploadError}
                isUploadSuccess={isUploadSuccess}
            />
        </SidebarProvider>
    );
}
