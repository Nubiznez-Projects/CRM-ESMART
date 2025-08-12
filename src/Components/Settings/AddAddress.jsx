import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  getCompanyByID,
  UpdateCompanyAddress,
} from "../../API/Settings/CompanySetup";

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),

  state: Yup.string().required("State is required"),

  region: Yup.string().required("Region is required"),

  city: Yup.string().required("City is required"),

  country: Yup.string().required("Country is required"),

  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^\d{5,6}$/, "Zip Code must be 5 or 6 digits"),

  gstin: Yup.string()
    .required("GSTIN is required")
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Enter a valid GSTIN"
    ),
});

export default function AddAddress({
  isEdit,
  setIsEdit,
  setCurrentStep,
  resetfields,
}) {
  const [addressData, setAddressData] = useState();
  const LoginUserId = sessionStorage.getItem("LoginUserId");

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        const response = await UpdateCompanyAddress(LoginUserId, values);
        console.log(response, "response");
        toast.success(response.message);
        setCurrentStep(3);
        setIsEdit(false);
      } else {
        setIsEdit(false);
        setCurrentStep(3);
      }
    } catch (error) {
      console.error(error, "error submitting data");
    }
  };

  const fetchBusiness = async () => {
    try {
      const data = await getCompanyByID(LoginUserId);
      setAddressData(data?.address);
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
            address: addressData?.Address || "",
            state: addressData?.State || "",
            region: addressData?.Region || "",
            city: addressData?.City || "",
            country: addressData?.Country || "",
            zipCode: addressData?.PostalCode || "",
            gstin: addressData?.GSTIN || "",
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
                    Address <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    onBeforeInput={(e) => {
                      // Allow letters, numbers, space, comma, dot, slash, hyphen
                      const validChars = /^[a-zA-Z0-9\s,./-]*$/;
                      if (!validChars.test(e.data)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    placeholder="Enter Address"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    State <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="state"
                    name="state"
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    placeholder="Enter State"
                    className="w-full border-b border-gray-300 focus:outline-none text-[0.8vw] py-1 placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                {/* Row 2 */}
                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Region <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="region"
                    name="region"
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    placeholder="Enter Region"
                    className="w-full border-b border-gray-300 focus:outline-none text-[0.8vw] py-1 placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="region"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    City <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="city"
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    name="city"
                    disabled={!isEdit}
                    placeholder="Enter City"
                    className="w-full border-b border-gray-300 focus:outline-none text-[0.8vw] py-1 placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Country <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="country"
                    name="country"
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    placeholder="Enter Country"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                {/* Row 3 */}
                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Postal/Zip Code{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="zipCode"
                    disabled={!isEdit}
                    onBeforeInput={(e) => {
                      if (!/^\d+$/.test(e.data)) {
                        e.preventDefault();
                      }
                    }}
                    name="zipCode"
                    placeholder="Enter Postal/Zip Code"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    GSTIN <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="gstin"
                    name="gstin"
                    onBeforeInput={(e) => {
                      if (!/^[a-zA-Z0-9]+$/.test(e.data)) {
                        e.preventDefault(); // block special characters or symbols
                      }
                    }}
                    disabled={!isEdit}
                    placeholder="Enter GSTIN"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="gstin"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1)
                    setIsEdit(false)
                  }}
                  className="px-6 py-2 border border-black rounded-md text-sm font-medium cursor-pointer"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium cursor-pointer"
                >
                  NEXT
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
