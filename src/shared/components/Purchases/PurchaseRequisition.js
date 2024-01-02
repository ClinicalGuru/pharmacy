import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../Constants/index";

import { Box } from "@mui/material";
import { Form } from "../Forms/index";
import Table from '@mui/material/Table';

// export const PurchaseRequisition = () => {
//     const PharmacologicalNamesList = [
//         { name: 'dolo' },
//         { name: 'paracetomol' }
//     ];
//     const [showNewVendorModal, setNewVendorModal] = useState(false);
//     const [rows, updateRows] = useState([]);
//     const [vendorName, setVendorName] = useState('');
//     const [requisitionId, setRequisitionId] = useState('');
//     const BrandNamesList = [];
//     const [tableData, setTableData] = useState([]);
//     const [allVendors, setAllVendors] = useState([]);
//     const [open, setLoader] = useState(false);
//     const {
//         register: vendorDetails,
//         handleSubmit: handleVendorDetails,
//         watch,
//         formState: { errors }
//     } = useForm();

//     const {
//         register: requistionDetails,
//         handleSubmit: handleRiquistionDetails,
//         setValue,
//         reset,
//         formState: { errors: requisitionErrors }
//     } = useForm();

//     useEffect(() => {
//         getVendors();
//         getRequestionList();
//     }, []);

//     const getRequestionList = async () => {
//         setLoader(true);
//         try {
//             let data = await PurchaseService.getRequestionData()
//             setTableData(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
//         } catch (e) {
//             console.log(e, "=> get requestion list")
//         }
//     }

//     const getVendors = async () => {
//         setLoader(true);
//         try {
//             let data = await PurchaseService.getAllVendors();
//             setAllVendors(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
//             setLoader(false);
//             console.log(allVendors, 'allVendors');
//         } catch (e) {
//             setLoader(false);
//             console.log(e, 'error allVendors')
//         }
//     }

//     const resetForm = () => {
//         reset();
//     }

//     const handleChange = (event) => {
//         setVendorName(event.target.value);
//         setRequisitionId(uuidv4());
//     };

//     const onSubmit = (data) => console.log(watch);

//     useEffect(() => {
//         console.log(tableData);
//     }, [tableData]);
//     const onSubmitRequestionDetails = async (data) => {
//         setTableData(prevData => [...prevData, data]);
//         reset();
//     }

//     const addNewVendorHandler = () => {
//         setNewVendorModal(!showNewVendorModal);
//         if (showNewVendorModal) getVendors();
//     }

//     const savingRequisitionData = async () => {
//         setLoader(true);
//         tableData.forEach(e => {
//             e['vendorName'] = setVendorName;
//             e['requisitionId'] = setRequisitionId;
//         });
//         try {
//             await PurchaseService.addRequisitionData(tableData);
//             setLoader(false);
//         } catch (e) {
//             setLoader(false);
//             console.log(e, "=> add requestion error");
//         }
//     }

//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//         ...theme.typography.body2,
//         padding: theme.spacing(1),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     }));

//     const editHandler = (data) => {
//         // setValue({quantity: 10});
//         Object.entries(data).forEach(([fieldName, value]) => {
//         console.log(fieldName, value)
//         setValue(fieldName, value);
//           });
//     }

//     return (
//         <Container>
//             <Box sx={{
//                 padding: 2,
//             }}>
//                 <form onSubmit={handleVendorDetails(onSubmit)}>
//                     <Box sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                     }}>
//                         <Box sx={{
//                             display: 'flex',
//                         }}>
//                             <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
//                                 <InputLabel id="demo-select-small-label">{FORM_LABELS.VENDOR_NAME}</InputLabel>
//                                 <Select
//                                     size="small"
//                                     labelId="demo-select-small-label"
//                                     id="demo-select-small"
//                                     value={vendorName}
//                                     label="Vendor Name"
//                                     onChange={handleChange}
//                                 >
//                                     {allVendors && allVendors?.map((vendor) => <MenuItem value={vendor?.id}>
//                                         {vendor?.vendorName}
//                                     </MenuItem>)}
//                                 </Select>
//                             </FormControl>
//                             <Box sx={{
//                                 marginLeft: "2rem"
//                             }}>
//                                 <LocalizationProvider dateAdapter={AdapterDayjs} >
//                                     <DemoContainer components={['DatePicker']}>
//                                         <DatePicker
//                                             size="small"
//                                             sx={{
//                                                 '& .MuiFormLabel-root': {
//                                                     top: -6
//                                                 },
//                                                 '& .MuiOutlinedInput-input': {
//                                                     padding: '8.5px 14px'
//                                                 }
//                                             }}
//                                             label="Order Date" />
//                                     </DemoContainer>
//                                 </LocalizationProvider>
//                             </Box>
//                         </Box>
//                         <Box>
//                             <Button variant="contained" onClick={addNewVendorHandler}> + Add New Vendor</Button>
//                         </Box>
//                     </Box>
//                 </form>
//             </Box >
//             <Box sx={{
//                 backgroundColor: '#eef0f3',
//                 borderRadius: '4px',
//                 padding: 2,
//                 marginTop: 4
//             }}>
//                 <form onSubmit={handleRiquistionDetails(onSubmitRequestionDetails)} onReset={resetForm}>
//                     <Box sx={{ flexGrow: 1,
//                     alignItems: 'center'}}>
//                         <Grid container spacing={2}>
//                             <Grid item sm={2}>
//                                 <Autocomplete
//                                     freeSolo
//                                     id="free-solo-2-demo"
//                                     size='small'
//                                     sx={{ width: 240, backgroundColor: '#FFFFFFFF' }}
//                                     options={PharmacologicalNamesList.map((option) => option.name)}
//                                     renderInput={(params) => (
//                                         <TextField
//                                             error={requisitionErrors.pharmacologicalName?.type === "required"}
//                                             {...requistionDetails("pharmacologicalName", { required: true })}
//                                             {...params}
//                                             label={FORM_LABELS.PHARMACOLOGICAL_NAME}
//                                             InputProps={{
//                                                 ...params.InputProps,
//                                                 type: 'search',
//                                             }}
//                                         />
//                                     )}
//                                 />
//                             </Grid>
//                             <Grid item sm={2}>
//                                 <Autocomplete
//                                     freeSolo
//                                     id="free-solo-2-demo"
//                                     size='small'
//                                     sx={{ width: 240, backgroundColor: '#FFFFFFFF' }}
//                                     options={BrandNamesList.map((option) => option.name)}
//                                     renderInput={(params) => (
//                                         <TextField
//                                             {...params}
//                                             error={requisitionErrors.brandName?.type === "required"}
//                                             {...requistionDetails("brandName", { required: true })}
//                                             label={FORM_LABELS.BRAND_NAME}
//                                             InputProps={{
//                                                 ...params.InputProps,
//                                                 type: 'search',
//                                             }}
//                                         />
//                                     )}
//                                 />
//                             </Grid>
//                             <Grid item sm={2}>
//                                 <TextField error={requisitionErrors.dose?.type === "required"} id="outlined-basic"
//                                     {...requistionDetails("dose", { required: true })} label={FORM_LABELS.DOSE} variant="outlined" size="small"
//                                     sx={{ backgroundColor: '#FFFFFFFF' }} />
//                             </Grid>
//                             <Grid item sm={2}>
//                                 <TextField error={requisitionErrors.form?.type === "required"} id="outlined-basic"
//                                     {...requistionDetails("form", { required: true })} label={FORM_LABELS.FORM} variant="outlined" size="small"
//                                     sx={{ backgroundColor: '#FFFFFFFF' }} />
//                             </Grid>
//                             <Grid item sm={2}>
//                                 <TextField type='number' error={requisitionErrors.quantity?.type === "required"} id="outlined-basic"
//                                     {...requistionDetails("quantity", { required: true })} label={FORM_LABELS.QUANTITY} variant="outlined" size="small"
//                                     sx={{ backgroundColor: '#FFFFFFFF' }} />
//                             </Grid>
//                             <Grid item sm={2}>
//                                 <Box sx={{ display: 'flex' }}>
//                                     <input type="submit" value={`+ Add`} />
//                                     <input type="reset" value={`Clear`} />
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </form>
//             </Box >
//             <Box sx={{ marginTop: 3 }}>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                         <TableHead>
//                             <TableRow>
//                                 <StyledTableCell>S No</StyledTableCell>
//                                 <StyledTableCell align="center">Drug Details / Brand Name</StyledTableCell>
//                                 <StyledTableCell align="center">Dose</StyledTableCell>
//                                 <StyledTableCell align="center">Form</StyledTableCell>
//                                 <StyledTableCell align="center">Qty / Strips</StyledTableCell>
//                                 <StyledTableCell align="center">Action</StyledTableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tableData?.map((data, index) => (
//                                 <StyledTableRow key={data.index}>
//                                     <StyledTableCell>
//                                         {index + 1}
//                                     </StyledTableCell>
//                                     <StyledTableCell align="center">{data.pharmacologicalName} / {data.brandName}</StyledTableCell>
//                                     <StyledTableCell align="center">{data.dose}</StyledTableCell>
//                                     <StyledTableCell align="center">{data.form}</StyledTableCell>
//                                     <StyledTableCell align="center">{data.quantity}</StyledTableCell>
//                                     <StyledTableCell>
//                                         <Box sx={{
//                                             display: 'flex',
//                                             justifyContent: 'center'
//                                         }}>
//                                             <img onClick={() => editHandler(data)} className='icon_table' src={editIcon} alt='edit' />
//                                             <img className='icon_table' src={deleteIcon} alt='delete' />
//                                         </Box>
//                                     </StyledTableCell>
//                                 </StyledTableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//             <Box sx={{
//                 marginTop: '15px',
//                 display: 'flex',
//                 justifyContent: 'flex-end'
//             }}>
//                 <input type="submit" value={`Save`} onClick={savingRequisitionData} />
//                 <input type="submit" value={`Print`} />
//                 <input type="submit" value={'Email'} />
//             </Box>
//             <AddVendor showModal={showNewVendorModal} action={addNewVendorHandler} />
//             <Loader open={open} />
//         </Container>
//     )
// }

export const PurchaseRequisition = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const vendor_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {

                title: 'Vendor Name',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        option: "None"
                    }
                ],
                validationProps: {
                    required: "Vendor name is required"
                },
                style: {
                    width: "194px"
                }
            },
            {
                title: 'Date',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "194px"
                }
            },
            
        ],
    };
    const medicine_details_template = {
        title: '',
        submitButttonText: '+ Add',
        clearFormBtnText: "Clear",
        formStyles: {
            backgroundColor: "#FFFFFF",
        },
        isBlockLevelBtns: false,
        fields: [
            {
                title: FORM_LABELS.PHARMACOLOGICAL_NAME,
                type: 'select',
                name: FORM_LABELS.PHARMACOLOGICAL_NAME,
                validationProps: {
                    required: `${FORM_LABELS.PHARMACOLOGICAL_NAME} is required`
                },
                options: [

                ],
                style: {
                    width: "200px"
                }
            },
            {

                title: FORM_LABELS.MEDICINE_NAME,
                type: 'select',
                name: FORM_LABELS.MEDICINE_NAME,
                options: [

                ],
                style: {
                    width: "200px"
                }
            },
            {
                title: FORM_LABELS.DOSE,
                type: 'text',
                name: FORM_LABELS.DOSE,
                validationProps: {
                    required: ` ${FORM_LABELS.DOSE} is required`
                },
            },
            {
                title: FORM_LABELS.FORM,
                type: 'text',
                name: FORM_LABELS.FORM,
                validationProps: {
                    required: `${FORM_LABELS.FORM} is required`
                },
            },
            {
                title: FORM_LABELS.QUANTITY,
                type: 'number',
                name: FORM_LABELS.QUANTITY,
                validationProps: {
                    required: `${FORM_LABELS.QUANTITY} is required`
                },
            },
        ],
        btns: [
            {
                btn_text: "+ Add",
            },
            {
                btn_text: "Clear",
            }
        ]
    };
    
    const vendor_details_style = {
        display: "flex",
        gap: "28px 30px",
        // justifyContent: "space-around"
    };
    const medicine_details_style = {
        display: "flex",
        // gap: "28px 28px",
        justifyContent: 'space-between'
    };
    const btn_styles = { display: "flex", justifyContent: "end" };
    const [rows, setRows] = useState([
        {
            page: "Home",
            description: "This is the main page of the website",
            status: "live",
        },
        {
            page: "About Us",
            description: "This page has details about the company",
            status: "draft",
        },
        {
            page: "Pricing",
            description: "Prices for different subscriptions",
            status: "error",
        },
    ]);
    const onSubmit = (form) => {
        console.log(form);
    };
    const onAddMedicine = (formData) => {
        console.log(formData);
    }
    const validate = (watchValues, errorMethods) => {
        console.log(watchValues, 'watchValues')
    }
    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Form
                template={vendor_details_template}
                onSubmit={onSubmit}
                validate={validate}
                showSubmitButton={false}
                form_styles={vendor_details_style}
                btn_styles={btn_styles}
            />
            <Box
                sx={{
                    backgroundColor: '#eef0f3',
                    borderRadius: '4px',
                    padding: 2,
                    marginTop: '5px'
                }}
            >
                <Form
                    template={medicine_details_template}
                    onSubmit={onAddMedicine}
                    validate={validate}
                    showSubmitButton={true}
                    showClearFormButton={true}
                    form_styles={medicine_details_style}
                    btn_styles={btn_styles}
                />
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
            </Box>
        </Box>
    )
}