import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Kendaraan {
    id: number;
    plat: string;
    merk: string;
    tipe: string;
    tahun: number;
    pemilik: string;
    telepon: string;
    jumlah_servis: number;
    servis_terakhir: string;
}

export default function BengkelKendaraan({ kendaraans }: { kendaraans: Record<string, any>[] }) {
    const rows: Kendaraan[] = kendaraans.map((k) => ({
        id: Number(k.id),
        plat: String(k.plat),
        merk: String(k.merk),
        tipe: String(k.tipe),
        tahun: Number(k.tahun),
        pemilik: String(k.pemilik),
        telepon: String(k.telepon),
        jumlah_servis: Number(k.jumlah_servis),
        servis_terakhir: String(k.servis_terakhir),
    }));

    const columns: Column<Kendaraan>[] = [
        {
            key: 'plat',
            header: 'Plat Nomor',
            render: (r) => <span className="font-mono font-semibold">{r.plat}</span>,
            sortValue: (r) => r.plat,
        },
        { key: 'merk', header: 'Merk', sortValue: (r) => r.merk },
        { key: 'tipe', header: 'Tipe', sortValue: (r) => r.tipe },
        { key: 'tahun', header: 'Tahun', mobileHidden: true, sortValue: (r) => r.tahun },
        { key: 'pemilik', header: 'Pemilik', sortValue: (r) => r.pemilik },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
        {
            key: 'jumlah_servis',
            header: 'Riwayat Servis',
            render: (r) => <span className="tnum font-medium">{r.jumlah_servis}x</span>,
            sortValue: (r) => r.jumlah_servis,
        },
        { key: 'servis_terakhir', header: 'Servis Terakhir', mobileHidden: true, sortValue: (r) => r.servis_terakhir },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kendaraan"
                description="Data kendaraan pelanggan beserta riwayat servis di bengkel."
                breadcrumbs={[{ label: 'Bengkel', href: '/bengkel' }, { label: 'Kendaraan' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Kendaraan</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['plat', 'merk', 'tipe', 'pemilik']}
                        pageSize={10}
                        emptyTitle="Belum ada kendaraan"
                        emptyDescription="Kendaraan tercatat otomatis setiap ada work order baru."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
