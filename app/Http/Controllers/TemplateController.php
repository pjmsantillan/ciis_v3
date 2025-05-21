<?php

namespace App\Http\Controllers;

use App\Models\template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        //
        $templates = Template::latest()->get();
        return inertia('template',[
            'templates' => $templates
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
         return Inertia ::render('richtexteditor/richtexteditor');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' => 'required',
            'content' => 'required',
            
        ]);

        $template = Template::create($validated);
        return redirect()->route('templates.index')->with(['success' , 'template create successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(template $template)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(template $template)
    {
        return Inertia::render('richtexteditor/richtexteditoredit', [
            'template' => $template
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, template $template)
    {
        
        $validated = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'status' => 'required'
        ]);
        $template->update($validated);
        return redirect()->route('templates.index')->with(['success' , ' Updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(template $template)
    {
        //
        $template->delete();
        
        return redirect()->route('templates.index')->with(['success' , 'Deleted successfully']);
    }
}
