export default async function MySetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
