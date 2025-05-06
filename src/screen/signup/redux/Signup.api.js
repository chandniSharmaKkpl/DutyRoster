
import * as API from "@/api/auth";

export const SignupCall = async ({params}) => {
  try {
    const res = await API.singup(params);
    return res;
  } catch (error) {
    throw error;
  }
};
