import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Mekanik {
    id: number;
    nama: string;
    spesialisasi: string;
    pengalaman: string;
    telepon: string;
    wo_aktif: number;
    wo_selesai: number;
    total_wo: number;
}

export default function BengkelMekanik({ mekaniks }: { mekaniks: Record<string, any>[] }) {
    const rows: Mekanik[] = mekaniks.map((m) => ({
        id: Number(m.id),
        nama: String(m.nama),
        spesialisasi: String(m.spesialisasi),
        pengalaman: String(m.pengalaman),
        telepon: String(m.telepon),
        wo_aktif: Number(m.wo_aktif),
        wo_selesai: Number(m.wo_selesai),
        total_wo: Number(m.total_wo),
    }));

    const columns: Column<Mekanik>[] = [
        {
            key: 'nama',
            header: 'Mekanik',
            render: (r) => (
                <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {r.nama.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{r.nama}</span>
                </div>
            ),
            sortValue: (r) => r.nama,
        },
        { key: 'spesialisasi', header: 'Spesialisasi', sortValue: (r) => r.spesialisasi },
        { key: 'pengalaman', header: 'Pengalaman', mobileHidden: true, sortValue: (r) => r.pengalaman },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
        {
            key: 'wo_aktif',
            header: 'WO Aktif',
            render: (r) => <span className="tnum font-medium">{r.wo_aktif}</span>,
            sortValue: (r) => r.wo_aktif,
        },
        {
            key: 'wo_selesai',
            header: 'WO Selesai',
            render: (r) => <span className="tnum font-medium">{r.wo_selesai}</span>,
            sortValue: (r) => r.wo_selesai,
        },
        {
            key: 'total_wo',
            header: 'Total WO',
            render: (r) => <span className="tnum font-bold">{r.total_wo}</span>,
            sortValue: (r) => r.total_wo,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Mekanik"
                description="Daftar mekanik beserta spesialisasi dan work order yang ditangani."
                breadcrumbs={[{ label: 'Bengkel', href: '/bengkel' }, { label: 'Mekanik' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Mekanik</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'spesialisasi']}
                        pageSize={10}
                        emptyTitle="Belum ada mekanik"
                        emptyDescription="Data mekanik dikelola di menu Pengaturan > Tim."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
