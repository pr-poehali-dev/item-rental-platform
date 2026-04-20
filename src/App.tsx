import { useState } from "react";
import { AuthContext, User, loadUser, saveUser, removeUser } from "@/types";
import { AuthFlow } from "@/components/AuthFlow";
import { MainApp } from "@/components/MainApp";

const MOCK_USER: User = { id: "mock", name: "Гость", email: "guest@renthub.ru" };

export default function App() {
  const [user, setUser] = useState<User | null>(() => loadUser() ?? MOCK_USER);

  const login = (u: User) => { saveUser(u); setUser(u); };
  const logout = () => { removeUser(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {user ? <MainApp user={user} logout={logout} /> : <AuthFlow />}
    </AuthContext.Provider>
  );
}