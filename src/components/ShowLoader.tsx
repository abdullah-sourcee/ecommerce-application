type Props = {
  title: string;
};

const ShowLoader = ({ title = ''}: Props) => {
  // const { title = '' } = props;

  return (
    <div className='flex justify-center items-center min-h-screen'>
      Loading {title}...
    </div>
  );
};

export default ShowLoader;
