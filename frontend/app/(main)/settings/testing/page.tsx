"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

          <Card className="border-2 border-primary/20 bg-primary/[0.02] dark:bg-primary/[0.01] rounded-xl overflow-hidden mt-4">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary font-black text-xs">
                  LAB
                </div>
                <div>
                  <CardTitle className="text-sm font-black tracking-tight uppercase dark:text-slate-100">Test DICOM Router Helper</CardTitle>
                  <CardDescription className="text-[10px] font-medium uppercase tracking-tighter dark:text-slate-400">Prime SatuSehat with a ServiceRequest for automated testing.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800">
                <div className="space-y-1.5 w-full">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Accession Number</p>
                  <Input 
                    type="text" 
                    id="testAcsn"
                    placeholder="Ex: TEST-12345" 
                    className="h-10 dark:bg-slate-950 dark:border-slate-800 text-xs font-bold uppercase dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1.5 w-full">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Patient Name</p>
                  <Input 
                    type="text" 
                    id="testName"
                    placeholder="Ex: John Doe" 
                    className="h-10 dark:bg-slate-950 dark:border-slate-800 text-xs font-bold dark:text-slate-100"
                  />
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-wider text-xs"
                  onClick={async () => {
                    const acsn = (document.getElementById("testAcsn") as HTMLInputElement).value;
                    const name = (document.getElementById("testName") as HTMLInputElement).value;
                    if (!acsn) return toast.error("Accession Number wajib diisi");
                    
                    setLoading(true);
                    setResult(null);

                    const promise = fetch("/api/stats/satusehat/test-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ accessionNumber: acsn, patientName: name })
                    }).then(r => r.json());

                    toast.promise(promise, {
                      loading: "Mendaftarkan Order di SatuSehat...",
                      success: (data) => {
                        setLoading(false);
                        if (data.error) throw new Error(data.error);
                        setResult(data);
                        return "Order Berhasil Dibuat! Silakan test DICOM Router Anda.";
                      },
                      error: (err) => {
                        setLoading(false);
                        setResult({ error: err.message });
                        return err.message || "Gagal membuat test order";
                      }
                    });
                  }}
                >
                  Create Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Logs & Full-Chain Tester */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="bg-gray-900 dark:bg-slate-950 rounded-xl min-h-[500px] border border-gray-800 dark:border-slate-800 flex flex-col overflow-hidden text-gray-300">
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

          {/* Full-Chain Tester Component */}
          <SatuSehatIntegrationTester />
        </div>
      </div>
    </div>
  );
}

function SatuSehatIntegrationTester() {
    const [accessionNumber, setAccessionNumber] = useState("");
    const [patientName, setPatientName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Order, 2: DICOM, 3: Verify
    
    const [orderResult, setOrderResult] = useState<{ id: string, patientId: string, logs: string[] } | null>(null);
    const [dicomResult, setDicomResult] = useState<{ id: string, logs: string[] } | null>(null);
    const [statusResult, setStatusResult] = useState<{ serviceRequest?: any, imagingStudy?: any, logs: string[] } | null>(null);

    const handleCreateOrder = async () => {
        if (!accessionNumber) {
            toast.error("Accession Number wajib diisi!");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/config/satusehat/test-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessionNumber, patientName }),
            });
            
            const data = await res.json();
            if (res.ok) {
                setOrderResult(data);
                toast.success("Step 1 Berhasil: Order dibuat di SatuSehat!");
                setStep(2);
            } else {
                toast.error(data.error || "Gagal membuat Test Order");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan sistem saat membuat order");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateDicom = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/config/satusehat/test-dicom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    accessionNumber, 
                    patientName, 
                    patientId: orderResult?.patientId 
                }),
            });
            
            const data = await res.json();
            if (res.ok) {
                setDicomResult(data);
                toast.success("Step 2 Berhasil: DICOM sampel dikirim ke Orthanc!");
                setStep(3);
            } else {
                toast.error(data.error || "Gagal membuat DICOM di Orthanc");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan sistem saat membuat DICOM");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyStatus = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/config/satusehat/test-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessionNumber }),
            });
            
            const data = await res.json();
            if (res.ok) {
                setStatusResult(data);
                if (data.imagingStudy) {
                    toast.success("Step 3 BERHASIL: ImagingStudy ditemukan!");
                } else {
                    toast.info("ServiceRequest ditemukan, menunggu Router memproses DICOM...");
                }
            } else {
                toast.error(data.error || "Gagal mengecek status");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat verifikasi");
        } finally {
            setIsLoading(false);
        }
    };

    const resetTest = () => {
        setStep(1);
        setOrderResult(null);
        setDicomResult(null);
        setStatusResult(null);
        setAccessionNumber("");
        setPatientName("");
    };

    return (
        <Card className="border-2 border-emerald-200/60 dark:border-emerald-900/30 shadow-md bg-emerald-50/20 dark:bg-emerald-950/20 overflow-hidden">
            <CardHeader className="bg-emerald-50/50 dark:bg-emerald-900/30 border-b border-emerald-100 dark:border-emerald-800 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-lg text-white shadow-sm ring-4 ring-emerald-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 0 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-emerald-900 dark:text-emerald-100">SatuSehat Full-Chain Tester</CardTitle>
                            <CardDescription className="text-emerald-700/70 dark:text-emerald-400 text-xs text-balance">
                                Debug integrasi otomatis (Order {'->'} DICOM {'->'} Router {'->'} Resource) tanpa CLI.
                            </CardDescription>
                        </div>
                    </div>
                    {(step > 1 || accessionNumber) && (
                        <Button variant="ghost" size="sm" onClick={resetTest} className="text-emerald-700 hover:bg-emerald-100/50 h-8 gap-1.5 px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            Reset
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
                {/* Stepper Visual */}
                <div className="relative flex justify-between max-w-2xl mx-auto mb-10">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 dark:bg-emerald-900 -translate-y-1/2 z-0" />
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="relative z-10 flex flex-col items-center gap-2 group">
                            <div className={cn(
                                "size-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-4",
                                step >= s ? "bg-emerald-500 text-white border-emerald-100 dark:border-emerald-800 ring-4 ring-emerald-500/10" : "bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-800"
                            )}>
                                {step > s ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg> : s}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest",
                                step >= s ? "text-emerald-700 dark:text-emerald-400" : "text-slate-400 dark:text-slate-600"
                            )}>
                                {s === 1 ? "Create Order" : s === 2 ? "Send DICOM" : "Verify Result"}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/40 dark:bg-slate-900/40 border border-emerald-100 dark:border-emerald-900 rounded-2xl">
                    <div className="space-y-2.5">
                        <Label htmlFor="accNo" className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Accession Number</Label>
                        <Input 
                            id="accNo"
                            value={accessionNumber}
                            onChange={(e) => setAccessionNumber(e.target.value)}
                            disabled={step > 1}
                            placeholder="Contoh: test-888"
                            className="bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900 focus:ring-emerald-500 h-12 font-mono dark:text-slate-100"
                        />
                    </div>
                    <div className="space-y-2.5">
                        <Label htmlFor="patientNameTest" className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Nama Pasien</Label>
                        <Input 
                            id="patientNameTest"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            disabled={step > 1}
                            placeholder="Nama Pasien Test"
                            className="bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900 focus:ring-emerald-500 h-12 dark:text-slate-100"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Step 1: Create Order */}
                    <div className={cn("space-y-4 transition-all", step !== 1 && "opacity-50 pointer-events-none")}>
                        <Button 
                            onClick={handleCreateOrder}
                            disabled={isLoading || step !== 1}
                            className="w-full md:w-fit px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-lg shadow-emerald-600/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                            Step 1: Create Test Order
                        </Button>
                        {orderResult && (
                            <div className="p-4 bg-white/80 dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-4 animate-in slide-in-from-left-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                                        <span className="text-emerald-700 dark:text-emerald-400 font-bold tracking-tight">ServiceRequest ID:</span>
                                        <code className="bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded font-bold text-emerald-900 dark:text-emerald-100">{orderResult.id}</code>
                                    </div>
                                    <div className="flex justify-between items-center text-xs p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                                        <span className="text-blue-700 dark:text-blue-400 font-bold tracking-tight">Patient ID (Sync):</span>
                                        <code className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded font-bold text-blue-900 dark:text-blue-100">{orderResult.patientId}</code>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest opacity-60">Backend Logs</p>
                                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight space-y-1 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 max-h-40 overflow-y-auto">
                                        {orderResult.logs.map((L, i) => <div key={i}>[{i+1}] {L}</div>)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Create DICOM */}
                    <div className={cn("space-y-4 transition-all", step !== 2 && "opacity-50 pointer-events-none")}>
                        <Button 
                            onClick={handleCreateDicom}
                            disabled={isLoading || step !== 2}
                            className="w-full md:w-fit px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-lg shadow-blue-600/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-plus"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><line x1="19" x2="19" y1="2" y2="8"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                            Step 2: Push Dummy DICOM to Orthanc
                        </Button>
                        {dicomResult && (
                            <div className="p-4 bg-white/80 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900 rounded-xl space-y-2 animate-in slide-in-from-left-4">
                                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 underline mb-2 tracking-tight">Orthanc Creation Logs:</p>
                                <div className="text-[10px] font-mono text-slate-500 leading-tight space-y-1">
                                    {dicomResult.logs.map((L, i) => <div key={i}>[{i+1}] {L}</div>)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Verify Status */}
                    <div className={cn("space-y-4 transition-all", step !== 3 && "opacity-50 pointer-events-none")}>
                        <Button 
                            onClick={handleVerifyStatus}
                            disabled={isLoading || step !== 3}
                            className="w-full md:w-fit px-8 h-12 bg-amber-600 hover:bg-amber-700 text-white font-bold gap-2 shadow-lg shadow-amber-600/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            Step 3: Verify ImagingStudy Status
                        </Button>
                        
                        {statusResult && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/80 border border-amber-200 rounded-xl">
                                    <p className="text-[10px] font-bold text-amber-700 uppercase mb-3">Service Request</p>
                                    {statusResult.serviceRequest ? (
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-emerald-500 text-white border-none shadow-none">Found</Badge>
                                            <code className="text-xs font-bold">{statusResult.serviceRequest.id}</code>
                                        </div>
                                    ) : (
                                        <Badge variant="outline" className="text-slate-400">Not Created Yet</Badge>
                                    )}
                                </div>
                                <div className="p-4 bg-white/80 border border-amber-200 rounded-xl">
                                    <p className="text-[10px] font-bold text-amber-700 uppercase mb-3">Imaging Study</p>
                                    {statusResult.imagingStudy ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-blue-500 text-white border-none shadow-none">Available</Badge>
                                                <code className="text-xs font-bold">{statusResult.imagingStudy.id}</code>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Instance Count: {statusResult.imagingStudy.seriesCount} Series</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-amber-500 border-amber-200 animate-pulse bg-amber-50">Checking Router...</Badge>
                                            <p className="text-[9px] text-slate-400 font-medium">Tunggu 5-10 detik</p>
                                        </div>
                                    )}
                                </div>
                                <div className="md:col-span-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Diagnostic Logs</p>
                                    <div className="text-[10px] font-mono text-slate-500 leading-tight space-y-1 max-h-40 overflow-y-auto">
                                        {statusResult.logs.map((L, i) => <div key={i}>[{i+1}] {L}</div>)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
