import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { FormContainer } from './AddInvoice.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
import { BillingForm } from "./Sales.styles";

export const BillingSummaryForm = ({
    onSubmitBillingForm,
    resetForm,
    netPrice,
    patientDetails,
    medicineDetails
}) => {
    const [notification, setNotification] = useState(false);
    const [netPriceValue, setNetPriceValue] = useState(0);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
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
            paymentMode: 'cash',
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
        setNetPriceValue(Number(totalAmountAfterGST))
    }, [netPrice]);

    const onSubmit = (data) => {
        // event.preventDefault();
        onSubmitBillingForm(data);
    }

    useEffect(() => {
        // setButtonDisabled(netPrice === 0);
    }, [netPrice]);

    // useEffect(() => {
    //     if (resetForm) reset();
    // }, [resetForm]);

    const alertState = () => {
        setNotification(!notification);
    };

    const handleBlur = (e) => {
        const value = parseFloat(e.target.value).toFixed(3); // Convert to float and fix to 2 decimal places
        setValue("roundOff", value); // Update the form value with the restricted value
    };

    return (
        <>
            <BillingForm onSubmit={handleSubmit(onSubmit)}>
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
                    <input onBlur={handleBlur} {...register("roundOff", { required: true })} type="number" step= "0.001" />
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
                        <option value="upi"> UPI </option>
                        <option value="card"> Card </option>
                        <option value="cash"> Cash </option>
                    </select>
                    {errors['paymentMode'] && <span className='red-text'>{errors['paymentMode'][`message`]}</span>}
                </div>

                <div style={{ minWidth: '150px', display: 'flex', alignItems: 'center' }}>
                    <label>{FORM_LABELS.ADD_REMARKS}</label>
                    <textarea {...register("remarks")}></textarea>
                    {errors['remarks'] && <span className='red-text'>{errors['remarks'][`message`]}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                    <button disabled={netPriceValue === 0} style={{ height: '35px', marginTop: '5px', backgroundColor: "#4ceaff", border: '1px solid #bdbcbc', borderRadius: '4px', marginRight:'10px' }}
                        type="submit"> Save </button>
                    <button disabled={netPriceValue === 0} style={{ height: '35px', marginTop: '5px', backgroundColor: "#4ceaff", border: '1px solid #bdbcbc', borderRadius: '4px' }}
                        type="submit" >Save & Print</button>
                </div>
            </BillingForm>
            {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </>
    );
}