import { appConstant } from "@/constant";

const HIDE_TAB = [appConstant.AVAILABILITY, appConstant.PROFILE_SETTINGS, appConstant.EDIT_PROFILE];
export const hideTabBar = (route) => {
  return HIDE_TAB.includes(route.name)
    ? () => {
        return null;
      }
    : undefined;
};
