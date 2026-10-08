import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, Hourglass, Wallet, Wrench } from 'lucide-react';

interface Ringkasan {
    wo_aktif: number;
    wo_antri: number;
    selesai_hari_ini: number;
    omzet_rp: string;
}

interface StokKritis {
    id: number;
    nama: string;
    stok_teks: string;
    status: ToneLabel;
}

export default function BengkelLaporan({
    ringkasan,
    perMekanik,
    distribusi,
    perBulan,
    beban,
    stokKritis,
}: {
    ringkasan: Ringkasan;
    perMekanik: ChartData;
    distribusi: ChartData;
    perBulan: ChartData;
    beban: ChartData;
    stokKritis: Record<string, any>[];
}) {
    const sparepartRows: StokKritis[] = stokKritis.map((s) => ({
        id: Number(s.id),
        nama: String(s.nama),
        stok_teks: String(s.stok_teks),
        status: s.status as ToneLabel,
    }));

    const columns: Column<StokKritis>[] = [
        { key: 'nama', header: 'Part', sortValue: (r) => r.nama },
        { key: 'stok_teks', header: 'Sisa Stok', sortValue: (r) => r.stok_teks },
        {
            key: 'status',
            header: 'Kondisi',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Analisis work order, omzet, dan beban kerja bengkel."
                breadcrumbs={[{ label: 'Bengkel', href: '/bengkel' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="WO Aktif" value={String(ringkasan.wo_aktif)} delta="antri & dikerjakan" trend="flat" icon={Wrench} hint="Work order yang belum selesai dikerjakan." />
                <StatCard label="Antri" value={String(ringkasan.wo_antri)} delta="menunggu mekanik" trend="flat" icon={Hourglass} hint="Kendaraan menunggu giliran servis." />
                <StatCard label="Selesai Hari Ini" value={String(ringkasan.selesai_hari_ini)} delta="kendaraan diserahkan" trend="up" icon={CircleCheck} hint="Servis yang selesai hari ini." />
                <StatCard label="Omzet" value={ringkasan.omzet_rp} delta="dari WO selesai" trend="up" icon={Wallet} hint="Pendapatan jasa + sparepart bulan berjalan." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Omzet per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">Omzet WO selesai dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={perBulan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Work Order per Mekanik</CardTitle>
                        <p className="text-muted-foreground text-sm">Jumlah WO yang ditangani tiap mekanik.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={perMekanik} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Distribusi Status WO</CardTitle>
                        <p className="text-muted-foreground text-sm">Proporsi status semua work order.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Estimasi Aktif per Mekanik</CardTitle>
                        <p className="text-muted-foreground text-sm">Nilai pekerjaan berjalan dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={beban} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={sparepartRows}
                    searchKeys={['nama']}
                    emptyTitle="Stok aman"
                    emptyDescription="Semua sparepart dalam kondisi stok aman."
                />
            </div>
        </AuthenticatedLayout>
    );
}
