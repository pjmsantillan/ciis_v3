import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Info } from 'lucide-react';
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
const breadcrumbs = [
    {
        title: 'Template Management',
        href: '/richtexteditor',
    }
];



export default function RichTextEditor() {

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: ''
    });

    const handleEditorChange = (event, editor) => {
        setData('content', editor.getData());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    }

    const confirmSubmit = () => {
        setShowConfirmDialog(false)
        post('/templates');
    }

    const cancelSubmit = () => {
        setShowConfirmDialog(false);
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template Management" />

            <div className="flex-1 overflow-auto p-4 ">
                <form onSubmit={handleSubmit}>
                    <div className="p-2 ">
                        <Label>Template Name:</Label>
                        <Input
                            type="text"
                            placeholder="Template Name"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        <br />
                        <Label>Template:</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.content}
                            onChange={handleEditorChange}
                        />
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>
                    <div className="flex justify-center p-2 gap-2" >
                        <Button variant="outline" className='border-2 border-[#1B4298]'>
                            <Link href="/templates" >
                                Cancel
                            </Link>
                        </Button>
                        <Button className='bg-[#1B4298] hover:bg-[#F26531]'
                            disabled={processing}>
                            Submit
                        </Button>
                    </div>
                </form>
                {/* Confirmation Show dialog */}
                <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader className="!text-center">
                            <div className="flex justify-center">
                                <Info color="#1B4298" size={80} />
                            </div>
                            <AlertDialogTitle className="!text-2xl">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Do you want to save?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="!justify-center mt-4">
                            <AlertDialogCancel
                                variant="outline"
                                onClick={cancelSubmit}
                                className="border-2 border-[#1B4298]">
                                Oh No! Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={confirmSubmit}
                                className="bg-[#1B4298] hover:bg-[#F26531]">
                                Yes,Submit it! Master
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </AppLayout>
    );
}
