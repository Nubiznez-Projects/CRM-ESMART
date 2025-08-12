import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  getCompanyByID,
  UpdateCompanyBusiness,
} from "../../API/Settings/CompanySetup";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  company: Yup.string()
    .required("Company Name is required")
    .min(2, "Company Name must be at least 2 characters"),

  owner: Yup.string()
    .required("Owner Name is required")
    .min(2, "Owner Name must be at least 2 characters"),

  constitution: Yup.string().required("Type of Constitution is required"),

  businessBackground: Yup.string().required("Business Background is required"),

  msmeType: Yup.string().required("MSME Type is required"),

  msmeNo: Yup.string()
    .required("MSME Number is required")
    .matches(/^[0-9]{12}$/, "MSME Number must be 12 digits"),

  serviceType: Yup.string().required("Type of Service is required"),

  currency: Yup.string().required("Currency Code is required"),
});

export default function AddBusiness({
  isEdit,
  setIsEdit,
  setCurrentStep,
  setResetFields,
}) {
  const LoginUserId = sessionStorage.getItem("LoginUserId");
  const [businessData, setBusinessData] = useState();
  const [formData, setFormData] = useState({
    company: "",
    owner: "",
    constitution: "",
    businessBackground: "",
    msmeType: "",
    msmeNo: "",
    serviceType: "",
    currency: "",
  });

  const constitutionOptions = [
    { value: "Sole Proprietorship" },
    { value: "Partnership" },
    { value: "Limited Liability Partnership (LLP)" },
    { value: "Private Limited Company" },
    { value: "Public Limited Company" },
    { value: "Hindu Undivided Family (HUF)" },
    { value: "Co-operative Society" },
    { value: "Trust" },
  ];

  const businessOptions = [
    { value: "Information Technology (IT)" },
    { value: "Finance" },
    { value: "Real Estate" },
    { value: "Manufacturing" },
    { value: "Trading" },
    { value: "Services" },
    { value: "Retail" },
    { value: "E-commerce" },
    { value: "Agriculture" },
    { value: "Education" },
    { value: "Healthcare" },
    { value: "Construction" },
    { value: "Hospitality" },
    { value: "Logistics" },
    { value: "Media and Entertainment" },
  ];

  const msmeTypes = [
    { value: "Micro Enterprise" },
    { value: "Small Enterprise" },
    { value: "Medium Enterprise" },
    { value: "Not Registered" },
  ];

  const serviceTypes = [
    { value: "Software Development" },
    { value: "Maintenance & Support" },
    { value: "Logistics" },
    { value: "Accounting" },
    { value: "Marketing" },
    { value: "Financial Services" },
    { value: "IT Infrastructure" },
    { value: "Customer Support" },
    { value: "Manufacturing Services" },
    { value: "Other" },
  ];

  const currencyCodes = [
    { label: "United States Dollar (USD)", value: "USD" },
    { label: "Euro (EUR)", value: "EUR" },
    { label: "Indian Rupee (INR)", value: "INR" },
    { label: "Australian Dollar (AUD)", value: "AUD" },
    { label: "Canadian Dollar (CAD)", value: "CAD" },
    { label: "Singapore Dollar (SGD)", value: "SGD" },
    { label: "UAE Dirham (AED)", value: "AED" },
    { label: "Saudi Riyal (SAR)", value: "SAR" },
    { label: "South African Rand (ZAR)", value: "ZAR" },
    { label: "Brazilian Real (BRL)", value: "BRL" },
    { label: "Russian Ruble (RUB)", value: "RUB" },
  ];

  console.log(LoginUserId, "LoginUserId");

  const handleReset = () => {
    setFormData({
      company: "",
      owner: "",
      constitution: "",
      businessBackground: "",
      msmeType: "",
      msmeNo: "",
      serviceType: "",
      currency: "",
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        const response = await UpdateCompanyBusiness(
          LoginUserId,
          values,
          businessData
        );
        console.log(response, "response");
        toast.success(response.message);
        setCurrentStep(2);
        setIsEdit(false);
      } else {
        setCurrentStep(2);
      }
    } catch (error) {
      console.error(error, "error submitting data");
    }
  };

  const fetchBusiness = async () => {
    try {
      const data = await getCompanyByID(LoginUserId);
      setBusinessData(data?.business);
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
            company: businessData?.CompanyName || "",
            owner: businessData?.OwnerName || "",
            constitution: businessData?.ConstitutionType || "",
            businessBackground: businessData?.BusinessBackground || "",
            msmeType: businessData?.MSMEType || "",
            msmeNo: businessData?.MSMENumber || "",
            serviceType: businessData?.TypeOfService || "",
            currency: businessData?.CurrencyCode || "",
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, handleSubmit, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 w-full gap-x-[2.5vw] gap-y-[1.5vw] justify-evenly items-center p-[1vw]">
                {/* Row 1 */}

                <div></div>
                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Company Name{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="company"
                    disabled={!isEdit}
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    name="company"
                    placeholder="Enter Company Name"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="company"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Owner Name{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="owner"
                    name="owner"
                    onKeyPress={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    placeholder="Enter Owner Name"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="owner"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>
                {/* Row 2 */}
                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Type of Constitution{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    as="select"
                    id="constitution"
                    disabled={!isEdit}
                    name="constitution"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  >
                    <option value="">-- Select Type of constitution --</option>{" "}
                    {/* Default empty option */}
                    {constitutionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="constitution"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Business Background{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    as="select"
                    disabled={!isEdit}
                    id="businessBackground"
                    name="businessBackground"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  >
                    <option value="">-- Select Business Background --</option>{" "}
                    {/* Default empty option */}
                    {businessOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="businessBackground"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    MSME Type <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    as="select"
                    disabled={!isEdit}
                    id="msmeType"
                    name="msmeType"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  >
                    <option value="">-- Select MSME Type --</option>{" "}
                    {/* Default empty option */}
                    {msmeTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="msmeType"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                {/* Row 3 */}
                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    MSME Number{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="msmeNo"
                    onKeyPress={(e) => {
                      if (!/^\d$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    disabled={!isEdit}
                    name="msmeNo"
                    placeholder="Enter MSME Number"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  />
                  <ErrorMessage
                    name="msmeNo"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Type of Service{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    as="select"
                    id="serviceType"
                    disabled={!isEdit}
                    name="serviceType"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  >
                    <option value="">-- Select Service Type --</option>{" "}
                    {/* Default empty option */}
                    {serviceTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="serviceType"
                    component="div"
                    className="text-red-500 text-[0.7vw] absolute bottom-[-1.2vw]"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label className="block text-[0.9vw] font-medium mb-1">
                    Currency Code{" "}
                    <span className="text-red-500 text-[1vw]">*</span>
                  </label>
                  <Field
                    as="select"
                    id="currency"
                    disabled={!isEdit}
                    name="currency"
                    className="w-full border-b border-gray-300 focus:outline-none py-1 text-[0.8vw] placeholder:text-[0.9vw] text-[#323232] placeholder:text-[#32323280]"
                  >
                    <option value="">-- Select Currency --</option>{" "}
                    {/* Default empty option */}
                    {currencyCodes.map((currency) => (
                      <option key={currency.value} value={currency.value}>
                        {currency.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="currency"
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
                    if(!isEdit){
                      return;
                    }
                    //setResetFields(true);
                    resetForm({
                      values: {
                        company: "",
                        owner: "",
                        constitution: "",
                        businessBackground: "",
                        msmeType: "",
                        msmeNo: "",
                        serviceType: "",
                        currency: "",
                      },
                    });
                  }}
                  className="px-6 py-2 border border-black rounded-md text-sm font-medium cursor-pointer"
                >
                  RESET
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
