export const menuItems = [
    {
        title: 'Purchase',
        url: '',
        id: 'purchages',
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
            //     title: 'Purchase Payments',
            //     url: 'purchase/payments',
            // },
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
        id: 'inventory',
        url: '',
        submenu: [
            {
                title: "Add Invoice",
                url: "inventory/invoice",
            },
            {
                title: "Pharmacy inventory",
                url: "inventory/pharmacyInventory",
            },
            // {
            //     title: "Add Manufacturer",
            //     url: "inventory/addManufacturer",
            // }
        ]
    },
    {
        title: 'Sales',
        url: '/sales',
        id: 'sales',
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
        id: 'reports',
        submenu: [
            {
                title: 'Purchase report',
                url: 'reports/purchase',
                submenu: [
                    {
                        title: 'Purchase Requisition List',
                        url: 'reports/purchase/requisitionList',
                    },
                    {
                        title: 'Purchase Quotation List',
                        url: 'reports/purchase/quotationList',
                    },
                    {
                        title: 'Purchase Order List',
                        url: 'reports/purchase/orderList',
                    },
                    {
                        title: 'Purchase Return List',
                        url: 'reports/purchase/returnList',
                    },
                    {
                        title: 'Purchase Payments List',
                        url: 'reports/purchase/paymentsList',
                    },
                    
                    {
                        title: 'Invoice List',
                        url: 'reports/purchase/invoiceList',
                    },
                ],
            },
            {
                title: 'Inventory report',
                url: 'reports/inventory',
                // submenu: [
                //     {
                //         title: ' Vendor List',
                //         url: 'reports/purchase/vendorList',
                //     },
                // ]
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