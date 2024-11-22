import { getCollectionProducts } from "@lib/bigcommerce";

export const revalidate = 60
 
export async function GET() {
  const data = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });
  
  const posts = data
 
  return Response.json(posts)
}