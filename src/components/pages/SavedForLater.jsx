import React from 'react';

const SavedForLater = () => {
  const items = [
    { id: 1, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50 },
    { id: 2, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50 },
    { id: 3, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50 },
    { id: 4, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Saved for later</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <img 
                src="https://images.unsplash.com/photo-1578328819058-b69f3a1b0f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-xl font-bold my-2">${item.price.toFixed(2)}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Move to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;