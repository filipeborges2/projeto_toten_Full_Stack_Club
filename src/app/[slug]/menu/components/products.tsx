import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface ProductsProps {
    products: Product[];
}

const Products = ({products}:ProductsProps) => {
    return (  
    <div className="space-y-3 px-5">
        {products.map((product) => ( 
            <Link 
            key={product.id}
            href="/"
            className="flex items-centes gap-10 justify-between  border-b py-5"
            >
                {/* ESQUREDA */}
                <div>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    {/* O line-clamp-2 é uma classe do tailwind que limita o texto a 2 linhas */}
                    <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                    {/* Função nativa do JS que formata o valor para a moeda brasileira */}
                    <p className="pt-3 text-sm font-semibold">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.price)}</p>
                </div>
                {/* DIREITA */}
                <div className="relative min-h-[82px] min-w-[120px]">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="rounded-lg object-contain" //rounded-lg serve para colocar bordas arredondadas
                    />

                </div>
        </Link>
        ))}      
    </div>
    );
    
};
 
export default Products;