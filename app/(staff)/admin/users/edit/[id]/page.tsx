import EditUser from './EditUser';

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditUser userId={id} />;
}

export default page;
