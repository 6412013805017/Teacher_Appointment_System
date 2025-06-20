const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWb1e1KGK21L_IhjajGntboDrfV-1uV74YaAZhoTc-e1XbFkVDkGiqEoy8iyShavnDQg/exec";

export async function getTeacher() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'teacher'})
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function addTimeStot(data) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'addTimeSlot',
        ...data
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}


export async function getTimeSlot(data) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'getTimeSlot',
        ...data
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}


export async function getTimeSlotDate(data) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'getTimeSlotDate',
        ...data
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export async function auth(data) {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'auth',
        ...data
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}


