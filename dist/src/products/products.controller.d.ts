import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto/product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(filters: ProductFilterDto): Promise<{
        data: ({
            category: {
                name: string;
                slug: string;
            };
            variants: {
                id: string;
                color: string;
                colorHex: string | null;
                size: string;
                priceOffset: number;
                inventory: number;
            }[];
            images: {
                id: string;
                order: number;
                productId: string;
                url: string;
                alt: string | null;
                isMain: boolean;
            }[];
            _count: {
                reviews: number;
            };
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string;
            fabricDetails: string | null;
            careInstructions: string | null;
            basePrice: number;
            isFeatured: boolean;
            isActive: boolean;
            categoryId: string;
            collectionId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getFeatured(limit?: number): Promise<({
        variants: {
            color: string;
            colorHex: string | null;
        }[];
        images: {
            id: string;
            order: number;
            productId: string;
            url: string;
            alt: string | null;
            isMain: boolean;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        fabricDetails: string | null;
        careInstructions: string | null;
        basePrice: number;
        isFeatured: boolean;
        isActive: boolean;
        categoryId: string;
        collectionId: string | null;
    })[]>;
    findBySlug(slug: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
            parentId: string | null;
        };
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        reviews: ({
            user: {
                firstName: string;
                lastName: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            productId: string;
            rating: number;
            title: string | null;
            content: string;
            isApproved: boolean;
        })[];
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            sku: string;
            barcode: string | null;
            color: string;
            colorHex: string | null;
            size: string;
            priceOffset: number;
            inventory: number;
        }[];
        images: {
            id: string;
            order: number;
            productId: string;
            url: string;
            alt: string | null;
            isMain: boolean;
        }[];
        videos: {
            id: string;
            order: number;
            productId: string;
            url: string;
            thumbnail: string | null;
        }[];
        _count: {
            reviews: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        fabricDetails: string | null;
        careInstructions: string | null;
        basePrice: number;
        isFeatured: boolean;
        isActive: boolean;
        categoryId: string;
        collectionId: string | null;
    }>;
    getRelated(id: string, limit?: number): Promise<({
        variants: {
            color: string;
            colorHex: string | null;
        }[];
        images: {
            id: string;
            order: number;
            productId: string;
            url: string;
            alt: string | null;
            isMain: boolean;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        fabricDetails: string | null;
        careInstructions: string | null;
        basePrice: number;
        isFeatured: boolean;
        isActive: boolean;
        categoryId: string;
        collectionId: string | null;
    })[]>;
    create(dto: CreateProductDto): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
            parentId: string | null;
        };
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            sku: string;
            barcode: string | null;
            color: string;
            colorHex: string | null;
            size: string;
            priceOffset: number;
            inventory: number;
        }[];
        images: {
            id: string;
            order: number;
            productId: string;
            url: string;
            alt: string | null;
            isMain: boolean;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        fabricDetails: string | null;
        careInstructions: string | null;
        basePrice: number;
        isFeatured: boolean;
        isActive: boolean;
        categoryId: string;
        collectionId: string | null;
    }>;
    update(id: string, dto: UpdateProductDto): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
            parentId: string | null;
        };
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        variants: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            sku: string;
            barcode: string | null;
            color: string;
            colorHex: string | null;
            size: string;
            priceOffset: number;
            inventory: number;
        }[];
        images: {
            id: string;
            order: number;
            productId: string;
            url: string;
            alt: string | null;
            isMain: boolean;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        fabricDetails: string | null;
        careInstructions: string | null;
        basePrice: number;
        isFeatured: boolean;
        isActive: boolean;
        categoryId: string;
        collectionId: string | null;
    }>;
    updateVariant(id: string, dto: {
        inventory: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sku: string;
        barcode: string | null;
        color: string;
        colorHex: string | null;
        size: string;
        priceOffset: number;
        inventory: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string;
        fabricDetails: string | null;
        careInstructions: string | null;
        basePrice: number;
        isFeatured: boolean;
        isActive: boolean;
        categoryId: string;
        collectionId: string | null;
    }>;
}
