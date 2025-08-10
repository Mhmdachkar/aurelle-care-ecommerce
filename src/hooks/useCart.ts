import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useMetaPixel } from './useMetaPixel';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  product_name: string;
  variant: string;
  quantity: number;
  price: string;
  currency: string;
  image_url: string;
}

const GUEST_CART_KEY = 'aurella_guest_cart';

// Global cart state to force updates across all components
let globalCartItems: CartItem[] = [];
let globalCartCount = 0;
let lastNotifiedCount = -1; // Track last notified count to prevent duplicates
const cartListeners: (() => void)[] = [];

const notifyCartChange = () => {
  // Only notify if count actually changed
  if (globalCartCount !== lastNotifiedCount) {
    console.log('🔄 Cart changed - notifying all listeners:', globalCartCount);
    lastNotifiedCount = globalCartCount;
    cartListeners.forEach(listener => listener());
  } else {
    console.log('⏸️ Skipping cart notification - count unchanged:', globalCartCount);
  }
};

export const useCart = () => {
  const { user } = useAuth();
  const { trackAddToCart } = useMetaPixel();
  const [cartItems, setCartItems] = useState<CartItem[]>(globalCartItems);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(globalCartCount);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const isUpdatingRef = useRef(false);
  const lastUserStateRef = useRef<any>(null);
  const hasFetchedRef = useRef(false);
  const lastFetchedUserIdRef = useRef<string | null>(null);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSubscribedRef = useRef(false);
  const lastEffectRunRef = useRef<number>(0);

  // Track user state changes with more robust comparison
  useEffect(() => {
    const previousUserId = lastUserStateRef.current?.id || null;
    const currentUserId = user?.id || null;
    const userChanged = previousUserId !== currentUserId;
    
    // Only log when there's an actual change
    if (userChanged) {
      console.log('👤 User state change:', { 
        from: previousUserId ? 'logged-in' : 'guest', 
        to: currentUserId ? 'logged-in' : 'guest',
        changed: userChanged,
        previousUserId,
        currentUserId
      });
      
      lastUserStateRef.current = user;
      hasFetchedRef.current = false; // Reset fetch flag when user changes
      lastFetchedUserIdRef.current = null; // Reset user-specific fetch tracking
    }
  }, [user?.id]); // Only depend on user ID, not the entire user object

  // Subscribe to global cart changes (only once)
  useEffect(() => {
    if (isSubscribedRef.current) return;
    
    const updateCart = () => {
      // Only update if cart count actually changed
      if (cartCount !== globalCartCount) {
        console.log('📦 Updating cart state:', globalCartCount);
        setCartItems([...globalCartItems]);
        setCartCount(globalCartCount);
        setUpdateTrigger(prev => prev + 1);
      }
    };

    cartListeners.push(updateCart);
    isSubscribedRef.current = true;

    return () => {
      const index = cartListeners.indexOf(updateCart);
      if (index > -1) {
        cartListeners.splice(index, 1);
      }
      isSubscribedRef.current = false;
    };
  }, []); // Empty dependency array - subscribe only once

  // Get guest cart from localStorage
  const getGuestCart = (): CartItem[] => {
    try {
      const stored = localStorage.getItem(GUEST_CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading guest cart:', error);
      return [];
    }
  };

  // Save guest cart to localStorage
  const saveGuestCart = (items: CartItem[]) => {
    try {
      console.log('💾 Saving guest cart to localStorage:', items.length, 'items');
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
      
      // Verify it was saved
      const saved = localStorage.getItem(GUEST_CART_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      console.log('✅ Verified saved cart:', parsed.length, 'items');
    } catch (error) {
      console.error('❌ Error saving guest cart:', error);
    }
  };

  // Generate unique ID for guest cart items
  const generateGuestId = () => {
    return crypto.randomUUID();
  };

  // Update global cart state
  const updateGlobalCart = (newItems: CartItem[]) => {
    globalCartItems = newItems;
    globalCartCount = newItems.reduce((total, item) => total + item.quantity, 0);
    console.log('🛒 Global cart updated:', { items: globalCartItems.length, count: globalCartCount });
    notifyCartChange();
  };

  // Real-time cart synchronization
  const syncCartFromDatabase = useCallback(async () => {
    if (!user || isUpdatingRef.current) return;
    
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const mappedItems = (data || []).map(item => ({
        ...item,
        image_url: item.image_url || '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png'
      }));
      
      updateGlobalCart(mappedItems);
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  }, [user]);

  const fetchCartItems = async () => {
    // Don't override cart if we're currently updating
    if (isUpdatingRef.current) {
      console.log('⏸️ Skipping fetch - currently updating cart');
      return;
    }
    
    const currentUserId = user?.id || 'guest';
    
    // Don't fetch if we already fetched for this specific user
    if (lastFetchedUserIdRef.current === currentUserId) {
      console.log('⏸️ Skipping fetch - already fetched for user:', currentUserId);
      return;
    }
    
    console.log('🔄 Fetching cart items for user:', user ? 'logged-in' : 'guest');
    lastFetchedUserIdRef.current = currentUserId;
    hasFetchedRef.current = true;
    
    if (!user) {
      // For guest users, load from localStorage
      const guestCart = getGuestCart();
      console.log('👤 Guest cart loaded:', guestCart.length, 'items');
      updateGlobalCart(guestCart);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      // Map the data to ensure image_url is present, fallback to Rose image if missing
      const mappedItems = (data || []).map(item => ({
        ...item,
        image_url: item.image_url || '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png'
      }));
      updateGlobalCart(mappedItems);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cart items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Migrate guest cart to user cart when logging in
  const migrateGuestCart = async () => {
    if (!user) return;
    
    const guestCart = getGuestCart();
    if (guestCart.length === 0) {
      console.log('📦 No guest cart to migrate');
      return;
    }

    console.log('🔄 Migrating guest cart to user account:', guestCart.length, 'items');
    setLoading(true);
    
    try {
      // For each guest cart item, add to user's database cart
      for (const guestItem of guestCart) {
        const { id, ...itemData } = guestItem; // Remove guest ID
        
        // Check if item already exists in user cart
        const { data: existingItems } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_name', guestItem.product_name)
          .eq('variant', guestItem.variant)
          .eq('currency', guestItem.currency);

        if (existingItems && existingItems.length > 0) {
          // Update quantity if item exists
          console.log('🔄 Updating existing item in user cart');
          await supabase
            .from('cart_items')
            .update({ quantity: existingItems[0].quantity + guestItem.quantity })
            .eq('id', existingItems[0].id);
        } else {
          // Add new item
          console.log('➕ Adding new item to user cart');
          // Remove id from itemData to let database generate UUID
          const { id, ...insertData } = itemData;
          await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              ...insertData
            });
        }
      }

      // Clear guest cart after migration
      localStorage.removeItem(GUEST_CART_KEY);
      console.log('🗑️ Cleared guest cart after migration');
      
      // Fetch updated cart from database
      await fetchCartItems();
      
      toast({
        title: "Cart Updated! 🎉",
        description: `${guestCart.length} item(s) added to your account cart`
      });
      
    } catch (error) {
      console.error('❌ Error migrating guest cart:', error);
      toast({
        title: "Migration Error",
        description: "Failed to transfer guest cart items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = useCallback(async (item: Omit<CartItem, 'id'>) => {
    console.log('➕ Adding to cart:', item);
    isUpdatingRef.current = true;
    
    if (!user) {
      // Guest user - use localStorage
      console.log('👤 Guest user adding to cart');
      const currentCart = getGuestCart();
      console.log('📦 Current guest cart before add:', currentCart.length, 'items');
      
      // Check if item already exists
      const existingItemIndex = currentCart.findIndex(
        cartItem => cartItem.product_name === item.product_name && 
                    cartItem.variant === item.variant &&
                    cartItem.currency === item.currency
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        // Update quantity
        console.log('🔄 Updating existing item quantity');
        updatedCart = [...currentCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + item.quantity
        };
      } else {
        // Add new item with guest ID
        console.log('➕ Adding new item to guest cart');
        updatedCart = [...currentCart, {
          id: generateGuestId(),
          ...item
        }];
      }

      console.log('📦 Updated guest cart:', updatedCart.length, 'items');
      saveGuestCart(updatedCart);
      updateGlobalCart(updatedCart);
      
      // Reset updating flag for guest users
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
      
      // Track Meta Pixel AddToCart event for guest users
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      trackAddToCart(
        priceValue * item.quantity,
        item.currency,
        `${item.product_name}_${item.variant}`,
        item.quantity
      );

      toast({
        title: "Success",
        description: "Item added to cart successfully"
      });
      
      return;
    }

    // Logged-in user - immediate global cart update
    isUpdatingRef.current = true;
    
    const currentItems = globalCartItems;
    const existingItem = currentItems.find(
      cartItem => cartItem.product_name === item.product_name && 
                  cartItem.variant === item.variant &&
                  cartItem.currency === item.currency
    );

    let optimisticUpdate;
    
    if (existingItem) {
      // Update existing item quantity
      optimisticUpdate = currentItems.map(cartItem => 
        cartItem.id === existingItem.id 
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      
      // Immediate global update
      updateGlobalCart(optimisticUpdate);
      
      // Update database in background
      supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + item.quantity })
        .eq('id', existingItem.id)
        .then(({ error }) => {
          if (error) {
            console.error('Database update error:', error);
            // Note: Removed syncCartFromDatabase() to prevent overriding optimistic updates
            toast({
              title: "Error", 
              description: "Failed to update cart",
              variant: "destructive"
            });
          }
          isUpdatingRef.current = false;
        });
    } else {
      // Add new item
      const tempId = crypto.randomUUID();
      const newItem = {
        id: tempId,
        user_id: user?.id,
        ...item,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      optimisticUpdate = [...currentItems, newItem];
      
      // Immediate global update
      updateGlobalCart(optimisticUpdate);
      
      // Add to database in background
      supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          product_name: item.product_name,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price,
          currency: item.currency,
          image_url: item.image_url
        })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Database insert error:', error);
            const revertedItems = globalCartItems.filter(cartItem => cartItem.id !== tempId);
            updateGlobalCart(revertedItems);
            toast({
              title: "Error",
              description: "Failed to add item to cart",
              variant: "destructive"
            });
          } else {
            // Replace temp item with real one
            const updatedItems = globalCartItems.map(cartItem => 
              cartItem.id === tempId ? data : cartItem
            );
            updateGlobalCart(updatedItems);
          }
          isUpdatingRef.current = false;
        });
    }
    
    // Track Meta Pixel AddToCart event for logged-in users
    const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    trackAddToCart(
      priceValue * item.quantity,
      item.currency,
      `${item.product_name}_${item.variant}`,
      item.quantity
    );

    // Show success toast immediately
    toast({
      title: "Success",
      description: existingItem ? "Item quantity updated in cart" : "Item added to cart successfully"
    });
  }, [user, toast, syncCartFromDatabase]);

  const removeFromCart = useCallback(async (itemId: string) => {
    console.log('🗑️ Removing from cart:', itemId);
    
    if (!user) {
      // Guest user - use localStorage
      const currentCart = getGuestCart();
      const updatedCart = currentCart.filter(item => item.id !== itemId);
      saveGuestCart(updatedCart);
      updateGlobalCart(updatedCart);
      
      toast({
        title: "Success",
        description: "Item removed from cart"
      });
      
      return;
    }

    // Logged-in user - immediate global cart update
    isUpdatingRef.current = true;
    
    const currentItems = globalCartItems;
    const itemToRemove = currentItems.find(item => item.id === itemId);
    const optimisticUpdate = currentItems.filter(item => item.id !== itemId);
    
    // Immediate global update
    updateGlobalCart(optimisticUpdate);
    
    // Remove from database in background
    supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .then(({ error }) => {
        if (error) {
          console.error('Database delete error:', error);
          if (itemToRemove) {
            const revertedItems = [...globalCartItems, itemToRemove];
            updateGlobalCart(revertedItems);
          }
          toast({
            title: "Error",
            description: "Failed to remove item from cart",
            variant: "destructive"
          });
        }
        isUpdatingRef.current = false;
      });
    
    // Show success toast immediately
    toast({
      title: "Success",
      description: "Item removed from cart"
    });
  }, [user, toast]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    console.log('🔢 Updating quantity:', itemId, quantity);

    if (!user) {
      // Guest user - use localStorage
      const currentCart = getGuestCart();
      const updatedCart = currentCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveGuestCart(updatedCart);
      updateGlobalCart(updatedCart);
      return;
    }

    // Logged-in user - immediate global cart update
    isUpdatingRef.current = true;
    
    const currentItems = globalCartItems;
    const originalItem = currentItems.find(item => item.id === itemId);
    const optimisticUpdate = currentItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    
    // Immediate global update
    updateGlobalCart(optimisticUpdate);
    
    // Update database in background
    supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .then(({ error }) => {
        if (error) {
          console.error('Database quantity update error:', error);
          if (originalItem) {
            const revertedItems = globalCartItems.map(item =>
              item.id === itemId ? originalItem : item
            );
            updateGlobalCart(revertedItems);
          }
          toast({
            title: "Error",
            description: "Failed to update quantity",
            variant: "destructive"
          });
        }
        isUpdatingRef.current = false;
      });
  }, [user, removeFromCart, toast]);

  // Handle cart migration when user logs in
  useEffect(() => {
    const wasGuest = lastUserStateRef.current === null;
    const isNowLoggedIn = user !== null;
    
    if (wasGuest && isNowLoggedIn) {
      console.log('🔄 User logged in - checking for guest cart migration');
      // User just logged in, migrate guest cart
      migrateGuestCart();
    }
  }, [user?.id]);

  // Only fetch when user state stabilizes
  useEffect(() => {
    // Clear any existing timeout
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }
    
    const currentUserId = user?.id || 'guest';
    
    // Only fetch if we haven't fetched for this user and we're not updating
    if (lastFetchedUserIdRef.current !== currentUserId && !isUpdatingRef.current) {
      // Add a delay to ensure user state is stable and prevent rapid fetches
      fetchTimeoutRef.current = setTimeout(() => {
        // Double-check the condition after timeout
        if (lastFetchedUserIdRef.current !== currentUserId && !isUpdatingRef.current) {
          fetchCartItems();
        }
      }, 150);
    }
    
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [user?.id]); // Depend on user ID, not the entire user object

  // Note: Removed real-time subscriptions to prevent conflicts with optimistic updates
  // The cart will sync when the page loads and when operations complete

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCartItems,
    cartCount,
    updateTrigger
  };
};