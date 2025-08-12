import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  getCompanyByID,
  UpdateBankDetails,
} from "../../API/Settings/CompanySetup";

const validationSchema = Yup.object().shape({
  bank: Yup.string().trim().required("Bank name is required"),

  branch: Yup.string().trim().required("Branch name is required"),

  accNo: Yup.string()
    .trim()
    .matches(/^\d{9,18}$/, "Account number must be 9 to 18 digits")
    .required("Account number is required"),

  ifsc: Yup.string()
    .trim()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format")
    .required("IFSC code is required"),
});

export default function AddBankDetails({ isEdit, setIsEdit, setCurrentStep }) {
  const LoginUserId = sessionStorage.getItem("LoginUserId");
  const [bankData, setBankData] = useState();

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        const response = await UpdateBankDetails(LoginUserId, values);
        console.log(response, "response");
        toast.success(response.message);
        setIsEdit(false);
      } else {
        setIsEdit(false);
      }
    } catch (error) {
      console.error(error, "error submitting data");
    }
  };

  const fetchBusiness = async () => {
    try {
      const data = await getCompanyByID(LoginUserId);
      setBankData(data?.bank);
      console.log(data, "company business details...");
    } catch (error) {
      console.error("Error submitting Business Details", error);
    }
  };

  useEffect(() => {
    if (LoginUserId) {
      fetchBusiness();
    }
  }, [LoginUserId]);

  return (
    <>
      <div className="w-full">
        <Formik
          initialValues={{
            bank: bankData?.BankName || "",
            branch: bankData?.Branch || "",
            accNo: bankData?.AccountNum || "",
            ifsc: bankData?.IFSC || "",
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 w-full gap-x-[2.5vw] gap-y-[1.5vw] justify-evenly items-center p-[1vw]">
                {/* Row 1 */}

                <div></div>
                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Bank Name <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="bank"
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    name="bank"
                    placeholder="Enter Bank Name"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="bank"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Branch <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="branch"
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    name="branch"
                    placeholder="Enter Branch Name"
                    className="w-full border-b border-gray-300 focus:outline-none text-[0.8vw] py-1 placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="branch"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                {/* Row 2 */}
                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Account Number{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="accNo"
                    onBeforeInput={(e) => {
                      if (!/^\d+$/.test(e.data)) {
                        e.preventDefault(); 
                      }
                    }}
                    disabled={!isEdit}
                    name="accNo"
                    placeholder="Enter Account Number"
                    className="w-full border-b border-gray-300 focus:outline-none text-[0.8vw] py-1 placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="accNo"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    IFSC <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="ifsc"
                    onBeforeInput={(e) => {
                      if (!/^[a-zA-Z0-9]+$/.test(e.data)) {
                        e.preventDefault(); 
                      }
                    }}
                    disabled={!isEdit}
                    name="ifsc"
                    placeholder="Enter IFSC Code"
                    className="w-full border-b border-gray-300 focus:outline-none text-[0.8vw] py-1 placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="ifsc"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                <div></div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-[7vw]">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(2)
                    setIsEdit(false)
                  }}
                  className="px-6 py-2 border border-black rounded-md text-sm font-medium cursor-pointer"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 cursor-pointer bg-black text-white rounded-md text-sm font-medium"
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
