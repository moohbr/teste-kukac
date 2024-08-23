import { create } from 'zustand';

type MenuState = {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
};

export const useMenuStore = create<MenuState>((set) => ({
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    closeMenu: () => set({ isMenuOpen: false }),
}));