import { createContext, useContext, useState, useEffect } from "react";
import Products from "../data/Products";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Core state
  const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || null);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : Products;
  });

  // Responsive-aware state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const currentUser = localStorage.getItem("currentUser") || "Guest";

  // Cart Functions
  const addToCart = (product) => {
    if (userRole === "admin") {
      alert("Admin cannot add items to the cart.");
      return;
    }
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, amount) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);
  

  // Order Functions
  const placeOrder = (orderDetails) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const newOrder = {
      id: Date.now().toString(),
      user: currentUser,
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Pending",
      date: new Date().toISOString(),
      ...orderDetails,
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    clearCart();
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Product Functions
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: Date.now(), ...newProduct },
    ]);
  };

  const updateProductStock = (id, change) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, stock: Math.max(product.stock + change, 0) }
          : product
      )
    );
  };

  // Responsive utility functions
  const getDisplayItems = (items, limit = isMobile ? 5 : 10) => {
    return items.slice(0, limit);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole: (role) => {
          localStorage.setItem("userRole", role);
          setUserRole(role);
        },
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        setOrders,
        placeOrder,
        updateOrderStatus,
        currentUser,
        products,
        setProducts,
        addProduct,
        updateProductStock,
        // Responsive values
        windowWidth,
        isMobile,
        getDisplayItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
