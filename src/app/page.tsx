import AllPosts from "@/components/AllPosts/AllPosts";



export default function HomeHeader() {

  return (
    <>
<div className="container ">
{/* 
    <AsideFilteration categories={categories} /> */}
  
  <div className="pt-20 lg:pt-0 lg:pr-20">
    <AllPosts />
  </div>
</div>
    
      </>
  );
}
