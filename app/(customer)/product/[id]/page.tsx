import ProductDetail from './ProductDetails';

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetail data={id} />;
}

export default page;
