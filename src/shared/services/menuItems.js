export const menuItems = [
    {
        title: 'Purchase',
        url: '',
        submenu: [
            {
                title: 'Purchase Requisition',
                url: 'purchase/requisition',
            },
            {
                title: 'Quotation',
                url: 'purchase/quotation',
            },
            {
                title: 'MasterList',
                url: 'purchase/masterList',
            },
            {
                title: 'Purchase Order',
                url: 'purchase/order',
            },
            {
                title: 'Purchase Payments',
                url: 'purchase/payments',
            },
            // {
            //     title: 'Backend',
            //     submenu: [
            //         {
            //             title: 'NodeJS',
            //             url: 'node',
            //         },
            //         {
            //             title: 'PHP',
            //             url: 'php',
            //         },
            //     ],
            // },
        ]
    },
    {
        title: 'Inventory',
        url: '',
        submenu: [
            {
                title: 'Add Invoice',
                url: 'inventory/addInvoice',
            },
            {
                title: 'Pharmacy inventory',
                url: 'inventory/pharmacyInventory',
            },
            {
                title: 'Add Manufacturer',
                url: 'inventory/addManufacturer',
            }
        ]
    },
    {
        title: 'Sales',
        url: '/sales',
        submenu: [
            {
                title: 'Billing',
                url: 'sales/billing',
            },
            {
                title: 'List of all Bills',
                url: 'sales/allBills',
            }
        ]
    },
    {
        title: 'Reports',
        url: '',
        submenu: [
            {
                title: 'Purchase report',
                url: 'reports/purchase',
            },
            {
                title: 'Inventory report',
                url: 'reports/inventory',
            },
            {
                title: 'Sales report',
                url: 'reports/sales',
            },
            {
                title: 'Important report',
                url: 'reports/important',
            }
        ]
    }
];