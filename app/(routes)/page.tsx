import Container from "@/components/ui/Container"
import Billboard from "@/components/Billboard";
import getBillboard from "@/actions/getBillBoards";
import getProducts from "@/actions/getProducts";
import ProductList from "@/components/ProductList";
export const revalidate = 0;
const HomePage = async() => {

  const products = await getProducts({isFeatured:true});
  const billboard = await getBillboard("fcc360c0-13b1-48d4-a715-c283dc40e8d9")
  return <Container>
    <div className="space=y-10 pb-10">
      <Billboard data={billboard}/>
    
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList title="Featured Products" items={products} />
    </div>
    </div>
  </Container>
};

export default HomePage;
