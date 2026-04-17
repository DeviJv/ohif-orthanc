import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { SatuSehatService } from "@/lib/services/satusehat"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const ssConfig = await SatuSehatService.getConfig();
    const env = ssConfig?.environment || "unknown";

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="flex items-center gap-2">
                                        Hospital PACS Dashboard
                                        {ssConfig && (
                                            <Badge 
                                                variant={env === 'production' ? 'default' : 'secondary'}
                                                className={env === 'production' 
                                                    ? "bg-orange-600 hover:bg-orange-600 text-[10px] h-5 px-1.5" 
                                                    : "bg-blue-600 hover:bg-blue-600 text-white text-[10px] h-5 px-1.5"}
                                            >
                                                {env.toUpperCase()}
                                            </Badge>
                                        )}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
