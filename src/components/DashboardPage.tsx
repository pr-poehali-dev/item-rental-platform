import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MyListing, ActiveRental } from "@/types";

const EMOJIS = ["📦", "💻", "📷", "🚲", "🛴", "🚁", "⛺", "📽️", "🔥", "🎸", "🏄", "🎿", "🛶", "🔧", "🎮"];

interface NewListingForm {
  item: string;
  emoji: string;
  price: string;
  period: string;
}

export function DashboardPage({ listings: initialListings }: { listings: MyListing[] }) {
  const [listings, setListings] = useState<MyListing[]>(initialListings);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NewListingForm>({ item: "", emoji: "📦", price: "", period: "сутки" });
  const [submitted, setSubmitted] = useState(false);

  const totalEarned = listings.reduce((s, l) => s + l.earned, 0);
  const activeCount = listings.filter(l => l.status === "active").length;

  const handleSubmit = () => {
    if (!form.item.trim() || !form.price) return;
    const newListing: MyListing = {
      id: Date.now(),
      item: form.item.trim(),
      emoji: form.emoji,
      price: Number(form.price),
      period: form.period,
      status: "active",
      requests: 0,
      earned: 0,
    };
    setListings(prev => [newListing, ...prev]);
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setForm({ item: "", emoji: "📦", price: "", period: "сутки" });
    }, 1200);
  };

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
      <button
        onClick={() => setShowModal(true)}
        className="w-full btn-primary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 mb-6 group"
      >
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
                <button
                  onClick={() => setListings(prev => prev.filter(x => x.id !== l.id))}
                  className="w-7 h-7 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-red-500/40 transition-all"
                ><Icon name="Trash2" size={12} className="text-muted-foreground" /></button>
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

      {/* Модальное окно */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="w-full max-w-md glass border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-unbounded font-bold text-lg">Новое объявление</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all">
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Название */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Название вещи</label>
                <input
                  autoFocus
                  value={form.item}
                  onChange={e => setForm(f => ({ ...f, item: e.target.value }))}
                  placeholder="Например: MacBook Pro 14"
                  className="w-full glass border border-white/10 focus:border-purple-500/50 rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-all text-sm"
                />
              </div>

              {/* Эмодзи */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Значок</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map(e => (
                    <button
                      key={e}
                      onClick={() => setForm(f => ({ ...f, emoji: e }))}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${form.emoji === e ? "bg-purple-500/30 border border-purple-500/60" : "glass border border-white/10 hover:border-white/30"}`}
                    >{e}</button>
                  ))}
                </div>
              </div>

              {/* Цена и период */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Цена (₽)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="1 500"
                    className="w-full glass border border-white/10 focus:border-purple-500/50 rounded-xl px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Период</label>
                  <select
                    value={form.period}
                    onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
                    className="w-full glass border border-white/10 focus:border-purple-500/50 rounded-xl px-4 py-3 bg-background text-foreground outline-none transition-all text-sm"
                  >
                    <option value="час">час</option>
                    <option value="сутки">сутки</option>
                    <option value="неделя">неделя</option>
                    <option value="месяц">месяц</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.item.trim() || !form.price}
              className={`mt-6 w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                submitted
                  ? "bg-green-500/20 border border-green-500/40 text-green-400"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              <Icon name={submitted ? "Check" : "Plus"} size={18} />
              {submitted ? "Объявление размещено!" : "Разместить объявление"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
