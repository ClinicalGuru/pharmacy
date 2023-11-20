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
        url: '/inventory',
        submenu: [
            {
                title: 'Add Invoice',
                url: '/addInvoice',
            },
            {
                title: 'Pharmacy inventory',
                url: 'web-dev',
            },
            {
                title: 'Add Manufacturer',
                url: 'seo',
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
        url: '/sales',
        submenu: [
            {
                title: 'Purchase report',
                url: 'web-design',
            },
            {
                title: 'Inventory report',
                url: 'web-dev',
            },
            {
                title: 'Sales report',
                url: 'web-design',
            },
            {
                title: 'Important report',
                url: 'web-dev',
            }
        ]
    }
];