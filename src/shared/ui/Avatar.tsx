type AvatarType = {
  children: string;
};

export const Avatar = ({ children }: AvatarType) => {
  return (
    <div className="w-10 h-10 bg-indigo-400 rounded-full flex justify-center items-center">
      <span className="text-white text-xl font-bold uppercase select-none">{children}</span>
    </div>
  );
};
