const InputField = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
  errors
}) => {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-3
          outline-none
          focus:border-emerald-500
        "
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default InputField;