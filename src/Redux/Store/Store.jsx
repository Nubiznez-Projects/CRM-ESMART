// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "../Slice/MasterModule/Customers/CustomerSlice";
import supplierReducer from "../Slice/MasterModule/Suppliers/SupplierSlice";
import rolesReducer from "../Slice/MasterModule/Roles/RoleSlice";
import employee from "../Slice/UserManagement/EmployeeSlice";
import ClientReducer from "../Slice/UserManagement/ClientSlice";
import authReducer from "../Slice/Login/LoginSlice";
import requestList from "../Slice/RequestManagement/RequestSlice";
import subscriptionList from "../Slice/Subscription/SubscriptionSlice";


export const store = configureStore({
  reducer: {
    customers: customersReducer,
    supplier: supplierReducer,
    roles: rolesReducer,
    employee: employee,
    clients: ClientReducer,
    auth: authReducer,    
    request: requestList,
    subscription: subscriptionList
  },
});
