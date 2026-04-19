"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Search01Icon, 
  PlusSignIcon, 
  CheckmarkCircle02Icon, 
  AlertCircleIcon, 
  Link01Icon,
  InformationCircleIcon
} from "@hugeicons/core-free-icons";

interface Patient {
  id: string;
  name: string;
}

export default function ResourceCheckPage() {
  const [nik, setNik] = useState("");
  const [accessionNumber, setAccessionNumber] = useState("");
  const [config, setConfig] = useState<{ environment: string, organizationId: string } | null>(null);
  
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [patientError, setPatientError] = useState<string | null>(null);
  
  const [loadingResources, setLoadingResources] = useState(false);
  const [encounters, setEncounters] = useState<any[]>([]);
  const [conditions, setConditions] = useState<any[]>([]);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  
  const [selectedEncounterId, setSelectedEncounterId] = useState<string | null>(null);
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [showEncounterModal, setShowEncounterModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [prepping, setPrepping] = useState(false);
  const [prepResult, setPrepResult] = useState<any>(null);

  // Initial fetch
  useEffect(() => {
    fetch("/api/satusehat/patient-resources?type=config")
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Error fetching config:", err));
  }, []);

  // Fetch patient by NIK
  const handleSearchPatient = async () => {
    if (!nik) return;
    setLoadingPatient(true);
    setPatient(null);
    setPatientError(null);
    setPrepResult(null);
    setEncounters([]);
    setConditions([]);
    try {
      const res = await fetch(`/api/satusehat/patient-resources?type=patient&nik=${nik}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Pasien tidak ditemukan");
      }
      
      setPatient(data);
      if (data?.id) {
        fetchResources(data.id);
      }
    } catch (err: any) {
      setPatientError(err.message);
      console.error(err);
    } finally {
      setLoadingPatient(false);
    }
  };

  // Fetch encounters, conditions, and existing SRs
  const fetchResources = async (patientId: string) => {
    setLoadingResources(true);
    try {
      const [encRes, condRes, srRes] = await Promise.all([
        fetch(`/api/satusehat/patient-resources?type=encounter&patientId=${patientId}`),
        fetch(`/api/satusehat/patient-resources?type=condition&patientId=${patientId}`),
        fetch(`/api/satusehat/patient-resources?type=servicerequest&patientId=${patientId}`)
      ]);
      
      const [encData, condData, srData] = await Promise.all([
        encRes.json(),
        condRes.json(),
        srRes.json()
      ]);
      
      // Sort scenarios: 
      // Encounters: Latest first
      const sortedEnc = (encData || []).sort((a: any, b: any) => {
        const dateA = new Date(a.period?.start || 0).getTime();
        const dateB = new Date(b.period?.start || 0).getTime();
        return dateB - dateA;
      });
      
      // Conditions: Latest or active first
      const sortedCond = (condData || []).sort((a: any, b: any) => {
        const dateA = new Date(a.recordedDate || 0).getTime();
        const dateB = new Date(b.recordedDate || 0).getTime();
        return dateB - dateA;
      });

      setEncounters(sortedEnc);
      setConditions(sortedCond);
      setServiceRequests(srData || []);
      
      // AUTO SELECT LATEST
      if (sortedEnc.length > 0) {
        setSelectedEncounterId(sortedEnc[0].id);
      }
      if (sortedCond.length > 0) {
        setSelectedConditionId(sortedCond[0].id);
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingResources(false);
    }
  };

  // Create Manual ServiceRequest
  const handleCreatePrep = async () => {
    if (!patient || !accessionNumber) return;
    
    setPrepping(true);
    setPrepResult(null);

    // Extract dynamic IDs from selected resources
    const selectedEncounter = encounters.find(e => e.id === selectedEncounterId);
    const selectedCondition = conditions.find(c => c.id === selectedConditionId);
    
    // Follow the references from the selected encounter
    const practitionerId = selectedEncounter?.participant?.[0]?.individual?.reference;
    const dynamicPatientId = selectedEncounter?.subject?.reference || selectedCondition?.subject?.reference || patient.id;

    try {
      const res = await fetch("/api/satusehat/prep-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: dynamicPatientId,
          patientName: patient.name,
          accessionNumber: accessionNumber,
          encounterId: selectedEncounterId,
          conditionId: selectedConditionId,
          practitionerId: practitionerId
        })
      });
      
      const data = await res.json();
      setPrepResult(data);
      
      if (data.success) {
        // Refresh SR list
        fetchResources(patient.id);
        // Clear ACSN after success to prevent double submission
        setAccessionNumber("");
      }
    } catch (err: any) {
      setPrepResult({ error: err.message });
    } finally {
      setPrepping(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Manual Resource Prep</h1>
          {config && (
            <Badge 
              variant={config.environment === 'production' ? 'default' : 'secondary'}
              className={`${config.environment === 'production' ? 'bg-orange-600 hover:bg-orange-500' : 'bg-blue-600 hover:bg-blue-500'} text-white border-none px-3 py-1 shadow-sm`}
            >
              {config.environment.toUpperCase()}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground flex items-center gap-2">
          {config && <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded-sm">ID Organisasi: {config.organizationId}</span>}
          Siapkan resource satu sehat secara manual untuk sinkronisasi worklist radiologi.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Step 1: Patient Search */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 dark:text-slate-100">
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-inner">1</div>
              Cari Identitas Pasien (NIK)
            </CardTitle>
            <CardDescription className="dark:text-slate-400">Cari data pasien di SatuSehat untuk menarik histori kunjungan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="nik" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nomor Induk Kependudukan (NIK)</Label>
                <div className="flex gap-2">
                  <Input 
                    id="nik" 
                    placeholder="Contoh: 3201..." 
                    value={nik} 
                    onChange={(e) => setNik(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchPatient()}
                    className="h-11 border-slate-300 dark:border-slate-700 dark:bg-slate-950 focus:border-primary focus:ring-primary/20 dark:text-slate-100"
                  />
                  <Button onClick={handleSearchPatient} disabled={loadingPatient} className="h-11 px-8 font-bold shadow-md transition-all active:scale-95">
                    {loadingPatient ? "Mencari..." : (
                      <>
                        <HugeiconsIcon icon={Search01Icon} strokeWidth={2.5} className="mr-2 h-4 w-4" />
                        CARI DATA
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {patientError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 animate-in slide-in-from-top-2 duration-300 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest">
                  <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" strokeWidth={3} />
                  Error SatuSehat
                </div>
                <div className="text-[12px] text-red-800 font-mono leading-relaxed break-all bg-white/50 p-2 rounded-lg border border-red-100">
                  {patientError}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEQUENCE LOGIC: Linked Resources Summary */}
        {(patient || loadingResources) && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                <div className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                   <HugeiconsIcon icon={Link01Icon} className="h-3 w-3" strokeWidth={3} />
                   DATA RUNUTAN TERHUBUNG
                </div>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Patient Summary Card */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm dark:bg-slate-900/50">
                   <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                         <Badge variant="outline" className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-none">Patient</Badge>
                         <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-4 w-4 text-green-500" strokeWidth={2.5} />
                      </div>
                      {loadingPatient ? <Skeleton className="h-10 w-full" /> : (
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200 dark:shadow-blue-900/20">P</div>
                           <div className="flex-1 overflow-hidden">
                              <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 truncate">{patient?.name}</div>
                              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">{patient?.id}</div>
                           </div>
                        </div>
                      )}
                   </CardContent>
                </Card>

                {/* Encounter Summary Card */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md dark:bg-slate-900/50">
                   <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                         <Badge variant="outline" className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-none">Encounter</Badge>
                         <div className="flex gap-1 items-center">
                            {encounters.length > 0 && <Badge className="text-[9px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 border-none">Selected</Badge>}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 rounded-full text-slate-400 dark:text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                              onClick={() => setShowEncounterModal(true)}
                              disabled={!selectedEncounterId}
                            >
                               <HugeiconsIcon icon={InformationCircleIcon} className="h-4 w-4" strokeWidth={2.5} />
                            </Button>
                         </div>
                      </div>
                      {loadingResources ? <Skeleton className="h-10 w-full" /> : (
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-lg shadow-orange-200 dark:shadow-orange-950/20">E</div>
                           <div className="flex-1 overflow-hidden">
                              <select 
                                className="w-full bg-transparent border-none p-0 font-extrabold text-sm text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer"
                                value={selectedEncounterId || ""}
                                onChange={(e) => setSelectedEncounterId(e.target.value)}
                              >
                                {encounters.length > 0 ? (
                                  encounters.map(e => (
                                    <option key={e.id} value={e.id} className="dark:bg-slate-900">
                                      {e.period?.start ? new Date(e.period.start).toLocaleDateString() : 'Active'} (#{e.id.substring(0,8)})
                                    </option>
                                  ))
                                ) : (
                                  <option value="" className="dark:bg-slate-900">-- Buat Baru --</option>
                                )}
                              </select>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                {encounters.length > 0 ? "Otomatis ambil kunjungan terakhir" : "Data kunjungan kosong"}
                              </div>
                           </div>
                        </div>
                      )}
                   </CardContent>
                </Card>

                {/* Condition Summary Card */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md dark:bg-slate-900/50">
                   <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                         <Badge variant="outline" className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-none">Diagnosis</Badge>
                         <div className="flex gap-1 items-center">
                            {conditions.length > 0 && <Badge className="text-[9px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 border-none">Linked</Badge>}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 rounded-full text-slate-400 dark:text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors"
                              onClick={() => setShowConditionModal(true)}
                              disabled={!selectedConditionId}
                            >
                               <HugeiconsIcon icon={InformationCircleIcon} className="h-4 w-4" strokeWidth={2.5} />
                            </Button>
                         </div>
                      </div>
                      {loadingResources ? <Skeleton className="h-10 w-full" /> : (
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold shadow-lg shadow-green-200 dark:shadow-green-950/20">D</div>
                           <div className="flex-1 overflow-hidden">
                              <select 
                                className="w-full bg-transparent border-none p-0 font-extrabold text-sm text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer"
                                value={selectedConditionId || ""}
                                onChange={(e) => setSelectedConditionId(e.target.value)}
                              >
                                {conditions.length > 0 ? (
                                  conditions.map(c => (
                                    <option key={c.id} value={c.id} className="dark:bg-slate-900">
                                      {c.code?.coding?.[0]?.display || c.code?.text || 'Diagnosis'}
                                    </option>
                                  ))
                                ) : (
                                  <option value="" className="dark:bg-slate-900">-- Tanpa Diagnosis --</option>
                                )}
                              </select>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                Terhubung sebagai alasan prosedur
                              </div>
                           </div>
                        </div>
                      )}
                   </CardContent>
                </Card>
             </div>
          </div>
        )}

        {/* Step 2: Simplified SR Creation */}
        {patient && (
          <Card className="border-2 border-primary shadow-xl shadow-primary/5 dark:bg-slate-900/50 animate-in zoom-in-95 duration-500 overflow-hidden">
            <CardHeader className="bg-primary/[0.04] dark:bg-primary/10 pb-4">
              <CardTitle className="text-xl flex items-center gap-2 dark:text-slate-100">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">2</div>
                Buat Order ServiceRequest (ACSN)
              </CardTitle>
              <CardDescription className="dark:text-slate-400">Target akhir sinkronisasi data ke worklist radiologi</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-10 space-y-8">
              <div className="max-w-xl mx-auto space-y-8 text-center px-4">
                <div className="space-y-4">
                  <div className="inline-block p-1 px-3 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Manual Assignment
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="acsn" className="text-2xl font-black text-slate-900 dark:text-slate-100">Accession Number (ACSN)</Label>
                    <Input 
                      id="acsn" 
                      placeholder="Masukkan No ACSN..." 
                      value={accessionNumber}
                      onChange={(e) => setAccessionNumber(e.target.value)}
                      className="h-16 text-center text-4xl font-black font-mono tracking-widest placeholder:text-slate-200 dark:placeholder:text-slate-800 border-2 border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all dark:bg-slate-950 dark:text-slate-100"
                      autoFocus
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      PASTIKAN NOMOR INI <span className="text-primary underline">SAMA</span> DENGAN NOMOR PADA DICOM FILES/OHIF VIEWER.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] bg-primary hover:bg-primary/90" 
                    disabled={!patient || !accessionNumber || prepping}
                    onClick={handleCreatePrep}
                  >
                    {prepping ? "SEDANG MEMPROSES..." : (
                      <div className="flex items-center justify-center gap-4">
                        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={4} className="h-7 w-7" />
                        SUBMIT LAYANAN RADIOLOGI
                      </div>
                    )}
                  </Button>

                  {prepResult && (
                    <div className={`p-5 rounded-2xl border-2 flex items-start gap-4 text-left animate-in slide-in-from-top-4 ${prepResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      {prepResult.success ? (
                        <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-200">
                           <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={3} className="h-6 w-6" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-200">
                           <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={3} className="h-6 w-6" />
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <div className={`text-lg font-black ${prepResult.success ? 'text-green-900' : 'text-red-900'}`}>
                          {prepResult.success ? "Resource Berhasil Terkirim!" : "Gagal Menyiapkan Resource"}
                        </div>
                        <div className="text-sm font-medium leading-relaxed opacity-80">
                          {prepResult.success ? (
                            <>
                              <p>Data hulu SatuSehat sudah siap. ID ServiceRequest: <span className="font-mono font-bold bg-white dark:bg-slate-800 px-1.5 rounded">{prepResult.ids?.ServiceRequest}</span></p>
                              <Button 
                                variant="link" 
                                className="p-0 h-auto text-green-700 dark:text-green-400 font-bold decoration-green-700/30 dark:decoration-green-400/30 underline mt-2"
                                onClick={() => window.location.href = "/worklist"}
                              >
                                Klik di sini untuk kembali ke Worklist
                              </Button>
                            </>
                          ) : (
                            prepResult.error || "Terjadi kesalahan pada sistem."
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabs: Existing Resources (History) */}
      <Tabs defaultValue="servicerequest" className="w-full mt-12 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <TabsList className="grid w-full grid-cols-3 h-14 bg-slate-50 dark:bg-slate-800 p-2">
          <TabsTrigger value="servicerequest" className="rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">Histori Order (SR)</TabsTrigger>
          <TabsTrigger value="encounter" className="rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">Histori Kunjungan</TabsTrigger>
          <TabsTrigger value="condition" className="rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">Daftar Diagnosis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="servicerequest" className="p-0 border-t border-slate-200 dark:border-slate-800">
          <div className="p-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">ServiceRequest Terdaftar</h3>
            <p className="text-xs text-muted-foreground mb-6">Status permintaan layanan radiologi untuk pasien ini.</p>
            {loadingResources ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-200 dark:border-slate-800">
                    <TableHead className="font-bold dark:text-slate-100">No ACSN</TableHead>
                    <TableHead className="font-bold dark:text-slate-100">ID Resource</TableHead>
                    <TableHead className="font-bold dark:text-slate-100">Status</TableHead>
                    <TableHead className="font-bold dark:text-slate-100">Waktu Buat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                        (Belum ada data ServiceRequest)
                      </TableCell>
                    </TableRow>
                  ) : (
                    serviceRequests.map((sr) => (
                      <TableRow key={sr.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <TableCell className="font-black text-slate-900 dark:text-slate-100">
                          {sr.identifier?.find((i: any) => i.type?.coding?.some((c: any) => c.code === "ACSN"))?.value || "-"}
                        </TableCell>
                        <TableCell className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{sr.id}</TableCell>
                        <TableCell>
                          <Badge variant={sr.status === 'active' ? 'default' : 'secondary'} className={sr.status === 'active' ? 'bg-blue-600 dark:bg-blue-900/40 dark:text-blue-300' : 'dark:bg-slate-800 dark:text-slate-400'}>
                            {sr.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[11px] text-slate-500 dark:text-slate-400">
                           {sr.authoredOn ? new Date(sr.authoredOn).toLocaleString('id-ID') : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="encounter" className="p-0 border-t border-slate-200 dark:border-slate-800">
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800">
                  <TableHead className="font-bold dark:text-slate-100">Encounter ID</TableHead>
                  <TableHead className="font-bold dark:text-slate-100">Status</TableHead>
                  <TableHead className="font-bold dark:text-slate-100">Waktu Mulai</TableHead>
                  <TableHead className="font-bold dark:text-slate-100">Tipe Layanan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {encounters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-slate-400 font-medium">Tidak ada data</TableCell>
                  </TableRow>
                ) : (
                  encounters.map((e) => (
                    <TableRow key={e.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <TableCell className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">{e.id}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] font-bold dark:border-slate-700 dark:text-slate-400">{e.status}</Badge></TableCell>
                      <TableCell className="text-[11px] text-slate-500 dark:text-slate-400">{e.period?.start ? new Date(e.period.start).toLocaleString('id-ID') : "-"}</TableCell>
                      <TableCell className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{e.class?.display || e.class?.code || "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="condition" className="p-0 border-t border-slate-200 dark:border-slate-800">
          <div className="p-6">
             <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800">
                  <TableHead className="font-bold dark:text-slate-100">Kode</TableHead>
                  <TableHead className="font-bold dark:text-slate-100">Diagnosis / Keluhan</TableHead>
                  <TableHead className="font-bold dark:text-slate-100">Status</TableHead>
                  <TableHead className="font-bold dark:text-slate-100">ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conditions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-slate-400 font-medium">Tidak ada data</TableCell>
                  </TableRow>
                ) : (
                  conditions.map((c) => (
                    <TableRow key={c.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <TableCell className="font-black text-slate-900 dark:text-slate-100">{c.code?.coding?.[0]?.code || "-"}</TableCell>
                      <TableCell className="text-sm font-bold text-slate-700 dark:text-slate-300">{c.code?.coding?.[0]?.display || c.code?.text || "-"}</TableCell>
                      <TableCell><Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-none text-[10px] font-bold">{c.clinicalStatus?.coding?.[0]?.code || "active"}</Badge></TableCell>
                      <TableCell className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{c.id}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center mt-6">
        <Button variant="ghost" className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-bold transition-all" onClick={() => window.location.href='/satusehat/sync'}>
           <HugeiconsIcon icon={Link01Icon} strokeWidth={3} className="mr-2 h-4 w-4" />
           KEMBALI KE HALAMAN SINKRONISASI
        </Button>
      </div>

      {/* --- Detail Modals for Verification --- */}
      
      {/* Encounter Detail Modal */}
      <Dialog open={showEncounterModal} onOpenChange={setShowEncounterModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="h-8 w-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">E</div>
              Detail Encounter SatuSehat
            </DialogTitle>
            <DialogDescription>Pastikan data kunjungan sudah sesuai sebelum dikaitkan ke order.</DialogDescription>
          </DialogHeader>
          
          {(() => {
            const enc = encounters.find(e => e.id === selectedEncounterId);
            if (!enc) return <div className="p-8 text-center text-muted-foreground">Data tidak ditemukan.</div>;
            
            return (
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Status Kunjungan</div>
                      <Badge variant="outline" className="text-sm font-bold bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200">{enc.status}</Badge>
                   </div>
                   <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Tipe Layanan</div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{enc.class?.display || enc.class?.code || "-"}</div>
                   </div>
                   <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Waktu Mulai (Check-in)</div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {enc.period?.start ? new Date(enc.period.start).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' }) : "-"}
                      </div>
                   </div>
                   <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Resource ID</div>
                      <div className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">{enc.id}</div>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <HugeiconsIcon icon={Link01Icon} className="h-3 w-3" /> Raw JSON Response
                   </div>
                   <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-[10px] text-green-400 font-mono">
                        {JSON.stringify(enc, null, 2)}
                      </pre>
                   </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Condition Detail Modal */}
      <Dialog open={showConditionModal} onOpenChange={setShowConditionModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="h-8 w-8 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold">D</div>
              Detail Diagnosis / Condition
            </DialogTitle>
            <DialogDescription>Verifikasi kode ICD-10 dan keluhan pasien.</DialogDescription>
          </DialogHeader>
          
          {(() => {
            const cond = conditions.find(c => c.id === selectedConditionId);
            if (!cond) return <div className="p-8 text-center text-muted-foreground">Data tidak ditemukan.</div>;
            
            return (
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 col-span-2">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Diagnosis (ICD-10)</div>
                      <div className="text-lg font-black text-slate-900 dark:text-slate-100">
                         {cond.code?.coding?.[0]?.code} - {cond.code?.coding?.[0]?.display || cond.code?.text}
                      </div>
                   </div>
                   <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Clinical Status</div>
                      <Badge className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border-none text-xs font-bold">
                        {cond.clinicalStatus?.coding?.[0]?.code || "active"}
                      </Badge>
                   </div>
                   <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Resource ID</div>
                      <div className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400">{cond.id}</div>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                      <HugeiconsIcon icon={Link01Icon} className="h-3 w-3" /> Raw JSON Response
                   </div>
                   <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-[10px] text-green-400 font-mono">
                        {JSON.stringify(cond, null, 2)}
                      </pre>
                   </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
