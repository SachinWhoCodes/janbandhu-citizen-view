import { useState } from "react";
import { Header } from "@/components/Header";
import { ComplaintFeed } from "@/components/ComplaintFeed";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ComplaintModal } from "@/components/ComplaintModal";
import { Footer } from "@/components/Footer";
import { Complaint } from "@/types/complaint";
import { mockComplaints } from "@/data/mockData";

const Index = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [filters, setFilters] = useState({
    status: "",
    city: "",
    state: "",
    sortBy: "recent"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort complaints
  const filteredComplaints = complaints
    .filter(complaint => {
      if (filters.status && complaint.status !== filters.status) return false;
      if (filters.city && complaint.location.city !== filters.city) return false;
      if (filters.state && complaint.location.state !== filters.state) return false;
      if (searchQuery && !complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !complaint.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "recent":
          return new Date(b.dateFiled).getTime() - new Date(a.dateFiled).getTime();
        case "oldest":
          return new Date(a.dateFiled).getTime() - new Date(b.dateFiled).getTime();
        case "upvotes":
          return b.upvotes - a.upvotes;
        default:
          return 0;
      }
    });

  const handleComplaintClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleUpvote = (id: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { ...complaint, upvotes: complaint.upvotes + 1 }
        : complaint
    ));
  };

  const handleDownvote = (id: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { ...complaint, downvotes: complaint.downvotes + 1 }
        : complaint
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {showFilters && (
            <aside className="w-80 flex-shrink-0">
              <FilterSidebar 
                filters={filters}
                onFiltersChange={setFilters}
                complaints={complaints}
              />
            </aside>
          )}
          
          <div className="flex-1">
            <ComplaintFeed 
              complaints={filteredComplaints}
              onComplaintClick={handleComplaintClick}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          </div>
        </div>
      </main>

      <Footer />

      {selectedComplaint && (
        <ComplaintModal 
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
};

export default Index;