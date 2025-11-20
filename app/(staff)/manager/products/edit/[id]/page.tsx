import EditProduct from './EditProduct';

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditProduct productID={id} />;
}

export default page;
