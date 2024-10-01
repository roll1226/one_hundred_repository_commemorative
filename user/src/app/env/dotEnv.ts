const DEVELOPMENT = "development";

type FirebaseConfigEnvType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export interface DotEnvInterface {
  getFirebaseConfig: () => FirebaseConfigEnvType;
  isFirebaseEmulator: () => boolean;
  getFirestoreGraphQLEndpoint: () => string;
}

class DotEnv implements DotEnvInterface {
  getFirebaseConfig = () => {
    return {
      apiKey: import.meta.env.VITE_PUBLIC_API_KEY,
      authDomain: import.meta.env.VITE_PUBLIC_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_PUBLIC_PROJECT_ID,
      storageBucket: import.meta.env.VITE_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_PUBLIC_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_PUBLIC_APP_ID,
      measurementId: import.meta.env.VITE_PUBLIC_MEASUREMENT_ID,
    };
  };

  isFirebaseEmulator = () => {
    return Boolean(import.meta.env.VITE_PUBLIC_USE_FIREBASE_EMULATOR);
  };

  getFirestoreGraphQLEndpoint = () => {
    const mode = import.meta.env.MODE;
    console.log(import.meta.env.VITE_PUBLIC_MEASUREMENT_ID);
    console.table(import.meta.env);

    if (mode === DEVELOPMENT)
      return import.meta.env.VITE_FIRESTORE_GRAPHQL_EMULATOR_ENDPOINT;

    return import.meta.env.VITE_FIRESTORE_GRAPHQL_ENDPOINT;
  };
}

export const env = new DotEnv();
