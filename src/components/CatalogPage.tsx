import Icon from "@/components/ui/icon";
import { RentalItem } from "@/types";

export function CatalogPage({ items, categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, wishlist, toggleWishlist }: {
  items: RentalItem[]; categories: string[]; selectedCategory: string; setSelectedCategory: (c: string) => void;
  searchQuery: string; setSearchQuery: (q: string) => void; wishlist: number[]; toggleWishlist: (id: number) => void;
}) {
  return (
    <div className="min-h-screen px-6 md:px-10 pt-8">
      <div className="mb-8">
        <h1 className="font-unbounded text-3xl font-bold mb-2">Каталог</h1>
        <p className="text-muted-foreground">Найди нужную вещь для аренды</p>
      </div>
      <div className="relative mb-5">
        <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Поиск по каталогу..."
          className="w-full glass border border-white/10 focus:border-purple-500/50 rounded-2xl pl-12 pr-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-all" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${selectedCategory === cat ? "nav-active" : "glass border border-white/8 text-muted-foreground hover:text-foreground"}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className={`glass border border-white/8 hover:border-purple-500/30 rounded-2xl overflow-hidden card-hover ${!item.available ? "opacity-60" : ""}`}>
            <div className="relative bg-gradient-to-br from-white/5 to-white/2 h-28 flex items-center justify-center">
              <span className="text-5xl">{item.emoji}</span>
              {item.tag && <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{item.tag}</div>}
              {!item.available && <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center"><span className="text-xs font-medium text-muted-foreground">Недоступно</span></div>}
              <button onClick={() => toggleWishlist(item.id)} className="absolute top-2 right-2 w-8 h-8 glass rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Icon name="Heart" size={14} className={wishlist.includes(item.id) ? "text-pink-400 fill-pink-400" : "text-muted-foreground"} />
              </button>
            </div>
            <div className="p-3">
              <div className="text-[10px] text-muted-foreground mb-1">{item.category}</div>
              <div className="font-semibold text-sm leading-tight mb-2 line-clamp-1">{item.name}</div>
              <div className="flex items-center gap-1 mb-3">
                <Icon name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium">{item.rating}</span>
                <span className="text-xs text-muted-foreground">({item.reviews})</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-bold text-base gradient-text-static">{item.price.toLocaleString()} ₽</span>
                  <span className="text-xs text-muted-foreground">/{item.period}</span>
                </div>
                <button className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                  <Icon name="Plus" size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <div className="text-center py-20"><div className="text-5xl mb-4">🔍</div><div className="text-muted-foreground">Ничего не найдено</div></div>}
    </div>
  );
}
