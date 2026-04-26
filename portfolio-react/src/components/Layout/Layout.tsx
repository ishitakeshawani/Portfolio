import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { StarField } from '@/components/StarField';
import { CustomCursor } from '@/components/CustomCursor';

export function Layout() {
  return (
    <>
      <BackgroundEffects />
      <StarField />
      <CustomCursor />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
