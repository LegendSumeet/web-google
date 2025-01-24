import { useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";

type ScrapedData = {
  id: string;
  keyword: string;
  searchTaskId: string;
  userId: string;
  addsCount: number;
  linksCount: number;
  html: string;
  createdAt: string;
};

async function getData(id: string): Promise<ScrapedData> {
  const token = Cookies.get("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/keywords/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  if (!data || typeof data !== "object") {
    throw new Error("Invalid data structure received from API");
  }



  return {
    id: String(data.id),
    keyword: data.keyword,
    searchTaskId: String(data.searchTaskId),
    userId: String(data.userId),
    addsCount: data.adsCount || 0,
    linksCount: data.linksCount || 0,
    html: data.html || "",
    createdAt: data.createdAt,
  };
}

export function DialogDemo({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open state
  const [htmlContent, setHtmlContent] = useState<string>(""); // Store fetched HTML content
  const [loading, setLoading] = useState<boolean>(false); // Manage loading state

  const handleDialogOpen = async () => {
    setLoading(true);
    try {
      const data = await getData(id); // Fetch data using the provided ID
      setHtmlContent(data.html || "No HTML content available");
      setIsDialogOpen(true); // Open the dialog after fetching data
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setHtmlContent("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="z-10"
        onClick={handleDialogOpen}
        disabled={loading}
      >
        {loading ? "Loading..." : "View Content"}
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500] md:max-w-[900px] lg:max-w-[1200px] max-h-[80vh] overflow-hidden">
          <DialogTitle className="text-sm font-semibold">HTML Content</DialogTitle>
          <div
            className="py-4 overflow-y-auto"
            style={{ maxHeight: "calc(80vh - 120px)" }}
          >
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild className="absolute bottom-2 right-4">
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}