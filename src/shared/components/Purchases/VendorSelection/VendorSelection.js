import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PurchaseService from "../../../services/Purchase.service";
import { useState } from "react";
import Select from 'react-select';

export const VendorSelection = ({ onSelectVendor, onSelectDate }) => {

    const { control, formState: { errors }, setValue, watch } = useForm({
        mode: "onChange"
    });

    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState({});
    const [selectedDate, setSelectedDate] = useState({});

    const getVendors = async () => {
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            setVendors(result.map((item) => ({ value: item?.id, label: item?.name })));
        } catch (err) {
            console.log(err, 'error allVendors');
        }
    };

    useEffect(() => {
        getVendors();
    }, []);

    // useEffect(() => {
    //     setValue("vendorId", selectedVendor.value);
    //     console.log(selectedVendor, 'selectedVendor', selectedDate)
    // }, [selectedVendor, selectedDate]);

    const handleVendorChange = (selectedOption) => {
        setValue("vendorId", selectedOption);
        onSelectVendor(selectedOption); // Callback to update parent state
        setSelectedVendor(selectedOption)
        console.log(selectedVendor, 'selectedVendor');
    };

    // Assuming there's a date input
    const handleDateChange = (selectedDate) => {
        setValue("date", selectedDate);
        onSelectDate(selectedDate); // Callback to update parent state
    };
    return (
        <form>
            <span>
                <label>Select vendor</label>
                <Controller
                    name="vendorId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            options={vendors}
                            {...field}
                            label="Text field"
                            onChange={(selectedOption) => handleVendorChange(selectedOption)}
                            value={vendors.find((vendor) => vendor?.id === selectedVendor?.value)}
                        />
                    )}
                />
                <small className="text-danger">
                    {errors?.role && errors.role.message}
                </small>
            </span>
            <span>
                <label>Date</label>
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <input type="date"
                            {...field}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />
                    )}
                />
                <small className="text-danger">
                    {errors?.inputField && errors.inputField.message}
                </small>
            </span>
        </form>
    );
};
