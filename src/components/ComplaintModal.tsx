import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, User, Phone, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { Complaint } from "@/types/complaint";
import { cn } from "@/lib/utils";

interface ComplaintModalProps {
  complaint: Complaint;
  onClose: () => void;
}

export function ComplaintModal({ complaint, onClose }: ComplaintModalProps) {
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

  const timelineStatusStyles = {
    filed: "bg-muted text-muted-foreground",
    forwarded: "bg-status-progress/20 text-status-progress",
    "in-progress": "bg-status-progress text-status-progress-foreground",
    resolved: "bg-status-resolved text-status-resolved-foreground"
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "filed":
        return "📝";
      case "forwarded":
        return "📤";
      case "in-progress":
        return "🔧";
      case "resolved":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl pr-8">
              {complaint.title}
            </DialogTitle>
            <Badge className={cn("text-sm", statusStyles[complaint.status])}>
              {statusLabels[complaint.status]}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Image and Details */}
          <div className="space-y-4">
            {complaint.image && (
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={complaint.image} 
                  alt={complaint.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {complaint.description}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{complaint.location.address}</p>
                    <p className="text-muted-foreground">{complaint.location.city}, {complaint.location.state}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Filed On</p>
                    <p className="text-muted-foreground">{formatDate(complaint.dateFiled)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge variant="outline">{complaint.category}</Badge>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{complaint.upvotes}</span>
                  <ThumbsDown className="h-4 w-4 ml-2" />
                  <span>{complaint.downvotes}</span>
                </div>
              </div>

              {complaint.resolver && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Assigned Resolver</h3>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{complaint.resolver.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{complaint.resolver.department}</p>
                      {complaint.resolver.contact && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{complaint.resolver.contact}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Progress Timeline</span>
              </h3>

              <div className="space-y-4">
                {complaint.timeline.map((event, index) => (
                  <div key={event.id} className="flex space-x-3">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-border">
                        <span className="text-xs">{getTimelineIcon(event.status)}</span>
                      </div>
                      {index < complaint.timeline.length - 1 && (
                        <div className="w-0.5 h-8 bg-border mt-2"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 pb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", timelineStatusStyles[event.status])}
                        >
                          {event.status.replace("-", " ").toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <p className="text-sm">{event.description}</p>
                      {event.department && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Department: {event.department}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}