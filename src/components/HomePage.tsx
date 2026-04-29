import Icon from "@/components/ui/icon";
import { Page, User } from "@/types";

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
