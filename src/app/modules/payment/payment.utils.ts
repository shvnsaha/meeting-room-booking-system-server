/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
    try {
        const response = await axios.post(config.payment_url!, {
            store_id: config.store_id,
            signature_key: config.signature_key,
            tran_id: paymentData.tranId,
             success_url: `http://localhost:5000/api/payment/confirmation?tranId=${paymentData.tranId}&slots=${paymentData.slots}`,
            // success_url: "http://www.merchantdomain.com/suc esspage.html",
            fail_url: `http://localhost:3000/api/v1/payment/confirmation?status=failed`,
            cancel_url: "http://localhost:5173/",
            amount: paymentData.totalAmount,
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: paymentData.custormerName,
            cus_email: paymentData.customerEmail,
            cus_add1: paymentData.customerAddress,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: paymentData.customerPhone,
            type: "json"
        });

        //console.log(response);
        return response.data;
    }
    catch (err) {
        throw new Error("Payment initiation failed!")
    }
}


export const verifyPayment = async (tnxId: string) => {
    try {
        const response = await axios.get(config.payment_verify_url!, {
            params: {
                store_id: config.store_id,
                signature_key: config.signature_key,
                type: "json",
                request_id: tnxId
            }
        });

        return response.data;
    }
    catch (err) {
        throw new Error("Payment validation failed!")
    }
}