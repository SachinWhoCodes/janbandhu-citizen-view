import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-civic-blue">JanBandhu</h3>
            <Badge variant="outline">Public Transparency Initiative</Badge>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Powered by JanBandhu Platform</span>
            <span>•</span>
            <span>SIH 2025</span>
            <span>•</span>
            <span>Building Better Communities</span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          <p>© 2024 JanBandhu. Enhancing civic engagement through technology.</p>
          <p className="mt-1">Real-time complaint tracking • Transparent governance • Community empowerment</p>
        </div>
      </div>
    </footer>
  );
}