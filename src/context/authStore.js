import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null, // stores logged-in user info
  login: (userData) => set({ user: userData }), // stores user in state when logged-in
  logout: () => set({ user: null }) // clears user state when logging out
}));

export default useAuthStore;
