import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Complaint } from "@/types/complaint";

interface FilterSidebarProps {
  filters: {
    status: string;
    city: string;
    state: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
  complaints: Complaint[];
}

export function FilterSidebar({ filters, onFiltersChange, complaints }: FilterSidebarProps) {
  // Extract unique values for dropdowns
  const uniqueStates = [...new Set(complaints.map(c => c.location.state))];
  const uniqueCities = [...new Set(complaints.map(c => c.location.city))];
  const uniqueCategories = [...new Set(complaints.map(c => c.category))];

  // Get complaint counts by status
  const statusCounts = {
    pending: complaints.filter(c => c.status === "pending").length,
    "in-progress": complaints.filter(c => c.status === "in-progress").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
  };

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: "",
      city: "",
      state: "",
      sortBy: "recent"
    });
  };

  const hasActiveFilters = filters.status || filters.city || filters.state;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select 
              value={filters.sortBy} 
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="upvotes">Most Upvoted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Status Filter */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">
                  <div className="flex items-center justify-between w-full">
                    <span>Pending</span>
                    <Badge variant="secondary" className="ml-2 bg-status-pending/10 text-status-pending">
                      {statusCounts.pending}
                    </Badge>
                  </div>
                </SelectItem>
                <SelectItem value="in-progress">
                  <div className="flex items-center justify-between w-full">
                    <span>In Progress</span>
                    <Badge variant="secondary" className="ml-2 bg-status-progress/10 text-status-progress">
                      {statusCounts["in-progress"]}
                    </Badge>
                  </div>
                </SelectItem>
                <SelectItem value="resolved">
                  <div className="flex items-center justify-between w-full">
                    <span>Resolved</span>
                    <Badge variant="secondary" className="ml-2 bg-status-resolved/10 text-status-resolved">
                      {statusCounts.resolved}
                    </Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* State Filter */}
          <div className="space-y-2">
            <Label>State</Label>
            <Select 
              value={filters.state} 
              onValueChange={(value) => handleFilterChange("state", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All states" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All States</SelectItem>
                {uniqueStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Filter */}
          <div className="space-y-2">
            <Label>City</Label>
            <Select 
              value={filters.city} 
              onValueChange={(value) => handleFilterChange("city", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {uniqueCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {uniqueCategories.map((category) => {
              const count = complaints.filter(c => c.category === category).length;
              return (
                <Badge key={category} variant="outline" className="text-xs">
                  {category} ({count})
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}