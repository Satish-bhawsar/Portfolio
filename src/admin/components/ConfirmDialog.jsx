import Swal from "sweetalert2";

export const confirmDelete = async (name = "this item") => {
  const result = await Swal.fire({
    title: "Delete Confirmation",
    html: `Are you sure you want to delete <strong>${name}</strong>?<br/><small style="color:#94a3b8">This action cannot be undone.</small>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    background: "#0f0f1a",
    color: "#f8fafc",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#334155",
    customClass: {
      popup: "rounded-2xl border border-white/10",
      confirmButton: "rounded-xl px-5 py-2 text-sm font-medium",
      cancelButton: "rounded-xl px-5 py-2 text-sm font-medium",
    },
  });
  return result.isConfirmed;
};

export const confirmAction = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    background: "#0f0f1a",
    color: "#f8fafc",
    confirmButtonColor: "#6366f1",
    cancelButtonColor: "#334155",
    customClass: {
      popup: "rounded-2xl border border-white/10",
      confirmButton: "rounded-xl px-5 py-2 text-sm font-medium",
      cancelButton: "rounded-xl px-5 py-2 text-sm font-medium",
    },
  });
  return result.isConfirmed;
};
