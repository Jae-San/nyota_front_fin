import { apiFetch } from "./api"

export const getTestStatus = async () => {
  return await apiFetch("/test/status")
}

export const startTest = async () => {
  return await apiFetch("/test/start")
}

export const submitTest = async (answers) => {

  return await apiFetch("/test/submit", {
    method: "POST",
    body: JSON.stringify({
      answers
    })
  })

}