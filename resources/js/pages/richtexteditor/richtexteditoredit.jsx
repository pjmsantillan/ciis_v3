import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const breadcrumbs = [
    {
        title: 'Template Management',
        href: '/richtexteditor',
    }
];



export default function RichTextEditorEdit({template}) {
// console.log(template)
    const [isEditing, setIsEditing] = useState(false);
    const {data, setData, put, processing, errors} = useForm({
        title:template?.title,
        content:template?.content,
    });

    const handleEditorChange = (event, editor) =>{
        setData('content',editor.getData());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/templates/${template.id}`);
    }

    const handleButtonClick = (e) =>{
        e.preventDefault();
        if (isEditing){
            handleSubmit(e) //Submit form if in edit mode
        }else{
            setIsEditing(true); //Enable Edit mode
        }
    }

    // const toggleEdit = () => {
    //     setIsEditing(!isEditing);
    // }
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
                        onChange={(e)=>setData ('title',e.target.value)}
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
                            <Button variant="outline"className='border-2 border-[#1B4298]'>
                                Back
                            </Button>
                            {isEditing && (
                            <Button 
                                type="button"
                                variant="outline" 
                                className='border-2 border-[#1B4298]'
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                            )}
                            <Button className='bg-[#1B4298] hover:bg-[#F26531]' 
                            type= {isEditing ? 'submit' : 'button'}
                            onClick={handleButtonClick}
                            disabled={processing}>
                                {isEditing ? 'Save Changes' : 'Edit'}
                            </Button>
                        </div>
                </form>
            </div>
        </AppLayout>
    );
}
