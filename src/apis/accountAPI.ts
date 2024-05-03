import instance from "@/utils/axiosCustomize";

//get all users
export const callFetchUser = () => {
  return instance.get(`/users/all`);
}
//delete account
export const callDeleteAccount = (id) => {
  return instance.delete(`/users/${id}`);
}
//get detail account information
export const fetchAccount = (id) => {
  return instance.get(`/users/${id}`);
}