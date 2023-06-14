import { apiHelper } from "./apiHelper";


export const getQuestions = async () => {
    const token = `Bearer ${sessionStorage.getItem("token")}`
    try {
    const response = await apiHelper.get("/question");
    return await Promise.resolve(response.data);
    } catch (err) {
    console.log("error while running", err);
    return await Promise.reject(err);
    }
};


export const postRating = async (data) => {
    try {
      const response = await apiHelper.post(`/rating`, data);
      return await Promise.resolve(response.data);
    } catch (err) {
      console.log("error while running", err);
      return await Promise.reject(err);
    }
   };