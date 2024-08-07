import { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import PurchaseService from "../../../services/Purchase.service";
import Select from 'react-select';
import { RefreshVendorsDetailsContext } from "../../../../context/RefreshVendorDetailsContext";
import { Loader } from "../../Loader/index";
import { StyledSpan } from "../../../../globalStyles";

export const VendorSelection = ({ onSelectVendor, onSelectDate }) => {
    const { refreshVDetails } = useContext(RefreshVendorsDetailsContext);
    const { control, formState: { errors }, setValue } = useForm({
        mode: "onChange"
    });
    const [showLoader, setShowLoader] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const getVendors = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            setVendors(result.map((item) => ({ value: item?.id, label: item?.name })));
            setShowLoader(false);
        } catch (err) {
            console.log(err, 'error allVendors');
            setShowLoader(false);
        }
    };

    useEffect(() => {
        getVendors();
    }, [refreshVDetails]);

    const handleVendorChange = (selectedOption) => {
        setValue("vendorId", selectedOption);
        onSelectVendor(selectedOption); // Callback to update parent state
        setSelectedVendor(selectedOption);
    };

    // Assuming there's a date input
    const handleDateChange = (selectedDate) => {
        setValue("date", selectedDate);
        onSelectDate(selectedDate); // Callback to update parent state
    };

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <form>
            <div style={{ display: 'flex' }}>
                <span>
                    <label>Select Vendor <StyledSpan> *</StyledSpan></label>
                    <Controller
                        name="vendorId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                options={vendors}
                                {...field}
                                label="Text field"
                                placeholder='Select'
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption);
                                    handleVendorChange(selectedOption);
                                }}
                                value={selectedVendor}
                                styles={{
                                    container: (provided) => ({
                                        ...provided,
                                        width: 300,
                                        marginRight: 50
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#B4B4B4' // Change this to your desired background color
                                    })
                                }}
                            />
                        )}
                    />
                    <small className="text-danger">
                        {errors?.role && errors.role.message}
                    </small>
                </span>
                <span>
                    <label>Date <StyledSpan> *</StyledSpan></label>
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
            </div>
            <Loader open={showLoader} />
        </form>
    );
};
