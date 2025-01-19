"use client";

import { useParams } from "next/navigation";

const data = [
  {
    id: "728ed52f",
    title: "Example Page 1",
    url: "https://example.com/1",
    description: "This is an example description for page 1.",
    keywords: "example, page, test",
    scrapedAt: new Date().toISOString(), // Timestamp when scraped
  },
  {
    id: "728ed52g",
    title: "Example Page 2",
    url: "https://example.com/2",
    description: "This is an example description for page 2.",
    keywords: "example, page, another",
    scrapedAt: new Date().toISOString(), // Timestamp when scraped
  },
];

const Page = () => {
  const params = useParams();
  const { id } = params;

  // Find the specific page data by ID
  const pageData = data.find((item) => item.id === id);

  if (!pageData) {
    return (
      <div className="container">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p>No data available for the requested page ID: {id}.</p>
      </div>
    );
  }

  const { title, url, description, keywords, scrapedAt } = pageData;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Page Details</h1>
      <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700 my-2">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit: {url}
        </a>
        <p className="mt-2">
          <strong>Keywords:</strong> {keywords}
        </p>
        <p className="text-sm text-gray-500">
          Scraped at: {new Date(scrapedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Page;
