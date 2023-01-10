const UserScore = (props: { username: string; score: number }) => {
  const { username, score } = props;

  return (
    <div
      className="h-30 mx-6
              mt-4
             block flex
             cursor-pointer flex-col items-center justify-center rounded-xl bg-white
             pt-3 pb-1 text-2xl font-medium shadow-md"
    >
      {username} : {score} point
    </div>
  );
};

export default UserScore;
