import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { FormContainer } from './AddInvoice.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
// import './addinvoiceform.css'

export const BillingSummaryForm = ({
    onSubmitBillingForm,
    resetForm,
    netPrice,
    patientDetails,
    medicineDetails
}) => {
    console.log(netPrice, 'netPrice')
    const [notification, setNotification] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(netPrice === 0);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
    const currentDate = new Date().toISOString().split("T")[0];
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        getValues
    } = useForm({
        defaultValues: {
            discount: 0,
            gst: 0,
            netPrice: 0,
            roundOff: '',
            billAmount: 0,
            paymentMode: '',
            remarks: ''
        }
    });

    const handlePrint = () => {
        const { discount, gst, netPrice, roundOff, billAmount, paymentMode, remarks } = getValues();
        const printContent = `
        <div class = 'header_sec'>
            <h1 class='heading'> LAXMI MEDICALS</h1>
            <p> 10/166, Railway koduru, Annamayya Dist - 516101</p> 
            <p>+91 9000415599</p>
        </div>
        <hr>
        <div class = 'patient_sec'>
           <div>
                <p><b>Patient Name:</b> ${patientDetails.patientName}</p>
                <p><b>Phone:</b> ${patientDetails.phone}</p>
                <p><b>Referred Doctor:</b> ${patientDetails.referredDoctor}</p>
            </div>
            <div>
                <p><b>Bill Number:</b></p>
                <p><b>Bill Date:</b> ${currentDate}</p>
                <p><b>Status:</b></p>
            </div>
        </div>
           <hr> 
            <table>
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Item</th>
                        <th>Batch No</th>
                        <th>HSN Code</th>
                        <th>Expiry</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${medicineDetails.map((row, i) => `
                        <tr>
                            <td>${i+1}</td>
                            <td>${row.brandName}</td>
                            <td>${row.batchNo}</td>
                            <td>${row.hsnCode}</td>
                            <td></td>
                            <td>${row.price}</td>
                            <td>${row.quantity}</td>
                            <td>${row.discount}</td>
                            <td>${row.amount}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <hr>
            <div class = 'billing_sec'>
            <p> <b> Total Bill Amount:</b> ${netPrice}</p>
            <p> <b>  Round Off:</b>${roundOff} </p>
            <p> <b> Payable Amount:</b>${billAmount} </p>
            <p> <b> Recieved Amount:</b></p>
            <p> <b> Balance Amount:</b> </p>
            </div>

        `;

        const popupWin = window.open('', '_blank', 'width=600,height=600');
        popupWin.document.open();
        popupWin.document.write(`
            <html>
                <head>
                    <style>
                    .header_sec{
                        text-align: center;
                    }
                    .heading {
                        font-size: 400%;
                        color: #155263;
                    }
                    .billing_sec {
                        text-align: end;
                    }
                    .patient_sec {
                        display: flex;
                        justify-content: space-between;
                    }
                ]   table {
                            width: 100%;
                            border-collapse: collapse;
                    }
                    th, td {
                            text-align: left;
                            padding: 5px 8px;
                    }
                    thead {
                            background-color: #ececec;
                    }
                    h1,p {
                        margin-bottom: 0px!important
                    }

                    </style>
                </head>
                <body onload="window.print();">${printContent}</body>
            </html>
        `);
        popupWin.document.close();
    };

    const watchFields = watch(["discount", "gst"]);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "discount" || name === "gst") {
                const { discount, gst } = value;
                const discountAmount = (netPrice * (discount / 100));
                const gstAmount = (netPrice * (gst / 100));
                const totalDiscountedPrice = netPrice - discountAmount;
                const totalAmountAfterGST = totalDiscountedPrice + gstAmount;
                const roundOffAmount = Math.round(totalAmountAfterGST) - totalAmountAfterGST;
                const payableAmount = Math.round(totalAmountAfterGST)
                setValue('netPrice', totalAmountAfterGST);
                setValue('roundOff', roundOffAmount);
                setValue('billAmount', payableAmount);
            }
        });
        return () => subscription.unsubscribe();
    }, [watchFields]);

    useEffect(() => {
        const { discount, gst } = getValues();
        const discountAmount = (netPrice * (discount / 100));
        const gstAmount = (netPrice * (gst / 100));
        const totalDiscountedPrice = netPrice - discountAmount;
        const totalAmountAfterGST = (totalDiscountedPrice + gstAmount).toFixed(2);
        const roundOffAmount = Math.round(totalAmountAfterGST) - totalAmountAfterGST;
        const payableAmount = Math.round(totalAmountAfterGST)
        setValue('netPrice', totalAmountAfterGST);
        setValue('roundOff', roundOffAmount);
        setValue('billAmount', payableAmount);
    }, [netPrice]);

    useEffect(() => {
        setButtonDisabled(netPrice === 0);
    }, [netPrice]);

    useEffect(() => {
        if (resetForm) reset();
    }, [onSubmit]);

    const alertState = () => {
        setNotification(!notification);
    };

    const onSubmit = (data) => {
        onSubmitBillingForm(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={"addInvoiceForm"}>
                <div>
                    <label>{FORM_LABELS.DISCOUNT}</label>
                    <input {...register("discount", {
                        pattern: {
                            value: /^[0-9]*$/,
                            message: ""
                        }
                    })} type="number" />
                    {errors['discount'] && <span className='red-text'>{errors['discount'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.GST}</label>
                    <input {...register("gst", {
                        pattern: {
                            value: /^[0-9]*$/,
                            message: ""
                        }
                    })} type="number" />
                    {errors['gst'] && <span className='red-text'>{errors['gst'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.NET_PRICE}</label>
                    <input disabled {...register("netPrice", { required: true })} type="number" />
                    {errors['netPrice'] && <span className='red-text'>{errors['netPrice'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.ROUND_OFF}</label>
                    <input {...register("roundOff", { required: true })} type="number" />
                    {errors['roundOff'] && <span className='red-text'>{errors['roundOff'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.BILL_AMOUNT}</label>
                    <input disabled {...register("billAmount", { required: true })} type="number" />
                    {errors['billAmount'] && <span className='red-text'>{errors['billAmount'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.PAYMENT_MODE}</label>
                    {/* <input {...register("paymentMode")} type="number" /> */}
                    <select {...register("paymentMode")}>
                        <option>--Select--</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                    </select>
                    {errors['paymentMode'] && <span className='red-text'>{errors['paymentMode'][`message`]}</span>}
                </div>

                <div style={{ minWidth: '150px' }}>
                    <label>{FORM_LABELS.ADD_REMARKS}</label>
                    <textarea {...register("remarks")} ></textarea>
                    {errors['remarks'] && <span className='red-text'>{errors['remarks'][`message`]}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                    <button style={{ height: '35px', marginTop: '5px', backgroundColor: "#4ceaff", border: '1px solid #bdbcbc', borderRadius: '4px' }}
                        onClick={handlePrint} type="submit" disabled={isButtonDisabled}>Save & Print</button>
                </div>
            </div>
            {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </form >
    );
}