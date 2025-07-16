// components/GoogleSignInButton.tsx
import React from 'react';

export default function GoogleSignInButton() {
  const googleAuthUrl = `${process.env.NEXT_PUBLIC_WS_API_URL}/auth/google`;

  return (
    <a
      href={googleAuthUrl}
      className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 533.5 544.3"
        className="h-5 w-5"
      >
        <path
          fill="#4285f4"
          d="M533.5 278.4c0-17.5-1.4-34.2-4-50.5H272v95.6h147.2c-6.4 34.7-26 64.2-55.4 84v69.9h89.3c52-48 81.9-118.3 81.9-199z"
        />
        <path
          fill="#34a853"
          d="M272 544.3c73.9 0 135.9-24.5 181.2-66.5l-89.3-69.9c-24.9 16.8-57 26.7-91.9 26.7-70.7 0-130.7-47.8-152.3-112.2H27.8v70.7c45.6 90 139 151.2 244.2 151.2z"
        />
        <path
          fill="#fbbc04"
          d="M119.7 324.4c-11.7-34.8-11.7-72.2 0-107l-89.5-70.7C7.9 196.7 0 232 0 268c0 36 7.9 71.3 30.2 101.3l89.5-70.9z"
        />
        <path
          fill="#ea4335"
          d="M272 106.1c39.8 0 75.5 13.7 103.7 40.7l77.6-77.6C402.6 25.5 344.7 0 272 0 166.8 0 73.4 61.3 27.8 151.5l89.5 70.7c21.5-64.4 81.5-112.2 154.7-112.2z"
        />
      </svg>
      Continuer avec Google
    </a>
  );
}
