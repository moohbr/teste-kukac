function PasswordInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-old-rose-700"
        >
          Senha
        </label>
        <div className="text-sm">
          <a
            href="https://youtu.be/dQw4w9WgXcQ"
            className="font-semibold text-old-rose-600 hover:text-old-rose-500"
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type="password"
          required={true}
          autoComplete="current-password"
          value={value}
          onChange={onChange}
          className="shawdow-inner mt-1 w-full rounded-md border-old-rose-200 bg-old-rose-50 text-sm text-old-rose-700 shadow-sm shadow-old-rose-950 focus:border-old-rose-500 focus:ring-old-rose-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default PasswordInput;
