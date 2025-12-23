export default function UnauthorizedPage() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>403 - Unauthorized</h1>
        <p className='text-lg mb-4'>
          You don't have permission to access this page.
        </p>
        <a href='/' className='text-blue-500 hover:underline'>
          Go back to home
        </a>
      </div>
    </div>
  );
}
