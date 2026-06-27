import { create } from "zustand";

export type NavigationMode = "orbit" | "firstPerson" | "fly" | "guided";

interface ViewerState {
  mode: NavigationMode;
  setMode: (mode: NavigationMode) => void;
  selectedMaterial: string | null;
  setSelectedMaterial: (material: string | null) => void;
  showMinimap: boolean;
  toggleMinimap: () => void;
  showMaterialEditor: boolean;
  toggleMaterialEditor: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  activeRoom: string | null;
  setActiveRoom: (room: string | null) => void;
  wallColor: string;
  setWallColor: (color: string) => void;
  floorMaterial: string;
  setFloorMaterial: (material: string) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  mode: "orbit",
  setMode: (mode) => set({ mode }),
  selectedMaterial: null,
  setSelectedMaterial: (material) => set({ selectedMaterial: material }),
  showMinimap: true,
  toggleMinimap: () => set((s) => ({ showMinimap: !s.showMinimap })),
  showMaterialEditor: false,
  toggleMaterialEditor: () =>
    set((s) => ({ showMaterialEditor: !s.showMaterialEditor })),
  isFullscreen: false,
  toggleFullscreen: () => set((s) => ({ isFullscreen: !s.isFullscreen })),
  activeRoom: null,
  setActiveRoom: (room) => set({ activeRoom: room }),
  wallColor: "#e8e0d4",
  setWallColor: (color) => set({ wallColor: color }),
  floorMaterial: "wood",
  setFloorMaterial: (material) => set({ floorMaterial: material }),
}));
