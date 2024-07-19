import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CreatableSelect from "react-select/creatable";
import PurchaseService from "../../../services/Purchase.service";
import { EditableTable } from "../../EditableTable";
import { DownloadOptionsModal } from "../../DownloadOptionsModal/DownloadOptionsModal";
import { Container } from "./PurchaseOrders.styles";
import { useLocation } from "react-router-dom";
import { Notification } from "../../Notification/index";
import { Loader } from "../../Loader/index";
import { useSearchParams } from "react-router-dom";
import { CButton } from "../../Button/index";
import { StyledSpan } from "../../../../globalStyles";
import isEmpty from "lodash/isEmpty";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useLocalStorage from "../../../../hooks/UseLocalstorage";

export const PurchaseOrders = () => {
  const [pharmacyId] = useLocalStorage("pharmacyId");
  const [rowIds, selectedRows] = useState({});
  const [vendorDetails, SetVendorDetails] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [rows, setRows] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [selectedVendorDtls, setSelectedVendorDtls] = useState();
  const [searchParams] = useSearchParams();
  const selectedVendor = {
    value: searchParams.get("vendorId"),
    label: searchParams.get("vendorName"),
  };
  const [notificationMsg, setNotificationMsg] = useState({
    message: "",
    severity: "",
  });

  const columns = [
    {
      Header: "Vendor Name",
      accessor: "vendorName",
      editEnable: false,
    },
    {
      Header: "Pharmacological Name",
      accessor: "pharmacologicalName",
      editEnable: false,
    },
    {
      Header: "Brand Name",
      accessor: "brandName",
      editEnable: false,
    },
    {
      Header: "Dose",
      accessor: "dose",
      editEnable: false,
    },
    {
      Header: "Form",
      accessor: "form",
      editEnable: false,
    },
    {
      Header: "Qantity / Strips",
      accessor: "quantity",
      editEnable: true,
    },
    {
      Header: "Action",
      id: "actions",
      disableSortBy: true,
      Cell: ({ row, column, cell }) =>
        row.original.isEditing ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
              <div>
                <DoneOutlinedIcon
                  style={{ color: "blue" }}
                  onClick={() => handleButtonClick("save", row.original)}
                  sx={{ marginRight: "10px" }}
                />
              </div>
              <div>
                <CancelOutlinedIcon
                  style={{ color: "red" }}
                  onClick={() => handleButtonClick("cancel", row.original)}
                />
              </div>
            </div>
            {/* <DoneOutlinedIcon style={{ color: 'blue' }} onClick={() => handleButtonClick("save", row.original)} sx={{marginRight: '10px'}}/>
                        <CancelOutlinedIcon style={{ color: 'red' }} onClick={() => handleButtonClick("cancel", row.original)}/> */}
          </>
        ) : (
          <EditOutlinedIcon
            disabled={dataFetched}
            onClick={() => handleButtonClick("edit", row.original)}
          />
        ),
    },
  ];
  const pdfColumns = [
    {
      Header: "Pharmacological Name",
      accessor: "pharmacologicalName",
    },
    {
      Header: "Brand Name",
      accessor: "brandName",
    },
    {
      Header: "Dose",
      accessor: "dose",
    },
    {
      Header: "Form",
      accessor: "form",
    },
    {
      Header: "Qantity / Strips",
      accessor: "quantity",
    },
  ];
  const handleButtonClick = (action, row) => {
    const newData = rows.map((rowData) => {
      if (rowData.id === row.id) {
        if (action === "edit") {
          return { ...rowData, isEditing: true, prevData: { ...rowData } };
        } else if (action === "cancel") {
          return { ...rowData, isEditing: false, ...rowData.prevData };
        } else if (action === "save") {
          const { prevData, ...updatedRowData } = rowData;
          return { ...updatedRowData, isEditing: false };
        }
      }
      return rowData;
    });
    setRows(newData);
  };
  let location = useLocation();
  useEffect(() => {
    console.log(location?.state?.data, "loc");
    setRows(location?.state?.data);
  }, [location]);

  const getVendors = async () => {
    try {
      let data = await PurchaseService.getAllVendors();
      const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc.id }));
      SetVendorDetails(result);
    } catch (e) {
      console.log(e, "error allVendors");
    }
  };

  useEffect(() => {
    getVendors();
  }, []);

  // useEffect(() => {
  //     getAllMedicines();
  // }, [vendorDetails]);

  const onSavePO = async () => {
    if (vendorId === "" && selectedVendor.value === "") {
      setNotification(true);
      setNotificationMsg({
        severity: "error",
        message: "Please select vendor",
      });
      return;
    }
    if (isEmpty(rowIds)) {
      setNotification(true);
      setNotificationMsg({
        severity: "error",
        message: "Please select medicines to create purchase order",
      });
      return;
    }
    setShowLoader(true);
    const rowIdKeys = Object.keys(rowIds);
    const filtredRows = rowIdKeys?.map((id) => rows[parseInt(id)]);
    filtredRows.forEach((item) => (item["pharmacyId"] = pharmacyId));
    try {
      await PurchaseService.savePO(filtredRows);
      pdfUsableData(filtredRows);
      console.log("successfull on saving PO");
      setNotification(true);
      setDownloadModal(true);
      setShowLoader(false);
      setNotificationMsg({
        severity: "success",
        message: "Purchase order created successfully.",
      });
      getAllMedicines();
    } catch (err) {
      console.log("error on saving PO", err);
      setShowLoader(false);
    }
  };

  const pdfUsableData = (data) => {
    const filteredList = data.map(
      ({
        discount,
        gst,
        id,
        isEditing,
        medicineId,
        mrp,
        ptr,
        pts,
        quotationId,
        requesitionId,
        vendorId,
        vendorName,
        ...rest
      }) => {
        return {
          pharmacologicalName: rest.pharmacologicalName,
          brandName: rest.brandName,
          form: rest.form,
          dose: rest.dose,
          quantity: rest.quantity,
        };
      }
    );
    setPdfData(filteredList);
  };

  const alertState = () => {
    setNotification(!notification);
  };
  const handleClose = () => {
    setDownloadModal(false);
  };

  const getAllMedicines = async () => {
    setShowLoader(true);
    try {
      let data = await PurchaseService.getAllQuotationData();
      const result = data?.docs?.map((doc) => ({
        ...doc?.data(),
        id: doc?.id,
      }));
      joinQuotationsWithVendors(result);
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };

  const joinQuotationsWithVendors = (data) => {
    setShowLoader(true);
    let vendorMap = new Map();
    for (const vendor of vendorDetails) {
      vendorMap.set(vendor.id, vendor.name);
    }
    const updatedQuotationDetails = data?.map((quotation) => ({
      ...quotation,
      vendorName: vendorMap.get(quotation.vendorId),
    }));
    setRows(findingL1(updatedQuotationDetails));
    setOriginalData(findingL1(updatedQuotationDetails));
  };
  const findingL1 = (arr) => {
    const minAgeMap = new Map();
    // Iterate over each object in the array
    arr.forEach((obj) => {
      // Check if the name exists in the map
      if (minAgeMap.has(obj.pharmacologicalName)) {
        // If it exists, update the object if the ptr is lower
        const existingObj = minAgeMap.get(obj?.ptr);
        if (obj?.ptr < existingObj?.ptr) {
          minAgeMap.set(obj.pharmacologicalName, obj);
        }
      } else {
        // If it doesn't exist, add the object to the map
        minAgeMap.set(obj.pharmacologicalName, obj);
      }
    });
    return Array.from(minAgeMap.values());
  };
  const vendorHandler = (e) => {
    const { value } = e;
    console.log(value, "vendorId");
    setVendorId(value);
  };
  const btn_style = {
    marginRight: "10px",
  };
  useEffect(() => {
    if (vendorId && vendorId === "") return;
    setShowLoader(true);
    const getL1DataByVendor = async () => {
      try {
        let data = await PurchaseService.getQuotationByVendor(vendorId);
        joinQuotationsWithVendors(data);
        setShowLoader(false);
      } catch (err) {
        console.log(err, "error while getting vendor details Purchage order");
        setShowLoader(false);
      }
    };
    getL1DataByVendor();
  }, [vendorId]);

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <Container>
        {
          <form>
            <div className="form-group">
              <label className="form-label" for="vendorId">
                Select Vendor<StyledSpan> *</StyledSpan>
              </label>
              <CreatableSelect
                options={vendorDetails?.map((vendor) => ({
                  value: vendor?.id,
                  label: vendor?.name,
                }))}
                onChange={(e) => vendorHandler(e)}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: 300,
                    marginRight: 50,
                  }),
                }}
                defaultValue={selectedVendor}
              />
            </div>
          </form>
        }
        <Box sx={{ display: "flex" }}>
          <CButton
            type="button"
            variant="contained"
            disabled={true}
            style={btn_style}
            text="PO List"
          />
          <CButton
            type="button"
            variant="contained"
            style={btn_style}
            buttonHandler={getAllMedicines}
            text="L1 Medicines List"
          />
          <CButton
            type="button"
            variant="contained"
            text="Re-Order"
            disabled={true}
          />
        </Box>
      </Container>
      <Box sx={{ marginTop: 2 }}>
        {rows?.length > 0 && (
          <EditableTable
            columns={columns}
            data={rows}
            setData={setRows}
            handleButtonClick={handleButtonClick}
            selectedRows={selectedRows}
          />
        )}
      </Box>
      <div>
        {rows?.length > 0 && (
          <Box
            sx={{ display: "flex", justifyContent: "end", marginTop: "10px" }}
          >
            <CButton
              type="button"
              variant="contained"
              buttonHandler={onSavePO}
              text="Create purchase order"
            />
          </Box>
        )}
      </div>
      <DownloadOptionsModal
        open={downloadModal}
        onClose={handleClose}
        rows={pdfData}
        vendorDetails={selectedVendorDtls}
        pdfTitle="PURCHASE ORDER"
        columns={pdfColumns}
      />
      {notification && (
        <Notification
          notificationState={notification}
          severity={notificationMsg?.severity}
          message={notificationMsg?.message}
          action={alertState}
        />
      )}
      <Loader open={showLoader} />
    </Box>
  );
};
