import { Search, Filter, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    status: string;
    city: string;
    state: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
  onToggleFilters: () => void;
}

export function Header({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFiltersChange,
  onToggleFilters 
}: HeaderProps) {
  const quickFilters = [
    { label: "Recent", value: "recent", type: "sortBy" },
    { label: "Most Upvoted", value: "upvotes", type: "sortBy" },
    { label: "Resolved", value: "resolved", type: "status" },
    { label: "In Progress", value: "in-progress", type: "status" },
    { label: "Pending", value: "pending", type: "status" },
  ];

  const handleQuickFilter = (type: string, value: string) => {
    if (type === "sortBy") {
      onFiltersChange({ ...filters, sortBy: value });
    } else if (type === "status") {
      onFiltersChange({ 
        ...filters, 
        status: filters.status === value ? "" : value 
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-civic-blue">
              JanBandhu
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Public Transparency Panel
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-96 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search complaints, locations..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={onToggleFilters}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex items-center space-x-2 py-3 overflow-x-auto">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Quick filters:</span>
          {quickFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={
                (filter.type === "sortBy" && filters.sortBy === filter.value) ||
                (filter.type === "status" && filters.status === filter.value)
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => handleQuickFilter(filter.type, filter.value)}
              className="whitespace-nowrap"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}