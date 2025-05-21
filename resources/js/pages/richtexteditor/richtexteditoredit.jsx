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
import { Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const breadcrumbs = [
    {
        title: 'Template Management',
        href: '/richtexteditor',
    }
];



export default function RichTextEditorEdit({ template }) {

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        title: template?.title,
        content: template?.content,
        status: template?.status 
    });

    const handleEditorChange = (event, editor) => {
        setData('content', editor.getData());
    };

    const handleStatusChange = (value) => {
        setData('status', value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (isEditing) {
            handleSubmit(e) //Submit form if in edit mode
        } else {
            setIsEditing(true); //Enable Edit mode
        }
    }
    const confirmSubmit = () => {
        setShowConfirmDialog(false)
        put(`/templates/${template.id}`);
    }

    const cancelSubmit = () => {
        setShowConfirmDialog(false);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template Management" />

            <div className="flex-1 overflow-auto p-4 ">
                <form onSubmit={handleSubmit}>
                    <RadioGroup
                        value={data.status}
                        onValueChange={handleStatusChange}
                        className="grid-cols-2 gap-4 mb-4"
                        disabled={!isEditing} >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Active" id="r1" />
                            <Label htmlFor="r1">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Inactive" id="r2" />
                            <Label htmlFor="r2">Inactive</Label>
                        </div>
                    </RadioGroup>
                    <div className="p-2 ">
                        <Label>Template Name:</Label>
                        <Input
                            type="text"
                            placeholder="Template Name"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={!isEditing}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        <br />
                        <Label>Template:</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={data.content}
                            onChange={handleEditorChange}
                            config={{
                                readOnly: !isEditing
                            }}
                            disabled={!isEditing}
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
                            type={isEditing ? 'submit' : 'button'}
                            onClick={handleButtonClick}
                            disabled={processing}>
                            {isEditing ? 'Save Changes' : 'Edit'}
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
