const Header = () => {
  return (
    <div className="fixed top-0 w-full h-16 p-5 z-20 flex justify-between transition-all ease-in duration-500 text-xl font-bold shadow-md bg-[rgba(36,141,116,1)]">
      <h1 className="text-white">TA机間指導支援システム</h1>
      <button className="text-white" onClick={() => window.location.reload()}>
        更新
      </button>
    </div>
  );
};

export default Header;
