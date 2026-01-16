import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    //   const cookieStore = await cookies();
    //   const refreshToken = cookieStore.get('refreshToken')?.value;
    //   // console.log('refresh token is::', refreshToken);
    //   const backendResponse = await backendApi.post(
    //     '/auth/refresh-token',
    //     { refreshToken },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );

    //   const data = backendResponse.data;
    //   console.log('data is:::::', data);
    //   cookieStore.set('token', data.data.user.accessToken, { secure: true });
    //   if (data.user.refreshToken) {
    //     cookieStore.set('refreshToken', data.data.user.refreshToken, { secure: true });
    //   }

    //   // const accessToken = cookieStore.get('token')?.value;

    //   return new Response(JSON.stringify(data), {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // } catch (error) {
    //   console.error('Refresh Token API error:', JSON.stringify(error));
    //   return new Response(JSON.stringify({ error: 'Token refresh failed' }), {
    //     status: 500,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    // Use fetch directly instead of backendApi to avoid interceptor loop
    const backendResponse = await fetch(
      'http://localhost:8000/api/v1/auth/refresh-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!backendResponse.ok) {
      throw new Error(`Backend API returned ${backendResponse.status}`);
    }

    const data = await backendResponse.json();
    console.log('data is:::::', data);
    cookieStore.set('token', data.data.user.accessToken, { secure: true });
    if (data.data.user.refreshToken) {
      cookieStore.set('refreshToken', data.data.user.refreshToken, {
        secure: true,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Refresh Token API error:', JSON.stringify(error));
    return new Response(JSON.stringify({ error: 'Token refresh failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
