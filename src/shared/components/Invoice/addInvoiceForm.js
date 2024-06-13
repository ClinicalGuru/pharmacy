import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { FormContainer } from './AddInvoice.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './addinvoiceform.css'
import MonthYearCalendarPopup from "../Calendar/MonthYearCalendarPopup";
import Modal from 'react-modal';

import CloseIcon from '@mui/icons-material/Close';

import isEmpty from 'lodash/isEmpty';

export const AddInvoiceForm = ({
    pData = [],
    bData = [],
    onSubmit,
    resetTrigger,
    resetForm = {},
    data
}) => {
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
    const currentDate = new Date().toISOString().split("T")[0];
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        onBlur,
        reset
    } = useForm({
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
            netPrice: '',
            pricePerUnit: ''
        }
    });

    const watchFields = watch(["noOfStrips", "pricePerStrip", "gst", "discount", "mrpPerStrip"]);
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "noOfStrips" || name === "pricePerStrip" || name === "gst" || name === "discount" || name === "mrpPerStrip" || name === "quantity") {
                const { noOfStrips, pricePerStrip, gst, discount, mrpPerStrip, quantity } = value;
                const discountedValue = (noOfStrips * pricePerStrip) - ((noOfStrips * pricePerStrip * discount) / 100);
                const netPrice = discountedValue + ((gst * discountedValue) / 100);
                const pricePerUnit = mrpPerStrip / quantity;
                setValue('netPrice', netPrice?.toFixed(2));
                setValue('pricePerUnit', pricePerUnit?.toFixed(2));
            }
        });
        return () => subscription.unsubscribe();
    }, [watchFields]);

    useEffect(() => {
        if (resetForm) reset();
    }, [onSubmit]);


    useEffect(() => {
        if (!isEmpty(data)) {
            for (let key in data) {
                setValue(key, data[key]);
            }
            setValue('pharmacologicalName', { value: data?.medicineId, label: data?.pharmacologicalName });
            setValue('brandName', { value: data?.medicineId, label: data?.brandName });
        }
    }, [data]);

    const alertState = () => {
        setNotification(!notification);
    };
    const mrpPerStripHandler = (e) => {
        console.log(e, 'mrp er strip')
    }
    const pricePerStripHandler = (e) => {
        console.log(e, 'price er strip')
    }

    useEffect(() => {
        if (resetTrigger) {
            reset();
        }
    }, [resetTrigger, reset]);

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className={"addInvoiceForm"}>
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
                    <label>{FORM_LABELS.BATCH_NO} <span className="red-asterisk">*</span></label>
                    <input {...register("batchNo", { required: true })} type="text" />
                    {errors['batchNo'] && <span className='red-text'>{errors['batchNo'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.HSN_CODE} <span className="red-asterisk">*</span></label>
                    <input {...register("hsnCode", { required: true })} type="text" />
                    {errors['hsnCode'] && <span className='red-text'>{errors['hsnCode'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.EXPIRY}</label>
                    <div >
                        <input
                            {...register("expiry", { required: true })}
                            type="date"
                        />
                    </div>
                    {/* <input {...register("expiry", { required: true })} placeholder="MM/YY"
                     onClick={openModal} style={{paddingLeft:'30px'}} type="text" min={currentDate} /> */}
                    {errors['expiry'] && <span className='red-text'>{errors['expiry'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.QUANTITY} <span className="red-asterisk">*</span></label>
                    <input {...register("quantity", { required: true })} type="text" />
                    {errors['quantity'] && <span className='red-text'>{errors['quantity'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.NO_OF_STRIPS} <span className="red-asterisk">*</span></label>
                    <input {...register("noOfStrips", { required: true })} type="number" />
                    {errors['noOfStrips'] && <span className='red-text'>{errors['noOfStrips'][`message`]}</span>}
                </div>

                <div>
                    <label>{FORM_LABELS.FREE_STRIPS} <span className="red-asterisk">*</span></label>
                    <input {...register("freeStrips")} type="number" />
                    {errors['freeStrips'] && <span className='red-text'>{errors['freeStrips'][`message`]}</span>}
                </div>

                <div style={{ minWidth: '100px' }}>
                    <label>{FORM_LABELS.MRP_PER_STRIP} <span className="red-asterisk">*</span></label>
                    <input onBlur={() => onBlur(mrpPerStripHandler())} {...register("mrpPerStrip", { required: true })} type="number" step={"any"} />
                    {errors['mrpPerStrip'] && <span className='red-text'>{errors['mrpPerStrip'][`message`]}</span>}
                </div>
                <div style={{ minWidth: '100px' }}>
                    <label>{FORM_LABELS.PRICE_PER_STRIP} <span className="red-asterisk">*</span></label>
                    <input onBlur={() => onBlur(pricePerStripHandler())} {...register("pricePerStrip", { required: true })} type="number" step={"any"} />
                    {errors['pricePerStrip'] && <span className='red-text'>{errors['pricePerStrip'][`message`]}</span>}
                </div>
                <div style={{ minWidth: '100px' }}>
                    <label>{FORM_LABELS.DISCOUNT}</label>
                    <input {...register("discount", { required: true })} type="number" step=".01" />
                    {errors['discount'] && <span className='red-text'>{errors['discount'][`message`]}</span>}
                </div>
                <div style={{ minWidth: '100px' }}>
                    <label>{FORM_LABELS.GST}</label>
                    <select {...register("gst")}>
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                    </select>
                    {errors['gst'] && <span className='red-text'>{errors['gst'][`message`]}</span>}
                </div>
                {/* <div style={{ minWidth: '150px' }}>
                    <label>{FORM_LABELS.GST}</label>
                    <input {...register("gst")} type="number" step=".01" />
                    {errors['gst'] && <span className='red-text'>{errors['gst'][`message`]}</span>}
                </div> */}
                <div style={{ minWidth: '150px' }}>
                    <label>{FORM_LABELS.NET_PRICE}</label>
                    <input disabled {...register("netPrice", { required: true })} type="number" />
                    {errors['netPrice'] && <span className='red-text'>{errors['netPrice'][`message`]}</span>}
                </div>
                <div>
                    <div style={{ display: 'flex', marginLeft: '30px' }}>

                        <div style={{ position: 'absolute' }}>
                            <input style={{ color: 'white' }} type="submit" id="styled-submit-button" value={"+ Add"} />
                        </div>
                        <div style={{ position: 'absolute', marginLeft: '70px' }}>
                            <input style={{ color: 'white' }} type="reset" id="styled-reset-button" value={"Clear"} />
                        </div>

                        {/* <div style={{ position: 'absolute' }}>
                        <input type="submit" style={{ padding: '10px', marginTop: '5px' }} />
                            <button style={{ height: '35px', marginTop: '5px' }} type="submit">Submit</button>
                        </div>
                        <div style={{ position: 'absolute', marginLeft: '70px' }}>
                            <input type="reset" style={{ padding: '10px', height: '35px', marginTop: '5px' }} />
                        </div> */}

                        {/* <input type="submit" style={{ padding: '10px', marginRight: '10px' }} /> */}

                    </div>
                </div>
            </div>
            {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </FormContainer >
    );
}