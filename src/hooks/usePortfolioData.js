import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  heroAPI, skillsAPI, projectsAPI, experienceAPI,
  educationAPI, certificatesAPI, achievementsAPI,
  testimonialsAPI, blogsAPI, adminAPI, contactAPI,
} from "../services/api";
import toast from "react-hot-toast";

// ── Query key constants ────────────────────────────────────
export const KEYS = {
  hero: "hero",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  education: "education",
  certificates: "certificates",
  achievements: "achievements",
  testimonials: "testimonials",
  blogs: "blogs",
  profile: "profile",
  stats: "stats",
  messages: "messages",
};

// ── Generic hook factory ───────────────────────────────────
const createHooks = (key, apiObj) => {
  const useList = (params = {}) =>
    useQuery({
      queryKey: [key, params],
      queryFn: () => apiObj.getAll(params).then((r) => r.data),
      staleTime: 1000 * 60 * 5,
    });

  const useOne = (id) =>
    useQuery({
      queryKey: [key, id],
      queryFn: () => apiObj.getOne(id).then((r) => r.data),
      enabled: !!id,
    });

  const useCreate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: ({ data, isFormData }) => apiObj.create(data, isFormData),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [key] });
        toast.success("Created successfully");
      },
      onError: (err) => toast.error(err.response?.data?.message || "Failed to create"),
    });
  };

  const useUpdate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data, isFormData }) => apiObj.update(id, data, isFormData),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [key] });
        toast.success("Updated successfully");
      },
      onError: (err) => toast.error(err.response?.data?.message || "Failed to update"),
    });
  };

  const useDelete = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id) => apiObj.remove(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [key] });
        toast.success("Deleted successfully");
      },
      onError: (err) => toast.error(err.response?.data?.message || "Failed to delete"),
    });
  };

  const useToggle = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id) => apiObj.toggle(id),
      onSuccess: () => qc.invalidateQueries({ queryKey: [key] }),
      onError: (err) => toast.error(err.response?.data?.message || "Failed"),
    });
  };

  return { useList, useOne, useCreate, useUpdate, useDelete, useToggle };
};

// ── Exported resource hooks ────────────────────────────────
export const heroHooks = createHooks(KEYS.hero, heroAPI);
export const skillsHooks = createHooks(KEYS.skills, skillsAPI);
export const projectsHooks = createHooks(KEYS.projects, projectsAPI);
export const experienceHooks = createHooks(KEYS.experience, experienceAPI);
export const educationHooks = createHooks(KEYS.education, educationAPI);
export const certificatesHooks = createHooks(KEYS.certificates, certificatesAPI);
export const achievementsHooks = createHooks(KEYS.achievements, achievementsAPI);
export const testimonialsHooks = createHooks(KEYS.testimonials, testimonialsAPI);
export const blogsHooks = createHooks(KEYS.blogs, blogsAPI);

// ── Admin profile hooks ────────────────────────────────────
export const useAdminProfile = () =>
  useQuery({
    queryKey: [KEYS.profile],
    queryFn: () => adminAPI.getProfile().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => adminAPI.updateProfile(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KEYS.profile] });
      toast.success("Profile updated successfully");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });
};

// ── Dashboard stats ────────────────────────────────────────
export const useDashboardStats = () =>
  useQuery({
    queryKey: [KEYS.stats],
    queryFn: () => adminAPI.getStats().then((r) => r.data),
    staleTime: 1000 * 60 * 2,
  });

// ── Contact messages ───────────────────────────────────────
export const useMessages = (params = {}) =>
  useQuery({
    queryKey: [KEYS.messages, params],
    queryFn: () => adminAPI.getMessages(params).then((r) => r.data),
  });

export const useSubmitContact = () =>
  useMutation({
    mutationFn: (data) => contactAPI.submit(data),
    onSuccess: () => toast.success("Message sent! I'll get back to you shortly."),
    onError: (err) => toast.error(err.response?.data?.message || "Failed to send message"),
  });
