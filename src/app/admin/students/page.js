"use client";
import { useEffect, useState } from "react";
import StudentsManager from "@/components/dashboard/StudentsManager";
import { Spinner } from "@/components/ui";
import { api } from "@/lib/apiClient";

export default function AdminStudentsPage() {
  const [schools, setSchools] = useState(null);
  useEffect(() => { api.get("/api/schools?status=approved&limit=300").then((r) => setSchools(r.data.items || [])).catch(() => setSchools([])); }, []);
  if (!schools) return <Spinner />;
  return <StudentsManager schools={schools} />;
}
