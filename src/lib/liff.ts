// src/lib/liff.js
import { goto } from '$app/navigation';
import liff from '@line/liff';
import { writable } from 'svelte/store';

export const liffInitialized = writable(false);
export const userProfile = writable(null);

export async function initializeLiff(d) {
  try {
    await liff.init({ liffId: "2007594823-0Ylb6O85" });

    liffInitialized.set(true);

    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile();
      userProfile.set(profile);
      if(d === 'teacher') {
        goto('https://6412013805017.github.io/Teacher_Appointment_System/teacher')
      }
    }
  } catch (error) {
    console.error('LIFF initialization failed:', error);
  }
}

export async function login() {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
}

export async function logout() {
  liff.logout();
  userProfile.set(null);
}

export function sendLineMessage(message) {
  if (liff.isApiAvailable('sendMessages')) {
    liff.sendMessages([{
      type: 'text',
      text: message
    }]);
  }
}