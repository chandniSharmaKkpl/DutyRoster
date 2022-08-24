import * as API from "@/api/user";
import axios from "axios";
export const ViewProfile = async (params) => {
  try {
    const res = await API.user(params);
    // console.log(":::::::::: ViewProfile ::::::::::", res);
    return res.data;
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

export const UpdateProfile = async (params) => {
  try {
    console.log(
      ":::::::: UpdateProfile ::::::: 666666 ====>",
      JSON.stringify(params, null, 4)
    );
    var data = new FormData();
    data.append("title", "Chandani");
    data.append("name", "Sharma");
    data.append("dob", "2022-07-13");
    data.append("email", "emp1@yopmail.com");
    data.append("phone", "3693693699");
    data.append("address", "test12");
    data.append("tfn_number", "123456");
    data.append("employee_id", "1");
    data.append("password", "Password@1");

    var config = {
      method: "post",
      url: "https://2exceltest.com.au:8443/dodee/api/edit-profile",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNTg5MWMxOGQzMGFkZTMyYzdmMzBjMGU2OGM4ODAyYjY0M2QxNjE1MWFjM2Y4ZDc2NzQ1YzBjYjEyZGExOWI0NjFmYjNjNGM0MjVhMWZlMWYiLCJpYXQiOjE2NjEzMTY3ODAuNTEyMzYyMDAzMzI2NDE2MDE1NjI1LCJuYmYiOjE2NjEzMTY3ODAuNTEyMzYzOTEwNjc1MDQ4ODI4MTI1LCJleHAiOjE2OTI4NTI3ODAuNTA3NDI2MDIzNDgzMjc2MzY3MTg3NSwic3ViIjoiMSIsInNjb3BlcyI6W119.0tJJ_y9qGmmcG0lNrQwZOunISumkXnZ4w3BQUVVBIrCBgy7EGQltsBmEYiHkduiDZDDzVqPFD3r4ypZ3gFnH0teC4UYlQEIyEgCzOH7TZY0zcRNhTFQd-Cf1IGg7ZaCqLlGm3nYPjBKlkXfF3L3o9Qur0YE36-snHtyREGNBxbaDKgRw5fQjCpxQQHOqcV8R8dGYOscxWFmStsaQWA6GnVn2KSp5XvE-vfgSahLHenGfAeIK2NX7XQUKzBOwPBTmS97i_fBa9_daM5kcjhfm2QOSdQ18JysHk2UXY_fwBONbho7x4DlPbm1QQc9f1DQ_muyrF6oT_fJIX39IwwrB6EjcIqyUAkt8By2OdyoOzuvqOuYUq3bk1uwHRiClThlbuu04vk1EWGifUvuioHJgX33x_0Jj10MRDuKUjqC3R2UltVjvXZQj9p9xFAgwFVTOuMPHLaDeJcR1NHaXwy9iyNDq0-mGt63Jjp-E17obXLnXO8HgVjWEqnaXEYZz2XLw4U-j81YNs_ZGs6xeBYPLk_5C1JlM5zlqvyvxpbGY2g7zjqYniwJntSAhB3oYr_75LtgqKEyhnLh-4hRI2h0W4CJsPmij6IR8nQjJZrx3QT0EwkR2OamhkA_VdgJYvBj_LwTff-McbTm88kpMXEolaqL5kF6E9OE1OoxdS_234j4",
        ...data.getHeaders(),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log('API RES',JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  } catch (error) {
    console.log("Update Profile API ==> error", JSON.stringify(error, null, 4));
  }
};
