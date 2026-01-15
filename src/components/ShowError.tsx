type Props = {
  message: string;
};

const ShowError = ({ message }: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      {message}
    </div>
  );
};

export default ShowError;
