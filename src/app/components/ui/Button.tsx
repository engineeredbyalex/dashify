import Link from "next/link";

interface ButtonProps {
  route: string;
  text: string;
  style: string;
}

export default function Button({ route, text, style }: ButtonProps) {
  return (
    <Link href={route}>
      <button className={`${style}`}>{text}</button>
    </Link>
  );
}
