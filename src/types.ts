import { createContext, useContext } from "react";

/* ─────────────── TYPES ─────────────── */
export type Page = "home" | "catalog" | "dashboard" | "history" | "profile";
export type AuthScreen = "login" | "register";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RentalItem {
  id: number;
  name: string;
  category: string;
  price: number;
  period: string;
  rating: number;
  reviews: number;
  emoji: string;
  tag?: string;
  available: boolean;
}

export interface ActiveRental {
  id: number;
  item: string;
  emoji: string;
  owner: string;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "ended";
  price: number;
}

export interface MyListing {
  id: number;
  item: string;
  emoji: string;
  price: number;
  period: string;
  status: "active" | "paused";
  requests: number;
  earned: number;
}

/* ─────────────── AUTH CONTEXT ─────────────── */
export interface AuthCtx {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthCtx>({ user: null, login: () => {}, logout: () => {} });
export const useAuth = () => useContext(AuthContext);

/* ─────────────── MOCK DATA ─────────────── */
export const catalogItems: RentalItem[] = [
  { id: 1, name: "DJI Mavic 3 Pro", category: "Дроны", price: 3500, period: "сутки", rating: 4.9, reviews: 48, emoji: "🚁", tag: "Хит", available: true },
  { id: 2, name: "Sony A7 IV", category: "Фотоаппараты", price: 2800, period: "сутки", rating: 4.8, reviews: 32, emoji: "📷", available: true },
  { id: 3, name: "MacBook Pro 14", category: "Техника", price: 1900, period: "сутки", rating: 4.7, reviews: 61, emoji: "💻", tag: "Новый", available: true },
  { id: 4, name: "Велосипед Trek", category: "Транспорт", price: 700, period: "сутки", rating: 4.6, reviews: 24, emoji: "🚲", available: true },
  { id: 5, name: "Палатка 4-мест.", category: "Туризм", price: 900, period: "сутки", rating: 4.5, reviews: 18, emoji: "⛺", available: false },
  { id: 6, name: "Проектор 4K", category: "Техника", price: 1200, period: "сутки", rating: 4.8, reviews: 29, emoji: "📽️", available: true },
  { id: 7, name: "Электросамокат", category: "Транспорт", price: 450, period: "сутки", rating: 4.4, reviews: 87, emoji: "🛴", tag: "Топ", available: true },
  { id: 8, name: "Мангал XXL", category: "Отдых", price: 350, period: "сутки", rating: 4.3, reviews: 15, emoji: "🔥", available: true },
];

export const activeRentals: ActiveRental[] = [
  { id: 1, item: "DJI Mavic 3 Pro", emoji: "🚁", owner: "Алексей К.", startDate: "1 апр", endDate: "5 апр", status: "active", price: 14000 },
  { id: 2, item: "Велосипед Trek", emoji: "🚲", owner: "Мария С.", startDate: "3 апр", endDate: "3 апр", status: "ended", price: 700 },
  { id: 3, item: "Sony A7 IV", emoji: "📷", owner: "Дмитрий Р.", startDate: "7 апр", endDate: "9 апр", status: "pending", price: 5600 },
];

export const myListings: MyListing[] = [
  { id: 1, item: "MacBook Pro 16", emoji: "💻", price: 2200, period: "сутки", status: "active", requests: 3, earned: 15400 },
  { id: 2, item: "GoPro Hero 12", emoji: "📹", price: 800, period: "сутки", status: "active", requests: 7, earned: 8800 },
  { id: 3, item: "Байдарка 2-мест.", emoji: "🛶", price: 1100, period: "сутки", status: "paused", requests: 0, earned: 3300 },
];

export const categories = ["Все", "Техника", "Транспорт", "Дроны", "Фотоаппараты", "Туризм", "Отдых"];

/* ─────────────── LOCAL AUTH HELPERS ─────────────── */
const STORAGE_KEY = "renthub_user";

export function saveUser(u: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
}
export function loadUser(): User | null {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
}
export function removeUser() {
  localStorage.removeItem(STORAGE_KEY);
}

const USERS_KEY = "renthub_users";
export function getUsers(): { email: string; password: string; name: string; id: string }[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  catch { return []; }
}
export function saveUsers(users: ReturnType<typeof getUsers>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
