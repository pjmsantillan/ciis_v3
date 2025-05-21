import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Template Management',
        href: '/templates',
    }
];



export default function Template({templates}) {
// Delete Function
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [deleteTemplateId, setDeleteTemplateId] = useState(null);

const handleDelete = (id) => {
    setDeleteDialogOpen(true);
    setDeleteTemplateId(id);
}

const handleConfirmDelete =()=>{
    router.delete(`/templates/${deleteTemplateId}`);
    setDeleteDialogOpen(false);
}
// -------------------------------
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template Management" />
            <div className="flex flex-col min-h-screen ">
                {/* Main Header  */}
                {/* Main Content Area */}
                <div className="flex  justify-between">
                    <div className="p-4 w-90">
                        <Input type="text" placeholder="Search Template" />
                    </div>
                    <div className="p-4   ">
                        <Button className='bg-[#1B4298] hover:bg-[#F26531]'>
                            <Link href={route('templates.create')} >
                            Add New Template
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="p-4 ">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-150">Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {templates.map((template) => (
                        <TableRow key={template.id}>
                            <TableCell className="w-150">{template.title}</TableCell>
                            <TableCell>{template.status}</TableCell>
                            <TableCell>
                            <div className="flex flex-row justify-end">
                                <Button variant="ghost">
                                    <Link href={`/templates/${template.id}/edit`}>
                                    <SquarePen/> 
                                    </Link>
                                </Button>
                                <Button variant="ghost" onClick={() => handleDelete(template.id)}>
                                    <Trash2/>
                                </Button>
                            </div>
                            
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your contact and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </AppLayout>
    );
}
