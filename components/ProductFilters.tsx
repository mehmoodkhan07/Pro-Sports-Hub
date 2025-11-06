import React from "react";

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedPrice: number | null;
  onPriceChange: (price: number) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategories,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
}) => {
  const categories = [
    "Football",
    "Basketball",
    "Shoes",
    "Accessories",
    "Badminton",
    "Cricket",
    "Tennis",
    "Boxing",
    "Fitness",
    "Skating",
  ];

  const priceRanges = [30, 50, 100, 150];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-amber-700">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label
              key={category}
              className="flex items-center gap-2 text-gray-700 hover:text-amber-700 transition"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                className="accent-amber-600 cursor-pointer"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-700">Price (up to)</h3>
        <div className="space-y-2">
          {priceRanges.map(price => (
            <label
              key={price}
              className="flex items-center gap-2 text-gray-700 hover:text-amber-700 transition"
            >
              <input
                type="radio"
                name="price"
                checked={selectedPrice === price}
                onChange={() => onPriceChange(price)}
                className="accent-amber-600 cursor-pointer"
              />
              ${price}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
