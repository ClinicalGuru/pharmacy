import React, { useEffect, useState, CSSProperties } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { FormContainer } from './Sales.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
import isEmpty from 'lodash/isEmpty';

export const SalesForm = ({ inventory = [], onSubmitForm, data }) => {
  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState({
    message: '',
    severity: ''
  });
  const { control, register, handleSubmit, reset, formState: { errors }, setValue, watch, onBlur } = useForm({
    defaultValues: {
      pharmacologicalName: '',
      brandName: null,
      batchNo: '',
      hsnCode: '',
      pricePerUnit: '',
      quantity: '',
      total: '',
      discount: 0,
      amount: ''
    }
  });
  const watchFields = watch(["price", "quantity", "discount"]);
  const onSubmit = (data) => {
    onSubmitForm(data);
    reset();
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(name, 'name');
      if (name === "pricePerUnit" || name === "quantity" || name === "discount") {

        const { pricePerUnit, quantity, discount } = value;
        console.log(pricePerUnit, quantity, discount, 'pricePerUnit, quantity, discount');
        const totalPrice = pricePerUnit * quantity;
        const discountedValue = totalPrice - (totalPrice * discount) / 100;
        setValue('total', totalPrice);
        setValue('amount', discountedValue);
      }
    });
    return () => subscription.unsubscribe();
  }, [watchFields]);


  const alertState = () => {
    setNotification(!notification);
  };
  const brandNameHandler = (form) => {
    const { value } = form;
    console.log(form, 'form', value);
    const { batchNo, expiry, gst, hsnCode, pricePerUnit } = inventory.find((item) => item?.id === value);
    let medDetails = { batchNo, expiry, gst, hsnCode, pricePerUnit };
    for (let key in medDetails) {
      setValue(key, medDetails[key]);
    }
  }
  useEffect(() => {
    if (!isEmpty(data)) {
      for (let key in data) {
        setValue(key, data[key]);
      }
      setValue('pharmacologicalName', { value: data?.medicineId, label: data?.pharmacologicalName });
      setValue('brandName', { value: data?.medicineId, label: data?.brandName });
    }
  }, [data]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>{FORM_LABELS.PHARMACOLOGICAL_NAME}</label>
        <Controller
          {...register("pharmacologicalName", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9\s]*$/,
              message: "Please enter only letters, numbers, or spaces"
            }
          })}
          name="pharmacologicalName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              options={inventory?.map(option => ({ value: option?.id, label: option?.pharmacologicalName }))}
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
                  width: 150,
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
          {...register("brandName", {
            required: true, pattern: {
              value: /^[a-zA-Z0-9\s]*$/,
              message: "Please enter only letters, numbers, or spaces"
            }
          })}
          name='brandName'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              options={inventory?.map(option => ({ value: option?.id, label: option?.brandName }))}
              onChange={(newValue, actionMeta) => {
                brandNameHandler(newValue)
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
                  width: 150,
                })
              }}
            />
          )}
        />
      </div>

      {errors['brandName'] && <span className='red-text'>{errors['brandName'][`message`]}</span>}
      <div>
        <label>{FORM_LABELS.BATCH_NO}</label>
        <input
          {...register("batchNo", {
            required: true,
          })}
          type="text"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^\w\s]/gi, '');
          }}
          style={{ width: "100px" }}
        />
        {errors['batchNo'] && <span className='red-text'>{errors['batchNo'][`message`]}</span>}
      </div>


      <div>
        <label>{FORM_LABELS.HSN_CODE}</label>
        <input
          {...register("hsnCode", {
            required: true, pattern: {
              value: /^[0-9]*$/,
              message: "Please enter a valid HSN code"
            }
          })}
          type="number"
          style={{ width: "100px" }}
        />
        {errors['hsnCode'] && <span className='red-text'>{errors['hsnCode'][`message`]}</span>}
      </div>

      <div>
        <label>{FORM_LABELS.PRICE}</label>
        <input
          {...register("pricePerUnit", {
            required: true, pattern: {
              value: /^[0-9]*$/,
              message: ""
            }
          })}
          style={{ width: "60px" }}
          type="number"
          step="0.001"
        />
        {errors['price'] && <span className='red-text'>{errors['price'][`message`]}</span>}
      </div>

      <div>
        <label>{FORM_LABELS.QUANTITY}</label>
        <input
          {...register("quantity", {
            required: true, pattern: {
              value: /^[0-9]*$/,
              message: ""
            }
          })}
          type="number"
          style={{ width: "60px" }}
        />
        {errors['quantity'] && <span className='red-text'>{errors['quantity'][`message`]}</span>}
      </div>

      <div>
        <label>{FORM_LABELS.TOTAL}</label>
        <input
          disabled {...register("total")}
          type="number"
          step="0.001"
          readOnly
          style={{ width: "60px" }}
        />
        {errors['total'] && <span className='red-text'>{errors['total'][`message`]}</span>}
      </div>
      <div>
        <label>{FORM_LABELS.DISCOUNT}</label>
        <input
          placeholder="0"
          {...register("discount", {
            pattern: {
              value: /^[0-9]*$/,
              message: ""
            }
          })}
          type="number"
          style={{ width: "60px" }}
        />
        {errors['discount'] && <span className='red-text'>{errors['discount'][`message`]}</span>}
      </div>
      <div>
        <label>{FORM_LABELS.AMOUNT}</label>
        <input
          disabled
          {...register("amount")}
          type="number"
          step= "0.001"
          style={{ width: "60px" }}
        />
        {errors['amount'] && <span className='red-text'>{errors['amount'][`message`]}</span>}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'end',
        width: '100%'
      }}>
        <div style={{ display: 'flex' }}>
          <input type="submit" value="+ Add" style={{ padding: '10px', marginRight: '10px' }} />
          <input type="reset" style={{ padding: '10px' }} />
        </div>
      </div>

      {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
    </FormContainer >
  );
}
