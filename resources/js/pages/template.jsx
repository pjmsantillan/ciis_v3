import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const breadcrumbs = [
    {
        title: 'TEMPLATE',
        href: '/template',
   
    }
];

export default function Dashboard() {
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template" />
            <div class="flex flex-col min-h-screen bg-gray-50">
             {/* Main Header  */}
               
                {/* Main Content Area */}
                 <div class="flex flex-1 overflow-hidden">
                    {/* Sidebar Navigation  */}
                    <aside class="w-64 bg-white border-r overflow-y-auto">
                    </aside>
                     <div class="flex-1 overflow-auto p-4 bg-white">
                        <CKEditor
                                editor={ClassicEditor}
                                data="<p>Hello from CKEditor!</p>"
                                onChange={(event, editor) => {
                                // const data = editor.getData();
                                // console.log(data);
                                }}
                                
                            />
                    </div>
                        


      
                </div>
                
            </div>
         
        </AppLayout>
    );
}
