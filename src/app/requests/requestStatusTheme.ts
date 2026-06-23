export const requestStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-500/20 text-yellow-400",
  },
  issued: {
    label: "Issued",
    className: "bg-green-500/20 text-green-400",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/20 text-red-400",
  },
  returned: {
    label: "Returned",
    className: "bg-blue-500/20 text-blue-400",
  },
  "return-pending": {
    label: "Return Pending",
    className: "bg-purple-500/20 text-purple-400",
  },
};
