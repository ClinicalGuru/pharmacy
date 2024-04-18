import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { FormContainer } from './AddInvoice.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
// import './addinvoiceform.css'

export const BillingSummaryForm = ({
    onSubmitBillingForm,
    resetForm,
    netPrice
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
    const watchFields = watch(["discount", "gst"]);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "discount" || name === "gst") {
                const { discount, gst } = value;
                const discountAmount = (netPrice * (discount / 100));
                const gstAmount = (netPrice * (gst / 100));
                const totalDiscountedPrice = netPrice - discountAmount;
                const totalAmountAfterGST = totalDiscountedPrice + gstAmount;
                const roundOffAmount = Math.round(totalAmountAfterGST);
                setValue('netPrice', totalAmountAfterGST);
                setValue('roundOff', roundOffAmount);
                setValue('billAmount', roundOffAmount);
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
        const roundOffAmount = Math.round(totalAmountAfterGST);
        setValue('netPrice', totalAmountAfterGST);
        setValue('roundOff', roundOffAmount);
        setValue('billAmount', roundOffAmount);
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto'  }}>
                    <button style={{ height: '35px', marginTop: '5px', backgroundColor: "#4ceaff", border: '1px solid #bdbcbc', borderRadius: '4px' }} type="submit" disabled={isButtonDisabled}>Save & Print</button>
                </div>
            </div>
            {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </form >
    );
}