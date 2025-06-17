// src/lib/commentService.js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyotR1wfxMBzm-u_kYICmtJsjUHOvdEEUu9wj75xcp5CAnH-uVYFSO_KzQ9SFmAYTiI/exec";

export async function addComment(commentData) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'add',
        ...commentData
      })
    });
    console.log("test")
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function getComments() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'get' })
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}