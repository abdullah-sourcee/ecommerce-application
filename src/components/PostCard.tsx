type Props = {
  title: string;
  content: string;
};

const PostCard = (props: Props) => {
  const { title, content } = props;

  return (
    <div className='bg-base-100 flex flex-col p-4 w-[550px] rounded-md border border-neutral-300'>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
