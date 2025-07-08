import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export interface UserDiscount {
  id: string;
  user_id: string;
  gift_discount_used: boolean;
  code_discount_used: boolean;
  total_discount: number;
  created_at: string;
  updated_at: string;
}

export const useDiscounts = () => {
  const { user } = useAuth();
  const [discountData, setDiscountData] = useState<UserDiscount | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setDiscountData(null);
      return;
    }

    const fetchOrCreateDiscountData = async () => {
      setLoading(true);
      
      try {
        // First try to get existing discount data
        let { data, error } = await supabase
          .from('user_discounts')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // No data found, create new discount record
          const { data: newData, error: insertError } = await supabase
            .from('user_discounts')
            .insert({
              user_id: user.id,
              gift_discount_used: false,
              code_discount_used: false,
              total_discount: 10 // Automatic 10% for logged-in users
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error creating discount data:', insertError);
          } else {
            data = newData;
          }
        } else if (error) {
          console.error('Error fetching discount data:', error);
        }

        setDiscountData(data);
      } catch (error) {
        console.error('Error in fetchOrCreateDiscountData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateDiscountData();
  }, [user]);

  const getTotalDiscount = () => {
    if (!user) return 0;
    return discountData?.total_discount || 10; // Default 10% for logged-in users
  };

  const getBaseDiscount = () => {
    return user ? 10 : 0; // Base 10% for logged-in users
  };

  const getGiftDiscount = () => {
    return discountData?.gift_discount_used ? 10 : 0;
  };

  const getCodeDiscount = () => {
    return discountData?.code_discount_used ? 10 : 0;
  };

  const updateDiscountData = (newData: Partial<UserDiscount>) => {
    if (discountData) {
      setDiscountData({ ...discountData, ...newData });
    }
  };

  return {
    discountData,
    loading,
    getTotalDiscount,
    getBaseDiscount,
    getGiftDiscount,
    getCodeDiscount,
    updateDiscountData
  };
}; 