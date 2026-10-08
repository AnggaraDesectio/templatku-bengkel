import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus } from 'lucide-react';
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

interface Sparepart {
    id: number;
    nama: string;
    kategori: string;
    stok: number;
    stok_teks: string;
    harga_rp: string;
    status: ToneLabel;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const stokStatus = (stok: number): ToneLabel =>
    stok <= 0
        ? { label: 'Stok Habis', tone: 'destructive' }
        : stok < 5
          ? { label: 'Perlu Restock', tone: 'warning' }
          : { label: 'Aman', tone: 'success' };

export default function BengkelSparepart({ spareparts }: { spareparts: Record<string, any>[] }) {
    const [rows, setRows] = useState<Sparepart[]>(
        spareparts.map((s) => ({
            id: Number(s.id),
            nama: String(s.nama),
            kategori: String(s.kategori),
            stok: Number(s.stok),
            stok_teks: String(s.stok_teks),
            harga_rp: String(s.harga_rp),
            status: s.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Sparepart | null>(null);
    const [nama, setNama] = useState('');
    const [kategori, setKategori] = useState('');
    const [stok, setStok] = useState('0');
    const [harga, setHarga] = useState('');

    const kategoris = Array.from(new Set(rows.map((r) => r.kategori)));

    const openAdd = () => {
        setEditing(null);
        setNama('');
        setKategori(kategoris[0] ?? '');
        setStok('0');
        setHarga('');
        setOpen(true);
    };

    const openEdit = (row: Sparepart) => {
        setEditing(row);
        setNama(row.nama);
        setKategori(row.kategori);
        setStok(String(row.stok));
        setHarga(row.harga_rp.replace(/[^0-9]/g, ''));
        setOpen(true);
    };

    const simpan = () => {
        const hargaNum = Number(harga.replace(/[^0-9]/g, ''));
        const stokNum = Math.max(0, Number(stok) || 0);
        if (!nama.trim() || !hargaNum) {
            toast.error('Lengkapi nama part dan harga.');
            return;
        }
        const payload = {
            nama: nama.trim(),
            kategori: kategori.trim() || 'Lainnya',
            stok: stokNum,
            stok_teks: `${stokNum} pcs`,
            harga_rp: rupiah(hargaNum),
            status: stokStatus(stokNum),
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Stok "${nama.trim()}" diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, ...payload }, ...rs]);
            toast.success(`"${nama.trim()}" masuk daftar sparepart.`);
        }
        setOpen(false);
    };

    // Penyesuaian stok cepat dari baris tabel: +1 / -1.
    const ubahStok = (row: Sparepart, deltaN: number) => {
        const stokNum = Math.max(0, row.stok + deltaN);
        setRows((rs) =>
            rs.map((r) =>
                r.id === row.id
                    ? { ...r, stok: stokNum, stok_teks: `${stokNum} pcs`, status: stokStatus(stokNum) }
                    : r,
            ),
        );
    };

    const columns: Column<Sparepart>[] = [
        { key: 'nama', header: 'Nama Part', sortValue: (r) => r.nama },
        { key: 'kategori', header: 'Kategori', sortValue: (r) => r.kategori },
        {
            key: 'stok',
            header: 'Stok',
            render: (r) => <span className="tnum font-medium">{r.stok_teks}</span>,
            sortValue: (r) => r.stok,
        },
        {
            key: 'harga_rp',
            header: 'Harga',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga_rp,
        },
        {
            key: 'status',
            header: 'Kondisi Stok',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Kondisi',
            options: [
                { value: 'Aman', label: 'Aman' },
                { value: 'Perlu Restock', label: 'Perlu Restock' },
                { value: 'Stok Menipis', label: 'Stok Menipis' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Sparepart"
                description="Gudang part: stok berkurang tiap dipakai di WO, tambah lewat tombol di baris."
                breadcrumbs={[{ label: 'Bengkel', href: '/bengkel' }, { label: 'Sparepart' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Part
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Stok Sparepart</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'kategori']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        extraRowActions={(row) => (
                            <div className="flex items-center gap-1">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    title="Kurangi stok"
                                    onClick={() => ubahStok(row, -1)}
                                >
                                    <Minus className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    title="Tambah stok"
                                    onClick={() => ubahStok(row, 1)}
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        )}
                        emptyTitle="Belum ada sparepart"
                        emptyDescription="Tambahkan part pertama lewat tombol Tambah Sparepart."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Sparepart' : 'Tambah Sparepart'}</DialogTitle>
                        <DialogDescription>
                            Catat part baru beserta stok awal dan harga jualnya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sp-nama">Nama part</Label>
                            <Input
                                id="sp-nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="cth. Kampas Rem Depan"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sp-kat">Kategori</Label>
                                <Select value={kategori} onValueChange={setKategori}>
                                    <SelectTrigger id="sp-kat">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kategoris.map((k) => (
                                            <SelectItem key={k} value={k}>
                                                {k}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sp-stok">Stok awal (pcs)</Label>
                                <Input
                                    id="sp-stok"
                                    inputMode="numeric"
                                    value={stok}
                                    onChange={(e) => setStok(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sp-harga">Harga jual (Rp)</Label>
                            <Input
                                id="sp-harga"
                                inputMode="numeric"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                placeholder="150000"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Tambah Part'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
