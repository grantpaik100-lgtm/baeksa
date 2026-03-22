export const saveSurvey = (data: any) => {
  localStorage.setItem("baeksa-survey", JSON.stringify(data));
};