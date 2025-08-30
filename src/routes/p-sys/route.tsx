import { Message, Topbar } from '@/components';
import { Toast } from '@/components/Toast';
import { Sidebar } from '@/features/psys-randing/components';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import * as v from 'valibot';

const psysSearchSchema = v.object({
    fgcode: v.optional(v.string()),
});

export const Route = createFileRoute('/p-sys')({
    validateSearch: (search: Record<string, unknown>) => {
        return v.parse(psysSearchSchema, search);
    },
    component: () => {
        const pathname = useLocation({
            select: (location) => location.pathname,
        });
        const exceptPathName = pathname.replace('/p-sys/', '');

        // Sidebar を表示するパス一覧
        const sidebarVisiblePaths = ['item-assignment', 'pips'];

        // pipGenerationMode を取得
        const pipGenerationMode = usePipGenerationModeStore(
            (state) => state.pipGenerationMode
        );

        // Sidebar 表示判定: パスが対象かつモードが 'display' のときのみ表示
        const showSidebar =
            sidebarVisiblePaths.includes(exceptPathName) &&
            pipGenerationMode === 'display';

        return (
            <div className="flex flex-col h-screen">
                <div className="sticky top-0 z-50 shadow-sm">
                    <Topbar path="/p-sys/item-assignment" />
                    <Message />
                </div>
                <div className="flex flex-1">
                    {showSidebar && <Sidebar />}
                    <main className="flex-1 overflow-auto">
                        <Outlet />
                        <Toast />
                    </main>
                    <Toaster />
                </div>
            </div>
        );
    },
});

