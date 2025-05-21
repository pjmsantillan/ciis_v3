"use client"



export const columns = [
    {
        accessorKey: "title",// Uses the 'title' property from Payment objects
        header: ({ column }) => <div className="w-150">Name</div>,
        cell: ({ row }) => {
           
        },
        accessorKey: "status",// Uses the 'status' property from Payment objects
        header: () => <div>Status</div>,
        cell: ({ row }) => {
           
        },
        accessorKey: "actions",// Uses the 'actions' property from Payment objects
        header: () => <div>Actions</div>,
        cell: ({ row }) => {
           
        },
    },
]

