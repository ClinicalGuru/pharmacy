import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { FormContainer } from './AddInvoice.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
import './addinvoiceform.css'

export const AddInvoiceForm = ({ pData = [], bData = [], onSubmit }) => {
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
    const currentDate = new Date().toISOString().split("T")[0];
    const { control, register, handleSubmit, formState: { errors }, setValue, watch, onBlur, reset } = useForm({
        defaultValues: {
            pharmacologicalName: '',
            brandName: null,
            batchNo: '',
            hsnCode: '',
            expiry: '',
            quantity: '',
            noOfStrips: '',
            freeStrips: '',
            mrpPerStrip: '',
            discount: '',
            pricePerStrip: '',
            netPrice: ''
        }
    });
    const watchFields = watch(["noOfStrips", "pricePerStrip", "gst", "discount", "mrpPerStrip"]);
    // const onSubmit = (data) => console.log(data)
    // const onSubmit = (data) => {
    //     const { noOfStrips, pricePerStrip, gst, discount } = data;
    //     const discountedValue = (noOfStrips * pricePerStrip) - ((noOfStrips * pricePerStrip * discount) / 100);
    //     const netPrice = discountedValue + ((gst * discountedValue) / 100);
    //     setValue('netPrice', netPrice);
    // };
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "noOfStrips" || name === "pricePerStrip" || name === "gst" || name === "discount" || name === "mrpPerStrip") {
                const { noOfStrips, pricePerStrip, gst, discount, mrpPerStrip } = value;
                // if (pricePerStrip < mrpPerStrip) {
                //     setNotification(true);
                //     setNotificationMsg({
                //         message: 'MRP per strip cannot be less than Cost Price',
                //         severity: 'info'
                //     })
                //     setValue('mrpPerStrip', '');
                //     return;
                // }

                const discountedValue = (noOfStrips * pricePerStrip) - ((noOfStrips * pricePerStrip * discount) / 100);
                const netPrice = discountedValue + ((gst * discountedValue) / 100);
                setValue('netPrice', netPrice);
            }
        });
        return () => subscription.unsubscribe();
    }, [watchFields]);


    const alertState = () => {
        setNotification(!notification);
    };
    const mrpPerStripHandler = (e) => {
        console.log(e, 'mrp er strip')
    }
    const pricePerStripHandler = (e) => {
        console.log(e, 'price er strip')
    }
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* <div className={"addInvoiceForm"}> */}
            <div>
                <label>{FORM_LABELS.PHARMACOLOGICAL_NAME}</label>
                <Controller
                    {...register("pharmacologicalName", { required: true })}
                    name="pharmacologicalName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <CreatableSelect
                            {...field}
                            options={pData?.map(option => ({ value: option?.value, label: option?.name }))}
                            onChange={(newValue, actionMeta) => {
                                field.onChange(newValue);

                                // If the clear action is triggered, set the field value to null
                                if (actionMeta.action === 'clear') {
                                    field.onChange(null);
                                }

                                // Optionally, trigger validation
                                field.onBlur();
                            }}
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    width: 180,
                                })
                            }}
                        />
                    )}
                />
                {errors.pharmacologicalName && <p>{errors.pharmacologicalName.message}</p>}
            </div>

            <div>
                <label>{FORM_LABELS.BRAND_NAME}</label>
                <Controller
                    name='brandName'
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <CreatableSelect
                            {...register("brandName", { required: true })}
                            {...field}
                            options={bData?.map(option => ({ value: option?.value, label: option?.name }))}
                            onChange={(newValue, actionMeta) => {
                                field.onChange(newValue);

                                // If the clear action is triggered, set the field value to null
                                if (actionMeta.action === 'clear') {
                                    field.onChange(null);
                                }

                                // Optionally, trigger validation
                                field.onBlur();
                            }}
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    width: 180,
                                })
                            }}
                        />
                    )}
                />
            </div>

            {errors['brandName'] && <span className='red-text'>{errors['brandName'][`message`]}</span>}
            <div>
                <label>{FORM_LABELS.BATCH_NO}</label>
                <input {...register("batchNo", { required: true })} type="text" />
                {errors['batchNo'] && <span className='red-text'>{errors['batchNo'][`message`]}</span>}
            </div>

            <div>
                <label>{FORM_LABELS.HSN_CODE}</label>
                <input {...register("hsnCode", { required: true })} type="text" />
                {errors['hsnCode'] && <span className='red-text'>{errors['hsnCode'][`message`]}</span>}
            </div>

            <div>
                <label>{FORM_LABELS.EXPIRY}</label>
                <input {...register("expiry", { required: true })} type="date" min={currentDate} />
                {errors['expiry'] && <span className='red-text'>{errors['expiry'][`message`]}</span>}
            </div>

            <div>
                <label>{FORM_LABELS.QUANTITY}</label>
                <input {...register("quantity", { required: true })} type="text" />
                {errors['quantity'] && <span className='red-text'>{errors['quantity'][`message`]}</span>}
            </div>

            <div>
                <label>{FORM_LABELS.NO_OF_STRIPS}</label>
                <input {...register("noOfStrips", { required: true })} type="number" />
                {errors['noOfStrips'] && <span className='red-text'>{errors['noOfStrips'][`message`]}</span>}
            </div>

            <div>
                <label>{FORM_LABELS.FREE_STRIPS}</label>
                <input {...register("freeStrips")} type="number" />
                {errors['freeStrips'] && <span className='red-text'>{errors['freeStrips'][`message`]}</span>}
            </div>

            <div style={{minWidth:'150px'}}>
                <label>{FORM_LABELS.MRP_PER_STRIP}</label>
                <input onBlur={() => onBlur(mrpPerStripHandler())} {...register("mrpPerStrip", { required: true })} type="number" />
                {errors['mrpPerStrip'] && <span className='red-text'>{errors['mrpPerStrip'][`message`]}</span>}
            </div>
            <div style={{minWidth:'150px'}}>
                <label>{FORM_LABELS.PRICE_PER_STRIP}</label>
                <input onBlur={() => onBlur(pricePerStripHandler())} {...register("pricePerStrip", { required: true })} type="number" />
                {errors['pricePerStrip'] && <span className='red-text'>{errors['pricePerStrip'][`message`]}</span>}
            </div>
            <div style={{minWidth:'150px'}}>
                <label>{FORM_LABELS.DISCOUNT}</label>
                <input {...register("discount", { required: true })} type="number" />
                {errors['discount'] && <span className='red-text'>{errors['discount'][`message`]}</span>}
            </div>
            <div style={{minWidth:'150px'}}>
                <label>{FORM_LABELS.GST}</label>
                <input {...register("gst")} type="number" />
                {errors['gst'] && <span className='red-text'>{errors['gst'][`message`]}</span>}
            </div>
            <div style={{minWidth:'150px'}}>
                <label>{FORM_LABELS.NET_PRICE}</label>
                <input disabled {...register("netPrice", { required: true })} type="number" />
                {errors['netPrice'] && <span className='red-text'>{errors['netPrice'][`message`]}</span>}
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex' }}>
                    <button type="submit">Submit</button>
                    {/* <input type="submit" style={{ padding: '10px', marginRight: '10px' }} /> */}
                    <input type="reset" style={{ padding: '10px' }} />
                </div>
            </div>
            
            {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
            {/* <div style={{
                display: 'flex',
                alignItems: 'end'
            }}> */}
                {/* <div style={{ display: 'flex'}}>
                    <input type="submit" style={{ padding: '10px', marginRight: '10px' }} />
                    <input type="reset" style={{ padding: '10px' }} />
                </div> */}
            {/* </div> */}
        </FormContainer >
    );
}