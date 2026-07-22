"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { AppUser, UserRole } from "./types";

interface AuthState {
  firebaseUser: FirebaseUser | null;
  profile: AppUser | null;
  role: UserRole | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ firebaseUser: null, profile: null, role: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ firebaseUser: null, profile: null, role: null, loading: true });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setState({ firebaseUser: null, profile: null, role: null, loading: false });
        return;
      }
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      const profile = snap.exists() ? ({ id: snap.id, ...snap.data() } as AppUser) : null;
      setState({ firebaseUser, profile, role: profile?.role ?? null, loading: false });
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function canAccessAdmin(role: UserRole | null) {
  return role === "admin" || role === "editor" || role === "author";
}

export const ROLE_LABEL: Record<UserRole, string> = {
  admin: "Admin",
  editor: "Editor",
  author: "Author",
  viewer: "Viewer",
};
