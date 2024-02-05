'use client';
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    RectangleStackIcon,
    ShoppingBagIcon,
    BuildingStorefrontIcon
  } from '@heroicons/react/24/outline';
  import { usePathname } from 'next/navigation';
  import clsx from 'clsx';
  
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  type Viewport = 'desktop' | 'mobile';
  const links = [
    { name: 'Home', 
    href: '/', 
    icon: HomeIcon },
    {
      name: 'CA',
      href: '/inventory/fxr-racing-ca',
      icon: BuildingStorefrontIcon,
    },
    { name: 'WPG', 
    href: '/inventory/adrenalinewpg', 
    icon: BuildingStorefrontIcon },
    {
      name: 'EDM',
      href: '/inventory/adrenalineedm',
      icon: BuildingStorefrontIcon,
    },
    {
      name: 'SASK',
      href: '/inventory/adrenalinesask',
      icon: BuildingStorefrontIcon,
    }
  ];
  
  export default function NavLinks() {
    const pathname= usePathname();
    
   
   
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          
          return (
            <a
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md  text-slate-950  bg-white p-3 text-sm font-medium hover:bg-sky-100 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-200 text-blue-900': pathname.startsWith(`${link.href}`)   && link.name !== 'Home',
                },
              )}
            > 
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </a>
          );
        })}
      </>
    );
  }