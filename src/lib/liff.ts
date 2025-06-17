// src/lib/liff.js
import liff from '@line/liff';
import { writable } from 'svelte/store';

export const liffInitialized = writable(false);
export const userProfile = writable(null);

export async function initializeLiff() {
  try {
    await liff.init({ liffId: "2007594823-0Ylb6O85" });

    liffInitialized.set(true);

    if (liff.isLoggedIn()) {
      const profile = await liff.getProfile();
      userProfile.set(profile);
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