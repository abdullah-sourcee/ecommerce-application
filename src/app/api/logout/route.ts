import { cookies } from 'next/headers';

import { backendApi } from '@/lib/axios';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const token = cookieStore.get('token')?.value;
    const role = cookieStore.get('role')?.value;

    if (!refreshToken || !token || !role) {
      return new Response(JSON.stringify({ message: 'No user is logged in' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // const backendResponse = await fetch(
    //   'http://localhost:8000/api/v1/auth/logout',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ refreshToken }),
    //   }
    // );

    let backendResponse = null;
    try {
      backendResponse = await backendApi.post(
        '/auth/logout',
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Logout API failed:', error);
    }

    // console.log('response is::', backendResponse?.data);
    // if (!backendResponse.ok) {
    //   throw new Error(`Backend API returned ${backendResponse.status}`);
    // }
    // const data = await backendResponse.json();
    cookieStore.delete('token');
    cookieStore.delete('refreshToken');
    cookieStore.delete('role');
    // return new Response(JSON.stringify(backendResponse), {
    // ✅ Correct: Only stringify the data returned by the backend
    return new Response(
      JSON.stringify(backendResponse?.data || { message: 'Success' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Logout API error:', error);
    return new Response(JSON.stringify({ error: 'Logout failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
