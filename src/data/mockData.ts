import { Complaint } from "@/types/complaint";
import streetlightComplaint from "@/assets/streetlight-complaint.jpg";
import manholeComplaint from "@/assets/manhole-complaint.jpg";
import waterloggingComplaint from "@/assets/waterlogging-complaint.jpg";
import potholeComplaint from "@/assets/pothole-complaint.jpg";

export const mockComplaints: Complaint[] = [
  {
    id: "1",
    title: "Broken Street Light on MG Road",
    description: "The street light near the bus stop has been non-functional for over a week, causing safety concerns for commuters during night hours.",
    image: streetlightComplaint,
    location: {
      address: "MG Road, Near Bus Stop",
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    status: "in-progress",
    upvotes: 45,
    downvotes: 2,
    dateFiled: "2024-01-15T10:30:00Z",
    category: "Infrastructure",
    timeline: [
      {
        id: "t1",
        status: "filed",
        date: "2024-01-15T10:30:00Z",
        description: "Complaint filed by citizen"
      },
      {
        id: "t2",
        status: "forwarded",
        date: "2024-01-16T09:15:00Z",
        description: "Forwarded to Mumbai Municipal Corporation"
      },
      {
        id: "t3",
        status: "in-progress",
        date: "2024-01-18T14:20:00Z",
        description: "Work order issued to maintenance team",
        department: "Electrical Department"
      }
    ],
    resolver: {
      name: "Rajesh Kumar",
      department: "Municipal Electrical Dept.",
      contact: "+91-9876543210"
    }
  },
  {
    id: "2",
    title: "Open Manhole Cover",
    description: "Dangerous open manhole cover on residential street without any warning signs or barriers. Multiple vehicles have been damaged.",
    image: manholeComplaint,
    location: {
      address: "Sector 15, Block A",
      city: "Noida",
      state: "Uttar Pradesh"
    },
    status: "resolved",
    upvotes: 78,
    downvotes: 1,
    dateFiled: "2024-01-10T16:45:00Z",
    category: "Public Safety",
    timeline: [
      {
        id: "t4",
        status: "filed",
        date: "2024-01-10T16:45:00Z",
        description: "Emergency complaint filed"
      },
      {
        id: "t5",
        status: "forwarded",
        date: "2024-01-10T17:00:00Z",
        description: "Urgent forwarding to NOIDA Authority"
      },
      {
        id: "t6",
        status: "in-progress",
        date: "2024-01-11T08:30:00Z",
        description: "Emergency repair team deployed"
      },
      {
        id: "t7",
        status: "resolved",
        date: "2024-01-11T15:45:00Z",
        description: "Manhole cover replaced and secured"
      }
    ],
    resolver: {
      name: "NOIDA Authority",
      department: "Emergency Response Team"
    }
  },
  {
    id: "3",
    title: "Garbage Collection Delay",
    description: "Garbage has not been collected for 5 days in our locality. The area is becoming unhygienic and attracting stray animals.",
    location: {
      address: "Green Park Extension",
      city: "Delhi",
      state: "Delhi"
    },
    status: "pending",
    upvotes: 23,
    downvotes: 3,
    dateFiled: "2024-01-18T09:20:00Z",
    category: "Sanitation",
    timeline: [
      {
        id: "t8",
        status: "filed",
        date: "2024-01-18T09:20:00Z",
        description: "Complaint registered"
      }
    ]
  },
  {
    id: "4",
    title: "Water Logging During Monsoon",
    description: "Severe water logging occurs in this area during even light rain due to blocked drainage system. Residents face difficulty in commuting.",
    image: waterloggingComplaint,
    location: {
      address: "Anna Nagar Main Road",
      city: "Chennai",
      state: "Tamil Nadu"
    },
    status: "in-progress",
    upvotes: 156,
    downvotes: 8,
    dateFiled: "2024-01-12T13:15:00Z",
    category: "Drainage",
    timeline: [
      {
        id: "t9",
        status: "filed",
        date: "2024-01-12T13:15:00Z",
        description: "Complaint filed with supporting images"
      },
      {
        id: "t10",
        status: "forwarded",
        date: "2024-01-13T10:30:00Z",
        description: "Forwarded to Chennai Corporation Drainage Dept."
      },
      {
        id: "t11",
        status: "in-progress",
        date: "2024-01-16T11:00:00Z",
        description: "Site inspection completed, cleaning work started"
      }
    ]
  },
  {
    id: "5",
    title: "Illegal Construction Activity",
    description: "Unauthorized construction is happening without proper permits. The work continues beyond permitted hours causing noise pollution.",
    location: {
      address: "JP Nagar 7th Phase",
      city: "Bangalore",
      state: "Karnataka"
    },
    status: "pending",
    upvotes: 34,
    downvotes: 12,
    dateFiled: "2024-01-17T20:30:00Z",
    category: "Unauthorized Activity",
    timeline: [
      {
        id: "t12",
        status: "filed",
        date: "2024-01-17T20:30:00Z",
        description: "Complaint filed against illegal construction"
      },
      {
        id: "t13",
        status: "forwarded",
        date: "2024-01-18T08:45:00Z",
        description: "Forwarded to BBMP Building Approvals Department"
      }
    ]
  },
  {
    id: "6",
    title: "Pothole on Highway",
    description: "Large pothole on the main highway is causing accidents and vehicle damage. Urgent repair needed.",
    image: potholeComplaint,
    location: {
      address: "NH-8, Km 45",
      city: "Gurgaon",
      state: "Haryana"
    },
    status: "resolved",
    upvotes: 89,
    downvotes: 4,
    dateFiled: "2024-01-08T11:20:00Z",
    category: "Road Maintenance",
    timeline: [
      {
        id: "t14",
        status: "filed",
        date: "2024-01-08T11:20:00Z",
        description: "Highway pothole reported"
      },
      {
        id: "t15",
        status: "forwarded",
        date: "2024-01-08T15:30:00Z",
        description: "Forwarded to NHAI Regional Office"
      },
      {
        id: "t16",
        status: "in-progress",
        date: "2024-01-09T09:00:00Z",
        description: "Repair work commenced"
      },
      {
        id: "t17",
        status: "resolved",
        date: "2024-01-11T17:00:00Z",
        description: "Pothole filled and road surface restored"
      }
    ],
    resolver: {
      name: "NHAI Maintenance",
      department: "National Highway Authority"
    }
  }
];