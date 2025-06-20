// src/lib/commentService.js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWb1e1KGK21L_IhjajGntboDrfV-1uV74YaAZhoTc-e1XbFkVDkGiqEoy8iyShavnDQg/exec";

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