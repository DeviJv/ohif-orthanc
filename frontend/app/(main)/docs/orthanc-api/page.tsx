"use client";

import React, { useState, useMemo } from "react";
import { 
    Card, CardHeader, CardTitle, CardDescription, CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    HugeiconsIcon 
} from "@hugeicons/react";
import { 
    Search01Icon, 
    BookOpen02Icon, 
    Copy01Icon, 
    CodeIcon, 
    Link01Icon,
    InformationCircleIcon,
    ComputerTerminalIcon,
    Database01Icon,
    Folder01Icon,
    File01Icon,
    InternetIcon,
    ApiIcon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ORTHANC_API_DATA, ORTHANC_API_CATEGORIES, ApiEndpoint } from "@/lib/orthanc-api-data";

export default function OrthancApiDocsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const [appUrl, setAppUrl] = useState("http://localhost:3000");
    const [orthancUrl, setOrthancUrl] = useState("http://localhost:8042");

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setAppUrl(window.location.origin);
            const defaultOrthanc = process.env.NEXT_PUBLIC_ORTHANC_URL || `${window.location.protocol}//${window.location.hostname}:8042`;
            setOrthancUrl(defaultOrthanc);
        }
    }, []);

    const filteredEndpoints = useMemo(() => {
        return ORTHANC_API_DATA.filter(endpoint => {
            const matchesSearch = 
                endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                endpoint.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = activeCategory === "All" || endpoint.category === activeCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const categories = ["All", ...ORTHANC_API_CATEGORIES];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50/30 dark:bg-slate-900">
            {/* Header */}
            <header className="flex flex-col gap-4 p-6 md:p-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto w-full">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
                            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl">
                                <HugeiconsIcon icon={BookOpen02Icon} className="size-6 text-primary dark:text-primary" strokeWidth={2.5} />
                            </div>
                            Orthanc API Documentation
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            Referensi lengkap REST API dan DICOMweb untuk integrasi PACS Quantum.
                        </p>
                    </div>
                    <div className="relative w-full md:w-80 group">
                        <HugeiconsIcon 
                            icon={Search01Icon} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors" 
                        />
                        <Input
                            placeholder="Cari endpoint (misal: /studies)..."
                            className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner dark:text-slate-100"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-hidden flex flex-col md:flex-row max-w-7xl mx-auto w-full">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 p-6 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shrink-0 hidden md:block">
                    <nav className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-2 mb-4">Categories</h3>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2.5",
                                        activeCategory === cat 
                                            ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]" 
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                                    )}
                                >
                                    {getCategoryIcon(cat)}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto scroll-smooth">
                    <div className="space-y-10 max-w-4xl">
                        {filteredEndpoints.length > 0 ? (
                            filteredEndpoints.map((endpoint) => (
                                <EndpointCard 
                                    key={endpoint.id} 
                                    endpoint={endpoint} 
                                    onCopy={copyToClipboard}
                                    appUrl={appUrl}
                                    orthancUrl={orthancUrl}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full">
                                    <HugeiconsIcon icon={Search01Icon} className="size-10 text-slate-300 dark:text-slate-700" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Endpoint tidak ditemukan</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Coba gunakan kata kunci pencarian yang lain.</p>
                                </div>
                                <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                                    Reset semua filter
                                </Button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

function getCategoryIcon(category: string) {
    const size = "size-4";
    switch(category) {
        case "Patients": return <HugeiconsIcon icon={Folder01Icon} className={size} />;
        case "Studies": return <HugeiconsIcon icon={Database01Icon} className={size} />;
        case "Series": return <HugeiconsIcon icon={File01Icon} className={size} />;
        case "Instances": return <HugeiconsIcon icon={ComputerTerminalIcon} className={size} />;
        case "DICOMweb": return <HugeiconsIcon icon={InternetIcon} className={size} />;
        case "Radiology Reports": return <HugeiconsIcon icon={ApiIcon} className={size} />;
        case "Create ACSN": return <HugeiconsIcon icon={CodeIcon} className={size} />;
        case "Create Order ID": return <HugeiconsIcon icon={CodeIcon} className={size} />;
        case "Connect Devices": return <HugeiconsIcon icon={ComputerTerminalIcon} className={size} />;
        default: return <HugeiconsIcon icon={Link01Icon} className={size} />;
    }
}

function EndpointCard({ endpoint, onCopy, appUrl, orthancUrl }: { endpoint: ApiEndpoint, onCopy: (text: string) => void, appUrl?: string, orthancUrl?: string }) {
    const [activeTab, setActiveTab] = useState<"curl" | "fetch" | "php" | "response">("curl");
    const isAppApi = endpoint.category === "Create ACSN" || 
                     endpoint.category === "Create Order ID" ||
                     endpoint.category === "Radiology Reports" || 
                     endpoint.category === "Public Study API" || 
                     endpoint.category === "Public Worklist API";
    const isPublicApi = endpoint.category === "Public Study API" || endpoint.category === "Public Worklist API";
    
    const isConnectDevices = endpoint.category === "Connect Devices";
    const pacsKey = "pacs_secret_token_2026";
    const publicApiKey = "pacs_secret_token_2026";
    
    const resolvedAppUrl = appUrl || "http://localhost:3000";
    const resolvedOrthancUrl = orthancUrl || "http://localhost:8042";

    const authHeader = isAppApi 
        ? (isPublicApi ? `-H "x-pacs-key: ${publicApiKey}"` : `-H "x-pacs-key: ${pacsKey}"`)
        : `-H "Authorization: Basic cXVhbnR1bTpxdWFudHVtMTIz"`;

    const isGet = endpoint.method === "GET";
    let queryParams = "";
    if (isGet && isAppApi) {
        if (endpoint.id === "get-report-by-accession") {
            queryParams = "?accessionNumber=ACSN-001";
        } else if (endpoint.id === "search-reports") {
            queryParams = "?q=ACSN-001";
        } else if (!isPublicApi) {
            queryParams = "?patientId=12345&studyDate=20240420";
        }
    }
    
    const curlCode = `curl -X ${endpoint.method} "${isAppApi ? resolvedAppUrl : resolvedOrthancUrl}${endpoint.path}${queryParams}" \\
  ${authHeader}${!isGet ? ` \\
  -H "Content-Type: application/json" \\
  -d '${endpoint.exampleBody || `{
    "patientId": "12345",
    "orderId": "ORD-123",
    "studyDate": "20240420",
    "accessionNumber": "ACSN-001"
  }`}'` : ""}`;
    
    const fetchCode = isAppApi 
        ? `const response = await fetch("${resolvedAppUrl}${endpoint.path}${queryParams}", {
  method: "${endpoint.method}",
  headers: {
    "${isPublicApi ? 'x-pacs-key' : 'x-pacs-key'}": "${isPublicApi ? publicApiKey : pacsKey}"${!isGet ? ',\n    "Content-Type": "application/json"' : ''}
  }${!isGet ? `,\n  body: JSON.stringify(${endpoint.exampleBody || `{
    patientId: "12345",
    orderId: "ORD-123",
    studyDate: "20240420",
    accessionNumber: "ACSN-001"
  }`})` : ''}
});
const data = await response.json();`
        : `const response = await fetch("${resolvedOrthancUrl}${endpoint.path}", {
  method: "${endpoint.method}",
  headers: {
    "Authorization": "Basic " + btoa("quantum:quantum123")${!isGet ? ',\n    "Content-Type": "application/json"' : ''}
  }${!isGet ? `,\n  body: JSON.stringify(${endpoint.exampleBody || `{}`})` : ''}
});
const data = await response.json();`;

    const phpCode = isAppApi
        ? `<?php
$url = "${resolvedAppUrl}${endpoint.path}${queryParams}";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${endpoint.method}");
${!isGet ? `$data = ${endpoint.exampleBody ? `json_decode('${endpoint.exampleBody}', true)` : `[
    "patientId" => "12345",
    "orderId" => "ORD-123",
    "studyDate" => "20240420",
    "accessionNumber" => "ACSN-001"
]`};
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    '${isPublicApi ? 'x-pacs-key' : 'x-pacs-key'}: ${isPublicApi ? publicApiKey : pacsKey}',
    'Content-Type: application/json'
]);` : `curl_setopt($ch, CURLOPT_HTTPHEADER, [
    '${isPublicApi ? 'x-pacs-key' : 'x-pacs-key'}: ${isPublicApi ? publicApiKey : pacsKey}'
]);`}

$response = curl_exec($ch);
$result = json_decode($response, true);
curl_close($ch);
print_r($result);
?>`
        : `<?php
$url = "${resolvedOrthancUrl}${endpoint.path}";
$auth = base64_encode("quantum:quantum123");

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${endpoint.method}");
${!isGet ? `$data = ${endpoint.exampleBody ? `json_decode('${endpoint.exampleBody}', true)` : `[]`};
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Basic ' . $auth,
    'Content-Type: application/json'
]);` : `curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Basic ' . $auth
]);`}

$response = curl_exec($ch);
$result = json_decode($response, true);
curl_close($ch);
print_r($result);
?>`;

    return (
        <section id={endpoint.id} className="scroll-mt-8 transition-all hover:-translate-y-1">
            <Card className="shadow-sm border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary/20 dark:bg-slate-900/50 transition-all overflow-hidden duration-300">
                <CardHeader className="pb-4 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Badge className={cn(
                            "font-bold px-2 py-0.5 rounded-sm tracking-wider text-[10px]",
                            endpoint.method === "GET" && !isConnectDevices && "bg-blue-500 hover:bg-blue-600 text-white",
                            endpoint.method === "POST" && "bg-green-600 hover:bg-green-700 text-white",
                            endpoint.method === "DELETE" && "bg-destructive hover:bg-destructive/90 text-white",
                            isConnectDevices && "bg-purple-600 hover:bg-purple-700 text-white",
                        )}>
                            {isConnectDevices ? "INFO" : endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-md shadow-sm">
                            {endpoint.path}
                        </code>
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-auto">
                            {endpoint.category}
                        </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                        {endpoint.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium mt-1">
                        {endpoint.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6 bg-white dark:bg-slate-900/50">
                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                                <HugeiconsIcon icon={InformationCircleIcon} className="size-3.5" />
                                Parameters
                            </h4>
                            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/20 dark:bg-slate-950/20 shadow-inner">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                                        <tr>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Type</th>
                                            <th className="px-4 py-3">Required</th>
                                            <th className="px-4 py-3">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                        {endpoint.parameters.map((p) => (
                                            <tr key={p.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-4 py-3 font-mono font-bold text-primary dark:text-primary-foreground">{p.name}</td>
                                                <td className="px-4 py-3"><Badge variant="outline" className="text-[10px] font-mono dark:border-slate-700">{p.type}</Badge></td>
                                                <td className="px-4 py-3">{p.required ? <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-none text-[9px]">YES</Badge> : "No"}</td>
                                                <td className="px-4 py-3 text-slate-500 dark:text-slate-400 italic">{p.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {!isConnectDevices && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                                <HugeiconsIcon icon={CodeIcon} className="size-3.5" />
                                Example Implementation
                            </h4>
                            
                            <div className="w-full">
                                <div className="flex bg-slate-100/50 dark:bg-slate-800/50 p-1 h-9 gap-1 shadow-inner rounded-lg mb-2 w-fit">
                                    <button 
                                        onClick={() => setActiveTab("curl")}
                                        className={cn(
                                            "text-[10px] font-bold px-4 py-1.5 rounded-md transition-all",
                                            activeTab === "curl" ? "bg-white dark:bg-slate-900 shadow-sm text-primary" : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                        )}
                                    >
                                        CURL
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab("fetch")}
                                        className={cn(
                                            "text-[10px] font-bold px-4 py-1.5 rounded-md transition-all",
                                            activeTab === "fetch" ? "bg-white dark:bg-slate-900 shadow-sm text-primary" : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                        )}
                                    >
                                        FETCH (JS)
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab("php")}
                                        className={cn(
                                            "text-[10px] font-bold px-4 py-1.5 rounded-md transition-all",
                                            activeTab === "php" ? "bg-white dark:bg-slate-900 shadow-sm text-primary" : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                        )}
                                    >
                                        PHP
                                    </button>
                                    {endpoint.response && (
                                        <button 
                                            onClick={() => setActiveTab("response")}
                                            className={cn(
                                                "text-[10px] font-bold px-4 py-1.5 rounded-md transition-all",
                                                activeTab === "response" ? "bg-white dark:bg-slate-900 shadow-sm text-primary" : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                            )}
                                        >
                                            RESPONSE
                                        </button>
                                    )}
                                </div>

                                <div className="relative">
                                    {activeTab === "curl" && (
                                        <div className="relative animate-in fade-in duration-300">
                                            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[12px] font-mono whitespace-pre-wrap overflow-x-auto shadow-lg leading-relaxed border border-slate-700">
                                                {curlCode}
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon-xs" 
                                                className="absolute right-3 top-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-all rounded-lg"
                                                onClick={() => onCopy(curlCode)}
                                            >
                                                <HugeiconsIcon icon={Copy01Icon} className="size-3.5" />
                                            </Button>
                                        </div>
                                    )}
                                    
                                    {activeTab === "fetch" && (
                                        <div className="relative animate-in fade-in duration-300">
                                            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[12px] font-mono whitespace-pre-wrap overflow-x-auto shadow-lg leading-relaxed border border-slate-700">
                                                {fetchCode}
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon-xs" 
                                                className="absolute right-3 top-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-all rounded-lg"
                                                onClick={() => onCopy(fetchCode)}
                                            >
                                                <HugeiconsIcon icon={Copy01Icon} className="size-3.5" />
                                            </Button>
                                        </div>
                                    )}

                                    {activeTab === "php" && (
                                        <div className="relative animate-in fade-in duration-300">
                                            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[12px] font-mono whitespace-pre-wrap overflow-x-auto shadow-lg leading-relaxed border border-slate-700">
                                                {phpCode}
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon-xs" 
                                                className="absolute right-3 top-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-all rounded-lg"
                                                onClick={() => onCopy(phpCode)}
                                            >
                                                <HugeiconsIcon icon={Copy01Icon} className="size-3.5" />
                                            </Button>
                                        </div>
                                    )}

                                    {activeTab === "response" && endpoint.response && (
                                        <div className="relative animate-in fade-in duration-300">
                                            <div className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 p-4 rounded-xl text-[12px] font-mono whitespace-pre-wrap overflow-x-auto border border-slate-200 dark:border-slate-800 shadow-inner italic">
                                                {endpoint.response}
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon-xs" 
                                                className="absolute right-3 top-3 text-slate-400 dark:text-slate-600 hover:text-primary transition-all rounded-lg"
                                                onClick={() => onCopy(endpoint.response || "")}
                                            >
                                                <HugeiconsIcon icon={Copy01Icon} className="size-3.5" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
