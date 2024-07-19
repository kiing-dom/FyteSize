import { create } from 'zustand';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

interface UserData {
  activityLevel: string;
  age: number;
  bmr: number;
  boxingLevel: string;
  currentWeight: string;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  height: string;
  lastName: string;
  location: string;
  password: string;
  tdee: string;
  userId: string;
  weightGoal: string;
}

interface UserStore {
  userData: UserData | null;
  loading: boolean;
  error: Error | null;
  setUserData: (newData: Partial<UserData>) => Promise<void>;
  fetchUserData: () => Promise<void>;
  clearUserData: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  userData: null,
  loading: false,
  error: null,

  setUserData: async (newData) => {
    set({ loading: true, error: null });
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      set({ error: new Error('No user is currently authenticated'), loading: false });
      return;
    }

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, newData, { merge: true });
      set({ userData: { ...newData, userId: currentUser.uid } as UserData, loading: false });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },

  fetchUserData: async () => {
    set({ loading: true, error: null });
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      set({ error: new Error('No user is currently authenticated'), loading: false });
      return;
    }

    console.log(`Fetching user data for userId: ${currentUser.uid}`);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log('User data fetched successfully:', userSnap.data());
        set({ userData: userSnap.data() as UserData, loading: false });
      } else {
        console.log('No user data found');
        set({ userData: null, loading: false });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      set({ error: error as Error, loading: false });
    }
  },

  clearUserData: () => {
    set({ userData: null });
  }
}));

export default useUserStore;
