type Props = {
  href?: string;
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ href, text, className = '', onClick, disabled }: Props) {
  const baseClasses =
    'inline-block px-6 py-3 rounded-lg font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  const fullClass = `${baseClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return href ? (
    <a
      href={href}
      className={fullClass}
      role="button"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {text}
    </a>
  ) : (
    <button onClick={onClick} disabled={disabled} className={fullClass}>
      {text}
    </button>
  );
}
