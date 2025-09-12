export interface Complaint {
  id: string;
  title: string;
  description: string;
  image?: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  status: "pending" | "in-progress" | "resolved";
  upvotes: number;
  downvotes: number;
  dateFiled: string;
  category: string;
  timeline: TimelineEvent[];
  resolver?: {
    name: string;
    department: string;
    contact?: string;
  };
}

export interface TimelineEvent {
  id: string;
  status: "filed" | "forwarded" | "in-progress" | "resolved";
  date: string;
  description: string;
  department?: string;
}