export async function POST(request: Request) {
  try {
    // console.log(request);
    const formData = await request.formData();
    // const { email, password } = body;

    // Call backend API
    const backendResponse = await fetch(
      'http://localhost:8000/api/v1/auth/signup',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!backendResponse.ok) {
      // Get the actual error from backend
      const errorData = await backendResponse.json();
      console.log('Backend error:', errorData);
      
      return new Response(JSON.stringify({ 
        error: errorData.message || 'Signup failed',
        details: errorData,
        statusCode: backendResponse.status
      }), {
        status: backendResponse.status, // Return the actual status (409, etc.)
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await backendResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Signup API error:', error);
    return new Response(JSON.stringify({ error: 'Signup failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
