import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiUser, HiLink, HiLockClosed, HiUpload, HiCheck } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAdminProfile, useUpdateProfile } from "../../hooks/usePortfolioData";
import { authAPI } from "../../services/api";
import useAuthStore from "../../store/authStore";
import PageHeader from "../components/PageHeader";
import FormField, { inputCls, selectCls } from "../components/FormField";
import { fadeInUp, staggerContainer, viewportConfig } from "../../utils/animations";

const TABS = ["Profile", "Social Links", "Security"];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { data, isLoading } = useAdminProfile();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();
  const updateAdmin = useAuthStore((s) => s.updateAdmin);

  const profile = data?.data;

  // ── Profile form ──────────────────────────────────────
  const [profileForm, setProfileForm] = useState({
    fullName: "", designation: "", bio: "", about: "",
    phone: "", location: "", availability: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // ── Social form ────────────────────────────────────────
  const [socialForm, setSocialForm] = useState({
    github: "", linkedin: "", twitter: "", instagram: "",
  });

  // ── Stats form ─────────────────────────────────────────
  const [statsForm, setStatsForm] = useState([
    { value: "", label: "" }, { value: "", label: "" },
    { value: "", label: "" }, { value: "", label: "" },
  ]);

  // ── Password form ──────────────────────────────────────
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);

  // Populate from API
  useEffect(() => {
    if (!profile) return;
    setProfileForm({
      fullName: profile.fullName || "",
      designation: profile.designation || "",
      bio: profile.bio || "",
      about: profile.about || "",
      phone: profile.phone || "",
      location: profile.location || "",
      availability: profile.availability || "",
    });
    setSocialForm({
      github: profile.social?.github || "",
      linkedin: profile.social?.linkedin || "",
      twitter: profile.social?.twitter || "",
      instagram: profile.social?.instagram || "",
    });
    if (profile.stats?.length) {
      setStatsForm(profile.stats.map((s) => ({ value: s.value || "", label: s.label || "" })));
    }
    if (profile.avatar) setAvatarPreview(profile.avatar.startsWith("http") ? profile.avatar : `http://localhost:5000${profile.avatar}`);
  }, [profile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleProfileSave = () => {
    const fd = new FormData();
    Object.entries(profileForm).forEach(([k, v]) => fd.append(k, v));
    fd.append("social", JSON.stringify(socialForm));
    fd.append("stats", JSON.stringify(statsForm));
    if (avatarFile) fd.append("avatar", avatarFile);
    if (resumeFile) fd.append("resume", resumeFile);
    updateProfile(fd, {
      onSuccess: (res) => {
        updateAdmin(res.data.data);
      },
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setPwLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      toast.success("Password changed successfully");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setPwLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="w-6 h-6 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Account Settings" description="Manage your profile and security settings" />

      {/* Tabs */}
      <div className="flex gap-1 glass border border-white/[0.06] rounded-xl p-1 mb-8 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Profile Tab ── */}
      {activeTab === "Profile" && (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 max-w-2xl">
          {/* Avatar */}
          <motion.div variants={fadeInUp} className="glass border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2"><HiUser className="w-4 h-4 text-indigo-400" /> Profile Photo</h3>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  profileForm.fullName?.charAt(0) || "A"
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-slate-300 text-sm font-medium hover:border-indigo-500/40 cursor-pointer transition-all">
                  <HiUpload className="w-4 h-4" />
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
                <p className="text-slate-600 text-xs mt-2">JPG, PNG, WebP. Max 5MB.</p>
              </div>
            </div>
          </motion.div>

          {/* Basic Info */}
          <motion.div variants={fadeInUp} className="glass border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold mb-2">Basic Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Full Name" required>
                <input value={profileForm.fullName} onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })} className={inputCls()} placeholder="Alex Morgan" />
              </FormField>
              <FormField label="Designation" required>
                <input value={profileForm.designation} onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })} className={inputCls()} placeholder="Full Stack Developer" />
              </FormField>
              <FormField label="Phone">
                <input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className={inputCls()} placeholder="+1 (555) 000-0000" />
              </FormField>
              <FormField label="Location">
                <input value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} className={inputCls()} placeholder="San Francisco, CA" />
              </FormField>
              <FormField label="Availability" className="sm:col-span-2">
                <input value={profileForm.availability} onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })} className={inputCls()} placeholder="Available for Freelance" />
              </FormField>
            </div>
            <FormField label="Short Bio">
              <textarea rows={3} value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} className={inputCls() + " resize-none"} placeholder="Brief bio for hero section..." />
            </FormField>
            <FormField label="About Me">
              <textarea rows={4} value={profileForm.about} onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })} className={inputCls() + " resize-none"} placeholder="Detailed about section content..." />
            </FormField>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="glass border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5">Hero Stats</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {statsForm.map((stat, i) => (
                <div key={i} className="flex gap-2">
                  <input value={stat.value} onChange={(e) => { const s = [...statsForm]; s[i].value = e.target.value; setStatsForm(s); }} className={inputCls() + " w-24"} placeholder="4+" />
                  <input value={stat.label} onChange={(e) => { const s = [...statsForm]; s[i].label = e.target.value; setStatsForm(s); }} className={inputCls()} placeholder="Years Experience" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Resume */}
          <motion.div variants={fadeInUp} className="glass border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5">Resume / CV</h3>
            <div className="flex items-center gap-4">
              {profile?.resume && (
                <a href={`http://localhost:5000${profile.resume}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
                  View current resume
                </a>
              )}
              <label className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-slate-300 text-sm font-medium hover:border-indigo-500/40 cursor-pointer transition-all">
                <HiUpload className="w-4 h-4" />
                {resumeFile ? resumeFile.name : "Upload PDF"}
                <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} className="hidden" />
              </label>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <button onClick={handleProfileSave} disabled={updating} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 transition-all shadow-lg shadow-indigo-500/20">
              {updating ? "Saving..." : <><HiCheck className="w-4 h-4" /> Save Profile</>}
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ── Social Links Tab ── */}
      {activeTab === "Social Links" && (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl">
          <motion.div variants={fadeInUp} className="glass border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2"><HiLink className="w-4 h-4 text-indigo-400" /> Social Links</h3>
            {[
              { key: "github", label: "GitHub URL", placeholder: "https://github.com/username" },
              { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/username" },
              { key: "twitter", label: "Twitter / X URL", placeholder: "https://twitter.com/username" },
              { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/username" },
            ].map(({ key, label, placeholder }) => (
              <FormField key={key} label={label}>
                <input value={socialForm[key]} onChange={(e) => setSocialForm({ ...socialForm, [key]: e.target.value })} className={inputCls()} placeholder={placeholder} />
              </FormField>
            ))}
            <button onClick={handleProfileSave} disabled={updating} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60 transition-all mt-2">
              {updating ? "Saving..." : <><HiCheck className="w-4 h-4" /> Save Links</>}
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ── Security Tab ── */}
      {activeTab === "Security" && (
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="max-w-md">
          <div className="glass border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2"><HiLockClosed className="w-4 h-4 text-indigo-400" /> Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <FormField label="Current Password" required>
                <input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} className={inputCls()} placeholder="Enter current password" />
              </FormField>
              <FormField label="New Password" required>
                <input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} className={inputCls()} placeholder="Min 6 characters" />
              </FormField>
              <FormField label="Confirm New Password" required>
                <input type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} className={inputCls()} placeholder="Repeat new password" />
              </FormField>
              <button type="submit" disabled={pwLoading} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60 transition-all">
                {pwLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
