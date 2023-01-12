import { useNavigate } from 'react-router-dom';

const ghoststoryitem = (props: { storyname: string; path: string }) => {
  const { storyname, path } = props;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(path);
      }}
      className="mx-6 mt-4
          block
         flex h-20
         cursor-pointer flex-col items-center justify-center rounded-xl bg-white
         bg-slate-400 pt-3 pb-1 text-2xl font-medium shadow-md hover:bg-sky-700"
    >
      {storyname}
    </div>
  );
};

export default ghoststoryitem;
