declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpeg" {
  const content: any;
  export default content;
}

type ProductsProps = {
  id: string;
  name: string;
  quantity: string;
  price: string;
  category: string;
  image?: string;
  createdAt: string;
};