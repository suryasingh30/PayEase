export const Card = (
  {
    title,
    children
  } : {
    title : string;
    children?: React.ReactNode;
  }
) => {
  return (
    <div className="border p-4">
      <h1 className="text-xl border-b bp-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  )
}