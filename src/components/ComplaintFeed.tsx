import { ComplaintCard } from "@/components/ComplaintCard";
import { Complaint } from "@/types/complaint";

interface ComplaintFeedProps {
  complaints: Complaint[];
  onComplaintClick: (complaint: Complaint) => void;
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
}

export function ComplaintFeed({ 
  complaints, 
  onComplaintClick, 
  onUpvote, 
  onDownvote 
}: ComplaintFeedProps) {
  if (complaints.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No complaints found</p>
          <p className="text-sm">Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {complaints.length} {complaints.length === 1 ? 'Complaint' : 'Complaints'} Found
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
            onClick={() => onComplaintClick(complaint)}
            onUpvote={() => onUpvote(complaint.id)}
            onDownvote={() => onDownvote(complaint.id)}
          />
        ))}
      </div>
    </div>
  );
}