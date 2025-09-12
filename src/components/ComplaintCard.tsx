import { MapPin, ThumbsUp, ThumbsDown, Calendar, Eye } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Complaint } from "@/types/complaint";
import { cn } from "@/lib/utils";

interface ComplaintCardProps {
  complaint: Complaint;
  onClick: () => void;
  onUpvote: () => void;
  onDownvote: () => void;
}

export function ComplaintCard({ complaint, onClick, onUpvote, onDownvote }: ComplaintCardProps) {
  const statusStyles = {
    pending: "bg-status-pending text-status-pending-foreground",
    "in-progress": "bg-status-progress text-status-progress-foreground",
    resolved: "bg-status-resolved text-status-resolved-foreground"
  };

  const statusLabels = {
    pending: "Pending",
    "in-progress": "In Progress", 
    resolved: "Resolved"
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]">
      <div onClick={onClick}>
        {complaint.image && (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img 
              src={complaint.image} 
              alt={complaint.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge className={cn("text-xs", statusStyles[complaint.status])}>
                {statusLabels[complaint.status]}
              </Badge>
            </div>
          </div>
        )}
      </div>

      <CardHeader className={complaint.image ? "pb-2" : ""}>
        <div className="flex items-start justify-between">
          <CardTitle 
            className="text-lg leading-tight cursor-pointer hover:text-primary transition-colors"
            onClick={onClick}
          >
            {complaint.title}
          </CardTitle>
          {!complaint.image && (
            <Badge className={cn("ml-2 text-xs", statusStyles[complaint.status])}>
              {statusLabels[complaint.status]}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p 
          className="text-muted-foreground text-sm mb-3 line-clamp-2 cursor-pointer"
          onClick={onClick}
        >
          {complaint.description}
        </p>

        <div className="flex items-center text-xs text-muted-foreground space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{complaint.location.city}, {complaint.location.state}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(complaint.dateFiled)}</span>
          </div>
        </div>

        <div className="mt-2">
          <Badge variant="outline" className="text-xs">
            {complaint.category}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onUpvote();
            }}
            className="h-8 px-2 hover:bg-status-resolved/10 hover:text-status-resolved"
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            <span className="text-xs">{complaint.upvotes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDownvote();
            }}
            className="h-8 px-2 hover:bg-status-pending/10 hover:text-status-pending"
          >
            <ThumbsDown className="h-3 w-3 mr-1" />
            <span className="text-xs">{complaint.downvotes}</span>
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onClick}
          className="h-8 px-3 text-xs"
        >
          <Eye className="h-3 w-3 mr-1" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}