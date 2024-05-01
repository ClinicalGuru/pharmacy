import React, { useState, useEffect } from 'react';
import "./PaymentDetails.css";

const PaymentDetails = () => {
    const [paymentDetails, setPaymentDetails] = useState([
        [{ "title": "Inv No : ","classh":"lhshead", "value": " 123456" }, { "title": "Vendor : ","classh":"lhshead", "value": " ARD Enterprise" }],
        [{ "title": "Invoice amount", "value": "5000" }, { "title": "Paid Amount", "value": "2000" }, { "title": "Balance Amount", "value": "3000" }],
        [{ "title": "Amount", "value": "100000","classh":"lhshead3","classv":"rhsval" }, { "title": "Paymentmode", "value": "Phone Pay","classh":"lhshead3","classv":"rhsval" }, { "title": "Utr Number", "value": "35985123123456","classh":"lhshead3","classv":"rhsval" }],
        [{ "title": "Payment Date", "value": "26-04-2024","classh":"lhshead3","classv":"rhsval"  }, { "title": "Remarks", "value": "123456","classh":"lhshead3","classv":"rhsval"  }],
        [{"title":""},{"title":"clear","classh":"clear"},{"title":"add payment","classh":"add-payment"}]
    ]);

    return (
        <div>
            <div className="popup-body">
                {
                    paymentDetails.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            <div className={"pd-r"+`${rowIndex+1}`}>
                            {
                                row.map((c, ci) => (
                                    <div key={ci}>
                                       <div className={"pd-c"+`${rowIndex+1}`}>
                                            <div>
                                                <div>
                                                    <div className={c.classh}>{c.title}</div>
                                                    <div className={c.classv}>{c.value}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PaymentDetails;
