import { useState } from "react";
import Icon from "@/components/ui/icon";
import { User, Page, ActiveRental, catalogItems, activeRentals, myListings, categories } from "@/types";
import { HomePage, CatalogPage, DashboardPage, HistoryPage, ProfilePage } from "@/components/Pages";

export function MainApp({ user, logout }: { user: User; logout: () => void }) {
  const [page, setPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredItems = catalogItems.filter(item => {
    const matchCat = selectedCategory === "Все" || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const statusLabel = (s: ActiveRental["status"]) => {
    if (s === "active") return { label: "Активна", cls: "status-active" };
    if (s === "pending") return { label: "Ожидание", cls: "status-pending" };
    return { label: "Завершена", cls: "status-ended" };
  };

  const navItems: { id: Page; icon: string; label: string }[] = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "catalog", icon: "Search", label: "Каталог" },
    { id: "dashboard", icon: "LayoutDashboard", label: "Кабинет" },
    { id: "history", icon: "ClipboardList", label: "История" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="min-h-screen bg-background font-golos overflow-x-hidden">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass-strong mx-3 mb-3 rounded-2xl px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map(nav => (
              <button
                key={nav.id}
                onClick={() => setPage(nav.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${page === nav.id ? "nav-active" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Icon name={nav.icon} size={20} />
                <span className="text-[10px] font-medium">{nav.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 z-50 flex-col">
        <div className="glass-strong h-full m-3 rounded-2xl flex flex-col p-5">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-lg animate-pulse-glow">
                ✦
              </div>
              <div>
                <div className="font-unbounded font-bold text-sm gradient-text-static">RentHub</div>
                <div className="text-xs text-muted-foreground">Платформа аренды</div>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map(nav => (
              <button
                key={nav.id}
                onClick={() => setPage(nav.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${page === nav.id ? "nav-active font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
              >
                <Icon name={nav.icon} size={18} />
                <span className="text-sm">{nav.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-white/8">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate">{user.email}</div>
              </div>
              <button onClick={logout} className="text-muted-foreground hover:text-red-400 transition-colors">
                <Icon name="LogOut" size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="md:ml-[280px] pb-28 md:pb-8 relative z-10">
        {page === "home" && <HomePage setPage={setPage} user={user} />}
        {page === "catalog" && (
          <CatalogPage
            items={filteredItems}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        )}
        {page === "dashboard" && <DashboardPage listings={myListings} />}
        {page === "history" && <HistoryPage rentals={activeRentals} statusLabel={statusLabel} />}
        {page === "profile" && <ProfilePage user={user} logout={logout} />}
      </main>
    </div>
  );
}
