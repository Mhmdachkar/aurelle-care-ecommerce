import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, DollarSign, PoundSterling, Euro, Banknote } from 'lucide-react';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const CurrencySelector = ({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) => {
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', icon: DollarSign, flag: '🇺🇸' },
    { code: 'GBP', name: 'British Pound', symbol: '£', icon: PoundSterling, flag: '🇬🇧' },
    { code: 'EUR', name: 'Euro', symbol: '€', icon: Euro, flag: '🇪🇺' },
  ];

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);

  return (
    <div className="flex items-center space-x-2 animate-slide-in-right">
      <span className="text-sm font-medium text-muted-foreground">Currency:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="px-4 py-2 bg-cream hover:bg-gold hover:text-primary border-gold transition-luxury hover:shadow-gold"
          >
            <span className="mr-2 text-lg">{selectedCurrencyData?.flag}</span>
            {selectedCurrencyData && <selectedCurrencyData.icon className="mr-2 h-4 w-4" />}
            {selectedCurrency}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-background border-gold shadow-luxury animate-fade-in-up"
        >
          {currencies.map((currency) => (
            <DropdownMenuItem
              key={currency.code}
              onClick={() => onCurrencyChange(currency.code)}
              className={`flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-cream transition-colors ${
                selectedCurrency === currency.code ? 'bg-gold text-primary font-semibold' : ''
              }`}
            >
              <span className="text-lg">{currency.flag}</span>
              <currency.icon className="h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium">{currency.code}</div>
                <div className="text-xs text-muted-foreground">{currency.name}</div>
              </div>
              {selectedCurrency === currency.code && (
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};