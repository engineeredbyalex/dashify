interface ButtonProps {
  content: string;
  route: string;
  style: string;
}

export default function Button({ content, style }: ButtonProps) {
  return <button className={`${style}`}>{content}</button>;
}
