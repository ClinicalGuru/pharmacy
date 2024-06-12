import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { FormContainer } from './AddInvoice.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
import { BillingForm, FooterSection } from "./Sales.styles";

export const BillingSummaryForm = ({
    onSubmitBillingForm,
    resetForm,
    netPrice,
    patientDetails,
    medicineDetails,
    resetTrigger
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
                setValue('roundOff', roundOffAmount.toFixed(2));
                setValue('billAmount', payableAmount.toFixed(2));
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
        setValue('roundOff', roundOffAmount.toFixed(2));
        setValue('billAmount', payableAmount.toFixed(2));
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

    useEffect(() => {
        if (resetTrigger) {
            reset();
        }
    }, [resetTrigger, reset]);

    const handleBlur = (e) => {
        const value = parseFloat(e.target.value).toFixed(2);
        setValue(e.target.name, value, { shouldValidate: true });
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
                    <select {...register("gst")}>
                        <option value="0%">0%</option>
                        <option value="5%">5%</option>
                        <option value="12%">12%</option>
                        <option value="18%">18%</option>
                        <option value="28%">28%</option>
                    </select>
                    {errors['gst'] && <span className='red-text'>{errors['gst'][`message`]}</span>}
                </div>
                <div>
                    <label>{FORM_LABELS.NET_PRICE}</label>
                    <input disabled {...register("netPrice", { required: true })} type="number" />
                    {errors['netPrice'] && <span className='red-text'>{errors['netPrice'][`message`]}</span>}
                </div>
                <div>
                    <div>
                        <label>{FORM_LABELS.ROUND_OFF}</label>
                        <input
                            onBlur={handleBlur}
                            {...register("roundOff", {
                                required: "Round off is required",
                                pattern: {
                                    value: /^-?\d+(\.\d{1,2})?$/,
                                    message: "Please enter a valid number with up to 2 decimal places"
                                }
                            })}
                            type="number"
                            step="0.01"
                        />
                    </div>
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
                <div>
                    <label>{FORM_LABELS.PAID_AMOUNT}</label>
                    <input {...register("paidAmount", {
                        pattern: {
                            value: /^[0-9]*$/,
                            message: ""
                        }
                    })} type="number" />
                    {errors['paidAmount'] && <span className='red-text'>{errors['paidAmount'][`message`]}</span>}
                </div>
                {/* <div>
                    <label>{FORM_LABELS.BALANCE}</label>
                    <input {...register("balance", {
                        pattern: {
                            value: /^[0-9]*$/,
                            message: ""
                        }
                    })} type="number" />
                    {errors['balance'] && <span className='red-text'>{errors['balance'][`message`]}</span>}
                </div> */}

                <div style={{ minWidth: '150px', display: 'flex', alignItems: 'center' }}>
                    <label>{FORM_LABELS.ADD_REMARKS}</label>
                    <textarea {...register("remarks")}></textarea>
                    {errors['remarks'] && <span className='red-text'>{errors['remarks'][`message`]}</span>}
                </div>
                <FooterSection>
                    <input type="submit" value=" Save" style={{ marginRight: '10px' }} disabled={netPriceValue === 0} />
                    <input type="submit" value=" Save & Print" disabled={netPriceValue === 0} />
                </FooterSection>
            </BillingForm>
            {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </>
    );
}