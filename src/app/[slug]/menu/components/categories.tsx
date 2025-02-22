"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {  Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Products from "./products";


interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
      include: {
        menuCategaries: {
          include: { products: true };
        };
      };
    }>;
  }

  type MenuCategory = Prisma.MenuCategoryGetPayload<{
    include: {
      products: true;
    };
  }>;

const RestaurantCategories = ({restaurant}: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(restaurant.menuCategaries[0]);
    const handleCategoryClick = (category: MenuCategory) => {
      return  setSelectedCategory(category);
    }
    const getCategoryButtonVariant = (category: MenuCategory) => {
         return selectedCategory.id === category.id ? "default" : "secondary"
    };

    return ( 
        <div>
            <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl  bg-white">
                <div className="p-5">
                <div className="flex items-center gap-3">
                    <Image src= {restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45}/>
                    <div>
                        <h2 className="font-semibold text-lg">{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>
                </div>
            </div>
            <div className="  flex items-center gap-1 text-xs text-green-500 p-3 m">
                        <ClockIcon size={12}/>
                        <p>Aberto!</p>
                    </div>
                </div>
                
                    <ScrollArea className="w-full ">
                        <div className="flex w-max space-x-4 p-4 pt-0">
                            {restaurant.menuCategaries.map(category => (
                             
                                <Button onClick={() => handleCategoryClick(category)} key={category.id} variant={
                                    getCategoryButtonVariant(category)
                                } size="sm" className="rounded-full">
                                    {category.name}
                                </Button>
                            ))} 
                        </div>
                        <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                            <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
                        <Products products={selectedCategory.products}/> 
        </div> 
     );
};
 
export default RestaurantCategories;