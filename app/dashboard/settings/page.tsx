"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Trash2,
  Save,
  Camera,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api", label: "API Keys", icon: Key },
];

const notificationSettings = [
  { label: "Project updates", description: "Get notified when a project status changes", enabled: true },
  { label: "New comments", description: "Notifications for new comments and mentions", enabled: true },
  { label: "Tour views", description: "Daily digest of tour view analytics", enabled: false },
  { label: "Team activity", description: "When team members join or leave projects", enabled: true },
  { label: "Billing alerts", description: "Payment confirmations and renewal reminders", enabled: true },
  { label: "Product updates", description: "New features and platform updates", enabled: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "Kunal Verma",
    email: "kunal@houseverse.ai",
    company: "HouseVerse AI",
    role: "Admin",
    bio: "Building the future of property visualization.",
    language: "English",
    timezone: "Asia/Kolkata (IST)",
  });
  const [notifications, setNotifications] = useState(notificationSettings);
  const [theme, setTheme] = useState("dark");

  const toggleNotification = (index: number) => {
    setNotifications((prev) =>
      prev.map((n, i) => (i === index ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-1">
          Settings
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your account, preferences, and security.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2 -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-electric/10 text-electric"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Avatar */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-4">Photo</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric to-purple flex items-center justify-center text-2xl font-bold text-white">
                  KV
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-electric flex items-center justify-center text-white shadow-lg">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">
                  JPG, PNG, or GIF. Max 2MB.
                </p>
                <button className="btn-secondary text-xs !py-1.5 !px-3">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-4">
              Profile Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Company
                </label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Role
                </label>
                <input
                  type="text"
                  value={profile.role}
                  className="input-field !bg-white/[0.02] cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-slate-500 mb-1.5 block">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="input-field resize-none"
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="btn-primary text-sm !py-2 !px-5 flex items-center gap-2">
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Localization */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-4">
              Localization
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Language
                </label>
                <select className="input-field appearance-none cursor-pointer">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Japanese</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Timezone
                </label>
                <select className="input-field appearance-none cursor-pointer">
                  <option>Asia/Kolkata (IST)</option>
                  <option>America/New_York (EST)</option>
                  <option>Europe/London (GMT)</option>
                  <option>Asia/Tokyo (JST)</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-5">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {notifications.map((notif, i) => (
                <div
                  key={notif.label}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-sm text-white font-medium">
                      {notif.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {notif.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleNotification(i)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      notif.enabled ? "bg-electric" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        notif.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-4">
              Change Password
            </h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Current Password
                </label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  New Password
                </label>
                <input type="password" className="input-field" placeholder="Min 8 characters" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">
                  Confirm New Password
                </label>
                <input type="password" className="input-field" placeholder="Confirm password" />
              </div>
              <button className="btn-primary text-sm !py-2.5 !px-5">
                <span>Update Password</span>
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white mb-1">
                  Two-Factor Authentication
                </h3>
                <p className="text-xs text-slate-500">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <button className="btn-secondary text-sm !py-2 !px-4">
                Enable 2FA
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-red-400 mb-1">
                  Danger Zone
                </h3>
                <p className="text-xs text-slate-500">
                  Permanently delete your account and all data.
                </p>
              </div>
              <button className="text-sm px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2">
                <Trash2 className="w-3.5 h-3.5" />
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Appearance Tab */}
      {activeTab === "appearance" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-medium text-white mb-5">Theme</h3>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {[
                { id: "dark", label: "Dark", colors: ["#050510", "#0f0f2a", "#1e293b"] },
                { id: "light", label: "Light", colors: ["#f8fafc", "#e2e8f0", "#ffffff"] },
                { id: "system", label: "System", colors: ["#050510", "#f8fafc", "#0f0f2a"] },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`rounded-xl p-4 text-center transition-all ${
                    theme === t.id
                      ? "ring-2 ring-electric ring-offset-2 ring-offset-space-black glass-card"
                      : "glass hover:bg-white/5"
                  }`}
                >
                  <div className="flex gap-1 justify-center mb-3">
                    {t.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-lg border border-white/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{t.label}</p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* API Keys Tab */}
      {activeTab === "api" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-medium text-white mb-1">
                  API Keys
                </h3>
                <p className="text-xs text-slate-500">
                  Manage API keys for integrations and automation.
                </p>
              </div>
              <button className="btn-primary text-sm !py-2 !px-4">
                <span>Generate Key</span>
              </button>
            </div>
            <div className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-mono">
                  hv_live_••••••••••••••••3f2a
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Created May 10, 2026 · Last used 2 hours ago
                </p>
              </div>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                Revoke
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
