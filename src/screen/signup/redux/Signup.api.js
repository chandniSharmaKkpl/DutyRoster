
import * as API from "@/api/auth";

export const SignupCall = async ({params}) => {
  try {
    const res = await API.singup(params);
    console.log(res , 'response in API');
    return res;
  } catch (error) {
    throw error;
  }
};
