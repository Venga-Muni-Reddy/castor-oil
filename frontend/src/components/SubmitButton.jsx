const SubmitButton = ({
  title,
  loading
}) => {

  return (
    <button
      disabled={loading}
      className="
        w-full
        bg-emerald-600
        hover:bg-emerald-700
        text-white
        py-3
        rounded-lg
        font-semibold
      "
    >
      {loading
        ? "Please wait..."
        : title}
    </button>
  );
};

export default SubmitButton;