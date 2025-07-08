import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthDialog } from './AuthDialog';
import { toast } from '@/hooks/use-toast';

export const ProfileButton = () => {
  const { user, signOut, loading } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully"
      });
    }
  };

  if (loading) {
    return (
      <Button 
        variant="outline" 
        className="h-12 w-12 bg-cream border-gold animate-pulse"
        disabled
      >
        <User className="h-6 w-6" />
      </Button>
    );
  }

  if (!user) {
    return (
      <>
        <Button 
          variant="outline" 
          className="h-12 w-12 bg-cream hover:bg-gold hover:text-primary border-gold transition-luxury hover:shadow-gold"
          onClick={() => setAuthDialogOpen(true)}
        >
          <User className="h-6 w-6" />
        </Button>
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </>
    );
  }

  const userInitials = user.email?.substring(0, 2).toUpperCase() || 'AU';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="h-12 w-12 bg-cream hover:bg-gold hover:text-primary border-gold transition-luxury hover:shadow-gold relative"
        >
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-gradient-luxury text-primary-foreground text-sm font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-rose rounded-full animate-pulse-glow" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-background border-gold shadow-luxury animate-fade-in-up"
        align="end"
      >
        <DropdownMenuItem className="flex items-center space-x-2 px-4 py-3 cursor-pointer hover:bg-cream">
          <User className="h-4 w-4" />
          <div className="flex-1">
            <div className="font-medium text-sm truncate">{user.email}</div>
            <div className="text-xs text-muted-foreground">Manage Profile</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2 px-4 py-3 cursor-pointer hover:bg-cream">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center space-x-2 px-4 py-3 cursor-pointer hover:bg-cream text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};