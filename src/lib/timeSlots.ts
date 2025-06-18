const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyotR1wfxMBzm-u_kYICmtJsjUHOvdEEUu9wj75xcp5CAnH-uVYFSO_KzQ9SFmAYTiI/exec";

export async function getTeacher() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'get_teacher'})
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}
