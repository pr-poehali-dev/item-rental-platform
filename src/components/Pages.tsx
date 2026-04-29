import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Page, User, RentalItem, ActiveRental, MyListing } from "@/types";

/* ─────────────── HOME PAGE ─────────────── */
export function HomePage({ setPage, user }: { setPage: (p: Page) => void; user: User }) {
  const stats = [
    { label: "Товаров в каталоге", value: "12 400+", icon: "Package", color: "text-purple-400", bg: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/20" },
    { label: "Активных арендаторов", value: "38 000", icon: "Users", color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/20" },
    { label: "Успешных сделок", value: "290 тыс.", icon: "CheckCircle", color: "text-green-400", bg: "from-green-500/20 to-green-500/5", border: "border-green-500/20" },
    { label: "Ср. время ответа", value: "15 мин", icon: "Zap", color: "text-pink-400", bg: "from-pink-500/20 to-pink-500/5", border: "border-pink-500/20" },
  ];

  const features = [
    { icon: "Shield", title: "Страховка включена", desc: "Каждая сделка защищена страховкой до 150 000 ₽", color: "from-purple-500/15 to-purple-500/5", border: "border-purple-500/20" },
    { icon: "CreditCard", title: "Оплата онлайн", desc: "Карта, СБП, ЮKassa — безопасные расчёты", color: "from-cyan-500/15 to-cyan-500/5", border: "border-cyan-500/20" },
    { icon: "Star", title: "Рейтинг и отзывы", desc: "Прозрачная система доверия для всех участников", color: "from-pink-500/15 to-pink-500/5", border: "border-pink-500/20" },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative px-6 pt-12 pb-16 md:px-10 md:pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-600/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-20 w-56 h-56 bg-cyan-500/10 rounded-full blur-[60px]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">Привет, {user.name.split(" ")[0]}! 👋</span>
          </div>

          <h1 className="font-unbounded text-4xl md:text-6xl font-black leading-[1.1] mb-6 animate-fade-in animate-delay-100">
            Арендуй что угодно{" "}
            <span className="gradient-text">без лишних хлопот</span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8 animate-fade-in animate-delay-200">
            Дроны, техника, транспорт и многое другое — от реальных людей рядом с тобой.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in animate-delay-300">
            <button
              onClick={() => setPage("catalog")}
              className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 group"
            >
              <span>Найти вещь</span>
              <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setPage("dashboard")}
              className="glass border border-white/10 hover:border-purple-500/40 text-foreground font-semibold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon name="Plus" size={18} />
              <span>Сдать в аренду</span>
            </button>
          </div>
        </div>

        <div className="hidden md:flex absolute right-8 top-14 flex-col gap-3 animate-float">
          {[
            { emoji: "🚁", name: "DJI Mavic 3 Pro", price: "3 500 ₽/сут" },
            { emoji: "📷", name: "Sony A7 IV", price: "2 800 ₽/сут" },
            { emoji: "🛴", name: "Электросамокат", price: "450 ₽/сут" },
          ].map((card, i) => (
            <div key={i} className="glass neon-border rounded-2xl p-4 flex items-center gap-3 w-52">
              <div className="text-3xl">{card.emoji}</div>
              <div>
                <div className="text-sm font-semibold">{card.name}</div>
                <div className="text-xs text-neon-purple font-medium">{card.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5 card-hover`} style={{ animationDelay: `${i * 0.1}s` }}>
              <Icon name={s.icon} size={24} className={`${s.color} mb-3`} />
              <div className="font-unbounded text-2xl font-bold mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 mb-12">
        <h2 className="font-unbounded text-2xl font-bold mb-6">
          Почему выбирают <span className="gradient-text-static">RentHub</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className={`bg-gradient-to-br ${f.color} border ${f.border} rounded-2xl p-6 card-hover`}>
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mb-4">
                <Icon name={f.icon} size={22} className="text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 mb-8">
        <div className="relative glass neon-border rounded-3xl p-8 md:p-12 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/5" />
          <div className="relative z-10">
            <div className="text-5xl mb-4 animate-float inline-block">✦</div>
            <h2 className="font-unbounded text-2xl md:text-3xl font-bold mb-3">
              Начни зарабатывать на своих вещах
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Размести объявление бесплатно и получай доход от вещей, которые простаивают дома
            </p>
            <button
              onClick={() => setPage("dashboard")}
              className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl inline-flex items-center gap-2"
            >
              <span>Разместить объявление</span>
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── CATALOG PAGE ─────────────── */
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

/* ─────────────── DASHBOARD PAGE ─────────────── */
export function DashboardPage({ listings }: { listings: MyListing[] }) {
  const totalEarned = listings.reduce((s, l) => s + l.earned, 0);
  const activeCount = listings.filter(l => l.status === "active").length;
  return (
    <div className="min-h-screen px-6 md:px-10 pt-8">
      <div className="mb-8">
        <h1 className="font-unbounded text-3xl font-bold mb-2">Личный кабинет</h1>
        <p className="text-muted-foreground">Управляй своими объявлениями</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Заработано", value: `${totalEarned.toLocaleString()} ₽`, icon: "TrendingUp", color: "text-green-400", bg: "from-green-500/20 to-green-500/5", border: "border-green-500/20" },
          { label: "Активных", value: `${activeCount}`, icon: "Package", color: "text-purple-400", bg: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/20" },
          { label: "Запросов", value: "10", icon: "Bell", color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/20" },
          { label: "Рейтинг", value: "4.8 ★", icon: "Star", color: "text-yellow-400", bg: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/20" },
        ].map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5`}>
            <Icon name={s.icon} size={20} className={`${s.color} mb-3`} />
            <div className="font-unbounded text-xl font-bold mb-1">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <button className="w-full btn-primary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 mb-6 group">
        <Icon name="Plus" size={20} /><span>Добавить объявление</span>
        <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <h2 className="font-semibold text-lg mb-4">Мои объявления</h2>
      <div className="space-y-3">
        {listings.map((l) => (
          <div key={l.id} className="glass border border-white/8 hover:border-purple-500/20 rounded-2xl p-4 flex items-center gap-4 card-hover">
            <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-3xl flex-shrink-0">{l.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{l.item}</div>
              <div className="text-sm text-muted-foreground">{l.price.toLocaleString()} ₽/{l.period}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${l.status === "active" ? "status-active" : "status-ended"}`}>{l.status === "active" ? "Активно" : "Приостановлено"}</span>
                {l.requests > 0 && <span className="text-[10px] text-cyan-400">{l.requests} запроса</span>}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold text-green-400">{l.earned.toLocaleString()} ₽</div>
              <div className="text-[10px] text-muted-foreground">заработано</div>
              <div className="flex gap-1 mt-2 justify-end">
                <button className="w-7 h-7 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-purple-500/40 transition-all"><Icon name="Pencil" size={12} className="text-muted-foreground" /></button>
                <button className="w-7 h-7 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-red-500/40 transition-all"><Icon name="Trash2" size={12} className="text-muted-foreground" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="font-semibold text-lg mb-4">Платёжные данные</h2>
        <div className="glass neon-border-cyan rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-center justify-center">
              <Icon name="CreditCard" size={22} className="text-cyan-400" />
            </div>
            <div><div className="font-semibold">Способы оплаты</div><div className="text-sm text-muted-foreground">Карта, СБП, ЮKassa</div></div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {["Visa/MC", "СБП", "ЮKassa"].map(m => <div key={m} className="glass border border-white/8 rounded-xl py-2 text-center text-xs text-muted-foreground">{m}</div>)}
          </div>
          <button className="w-full glass border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <Icon name="Plus" size={16} />Привязать карту
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── HISTORY PAGE ─────────────── */
export function HistoryPage({ rentals, statusLabel }: { rentals: ActiveRental[]; statusLabel: (s: ActiveRental["status"]) => { label: string; cls: string } }) {
  const [tab, setTab] = useState<"all" | "active" | "ended">("all");
  const filtered = rentals.filter(r => tab === "all" || (tab === "active" ? r.status !== "ended" : r.status === "ended"));
  return (
    <div className="min-h-screen px-6 md:px-10 pt-8">
      <div className="mb-8">
        <h1 className="font-unbounded text-3xl font-bold mb-2">История аренды</h1>
        <p className="text-muted-foreground">Все твои заказы и аренды</p>
      </div>
      <div className="flex gap-2 mb-6">
        {[{ id: "all", label: "Все" }, { id: "active", label: "Активные" }, { id: "ended", label: "Завершённые" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.id ? "nav-active" : "glass border border-white/8 text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="glass neon-border rounded-2xl p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 rounded-xl flex items-center justify-center">
            <Icon name="TrendingDown" size={18} className="text-purple-400" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Потрачено на аренду</div>
            <div className="font-unbounded font-bold text-xl">{rentals.reduce((s, r) => s + r.price, 0).toLocaleString()} ₽</div>
          </div>
        </div>
        <div className="text-right"><div className="text-sm text-muted-foreground">Заказов</div><div className="font-bold text-xl">{rentals.length}</div></div>
      </div>
      <div className="space-y-3">
        {filtered.map((r) => {
          const st = statusLabel(r.status);
          return (
            <div key={r.id} className="glass border border-white/8 hover:border-purple-500/20 rounded-2xl p-4 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 glass rounded-xl flex items-center justify-center text-3xl flex-shrink-0">{r.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="font-semibold truncate">{r.item}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${st.cls}`}>{st.label}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">От: {r.owner}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Icon name="Calendar" size={12} /><span>{r.startDate} — {r.endDate}</span></div>
                    <div className="text-sm font-bold gradient-text-static">{r.price.toLocaleString()} ₽</div>
                  </div>
                </div>
              </div>
              {r.status === "active" && (
                <div className="mt-3 pt-3 border-t border-white/8 flex gap-2">
                  <button className="flex-1 glass border border-white/10 hover:border-purple-500/30 text-xs font-medium py-2 rounded-xl transition-all">Продлить</button>
                  <button className="flex-1 glass border border-red-500/20 hover:border-red-500/40 text-xs font-medium py-2 rounded-xl text-red-400 transition-all">Завершить</button>
                </div>
              )}
              {r.status === "ended" && (
                <div className="mt-3 pt-3 border-t border-white/8">
                  <button className="w-full glass border border-yellow-500/20 hover:border-yellow-500/40 text-xs font-medium py-2 rounded-xl text-yellow-400 transition-all flex items-center justify-center gap-1">
                    <Icon name="Star" size={12} />Оставить отзыв
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── PROFILE PAGE ─────────────── */
export function ProfilePage({ user, logout }: { user: User; logout: () => void }) {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(user.name);
  const [editingCity, setEditingCity] = useState(false);
  const [cityValue, setCityValue] = useState("Москва");

  return (
    <div className="min-h-screen px-6 md:px-10 pt-8">
      <div className="mb-8">
        <h1 className="font-unbounded text-3xl font-bold mb-2">Профиль</h1>
        <p className="text-muted-foreground">Настройки аккаунта</p>
      </div>

      <div className="glass neon-border rounded-3xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent" />
        <div className="relative z-10 flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-unbounded font-bold text-3xl shadow-lg shadow-purple-500/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="Check" size={10} className="text-background" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-unbounded font-bold text-xl">{user.name}</div>
            <div className="text-muted-foreground text-sm mb-2">{user.email}</div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-medium">Pro аккаунт</span>
              <div className="flex items-center gap-1"><Icon name="Star" size={12} className="text-yellow-400 fill-yellow-400" /><span className="text-sm font-medium">4.8</span></div>
            </div>
          </div>
          <button className="glass border border-white/10 hover:border-purple-500/30 p-3 rounded-xl transition-all">
            <Icon name="Pencil" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass border border-white/8 rounded-2xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="User" size={16} className="text-purple-400" />Личные данные</h3>
          <div className="space-y-3">
            {/* Имя — редактируемое */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm text-muted-foreground">Имя</span>
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") setEditingName(false); if (e.key === "Escape") { setNameValue(user.name); setEditingName(false); } }}
                    className="bg-white/10 border border-purple-500/40 rounded-lg px-3 py-1 text-sm font-medium outline-none w-40 text-right"
                  />
                  <button onClick={() => setEditingName(false)} className="text-purple-400 hover:text-purple-300 transition-colors">
                    <Icon name="Check" size={16} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditingName(true)} className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <span className="text-sm font-medium truncate max-w-[180px]">{nameValue}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </button>
              )}
            </div>
            {/* Email */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm text-muted-foreground">Email</span>
              <div className="flex items-center gap-2"><span className="text-sm font-medium truncate max-w-[180px]">{user.email}</span><Icon name="ChevronRight" size={14} className="text-muted-foreground" /></div>
            </div>
            {/* Город — редактируемый */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Город</span>
              {editingCity ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={cityValue}
                    onChange={e => setCityValue(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") setEditingCity(false); if (e.key === "Escape") { setCityValue(cityValue); setEditingCity(false); } }}
                    className="bg-white/10 border border-purple-500/40 rounded-lg px-3 py-1 text-sm font-medium outline-none w-40 text-right"
                  />
                  <button onClick={() => setEditingCity(false)} className="text-purple-400 hover:text-purple-300 transition-colors">
                    <Icon name="Check" size={16} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditingCity(true)} className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <span className="text-sm font-medium truncate max-w-[180px]">{cityValue}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="glass border border-white/8 rounded-2xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="Bell" size={16} className="text-cyan-400" />Уведомления и безопасность</h3>
          <div className="space-y-3">
            {[{ label: "Push-уведомления", value: notifications, setter: setNotifications }, { label: "Двухфакторная аутентификация", value: twoFactor, setter: setTwoFactor }].map((s, idx) => (
              <div key={idx} className="flex items-center justify-between py-2">
                <span className="text-sm">{s.label}</span>
                <button onClick={() => s.setter(!s.value)} className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${s.value ? "bg-gradient-to-r from-purple-500 to-purple-600" : "bg-white/20"}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full shadow transition-all duration-300 ${s.value ? "bg-white left-7" : "bg-white/40 left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass border border-white/8 rounded-2xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="CreditCard" size={16} className="text-pink-400" />Платёжные методы</h3>
          <div className="flex items-center gap-3 py-2 border-b border-white/5 mb-3">
            <div className="w-10 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
            <span className="text-sm flex-1">•••• •••• •••• 4242</span>
            <span className="text-[10px] status-active px-2 py-0.5 rounded-full">Основная</span>
          </div>
          <button className="w-full glass border border-pink-500/20 hover:border-pink-500/40 text-pink-400 text-sm font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <Icon name="Plus" size={16} />Добавить карту
          </button>
        </div>

        <div className="glass border border-red-500/20 rounded-2xl p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-400"><Icon name="AlertTriangle" size={16} />Зона опасности</h3>
          <div className="space-y-2">
            <button onClick={logout} className="w-full glass border border-white/8 hover:border-red-500/30 text-muted-foreground hover:text-red-400 text-sm font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <Icon name="LogOut" size={16} />Выйти из аккаунта
            </button>
            <button className="w-full glass border border-white/8 hover:border-red-500/30 text-muted-foreground hover:text-red-400 text-sm font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <Icon name="Trash2" size={16} />Удалить аккаунт
            </button>
          </div>
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
}