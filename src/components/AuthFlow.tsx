import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useAuth, getUsers, saveUsers, AuthScreen } from "@/types";

/* ─────────────── AUTH FLOW ─────────────── */
export function AuthFlow() {
  const [screen, setScreen] = useState<AuthScreen>("login");
  return screen === "login"
    ? <LoginScreen onSwitch={() => setScreen("register")} />
    : <RegisterScreen onSwitch={() => setScreen("login")} />;
}

function LoginScreen({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      const found = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);
      if (!found) { setError("Неверный email или пароль"); setLoading(false); return; }
      login({ id: found.id, name: found.name, email: found.email });
    }, 600);
  };

  return (
    <AuthLayout>
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="font-unbounded text-2xl font-bold mb-2">Добро пожаловать</h2>
          <p className="text-muted-foreground text-sm">Войди в свой аккаунт RentHub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your@email.com"
            icon="Mail"
          />
          <AuthInput
            label="Пароль"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            icon="Lock"
            suffix={
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
              </button>
            }
          />

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Входим...</>
            ) : (
              <><Icon name="LogIn" size={18} /><span>Войти</span></>
            )}
          </button>
        </form>

        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">или</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <button
            onClick={onSwitch}
            className="w-full glass border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5 text-purple-400 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Icon name="UserPlus" size={18} />
            <span>Зарегистрироваться</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

function RegisterScreen({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Введи имя"); return; }
    if (!email.trim()) { setError("Введи email"); return; }
    if (password.length < 6) { setError("Пароль минимум 6 символов"); return; }
    if (password !== confirm) { setError("Пароли не совпадают"); return; }

    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      if (users.find(u => u.email === email.trim().toLowerCase())) {
        setError("Email уже зарегистрирован");
        setLoading(false);
        return;
      }
      const newUser = {
        id: Math.random().toString(36).slice(2),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      };
      saveUsers([...users, newUser]);
      login({ id: newUser.id, name: newUser.name, email: newUser.email });
    }, 700);
  };

  return (
    <AuthLayout>
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="font-unbounded text-2xl font-bold mb-2">Создай аккаунт</h2>
          <p className="text-muted-foreground text-sm">Регистрация займёт меньше минуты</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput label="Имя" type="text" value={name} onChange={setName} placeholder="Александр" icon="User" />
          <AuthInput label="Email" type="email" value={email} onChange={setEmail} placeholder="your@email.com" icon="Mail" />
          <AuthInput
            label="Пароль"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="Минимум 6 символов"
            icon="Lock"
            suffix={
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
              </button>
            }
          />
          <AuthInput label="Повтори пароль" type={showPass ? "text" : "password"} value={confirm} onChange={setConfirm} placeholder="••••••••" icon="ShieldCheck" />

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          {password.length > 0 && (
            <PasswordStrength password={password} />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Создаём аккаунт...</>
            ) : (
              <><Icon name="UserPlus" size={18} /><span>Зарегистрироваться</span></>
            )}
          </button>
        </form>

        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">или</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <button
            onClick={onSwitch}
            className="w-full glass border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5 text-purple-400 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Icon name="LogIn" size={18} />
            <span>Войти</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const labels = ["Слабый", "Средний", "Хороший", "Надёжный"];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : "bg-white/10"}`} />
        ))}
      </div>
      <div className="text-xs text-muted-foreground">{score > 0 ? `Пароль: ${labels[score - 1]}` : ""}</div>
    </div>
  );
}

function AuthInput({
  label, type, value, onChange, placeholder, icon, suffix
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <div className="relative">
        <Icon name={icon} size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full glass border border-white/10 focus:border-purple-500/50 rounded-xl pl-11 pr-11 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none transition-all text-sm"
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
    </div>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-golos flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/6 rounded-full blur-[80px]" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.03]">
        <div className="w-full h-full rounded-full border-2 border-purple-400 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full border border-cyan-400 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "12s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30 animate-pulse-glow">
              ✦
            </div>
            <div className="text-left">
              <div className="font-unbounded font-bold text-xl gradient-text-static">RentHub</div>
              <div className="text-xs text-muted-foreground">Платформа аренды</div>
            </div>
          </div>
        </div>

        <div className="glass-strong neon-border rounded-3xl p-8">
          {children}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 px-4">
          Регистрируясь, вы соглашаетесь с условиями использования платформы
        </p>
      </div>
    </div>
  );
}
