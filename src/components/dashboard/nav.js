export const adminNav = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: "LayoutDashboard" }],
  },
  {
    label: "Registrations",
    items: [
      { href: "/admin/registrations", label: "School Registrations", icon: "ClipboardList" },
      { href: "/admin/payments", label: "Payments", icon: "CreditCard" },
      { href: "/admin/registration-form", label: "Form Builder", icon: "FormInput" },
    ],
  },
  {
    label: "Participation",
    items: [
      { href: "/admin/schools", label: "Schools", icon: "School2" },
      { href: "/admin/students", label: "Students", icon: "GraduationCap" },
      { href: "/admin/results", label: "Results Upload", icon: "FileSpreadsheet" },
      { href: "/admin/results-list", label: "All Results", icon: "Trophy" },
    ],
  },
  {
    label: "Content (CMS)",
    items: [
      { href: "/admin/announcements", label: "Announcements", icon: "Megaphone" },
      { href: "/admin/hero-section", label: "Hero Section", icon: "ImageIcon" },

      { href: "/admin/pages", label: "Pages", icon: "FileText" },
      { href: "/admin/gallery", label: "Gallery", icon: "ImageIcon" },
      { href: "/admin/faqs", label: "FAQs", icon: "HelpCircle" },
      { href: "/admin/testimonials", label: "Testimonials", icon: "Quote" },
      { href: "/admin/policies", label: "Policies", icon: "ScrollText" },
      { href: "/admin/media", label: "Media Library", icon: "FolderOpen" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { href: "/admin/contacts", label: "Contact Queries", icon: "Mail" },
      { href: "/admin/notifications", label: "Notifications", icon: "Bell" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: "Settings" },
      { href: "/admin/seo", label: "SEO Defaults", icon: "Search" },
      { href: "/admin/users", label: "Admin Users", icon: "Users" },
      { href: "/admin/audit-logs", label: "Audit Logs", icon: "ShieldCheck" },
      { href: "/admin/reviews", label: "Review Ranks", icon: "Star" },
    ],
  },
];

export const schoolNav = [
  {
    label: "Overview",
    items: [{ href: "/school", label: "Dashboard", icon: "LayoutDashboard" }],
  },
  {
    label: "Manage",
    items: [
      { href: "/school/students", label: "Students", icon: "GraduationCap" },
      { href: "/school/payment", label: "Payment", icon: "CreditCard" },
      { href: "/school/results", label: "Results", icon: "Trophy" },
      { href: "/school/notifications", label: "Notifications", icon: "Bell" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/school/profile", label: "School Profile", icon: "School2" },
      { href: "/school/change-password", label: "Change Password", icon: "ShieldCheck" },
    ],
  },
];
