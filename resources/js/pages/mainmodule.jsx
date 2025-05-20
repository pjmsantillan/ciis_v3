import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Input } from "@/components/ui/input"
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const breadcrumbs = [
    {
        title: 'Main Module',
        href: '/mainModule',
    }
];



export default function Mainmodule() {
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Main Module" />
        
         
        </AppLayout>
    );
}
