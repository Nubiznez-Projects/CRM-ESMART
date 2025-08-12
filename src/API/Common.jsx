import axios from "axios";
import { fetchCustomers } from "../Redux/Slice/MasterModule/Customers/CustomerThunks";
import { fetchRoles } from "../Redux/Slice/MasterModule/Roles/RoleThunks"; // adjust imports as needed
import { toast } from "react-toastify";
import { fetchSuppliers } from "../Redux/Slice/MasterModule/Suppliers/SupplierThunks";
import { fetchEmployee } from "../Redux/Slice/UserManagement/EmployeeThunk";
import { fetchClient } from "../Redux/Slice/UserManagement/ClientThunk";

export const Deleteall = async (
  api,
  dispatch,
  module,
  filter,
  setPermission,
  CurrentTab,
  listType
) => {
  try {
    const response = await axios.delete(api);

    switch (module) {
      case "customer":
        dispatch(fetchCustomers());
        break;
      case "roles":
        dispatch(fetchRoles());
        break;
      case "supplier":
        dispatch(fetchSuppliers());
        break;
      case "Employee":
        dispatch(fetchEmployee());
        break;
      case "clients":
        dispatch(fetchClient());
        break;
    }

    toast.success(response.data.message || "Deleted successfully");
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.error || // custom error message
      error.response?.data?.message || // fallback if backend uses 'message'
      "Failed to delete. Please try again."; // default message

    toast.error(errorMsg);
    throw error;
  }
};
