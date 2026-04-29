import { useState } from "react";
import Icon from "@/components/ui/icon";
import { User } from "@/types";

export function ProfilePage({ user, logout }: { user: User; logout: () => void }) {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(() => localStorage.getItem("renthub_profile_name") || user.name);
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailValue, setEmailValue] = useState(() => localStorage.getItem("renthub_profile_email") || user.email);
  const [editingCity, setEditingCity] = useState(false);
  const [cityValue, setCityValue] = useState(() => localStorage.getItem("renthub_profile_city") || "Москва");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditingName(false);
    setEditingEmail(false);
    setEditingCity(false);
    localStorage.setItem("renthub_profile_name", nameValue);
    localStorage.setItem("renthub_profile_email", emailValue);
    localStorage.setItem("renthub_profile_city", cityValue);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
              {nameValue.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="Check" size={10} className="text-background" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-unbounded font-bold text-xl">{nameValue}</div>
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
            {/* Email — редактируемый */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm text-muted-foreground">Email</span>
              {editingEmail ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="email"
                    value={emailValue}
                    onChange={e => setEmailValue(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") setEditingEmail(false); if (e.key === "Escape") { setEmailValue(user.email); setEditingEmail(false); } }}
                    className="bg-white/10 border border-purple-500/40 rounded-lg px-3 py-1 text-sm font-medium outline-none w-44 text-right"
                  />
                  <button onClick={() => setEditingEmail(false)} className="text-purple-400 hover:text-purple-300 transition-colors">
                    <Icon name="Check" size={16} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditingEmail(true)} className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                  <span className="text-sm font-medium truncate max-w-[180px]">{emailValue}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </button>
              )}
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
          <button
            onClick={handleSave}
            className={`mt-4 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${saved ? "bg-green-500/20 border border-green-500/40 text-green-400" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"}`}
          >
            <Icon name={saved ? "Check" : "Save"} size={16} />
            {saved ? "Сохранено!" : "Сохранить изменения"}
          </button>
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
