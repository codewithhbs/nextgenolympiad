"use client";
import { useEffect, useState } from "react";
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle } from "lucide-react";
import { PageHeader, TableWrap, Th, Td } from "@/components/dashboard/ui";
import { Button, Spinner, Badge } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/apiClient";

export default function AdminResultsUpload() {
  const toast = useToast();
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get("/api/schools?status=approved&limit=200")
      .then((r) => setSchools(r.data.items || []))
      .catch(() => {});
  }, []);

  const send = async (dryRun) => {
    if (!school) return toast.error("Select a school");
    if (!file) return toast.error("Choose an Excel file");
    setLoading(true); setResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("school", school);
      fd.append("dryRun", String(dryRun));
      const res = await fetch("/api/results/upload", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      if (dryRun) {
        setPreview(data.data.preview || []);
        setErrors(data.data.errors || []);
        toast.success(`${data.data.count} valid row(s) found`);
      } else {
        setResult(data.data);
        setPreview(null);
        toast.success(`Published: ${data.data.inserted} new, ${data.data.updated} updated`);
      }
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <PageHeader title="Results Upload" subtitle="Upload an Excel sheet of results for a school" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-card lg:col-span-1">
          <label className="mb-1.5 block text-sm font-semibold text-ink">Select school</label>
          <select value={school} onChange={(e) => setSchool(e.target.value)}
            className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-2.5 text-ink outline-none focus:border-saffron">
            <option value="">— Choose approved school —</option>
            {schools.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
          </select>

          <label className="mb-1.5 mt-5 block text-sm font-semibold text-ink">Excel file (.xls / .xlsx)</label>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 bg-cloud p-6 text-center hover:border-saffron">
            <UploadCloud className="h-8 w-8 text-saffron" />
            <span className="text-sm font-semibold text-ink">{file ? file.name : "Click to choose file"}</span>
            <span className="text-xs text-ink-soft">StudentCode, Name, Class, subject columns, Total, Rank…</span>
            <input type="file" accept=".xls,.xlsx" className="hidden"
              onChange={(e) => { setFile(e.target.files?.[0] || null); setPreview(null); setResult(null); }} />
          </label>

          <div className="mt-5 flex gap-2">
            <Button variant="outline" onClick={() => send(true)} loading={loading} className="flex-1">Validate</Button>
            <Button onClick={() => send(false)} loading={loading} disabled={!preview} className="flex-1">Publish</Button>
          </div>
          <p className="mt-3 text-xs text-ink-soft">Validate first to preview rows, then publish to make them live.</p>
        </div>

        <div className="lg:col-span-2">
          {loading && <Spinner />}

          {result && (
            <div className="mb-4 rounded-2xl bg-leaf/10 p-5">
              <div className="flex items-center gap-2 font-bold text-leaf"><CheckCircle2 className="h-5 w-5" /> Results published</div>
              <p className="mt-1 text-sm text-ink-soft">{result.inserted} inserted, {result.updated} updated (batch {result.batch}). Schools are notified automatically.</p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="mb-4 rounded-2xl bg-saffron-soft p-5">
              <div className="flex items-center gap-2 font-bold text-saffron"><AlertTriangle className="h-5 w-5" /> {errors.length} row warning(s)</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">
                {errors.slice(0, 8).map((er, i) => <li key={i}>{typeof er === "string" ? er : JSON.stringify(er)}</li>)}
              </ul>
            </div>
          )}

          {preview && preview.length > 0 && (
            <>
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
                <FileSpreadsheet className="h-4 w-4" /> Preview — {preview.length} row(s)
                <Badge tone="orange">not yet saved</Badge>
              </div>
              <TableWrap>
                <thead>
                  <tr><Th>Code</Th><Th>Name</Th><Th>Class</Th><Th>Total</Th><Th>%</Th><Th>Rank</Th><Th>Medal</Th></tr>
                </thead>
                <tbody>
                  {preview.slice(0, 50).map((r, i) => (
                    <tr key={i} className="hover:bg-cloud">
                      <Td><span className="font-mono text-xs">{r.studentCode}</span></Td>
                      <Td>{r.studentName}</Td>
                      <Td>{r.class}{r.section ? `-${r.section}` : ""}</Td>
                      <Td>{r.totalMarks}/{r.maxMarks}</Td>
                      <Td>{r.percentage}%</Td>
                      <Td>{r.rank || "—"}</Td>
                      <Td className="capitalize">{r.medal !== "none" ? r.medal : "—"}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
              {preview.length > 50 && <p className="mt-2 text-xs text-ink-soft">Showing first 50 of {preview.length} rows.</p>}
            </>
          )}

          {!loading && !preview && !result && (
            <div className="rounded-2xl border-2 border-dashed border-ink/10 bg-white/50 py-16 text-center text-ink-soft">
              Select a school and upload an Excel file to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
