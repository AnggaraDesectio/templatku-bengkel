import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface WorkOrder {
    id: number;
    no_wo: string;
    kendaraan: string;
    pemilik: string;
    keluhan: string;
    mekanik: string;
    estimasi_rp: string;
    status: ToneLabel;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const statusTone = (s: string): ToneLabel['tone'] =>
    s === 'Selesai' ? 'success' : s === 'Batal' ? 'destructive' : s === 'Dikerjakan' ? 'info' : 'warning';

const STATUS = ['Antri', 'Dikerjakan', 'Selesai', 'Batal'];

export default function BengkelWorkorder({ workorders }: { workorders: Record<string, any>[] }) {
    const [rows, setRows] = useState<WorkOrder[]>(
        workorders.map((w) => ({
            id: Number(w.id),
            no_wo: String(w.no_wo),
            kendaraan: String(w.kendaraan),
            pemilik: String(w.pemilik),
            keluhan: String(w.keluhan),
            mekanik: String(w.mekanik),
            estimasi_rp: String(w.estimasi_rp),
            status: w.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<WorkOrder | null>(null);
    const [kendaraan, setKendaraan] = useState('');
    const [pemilik, setPemilik] = useState('');
    const [keluhan, setKeluhan] = useState('');
    const [mekanik, setMekanik] = useState('');
    const [estimasi, setEstimasi] = useState('');
    const [status, setStatus] = useState('Antri');

    const openAdd = () => {
        setEditing(null);
        setKendaraan('');
        setPemilik('');
        setKeluhan('');
        setMekanik('');
        setEstimasi('');
        setStatus('Antri');
        setOpen(true);
    };

    const openEdit = (row: WorkOrder) => {
        setEditing(row);
        setKendaraan(row.kendaraan);
        setPemilik(row.pemilik);
        setKeluhan(row.keluhan);
        setMekanik(row.mekanik);
        setEstimasi(row.estimasi_rp.replace(/[^0-9]/g, ''));
        setStatus(row.status.label);
        setOpen(true);
    };

    const simpan = () => {
        const estimasiNum = Number(estimasi.replace(/[^0-9]/g, ''));
        if (!kendaraan.trim() || !keluhan.trim()) {
            toast.error('Lengkapi kendaraan dan keluhannya.');
            return;
        }
        const payload = {
            kendaraan: kendaraan.trim(),
            pemilik: pemilik.trim() || '-',
            keluhan: keluhan.trim(),
            mekanik: mekanik.trim() || 'Belum ditugaskan',
            estimasi_rp: estimasiNum ? rupiah(estimasiNum) : 'Rp 0',
            status: { label: status, tone: statusTone(status) } as ToneLabel,
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`${editing.no_wo} diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            const no_wo = `WO-${String(id).padStart(4, '0')}`;
            setRows((rs) => [{ id, no_wo, ...payload }, ...rs]);
            toast.success(`${no_wo} dibuat, ${kendaraan.trim()} masuk antrian.`);
        }
        setOpen(false);
    };

    const columns: Column<WorkOrder>[] = [
        { key: 'no_wo', header: 'No WO', sortValue: (r) => r.no_wo },
        { key: 'kendaraan', header: 'Kendaraan', sortValue: (r) => r.kendaraan },
        { key: 'pemilik', header: 'Pemilik', mobileHidden: true, sortValue: (r) => r.pemilik },
        { key: 'keluhan', header: 'Keluhan', sortValue: (r) => r.keluhan },
        { key: 'mekanik', header: 'Mekanik', sortValue: (r) => r.mekanik },
        {
            key: 'estimasi_rp',
            header: 'Estimasi',
            render: (r) => <span className="tnum font-medium">{r.estimasi_rp}</span>,
            sortValue: (r) => r.estimasi_rp,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Antri', label: 'Antri' },
                { value: 'Dikerjakan', label: 'Dikerjakan' },
                { value: 'Selesai', label: 'Selesai' },
                { value: 'Batal', label: 'Batal' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Work Order"
                description="Catat tiap kendaraan masuk, keluhan, mekanik, dan estimasi biaya."
                breadcrumbs={[{ label: 'Bengkel', href: '/bengkel' }, { label: 'Work Order' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah WO
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Work Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['no_wo', 'kendaraan', 'keluhan', 'mekanik']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada work order"
                        emptyDescription="Buat WO pertama lewat tombol Tambah WO, kendaraan langsung masuk antrian."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Work Order' : 'Work Order Baru'}</DialogTitle>
                        <DialogDescription>
                            Catat kendaraan masuk beserta keluhan dan estimasi biayanya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="wo-kend">Kendaraan</Label>
                            <Input
                                id="wo-kend"
                                value={kendaraan}
                                onChange={(e) => setKendaraan(e.target.value)}
                                placeholder="cth. Avanza B 1234 CD"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="wo-pemilik">Pemilik</Label>
                            <Input
                                id="wo-pemilik"
                                value={pemilik}
                                onChange={(e) => setPemilik(e.target.value)}
                                placeholder="Nama pemilik"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="wo-keluhan">Keluhan</Label>
                            <Input
                                id="wo-keluhan"
                                value={keluhan}
                                onChange={(e) => setKeluhan(e.target.value)}
                                placeholder="cth. Rem bunyi saat diinjak"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="wo-mek">Mekanik</Label>
                            <Input
                                id="wo-mek"
                                value={mekanik}
                                onChange={(e) => setMekanik(e.target.value)}
                                placeholder="Nama mekanik"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="wo-est">Estimasi biaya (Rp)</Label>
                            <Input
                                id="wo-est"
                                inputMode="numeric"
                                value={estimasi}
                                onChange={(e) => setEstimasi(e.target.value)}
                                placeholder="350000"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="wo-status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="wo-status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS.map((st) => (
                                        <SelectItem key={st} value={st}>
                                            {st}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Buat WO'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
