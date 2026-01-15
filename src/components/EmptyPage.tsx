type Props = {
  message: string;
};

const EmptyPage = ({ message }: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      No {message} found
    </div>
  );
};

export default EmptyPage;
