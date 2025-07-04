import Link from 'next/link';

type LinkButtonProps = {
  href: string;
  buttonText: string | undefined;
  className?: string | undefined;
};

export default function LinkButton({
  href,
  buttonText,
  className = undefined,
}: LinkButtonProps) {
  let classNames = 'transition-colors hover:text-neutral-300';

  if (className != undefined) {
    classNames += ' ' + className;
  }
  return (
    <Link href={href}>
      <button className={classNames}>{buttonText}</button>
    </Link>
  );
}
