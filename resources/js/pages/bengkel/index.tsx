import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, Hourglass, Wallet, Wrench, ClipboardPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface WorkOrder {
    id: number;
    no_wo: string;
    kendaraan: string;
    keluhan: string;
    mekanik: string;
    tanggal: string;
    status: ToneLabel;
}

interface Ringkasan {
    wo_aktif: number;
    wo_antri: number;
    selesai_hari_ini: number;
    omzet_rp: string;
}

export default function BengkelIndex({
    ringkasan,
    chart,
    workorders,
}: {
    ringkasan: Ringkasan;
    chart: ChartData;
    workorders: Record<string, any>[];
}) {
    const rows: WorkOrder[] = workorders.map((w) => ({
        id: Number(w.id),
        no_wo: String(w.no_wo),
        kendaraan: String(w.kendaraan),
        keluhan: String(w.keluhan),
        mekanik: String(w.mekanik),
        tanggal: String(w.tanggal),
        status: w.status as ToneLabel,
    }));

    const columns: Column<WorkOrder>[] = [
        { key: 'no_wo', header: 'No WO', sortValue: (r) => r.no_wo },
        { key: 'kendaraan', header: 'Kendaraan', sortValue: (r) => r.kendaraan },
        { key: 'keluhan', header: 'Keluhan', mobileHidden: true, sortValue: (r) => r.keluhan },
        { key: 'mekanik', header: 'Mekanik', sortValue: (r) => r.mekanik },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Dashboard"
                description="Ringkasan operasional bengkel BENGKELKU hari ini."
                breadcrumbs={[{ label: 'Bengkel' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/bengkel/workorder">
                            <ClipboardPlus className="mr-2 h-4 w-4" /> WO Baru
                        </Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="WO Aktif"
                    value={String(ringkasan.wo_aktif)}
                    delta="antri & dikerjakan"
                    trend="flat"
                    icon={Wrench}
                    hint="Work order yang masih terbuka di bengkel."
                />
                <StatCard
                    label="Antri"
                    value={String(ringkasan.wo_antri)}
                    delta="menunggu mekanik"
                    trend="flat"
                    icon={Hourglass}
                    hint="Kendaraan menunggu giliran dikerjakan."
                />
                <StatCard
                    label="Selesai Hari Ini"
                    value={String(ringkasan.selesai_hari_ini)}
                    delta="kendaraan diserahkan"
                    trend="up"
                    icon={CircleCheck}
                    hint="Servis selesai dan kendaraan sudah diambil pemilik."
                />
                <StatCard
                    label="Omzet"
                    value={ringkasan.omzet_rp}
                    delta="dari WO selesai"
                    trend="up"
                    icon={Wallet}
                    hint="Pendapatan dari work order yang selesai dibayar."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Work Order per Mekanik</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Beban kerja tiap mekanik periode ini.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={chart} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Perlu Perhatian</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            WO yang masih antri atau dikerjakan.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {rows
                            .filter((w) => ['Antri', 'Dikerjakan'].includes(w.status.label))
                            .map((w) => (
                                <div key={w.id} className="flex items-start gap-3">
                                    <span className="bg-primary/10 text-primary shrink-0 rounded-lg px-2 py-1 text-xs font-bold">
                                        {w.no_wo}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">{w.keluhan}</p>
                                        <p className="text-muted-foreground truncate text-xs">
                                            {w.kendaraan} · {w.mekanik}
                                        </p>
                                    </div>
                                    <ToneBadge label={w.status.label} tone={w.status.tone} />
                                </div>
                            ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['no_wo', 'kendaraan', 'keluhan', 'mekanik']}
                    emptyTitle="Belum ada work order"
                    emptyDescription="Work order akan tampil di sini setelah dibuat."
                />
            </div>
        </AuthenticatedLayout>
    );
}
