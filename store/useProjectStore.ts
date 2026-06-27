import { create } from "zustand";

export interface Project {
  id: string;
  name: string;
  type: "house" | "villa" | "apartment" | "office" | "commercial";
  description: string;
  location: string;
  client: string;
  status: "draft" | "in-progress" | "review" | "published";
  thumbnail: string;
  team: { name: string; avatar: string }[];
  createdAt: string;
  updatedAt: string;
  views: number;
  floors: number;
  rooms: number;
}

interface ProjectState {
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
}

const demoProjects: Project[] = [
  {
    id: "proj-1",
    name: "Sunrise Villa",
    type: "villa",
    description: "Luxury 4-bedroom villa with panoramic ocean views and infinity pool.",
    location: "Goa, India",
    client: "Prestige Group",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    team: [
      { name: "Ananya M.", avatar: "AM" },
      { name: "Rajesh S.", avatar: "RS" },
    ],
    createdAt: "2025-12-15",
    updatedAt: "2026-01-10",
    views: 1240,
    floors: 2,
    rooms: 12,
  },
  {
    id: "proj-2",
    name: "Metro Heights",
    type: "apartment",
    description: "Modern 3-BHK apartment complex with co-working spaces and rooftop garden.",
    location: "Mumbai, India",
    client: "L&T Realty",
    status: "in-progress",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    team: [
      { name: "Priya N.", avatar: "PN" },
      { name: "David C.", avatar: "DC" },
      { name: "Kunal V.", avatar: "KV" },
    ],
    createdAt: "2026-02-01",
    updatedAt: "2026-03-15",
    views: 856,
    floors: 3,
    rooms: 18,
  },
  {
    id: "proj-3",
    name: "TechHub Office",
    type: "office",
    description: "Open-plan tech office with collaborative zones, standing desks, and wellness room.",
    location: "Bangalore, India",
    client: "Infosys",
    status: "review",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    team: [{ name: "Michael T.", avatar: "MT" }],
    createdAt: "2026-03-01",
    updatedAt: "2026-04-22",
    views: 432,
    floors: 1,
    rooms: 8,
  },
  {
    id: "proj-4",
    name: "Serenity House",
    type: "house",
    description: "Contemporary minimalist house with Japanese-inspired garden and tea room.",
    location: "Pune, India",
    client: "Personal Project",
    status: "draft",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    team: [
      { name: "Ananya M.", avatar: "AM" },
    ],
    createdAt: "2026-04-10",
    updatedAt: "2026-04-10",
    views: 0,
    floors: 2,
    rooms: 10,
  },
  {
    id: "proj-5",
    name: "Heritage Commercial Center",
    type: "commercial",
    description: "Mixed-use commercial building with retail spaces, food court, and entertainment zone.",
    location: "Delhi, India",
    client: "DLF Group",
    status: "in-progress",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    team: [
      { name: "Rajesh S.", avatar: "RS" },
      { name: "Priya N.", avatar: "PN" },
      { name: "David C.", avatar: "DC" },
    ],
    createdAt: "2026-01-20",
    updatedAt: "2026-05-01",
    views: 2100,
    floors: 4,
    rooms: 32,
  },
  {
    id: "proj-6",
    name: "Lakeside Villa",
    type: "villa",
    description: "Eco-friendly villa with solar panels, rainwater harvesting, and green walls.",
    location: "Udaipur, India",
    client: "GreenBuild Corp",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    team: [
      { name: "Michael T.", avatar: "MT" },
      { name: "Kunal V.", avatar: "KV" },
    ],
    createdAt: "2025-11-05",
    updatedAt: "2026-02-28",
    views: 3450,
    floors: 3,
    rooms: 15,
  },
];

export const useProjectStore = create<ProjectState>((set) => ({
  projects: demoProjects,
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
}));
