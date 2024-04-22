import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { FormContainer } from './Sales.styles'
import { FORM_LABELS } from "../../Constants/index";
import { Notification } from '../Notification/index';
export const SalesForm = ({ pData = [], bData = [], onSubmitForm }) => {


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
      price: '',
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
      if (name === "price" || name === "quantity" || name === "discount") {
        const { price, quantity, discount } = value;
        const totalPrice = price * quantity;
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
            <CreatableSelect
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
        <input {...register("batchNo", {
          required: true,
        })} type="text" onInput={(e) => {
          e.target.value = e.target.value.replace(/[^\w\s]/gi, '');
        }} />
        {errors['batchNo'] && <span className='red-text'>{errors['batchNo'][`message`]}</span>}
      </div>


      <div>
        <label>{FORM_LABELS.HSN_CODE}</label>
        <input {...register("hsnCode", {
          required: true, pattern: {
            value: /^[0-9]*$/,
            message: "Please enter a valid HSN code"
          }
        })} type="number" />
        {errors['hsnCode'] && <span className='red-text'>{errors['hsnCode'][`message`]}</span>}
      </div>

      <div>
        <label>{FORM_LABELS.PRICE}</label>
        <input {...register("price", {
          required: true, pattern: {
            value: /^[0-9]*$/,
            message: ""
          }
        })} type="number" />
        {errors['price'] && <span className='red-text'>{errors['price'][`message`]}</span>}
      </div>

      <div>
        <label>{FORM_LABELS.QUANTITY}</label>
        <input {...register("quantity", {
          required: true, pattern: {
            value: /^[0-9]*$/,
            message: ""
          }
        })} type="number" />
        {errors['quantity'] && <span className='red-text'>{errors['quantity'][`message`]}</span>}
      </div>

      <div>
        <label>{FORM_LABELS.TOTAL}</label>
        <input disabled {...register("total")} type="number" readOnly />
        {errors['total'] && <span className='red-text'>{errors['total'][`message`]}</span>}
      </div>
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
        <label>{FORM_LABELS.AMOUNT}</label>
        <input disabled {...register("amount")} type="number" />
        {errors['amount'] && <span className='red-text'>{errors['amount'][`message`]}</span>}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center'
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
