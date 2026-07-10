"use client";
import {
  LayoutDashboard, School2, GraduationCap, FileSpreadsheet, Trophy,
  FileText, Image as ImageIcon, HelpCircle, Quote, Mail, Bell,
  Settings, Users, ShieldCheck, Search, ScrollText, FolderOpen, Star,
  ClipboardList, FormInput, Megaphone, CreditCard,
} from "lucide-react";

const map = {
  LayoutDashboard, School2, GraduationCap, FileSpreadsheet, Trophy,
  FileText, ImageIcon, HelpCircle, Quote, Mail, Bell,
  Settings, Users, ShieldCheck, Search, ScrollText, FolderOpen, Star,
  ClipboardList, FormInput, Megaphone, CreditCard,
};

export default function NavIcon({ name, ...props }) {
  const Icon = map[name];
  return Icon ? <Icon {...props} /> : null;
}
