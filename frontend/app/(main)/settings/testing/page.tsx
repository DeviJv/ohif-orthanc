"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TestingPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inspectLoading, setInspectLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Inspector State
  const [inspectType, setInspectType] = useState("ServiceRequest");
  const [inspectId, setInspectId] = useState("");

  // Default Kemenkes Sandbox Hardcodes
  const [formData, setFormData] = useState({
    patientId: "P02478375538",
    patientName: "Ardianto Putra",
    practitionerId: "10009880728",
    startTime: new Date().toISOString(),
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/satusehat/testing/encounter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInspect = async () => {
    if (!inspectId) return;
    setInspectLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/satusehat/inspect?type=${inspectType}&id=${inspectId}`);
      const data = await res.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setInspectLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-slate-50/30 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 18.223A1.994 1.994 0 0 0 6.5 22h11a1.994 1.994 0 0 0 1.78-3.777l-5.069-7.8A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Isolated API Testing Suite</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Mode verbose untuk menginvestigasi kegagalan bridging spesifik di Kemenkes.</p>
        </div>
      </div>

      <div className="flex items-start gap-6">
        {/* Left Side - Tools */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-semibold mb-2 dark:text-slate-100">Atomic Resource Builder</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">Uji pembuatan resource secara independen untuk melihat respons murni dari API Kemenkes sebelum digabungkan ke Mega-Bundle.</p>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger >
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
                  ⚡ Kirim Encounter Kemenkes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="dark:text-slate-100">Buat Resource: Encounter</DialogTitle>
                </DialogHeader>
                 <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label className="dark:text-slate-300">Patient IHS ID (Khusus Sandbox)</Label>
                    <Input 
                      value={formData.patientId} 
                      onChange={(e) => setFormData({...formData, patientId: e.target.value})} 
                      required 
                      className="dark:bg-slate-950 dark:border-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="dark:text-slate-300">Patient Name</Label>
                    <Input 
                      value={formData.patientName} 
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})} 
                      required 
                      className="dark:bg-slate-950 dark:border-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="dark:text-slate-300">Practitioner IHS ID (Khusus Sandbox)</Label>
                    <Input 
                      value={formData.practitionerId} 
                      onChange={(e) => setFormData({...formData, practitionerId: e.target.value})} 
                      required 
                      className="dark:bg-slate-950 dark:border-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="dark:text-slate-300">Start Time (ISO 8601)</Label>
                    <Input 
                      value={formData.startTime} 
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                      required 
                      className="dark:bg-slate-950 dark:border-slate-800"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={loading} className="bg-blue-600 text-white hover:bg-blue-700">
                      {loading ? "Mengirim..." : "Kirim & Observasi Log"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white dark:bg-slate-900/50 p-5 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm mt-4">
            <h3 className="font-semibold mb-2 dark:text-slate-100">FHIR Resource Inspector</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">Masukkan Resource ID untuk melihat payload asli di server Kemenkes.</p>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] uppercase text-gray-400 dark:text-slate-500 font-bold">Resource Type</Label>
                <Select value={inspectType} onValueChange={(val) => setInspectType(val ?? "")}>
                  <SelectTrigger className="w-full h-9 text-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                    <SelectItem value="Encounter">Encounter</SelectItem>
                    <SelectItem value="ServiceRequest">ServiceRequest</SelectItem>
                    <SelectItem value="Condition">Condition</SelectItem>
                    <SelectItem value="ImagingStudy">ImagingStudy</SelectItem>
                    <SelectItem value="Observation">Observation</SelectItem>
                    <SelectItem value="DiagnosticReport">DiagnosticReport</SelectItem>
                    <SelectItem value="Patient">Patient</SelectItem>
                    <SelectItem value="Practitioner">Practitioner</SelectItem>
                    <SelectItem value="Organization">Organization</SelectItem>
                    <SelectItem value="Location">Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-[10px] uppercase text-gray-400 dark:text-slate-500 font-bold">Resource ID</Label>
                <Input 
                  placeholder="e.g. 5243..."
                  value={inspectId}
                  onChange={(e) => setInspectId(e.target.value)}
                  className="h-9 text-sm dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
                />
              </div>

              <Button 
                onClick={handleInspect} 
                disabled={inspectLoading || !inspectId}
                className="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white h-9 text-sm"
              >
                {inspectLoading ? "Fetching..." : "🔍 Fetch Payload"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Logs */}
        <div className="w-full md:w-2/3 bg-gray-900 dark:bg-slate-950 rounded-xl min-h-[500px] border border-gray-800 dark:border-slate-800 flex flex-col overflow-hidden text-gray-300">
          <div className="bg-gray-950 dark:bg-slate-900/50 px-4 py-2 border-b border-gray-800 dark:border-slate-800 flex justify-between items-center text-xs text-gray-500 font-mono">
            <span>Terminal: Response Kemenkes (Verbose) {loading && " - AWAITING..."}</span>
            {result && (
              <span className={result.success ? "text-green-500" : "text-red-500"}>
                HTTP {result.status}
              </span>
            )}
          </div>
          <div className="p-4 overflow-y-auto max-h-[70vh] font-mono text-sm leading-relaxed whitespace-pre-wrap break-all">
            {!result && !loading && (
              <div className="text-gray-600 text-center mt-20">Menunggu transaksi...</div>
            )}
            {result && (
              <div>
                <div className="mb-4 text-xs text-blue-400">--- EXACT PAYLOAD SENT TO KEMENKES ---</div>
                <div className="text-blue-200 mb-8">{JSON.stringify(result.payloadSent, null, 2)}</div>
                
                <div className="mb-4 text-xs text-green-400">--- FULL KEMENKES API RESPONSE SERVER ---</div>
                <div className={result.success ? "text-green-200" : "text-red-300"}>
                  {JSON.stringify(result.kemkesResponse || result.error, null, 2)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
